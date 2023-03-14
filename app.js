// Import required modules
const express = require("express");
const multer = require("multer"); // Middleware for handling multipart/form-data (i.e. file uploads)
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const bodyParser = require("body-parser"); // Middleware for parsing HTTP request body
const app = express();
const path = require("path"); // Node.js module for working with file paths

// Configure multer to store uploaded files in the "uploads" directory, and generate a unique filename for each file
let storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads"); // Set the upload directory to "./uploads"
  },
  filename: (request, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Set the filename to "<fieldname>-<timestamp>.<extension>"
  },
});
// Create a multer instance that uses the configured storage options
const upload = multer({ storage: storage });

const gc = new Storage({
  keyFilename: path.join(__dirname, "./encoded-mark-380613-fde460d8164e.json"),
  projectId: "encoded-mark-380613",
});

const coolFilesBucket = gc.bucket("orchestrator_bucket");

// Use the body-parser middleware to parse HTTP request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling form submissions via POST method
app.post(
  "/submit-form",
  upload.fields([
    { name: "packageName" },
    { name: "date" },
    { name: "repeat" },
  ]),
  (req, res) => {
    console.log("all data");
    console.log(req.body); // Log the parsed request body for debugging purposes

    // Get the xamlFile value from the POST request
    const xamlFile = req.body.xamlFile;

    // Write the xamlFile value to the new file using Node's built-in file system module
    const filePath = `./uploads/xaml-${Date.now()}.xaml`;
    fs.writeFile(filePath, xamlFile, function (err) {
      if (err) {
        // Handle any errors that occur during file write
        console.error(err);
        res.send("Error saving file");
      } else {
        // Upload the xamlFile to Google Cloud Storage
        coolFilesBucket.upload(filePath, {
          gzip: true, 
          metadata: {
            cacheControl: "public, max-age=31536000", //This means that the file can be cached by any public client, such as a web browser, for up to 1 year
          },
        });

        // Send a response indicating that the file was saved successfully
        console.log(`XAML file saved to ${filePath}`);
        res.send("XAML file saved successfully");
      }
    });
  }
);

// Start the server and listen on port 8000
const port = 8000;
app.listen(port, () => {
  console.log(`Server listeningon port ${port}`);
});

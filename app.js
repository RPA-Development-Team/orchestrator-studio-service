// Import required modules
const express = require("express");
const axios = require("axios");
const multer = require("multer"); // Middleware for handling multipart/form-data (i.e. file uploads)
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const bodyParser = require("body-parser"); // Middleware for parsing HTTP request body
const app = express();
const path = require("path"); // Node.js module for working with file paths
const dotenv = require('dotenv');
dotenv.config();
const dbConfig = require('./db/dbConfig');
const { Pool } = require('pg');
const pool = new Pool(dbConfig);


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


const gc = new Storage({
  keyFilename: path.join(__dirname, "./encoded-mark-380613-fde460d8164e.json"),
  projectId: "encoded-mark-380613",
});


// to get the id = the name of bucket in gc 
// gc.getBuckets().then(x => console.log(x)); 
// id: 'orchestrator_bucket',

const coolFilesBucket = gc.bucket("orchestrator_bucket");

// Use the body-parser middleware to parse HTTP request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/packages/create", (req, res) => {
  console.log("all data");
  console.log(req.body); // Log the parsed request body for debugging purposes

  // Get the xamlFile value from the POST request
  let xamlFile = req.body.xamlFile;
  const buffer = Buffer.from(xamlFile,"base64");
  xamlFile = buffer.toString("utf-8")
  // console.log("XXXXXXX")
  // console.log(xamlFile)

  // Write the xamlFile value to the new file using Node's built-in file system module
  const xamlpath = `xaml-${Date.now()}.xaml`;
  const filePath = `./uploads/${xamlpath}`;

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
          cacheControl:
            "public, max-age=31536000", //This means that the file can be cached by any public client, such as a web browser, for up to 1 year
        },
      });
      const pathDb = `http://orchestrator_bucket.storage.googleapis.com/${xamlpath} `;
      // Save the form data to the database
      const { packageName, date, time } = req.body;

      pool.query(
        "INSERT INTO processes(packageName, date, xamlFile, time) VALUES($1, $2, $3, $4)",
        [packageName, date, pathDb, time],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("Form data saved successfully");
            // send to abdo      
            const machine_name = "Abdo-Machine";
            const package = {package_name:packageName,machine_name,pathDb,date,time}
            axios.post("http://192.168.1.145:4000/pkg", package)
            res.status(200).json({ message: "Form data saved successfully" });
          }
        }
      );
      
      

    }
  });
});

app.get("/api/packages", (req, res) => {
  pool.query(
    `SELECT * FROM processes`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.table(result.rows);
        res
          .status(200)
          .send(result.rows);
      }
    }
  )
});

app.get("/api/packages/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM processes WHERE id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.table(result.rows);
        res.status(200).redirect("http://localhost:3000/process");
      }
    }
  )
});
// Start the server and listen on port 8000
const port = 8000;
app.listen(port, () => {
  console.log(`Server listeningon port ${port}`);
});

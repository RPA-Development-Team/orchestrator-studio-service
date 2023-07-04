const axios = require("axios");
const multer = require("multer"); // Middleware for handling multipart/form-data (i.e. file uploads)
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path"); // Node.js module for working with file paths
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


// Configure multer to store uploaded files in the "uploads" directory, and generate a unique filename for each file
let storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.join(__dirname, "../uploads")); // Set the upload directory to "./uploads"
    },
    filename: (request, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      ); 
    },
  });
  
  
  const gc = new Storage({
    keyFilename: path.join(__dirname, "../neat-phoenix-391420-d350ecdf6712.json"),
    projectId: "neat-phoenix-391420",
  });
  
  

  const coolFilesBucket = gc.bucket("prch-pkg");

exports.getPackagesByUserID = async (req, res) => {
    try{
        const AllPackages = await prisma.package.findMany({
            where: {
                userID: parseInt(req.params.id, 10)
            }
        });
        //Returning fetched packages which is either an empty list or a existing list of packages
        return res.status(200).json(AllPackages)
    }catch(err){
        console.log(`Error while retreiving all packages\n Error: ${err.message}`)
        //Returning empty list of packages to frontend request
        res.status(500).json([])
    }    
}

exports.getPackagesByID = async (req, res) => {
    try{
        const AllPackages = await prisma.package.findUnique({
            where: {
                id: parseInt(req.params.id, 10)
            }
        });
        //Returning fetched packages which is either an empty list or a existing list of packages
        return res.status(200).json(AllPackages)
    }catch(err){
        console.log(`Error while retreiving all packages\n Error: ${err.message}`)
        //Returning empty list of packages to frontend request
        res.status(500).json([])
    }    
}

exports.deletePackagesByID =  async (req, res) => {
  try{
      const AllPackages = await prisma.package.delete({
          where: {
              id: parseInt(req.params.id, 10)
          }
      });
      return res.status(200).json({
        "message": "Package deleted"
      });
  }catch(err){
      console.log(`Error while deleting package\n Error: ${err.message}`)
      //Returning empty list of packages to frontend request
      res.status(500).json([]);
  }    
}

exports.getAllPackages = async (req, res) => {
    try{
        const prisma = new PrismaClient()
        const AllPackages = await prisma.package.findMany()
        //Returning fetched packages which is either an empty list or a existing list of packages
        return res.status(200).json(AllPackages)
    }catch(err){
        console.log(`Error while retreiving all packages\n Error: ${err.message}`)
        //Returning empty list of packages to frontend request
        res.status(500).json([])
    }    
}


  exports.createPackage = async (req, res) => {

      console.log("all data");
      console.log(req.body); // Log the parsed request body for debugging purposes
    
      // Get the xamlFile value from the POST request
      let xamlFile = req.body.xamlFile;
      const buffer = Buffer.from(xamlFile,"base64");
      xamlFile = buffer.toString("utf-8")

      // Write the xamlFile value to the new file using Node's built-in file system module
      const xamlpath = `xaml-${Date.now()}.xaml`;
      const filePath = path.join(__dirname, `../uploads/${xamlpath}`);
    
      fs.writeFile(filePath, xamlFile, async function (err) {
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
          const { packageName, date, time, userID, description } = req.body;
          try {
              await prisma.package.create({
                  data: {
                      name: packageName,
                      packageUrl: pathDb,
                      userID: userID ? userID : 2,
                      description: description
                  }
              });
              const machine_name = "Abdo-Machine";
              const package = {package_name:packageName,machine_name,pathDb,date,time}
              axios.post("http://orch-robot-service:8000/pkg", package)
              res.status(201).json({ message: "Form data saved successfully" });
          } catch (pErr) {
              console.log(pErr)
          }
        }
      });
  }

  exports.updatePackage = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      const updatedPackage = await prisma.package.update({
        where: {
          id: parseInt(id, 10)
        },
        data: {
          name:name,
          description: description
        }
      });
  
      return res.status(200).json({
        message: "Package updated successfully",
        updatedPackage: updatedPackage
      });
    } catch (err) {
      console.log(`Error while updating package\nError: ${err.message}`);
      return res.status(500).json({
        message: "Failed to update package",
        error: err.message
      });
    }
  };
  


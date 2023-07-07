const axios = require("axios");
const multer = require("multer"); // Middleware for handling multipart/form-data (i.e. file uploads)
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path"); // Node.js module for working with file paths
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const findUserById = async (id) => {
  try {
    const result = await prisma.userAccount.findUnique({
      where: {
        uuid: id
      },
      include: {
        packages: {
          include: {
            jobs: true
          }
        }
      }
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};


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

// to get the id = the name of bucket in gc 
// gc.getBuckets().then(x => console.log(x)); 
// id: 'prch-pkg',

const coolFilesBucket = gc.bucket("prch-pkg");
const coolLibraryBucket = gc.bucket("orch-activities")


exports.getPackagesByUserID = async (req, res) => {
  let user = await findUserById(req.decodedUser.uuid)
  try {
    const AllPackages = user.packages
    const modifiedPackages = AllPackages.map((package) => {
      const { id, name, uploadDate, packageUrl, ...rest } = package;
      return {
          packageId: id,
          packageName: name, // Renaming "name" key to "packageName"
          createdDate: uploadDate,
          downloadUrl: packageUrl,
          ...rest
      };
  });

  let jobCount = 0;

  for (packageKey in user.packages) {
    if (user.packages[packageKey].jobs.length > 0) jobCount++;
  }

  const packageCount = {
    packagesNumber:modifiedPackages.length,
    packagesWithJobs: jobCount,
    dailyPackages: 3,
  };
    //Returning fetched packages which is either an empty list or a existing list of packages
    return res.status(200).json({
      counters: packageCount, 
      packages: modifiedPackages      
    })
  } catch (err) {
    console.log(`Error while retreiving all packages\n Error: ${err.message}`)
    //Returning empty list of packages to frontend request
    res.status(500).json([])
  }
}


exports.deletePackagesByID = async (req, res) => {
  try {
    let user = await findUserById(req.decodedUser.uuid)

    for (key in user.packages) {
      if (user.packages[key].id == req.params.id) {
        const deletedPackage = await prisma.package.delete({
          where: {
            id: parseInt(req.params.id, 10)
          }
        });
        return res.status(200).json({
          packageId: deletedPackage.id,
          status: "Deleted"
        });
      }
    }
    return res.status(404).json({
      message: "Package Not Found"
    })
  } catch (err) {
    console.log(`Error while deleting package\n Error: ${err.message}`)
    //Returning empty list of packages to frontend request
    res.status(500).json([]);
  }
}


exports.getAllLibrarys = async (req, res) => {
  try {
    const prisma = new PrismaClient()
    const allLibrarys = await prisma.library.findMany({
      select: {
        name: true,
        version: true,
        link: true,
        description: true,
      },
    })
    return res.status(200).json({ packages: allLibrarys })
  } catch (err) {
    console.log(`Error while retrieving all librarys\nError: ${err.message}`)
    res.status(500).json([])
  }
}





exports.createPackage = async (req, res) => {

  // Get the xamlFile value from the POST request
  let xamlFile = req.body.xamlFile;
  const buffer = Buffer.from(xamlFile, "base64");
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
      const pathDb = `http://prch-pkg.storage.googleapis.com/${xamlpath} `;
      // Save the form data to the database
      const { packageName, description } = req.body;
      try {  
        let user = await findUserById(req.decodedUser.uuid)
        if (!user){
          return res.status(401).json({
            message:"Unauthorized"
          })
        }else{
        await prisma.package.create({
          data: {
            name: packageName,
            packageUrl: pathDb,
            description: description,
            userID: user.id
          }
        });
        res.status(201).json({ message: "Form data saved successfully" });
      }} catch (pErr) {
        console.log(pErr)
      }
    }
  });
}

exports.createLibrary = async (req, res) => {    
  // Get the xamlFile value from the POST request
  let libraryData = req.body.data;
  const buffer = Buffer.from(libraryData,"base64");
  libraryData = buffer.toString("utf-8")
  // Write the xamlFile value to the new file using Node's built-in file system module
  const libpath = `lib-${Date.now()}.dll`;
  const filePath = path.join(__dirname, `../librarys/${libpath}`);
  fs.writeFile(filePath, libraryData, async function (err) {
    if (err) {
      // Handle any errors that occur during file write
      console.error(err);
      res.send("Error saving file");
    } else {
      // Upload the xamlFile to Google Cloud Storage
      coolLibraryBucket.upload(filePath, {
        gzip: true,
        metadata: {
          cacheControl:
            "public, max-age=31536000", //This means that the file can be cached by any public client, such as a web browser, for up to 1 year
        },
      });
      const pathDb = `http://orch-activities.storage.googleapis.com/${libpath} `;
      // Save the form data to the database
      const { name, version, description } = req.body;
      try {
          await prisma.library.create({
              data: {
                  name: name,
                  link: pathDb,
                  version: version ? version : "1.0",
                  description: description
              }
          });
          res.status(201).json({ message: "Form library saved successfully" });
      } catch (pErr) {
          console.log(pErr)
      }
    }
  });
}

exports.updatePackage = async (req, res) => {
  try {
    
    let user = await findUserById(req.decodedUser.uuid)
    for (key in user.packages) {
      if (user.packages[key].id == req.params.id) {
        const updatedPackage = await prisma.package.update({
          where: {
            id: parseInt(req.params.id, 10)
          },
          data: {
            name: req.body.name,
            description: req.body.description
          }
        });
        return res.status(200).json({
          packageId: updatedPackage.id ,
          packageName: req.body.name,
          description: req.body.description
          });
      }
    }
    return res.status(404).json({
      message: "Package Not Found"
    })
  } catch (err) {
    console.log(`Error while updating package\nError: ${err.message}`);
    return res.status(500).json({
      message: "Failed to update package",
      error: err.message
    });
  }
};
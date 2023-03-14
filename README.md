# studio_comm
This project is a simple Express.js web server that demonstrates how to upload files to Google Cloud Storage using the @google-cloud/storage package and the Multer middleware for handling file uploads.

# Getting Started
To get started with this project, follow these steps:

Clone the repository to your local machine.

Install the project dependencies by running the following command in the project root directory:

npm install
Create a Google Cloud Storage bucket and download the JSON file containing your service account key.

Rename the downloaded JSON file to "encoded-mark-380613-fde460d8164e.json" and place it in the project root directory.

Modify the projectId property in the gc object to match the ID of your Google Cloud project.

Start the web server by running the following command in the project root directory:


npm start
Navigate to http://localhost:8000 in your web browser to view the application.

# Usage
To use the application, follow these steps:

Click the "Choose File" button to select a file to upload.

Enter values for the "Package Name," "Date," and "Repeat" fields.

Click the "Submit" button to upload the file and form data to Google Cloud Storage.

View the uploaded file in your Google Cloud Storage bucket.

# Dependencies
This project has the following dependencies:

express
multer
fs
@google-cloud/storage
body-parser
path
These dependencies can be installed using the following command:

npm install express multer fs @google-cloud/storage body-parser path


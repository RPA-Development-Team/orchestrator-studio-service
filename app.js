// Import required modules
const express = require("express");
const bodyParser = require("body-parser"); // Middleware for parsing HTTP request body
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/routes');

// Use the body-parser middleware to parse HTTP request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

// Start the server and listen on port 8000
const port = 8000;
app.listen(port, () => {
  console.log(`Server listeningon port ${port}`);
});

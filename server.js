// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Dependencies
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { ppid } = require('process');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3333;
const server = app.listen(port, listening);

// Check running function 
function listening() {
    console.log('Server is running!');
    console.log(`Runnin on localhost: ${port}`);
};

// GET Route
app.get('/all', (req, res) => {
    res.send(projectData)
});

// POST Route
app.post("/data/new", (req, res) => {
    projectData = req.body;
    res.send({ message: "Saved New Entry!" });
    console.log(projectData);
});
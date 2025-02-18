/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Yevhen Chernytskyi Student ID: 166613232 Date: Mon Feb 17
 *
 ********************************************************************************/

const projectData = require("./modules/projects"); // import functions

projectData.initialize(); // initialize object

const express = require("express"); // import express package
const app = express(); // create express application
const port = 3000; // set port to 3000
const path = require("path");

app.use(express.static("public"));

app.get(
  "/",
  (req, res) => res.sendFile(path.join(__dirname, "/views/home.html")) // send home.html file on a root route
);

app.get(
  "/about",
  (req, res) => res.sendFile(path.join(__dirname, "/views/about.html")) // send about.html on about route
);

app.get("/solutions/projects", (req, res) => {
  if (req.query.sector) {
    // if query has a sector parameter, look for projects with this sector
    projectData
      .getProjectsBySector(req.query.sector)
      .then((data) => {
        res.send(data);
      })
      .catch((reason) => {
        res.status(404).send(reason);
      });
  } else {
    // if not, just show all projects
    projectData.getAllProjects().then((data) => {
      res.send(data); // send data of all projects
    });
  }
});

app.get("/solutions/projects/:sectorId", (req, res) => {
  projectData
    .getProjectById(req.params.sectorId) // using sector ID from parameters
    .then((data) => {
      res.send(data); // if projects with this id exists then data sends to the user
    })
    .catch((reason) => {
      res.status(404).send(reason);
    });
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html")); // middleware for any other routes
});

// listen for connections
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

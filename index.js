/*

* MARVEL - Backend

* Index.js

*/

//! Import express and use it
const express = require("express");
const app = express();

//! Import cors and use it
const cors = require("cors");
app.use(cors());

//! Other packages
// Allow server to receive body (only use for signup and login)
app.use(express.json());

//Require .env
require("dotenv").config();

//* <--- BDD --->
//NULL

//* <--- SERVER START HERE --->

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur Marvel" });
});

// CHARACTERS ROUTE
const character = require("./routes/characters");
app.use(character);

// COMICS ROUTE
const comic = require("./routes/comics");
app.use(comic);

// ROUTE NOT FOUND
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

// SERVER LISTENING
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started ! Spiderman is coming 🦸");
});

//* <--- SERVER START END HERE  --->

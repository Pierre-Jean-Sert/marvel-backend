/*

* MARVEL - Backend

* Characters Route

*/

//! Import express and use it
const express = require("express");
const router = express.Router();

//! Libraries import
const axios = require("axios");

//
//* ROUTE "/characters" : GET ALL CHARACTERS + SEARCH BY NAME
// Get a list of characters

router.get("/characters", async (req, res) => {
  //

  // Body destructuring and apiKey
  const { limit, skip, name } = req.query;
  const apiKey = process.env.API_KEY;
  console.log(limit, skip, name); // to check request from client

  // Base URL
  const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/characters?";

  // URL Filters
  const filters = {
    apiKey: apiKey,
    limit: limit,
    skip: skip,
    name: name,
  };

  // URL Filter builder
  const filterBuilder = Object.entries(filters)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // URL constructor
  const url = baseUrl + filterBuilder;

  // Axios request
  try {
    //Response constructor
    const response = await axios.get(url);

    // Client response
    res.status(200).json(response.data);

    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
//* ROUTE "/character/:id" : GET CHARACTER BY ID
//

router.get("/character/:id", async (req, res) => {
  //

  // Recovery params and apiKey
  const { id } = req.params;
  const apiKey = process.env.API_KEY;

  // Base URL
  const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/character/";

  // URL constructor
  const url = baseUrl + id + "?apiKey=" + apiKey;

  // Axios request
  try {
    //Response constructor
    const response = await axios.get(url);

    // Client response
    res.status(200).json(response.data);

    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* ROUTE EXPORT
module.exports = router;

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
  try {
    // Check if query is complete
    if (
      req.query.limit === undefined ||
      req.query.skip === undefined ||
      req.query.name === undefined
    ) {
      return res.status(400).json({
        message: "Limit, Skip or Name were not correctly transmitted",
      });
    }

    // Body destructuring and apiKey
    const { limit, skip, name } = req.query;
    const apiKey = process.env.API_KEY;
    // console.log(limit, skip, name); // to check request from client

    // Base URL
    const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/characters?";

    // URL filters
    const filters = {
      apiKey: apiKey,
      limit: limit,
      skip: skip,
      name: name,
    };

    // URL filter builder
    const filterBuilder = Object.entries(filters)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // URL constructor
    const url = baseUrl + filterBuilder;

    // Axios request
    const response = await axios.get(url);

    // Client response
    return res.status(200).json(response.data);

    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//
//* ROUTE "/character/:id" : GET CHARACTER BY ID
// Get a the infos of a specific character

router.get("/character/:characterId", async (req, res) => {
  //
  try {
    // Recovery params and apiKey
    const { characterId } = req.params;
    const apiKey = process.env.API_KEY;

    // Base URL
    const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/character/";

    // URL constructor
    const url = baseUrl + characterId + "?apiKey=" + apiKey;

    // Axios request
    const response = await axios.get(url);

    // Client response
    return res.status(200).json(response.data);

    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//* ROUTE EXPORT
module.exports = router;

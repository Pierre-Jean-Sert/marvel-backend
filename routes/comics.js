/*

* MARVEL - Backend

* Comics Route

*/

//! Import express and use it
const express = require("express");
const router = express.Router();

//! Libraries import
const axios = require("axios");

//
//* ROUTE "/comics" : GET ALL COMICS + SEARCH BY TITLE
// Get a list of comics

router.get("/comics", async (req, res) => {
  //

  // Check if body is complete
  if (
    req.query.limit === undefined ||
    req.query.skip === undefined ||
    req.query.title === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Limit, Skip or Title were not correctly transmitted" });
  }

  // Body destructuring and apiKey
  const { limit, skip, title } = req.query;
  const apiKey = process.env.API_KEY;

  // Base URL
  const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/comics?";

  // URL Filters
  const filters = {
    apiKey: apiKey,
    limit: limit,
    skip: skip,
    title: title,
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
//* ROUTE "/comic/:id" : GET COMIC BY ID
// Get all informations of specific comic

router.get("/comic/:id", async (req, res) => {
  //

  // Recovery params and apiKey
  const { id } = req.params;
  const apiKey = process.env.API_KEY;

  // Base URL
  const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/comic/";

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

//
//* ROUTE "/comics/:characterId" : GET COMICS BY CHARACTER
// Get a list of comics containing a specific character

router.get("/comics/:characterId", async (req, res) => {
  //

  // Recovery params and apiKey
  const { characterId } = req.params;
  const apiKey = process.env.API_KEY;

  // Base URL
  const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/comics/";

  // URL constructor
  const url = baseUrl + characterId + "?apiKey=" + apiKey;

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

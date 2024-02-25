const citiesController = require("express").Router();
const { townOptions } = require("../data/data");
citiesController.get("/cities", async (req, res) => {
  console.log(req.query);

  const parseQuery = JSON.parse(req.query.value);
  const searchValue = parseQuery["searchValue"];

  const findTownNamesBySearchValue = (searchValue) => {
    return townOptions[searchValue] || [];
  };

  const townNames = findTownNamesBySearchValue(searchValue);
  res.json({ townNames });
});

module.exports = citiesController;

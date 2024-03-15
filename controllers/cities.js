const citiesController = require("express").Router();
const { townOptions } = require("../data/data");
citiesController.get("/cities", async (req, res) => {
  try {
    const parseQuery = JSON.parse(req.query.value);
    const searchValue = parseQuery["searchValue"];
    const townNames = townOptions[searchValue] || [];

    res.status(200).json({ townNames });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = citiesController;

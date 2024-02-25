const dataController = require("express").Router();
const { parseError } = require("../util/parser");
const { create } = require("../services/data");

let currentSKU = 1;

const getNextSKU = () => {
  const sku = currentSKU.toString().padStart(4, "0");
  currentSKU += 1;
  return sku;
};

dataController.post("/add", async (req, res) => {
  console.log(typeof req.body.price);
  try {
    const sku = await getNextSKU();
    const data = {
      sku,
      propertyType: req.body.propertyType,
      propertyStatus: req.body.propertyStatus,
      price: JSON.parse(req.body.price),
      ownerPrice: JSON.parse(req.body.ownerPrice),
      description: req.body.description,
      construction: req.body.construction,
      commissionSum: JSON.parse(req.body.commissionSum),
      constructionDate: JSON.parse(req.body.constructionDate),
      area: req.body.area,
    };
    console.log(data);

    const createdData = await create(data);
    res.status(201).send({
      messasge: "Successfully uploaded",
      createdData,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = dataController;

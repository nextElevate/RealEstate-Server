const { Schema, model, Types } = require("mongoose");

const propertySchema = new Schema({
  propertyType: {
    type: String,
    required: true,
  },
  propertyStatus: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be a positive number"],
  },
  ownerPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  construction: {
    type: String,
    required: true,
  },
  commissionSum: {
    type: Number,
  },
  constructionDate: {
    type: Number,
  },
  area: {
    type: String,
  },
  sku: { type: Number },
});

const Property = model("Property", propertySchema);

module.exports = Property;

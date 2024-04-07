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
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currencyType: { type: String },
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
  street: { type: String },
  streetNumber: { type: Number },
  buildingNumber: { type: String },
  entranceNumber: { type: String },
  apartmentNumber: { type: String },
  buildingFloorCount: { type: Number },
  floor: { type: Number },
  image: [
    { type: String, required: [true, "At least one image is required!"] },
  ],
  createdAt: { type: Date, default: Date.now },
  vip: Boolean,
  isNew: Boolean,
});

const Property = model("Property", propertySchema);

module.exports = Property;

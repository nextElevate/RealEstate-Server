const Property = require("../model/Property");

async function create(item) {
  console.log(item);
  const newProperty = new Property(item);
  return await newProperty.save();
}

async function getLastThree() {
  return await Property.find({}).sort({ createdAt: -1 }).limit(3);
}

module.exports = { create, getLastThree };

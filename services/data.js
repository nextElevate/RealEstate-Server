const Property = require("../model/Property");

async function create(item) {
  console.log(item);
  const newProperty = new Property(item);
  return await newProperty.save();
}

module.exports = { create };

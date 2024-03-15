const Property = require("../model/Property");

async function create(item) {
  console.log(item);
  const newProperty = new Property(item);
  return await newProperty.save();
}

async function getLastThree() {
  return await Property.find({}).sort({ createdAt: -1 }).limit(3);
}

async function getVipProperties() {
  return await Property.find({ vip: true }).limit(2);
}
module.exports = { create, getLastThree, getVipProperties };

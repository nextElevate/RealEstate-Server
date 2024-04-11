const Property = require("../model/Property");

async function create(item) {
  console.log(item);
  const newProperty = new Property(item);
  console.log(newProperty);
  return await newProperty.save();
}

async function getLastThree() {
  return await Property.find({}).sort({ createdAt: -1 }).limit(3);
}

async function getVipProperties() {
  return await Property.find({ vip: true }).limit(2);
}

async function getLastRentProperties() {
  return await Property.find({ propertyStatus: "rent" })
    .sort({ createdAt: -1 })
    .limit(6);
}

async function getPropertyById(id) {
  return await Property.findById(id).lean();
}
module.exports = {
  create,
  getLastThree,
  getVipProperties,
  getLastRentProperties,
  getPropertyById,
};

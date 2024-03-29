const dataController = require("express").Router();
const { parseError } = require("../util/parser");
const { create, getLastThree, getVipProperties } = require("../services/data");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
let currentSKU = 1;
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCOzf0A46cpv2ZlndRMEuAkaehHh3o7Y4g",
  authDomain: "armoda-8a8d7.firebaseapp.com",
  projectId: "armoda-8a8d7",
  storageBucket: "armoda-8a8d7.appspot.com",
  messagingSenderId: "467246138233",
  appId: "1:467246138233:web:294509fac140924d3865a8",
  measurementId: "G-0CFMZX4XPM",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const upload = multer({ storage: multer.memoryStorage() });

const getNextSKU = () => {
  const sku = currentSKU.toString().padStart(4, "0");
  currentSKU += 1;
  return sku;
};

const createdAt = new Date();

dataController.post("/add", upload.array("images", 10), async (req, res) => {
  try {
  if (!req.files || req.files.length === 0) {
    res.status(502).json({ message: "No files provided" });
  }
  const images = [];

  for (const file of req.files) {
    const storageRef = ref(storage, file.originalname);
    await uploadBytes(storageRef, file.buffer);
    const imageUrl = await getDownloadURL(storageRef);
    images.push(imageUrl);
  }

    const sku = getNextSKU();
    const data = {
      sku,
      propertyType: req.body.propertyType,
      propertyStatus: req.body.propertyStatus,
      price: JSON.parse(req.body.price),
      ownerPrice: JSON.parse(req.body.ownerPrice),
      description: req.body.description,
      construction: req.body.construction,
      commissionSum: JSON.parse(req.body.commissionSum),
      currencyType: req.body.currencyType,
      constructionDate: JSON.parse(req.body.constructionDate),
      area: req.body.area,
      city: req.body.city,
      location: req.body.location,
      street: req.body.street,
      streetNumber: req.body.streetNumber,
      buildingNumber: req.body.buildingNumber,
      entranceNumber: req.body.entranceNumber,
      apartmentNumber: req.body.apartmentNumber,
      buildingFloorCount: req.body.buildingFloorCount,
      floor: req.body.floor,
      image: images,
      createdAt,
      vip: false,
    };

    const createdData = await create(data);
    res.status(201).json({
      messasge: "Successfully uploaded",
      createdData,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/last-three", async (req, res) => {
  try {
    const properties = await getLastThree();
    res.status(200).json(properties);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/vip-properties", async (req, res) => {
  try {
    const properties = await getVipProperties();
    res.status(200).json(properties);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = dataController;

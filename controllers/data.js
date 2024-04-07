require("dotenv").config();
const dataController = require("express").Router();
const { parseError } = require("../util/parser");
const {
  create,
  getLastThree,
  getVipProperties,
  getLastRentProperties,
} = require("../services/data");
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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const upload = multer({ storage: multer.memoryStorage() });

const getNextSKU = () => {
  const sku = currentSKU.toString().padStart(4, "0");
  currentSKU += 1;
  return sku;
};

const createdAt = new Date();
const currentTime = new Date();
const timeDifference = currentTime.getTime() - createdAt.getTime();
const isNew = timeDifference < 24 * 60 * 60 * 1000;

dataController.post("/add", upload.array("images", 9000), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new Error("no files provided");
  }
  const images = [];

  for (const file of req.files) {
    const storageRef = ref(storage, file.originalname);
    await uploadBytes(storageRef, file.buffer);
    const imageUrl = await getDownloadURL(storageRef);
    images.push(imageUrl);
  }

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
      isNew,
    };

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

dataController.get("/last-rent", async (req, res) => {
  try {
    const properties = await getLastRentProperties();
    res.status(200).json(properties);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = dataController;

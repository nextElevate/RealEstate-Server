const dataController = require("../controllers/data");
const citiesController = require("../controllers/cities");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "REST Service Working" });
  });

  app.use("/property", dataController);
  app.use("/city", citiesController);
};

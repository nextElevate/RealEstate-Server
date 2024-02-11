const dataController = require('express').Router();

dataController.post("/add", async (req,res) => {
    console.log(req.body)
})

module.exports = dataController
const dataController = require("../controllers/data");


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({ message: 'REST Service Working'});
    })
    
    app.use('property', dataController)
    
}
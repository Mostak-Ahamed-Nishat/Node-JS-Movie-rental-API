const mongoose = require('mongoose');
const Fawn=require('fawn')
require('dotenv').config()
//connect database 
const dbConnection = mongoose.connect(process.env.DB_CONNECTION).then(() => {
    Fawn.init(process.env.DB_CONNECTION)
    console.log("Database connection established");
}).catch((err) => {
    console.log(err.message);
})

module.exports = dbConnection
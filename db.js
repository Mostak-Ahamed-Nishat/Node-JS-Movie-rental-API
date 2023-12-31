const mongoose = require('mongoose');
//connect database 
const dbConnection = mongoose.connect('mongodb://localhost:27017/rental_movie').then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log(err.message);
})

module.exports = dbConnection
const express = require('express')
require('dotenv').config()
const dbConnection = require('./db')
const app = express()
const genre = require('./Routes/genresRoute')
const movie = require('./Routes/moviesRoute')

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())


// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

//**Router for genres*/
app.use('/api/genre', genre)

app.use('/api/movie', movie)




app.listen(process.env.PORT, () => {
    console.log("listening on port :" + process.env.PORT);
})
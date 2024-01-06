const express = require('express')
require('express-async-errors');
require('dotenv').config()
const dbConnection = require('./db')
const app = express()
const genre = require('./Routes/genresRoute')
const movie = require('./Routes/moviesRoute')
const customer = require('./Routes/customerRoute')
const rental = require('./Routes/rentalRoute')
const user = require('./Routes/userRoute')
const auth = require('./Routes/authRoute')
const handleError = require('./middleware/errorHandlingMiddleware')

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())


// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

//**Router for genres*/
app.use('/api/genres', genre)
//**Router for movie*/
app.use('/api/movies', movie)
//**Router for Customer*/
app.use('/api/customers', customer)
//**Router for Rental*/
app.use('/api/rentals', rental)
//**Router for User*/
app.use('/api/users', user)
//**Router for Auth*/
app.use('/api/auth', auth)
// Error handling
app.use(handleError)


app.listen(process.env.PORT, () => {
    console.log("listening on port :" + process.env.PORT);
})
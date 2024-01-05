const User = require("../model/userModel")
var jwt = require('jsonwebtoken');

const {
    authValidator
} = require("../validators/validator")
const bcrypt = require('bcrypt');
require('dotenv').config()


//Get the Authenticate user
async function getAuthUser(req, res) {
    try {

        //check if any errors are encountered 
        const {
            error
        } = authValidator.validate(req.body)

        // if any errors are encountered then send an error message
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })

        }


        let {
            email,
            password
        } = req.body


        //check if the user exist or not
        const user = await User.findOne({
            email: email
        })

        // if the user not exits send invalid message
        if (!user) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }

        // compare the password 
        var hashPassword = await bcrypt.compare(password, user.password).then((hash) => hash).catch((err) => res.status(500).json({
            error: err.message
        }));

        // send a success message to the user after the user has authenticated
        if (hashPassword) {

            //Create a jwt
            let token = user.generateAuthToken()

            return res.send(token)
        } else {
            return res.status(404).json({
                message: 'Invalid username or password',
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    getAuthUser,
}
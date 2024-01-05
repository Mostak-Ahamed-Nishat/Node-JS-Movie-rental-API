const User = require("../model/userModel")

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
            res.status(400).json({
                error: error.details[0].message
            })
            return 0
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
            return res.status(200).json({
                message: 'valid user',
                data: user
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
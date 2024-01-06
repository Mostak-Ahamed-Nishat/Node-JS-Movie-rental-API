const User = require("../model/userModel")
const {
    userValidator
} = require("../validators/validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





// **Get All The Users 
async function getAllUser(req, res) {

    try {
        const user = await User.find()
        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}


//** Get user profile by id */
async function getUserById(req, res) {
    try {
        // find the user by its id
        const user = await User.findById(req.user._id).select('-password')
        // if user is not found
        if (!user) {
            res.status(404).json({
                error: 'user not found',
            })
        }

        // if user found
        if (user) {
            res.status(201).json({
                data: user
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        })
    }
}



//Register/Create user
async function createUser(req, res) {
    try {
        //check if any errors are encountered 
        const {
            error
        } = userValidator.validate(req.body)

        // if any errors are encountered then send an error message
        if (error) {
            res.status(400).json({
                error: error.details[0].message
            })
            return 0
        }


        let {
            name,
            email,
            password
        } = req.body


        //check if the user email already exists

        const isExist = await User.findOne({
            email: req.body.email
        })



        if (isExist) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        var hashPassword = await bcrypt.hash(password, 10).then((hash) => hash).catch((err) => res.status(500).json({
            error: err.message
        }));


        let data = {
            name,
            email,
            password: hashPassword
        }
        //Create the user
        const user = new User(data)
        await user.save()
        //Create a token
        let token = user.generateAuthToken()

        console.log(token);
        //if the token has created 
        if (token) {
            // send a success message to the user after the genre has been created
            return res.header('x-auth-token', token).status(201).send({
                message: 'User successfully has created',
                data: user
            })
        } else {
            return res.status(500).send({
                error: "Failed to create token"
            })
        }


    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

}

module.exports = {
    getAllUser,
    createUser,
    getUserById
}
const express = require('express');
const auth = require("../middleware/authMiddleware");
const {
    createUser,
    getAllUser,
    getUserById
} = require('../controller/userController');
const router = express.Router();

router.get('/', getAllUser);
router.get('/me', auth, getUserById);
router.post('/', createUser);


module.exports = router;
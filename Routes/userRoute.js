const express = require('express');

const { createUser,getAllUser } = require('../controller/userController');
const router = express.Router();

router.get('/', getAllUser);
router.post('/', createUser);


module.exports = router;
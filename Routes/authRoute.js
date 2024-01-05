const express = require('express');
const { getAuthUser } = require('../controller/authController');

const router = express.Router();


router.post('/', getAuthUser);

module.exports = router;
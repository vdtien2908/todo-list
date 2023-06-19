const express = require('express');
const router = express.Router();

// Require controllers
const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.index);

module.exports = router;

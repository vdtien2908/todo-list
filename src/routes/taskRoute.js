const express = require('express');
const router = express.Router();

// Require controllers
const taskController = require('../app/controllers/TaskController');

router.get('/', taskController.index);

module.exports = router;

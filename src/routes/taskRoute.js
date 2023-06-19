const express = require('express');
const router = express.Router();

// Require controllers
const taskController = require('../app/controllers/TaskController');

router.get('/', taskController.index);
router.post('/add', taskController.add);
router.post('/update/:id', taskController.update);
router.get('/delete/:id', taskController.delete);

module.exports = router;

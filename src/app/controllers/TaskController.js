const taskModel = require('../models/TaskModel');

class TaskController {
    // [GET] /task
    index(req, res, next) {
        res.status(200).json({
            message: 'oke',
            data: { task: 'Làm việc nhà' },
        });
    }
}

module.exports = new TaskController();

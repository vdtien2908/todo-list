const taskModel = require('../models/TaskModel');

class TaskController {
    // [GET] /task
    async index(req, res) {
        try {
            const tasks = await taskModel.getTasks();
            res.status(200).json({
                status: 'success',
                data: tasks,
            });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // [POST] /task/add
    async add(req, res) {
        try {
            const { title } = req.body;
            const taskId = await taskModel.createTask({ title: title });
            const task = await taskModel.getTaskById(taskId);
            res.json({ status: 'success', data: task });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // [POST] /task/update/:id
    async update(req, res) {
        try {
            const id = req.params.id;
            const { completed } = req.body;

            const isUpdate = await taskModel.updateTask(id, {
                completed: completed,
            });
            res.json({ status: 'success', data: isUpdate });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // [GET] /task/delete/:id
    async delete(req, res) {
        try {
            const id = req.params.id;
            await taskModel.deleteTask(id);
            res.json({ status: 'success' });
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

module.exports = new TaskController();

const baseModel = require('../../config/BaseModel');

class TaskModel extends baseModel {
    // Name table form mysql
    #TableName = 'tasks';

    // Function get all tasks
    async getTasks() {
        try {
            const tasks = await this.getAll(this.#TableName);
            return tasks;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // Function get task by id
    async getTaskById(id) {
        try {
            const task = await this.findById(this.#TableName, id);
            return task;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // Function create task
    async createTask(data) {
        try {
            const taskId = await this.create(this.#TableName, data);
            return taskId;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // Function update task
    async updateTask(id, data) {
        try {
            const isUpdate = await this.update(this.#TableName, id, data);
            return isUpdate;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    // Function delete task
    async deleteTask(id) {
        try {
            const isUpdate = await this.update(this.#TableName, id, {
                status: 0,
            });
            return isUpdate;
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

module.exports = new TaskModel();

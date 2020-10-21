const Task = require('./task.model');

class TaskDB {
  constructor(tasks = []) {
    this._db = tasks;

    this.create = this.create.bind(this);
    this.findByBoardId = this.findByBoardId.bind(this);
    this.findById = this.findById.bind(this);
    this.findByUserId = this.findByUserId.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.remove = this.remove.bind(this);
  }

  create(taskData) {
    const task = new Task(taskData);
    this._db = [...this._db, task];
    return task;
  }

  findByBoardId(id) {
    return this._db.filter(({ boardId }) => boardId === id);
  }

  findById(taskId) {
    return this._db.find(({ id }) => id === taskId);
  }

  findByUserId(id) {
    return this._db.filter(({ userId }) => userId === id);
  }

  updateOne(taskId, taskData) {
    this._db = this._db.map((task) => {
      if (task.id === taskId) {
        return new Task({ ...task, ...taskData });
      }
      return task;
    });
    return this._db.find(({ id }) => id === taskId);
  }

  remove(taskId) {
    const task = this._db.find(({ id }) => id === taskId);
    if (!task) return null;
    this._db = this._db.filter(({ id }) => id !== taskId);
    return task;
  }
}

const taskDb = new TaskDB();

module.exports = taskDb;

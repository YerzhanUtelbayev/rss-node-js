const HttpException = require('./HttpException');

class TaskNotFoundException extends HttpException {
  constructor(id) {
    super(404, `Task with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = TaskNotFoundException;

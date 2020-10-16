const HttpException = require('./HttpException');

class TaskNotFoundException extends HttpException {
  constructor(id) {
    super(404, `Board with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = TaskNotFoundException;

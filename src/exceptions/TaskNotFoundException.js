const EntityNotFoundException = require('./EntityNotFoundException');

class TaskNotFoundException extends EntityNotFoundException {
  constructor(id) {
    super(`Task with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = TaskNotFoundException;

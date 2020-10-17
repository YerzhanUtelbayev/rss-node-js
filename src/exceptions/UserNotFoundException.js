const EntityNotFoundException = require('./EntityNotFoundException');

class UserNotFoundException extends EntityNotFoundException {
  constructor(id) {
    super(`User with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = UserNotFoundException;

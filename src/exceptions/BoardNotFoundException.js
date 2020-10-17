const EntityNotFoundException = require('./EntityNotFoundException');

class BoardNotFoundException extends EntityNotFoundException {
  constructor(id) {
    super(`Board with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = BoardNotFoundException;

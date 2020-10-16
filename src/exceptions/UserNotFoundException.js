const HttpException = require('./HttpException');

class UserNotFoundException extends HttpException {
  constructor(id) {
    super(404, `User with id ${id} not found`);
    this.name = this.constructor.name;
  }
}

module.exports = UserNotFoundException;

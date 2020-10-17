const HttpException = require('./HttpException');
const { StatusCodes } = require('http-status-codes');

class EntityNotFoundException extends HttpException {
  constructor(message) {
    super(StatusCodes.NOT_FOUND, message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = EntityNotFoundException;

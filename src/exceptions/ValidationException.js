const HttpException = require('./HttpException');
const { StatusCodes } = require('http-status-codes');

class ValidationException extends HttpException {
  constructor(message) {
    super(StatusCodes.BAD_REQUEST, message);
    this.name = this.constructor.name;
  }
}

module.exports = ValidationException;

const HttpException = require('./HttpException');
const { StatusCodes } = require('http-status-codes');

class WrongAuthTokenException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect authentication token');
    this.name = this.constructor.name;
  }
}

module.exports = WrongAuthTokenException;

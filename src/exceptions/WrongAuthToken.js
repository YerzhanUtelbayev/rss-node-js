const { StatusCodes } = require('http-status-codes');

const HttpException = require('./HttpException');

class WrongAuthTokenException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect authentication token');
    this.name = this.constructor.name;
  }
}

module.exports = WrongAuthTokenException;

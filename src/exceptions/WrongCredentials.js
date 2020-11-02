const { StatusCodes } = require('http-status-codes');

const HttpException = require('./HttpException');

class WrongCredentialsException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Wrong credentials provided');
    this.name = this.constructor.name;
  }
}

module.exports = WrongCredentialsException;

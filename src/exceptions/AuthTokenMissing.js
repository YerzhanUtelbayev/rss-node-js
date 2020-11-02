const HttpException = require('./HttpException');
const { StatusCodes } = require('http-status-codes');

class AuthTokenMissingException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Authentication token is missing');
    this.name = this.constructor.name;
  }
}

module.exports = AuthTokenMissingException;

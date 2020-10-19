const HttpException = require('./HttpException');
const { StatusCodes } = require('http-status-codes');

class EntityNotSavedException extends HttpException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "Data hasn't been saved");
    this.name = this.constructor.name;
  }
}

module.exports = EntityNotSavedException;

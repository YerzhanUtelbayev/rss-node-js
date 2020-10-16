class HttpException extends Error {
  constructor(status, message) {
    super(status, message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
  }
}

module.exports = HttpException;

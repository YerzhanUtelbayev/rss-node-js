/* eslint-disable no-unused-vars */
const { errorLogger } = require('../common/logger.config');

function errorMiddleware(error, request, response, _next) {
  const { status = 500, message = 'Something went wrong' } = error;
  const {
    body: { password, ...rest },
    method,
    originalUrl,
    query
  } = request;

  errorLogger.error(`${method} ${originalUrl}`, {
    body: rest,
    query,
    error
  });
  response.status(status).send({ message, status });
}

module.exports = errorMiddleware;

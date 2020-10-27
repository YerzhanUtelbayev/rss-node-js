/* eslint-disable no-unused-vars */
const { errorLogger } = require('../common/logger.config');

function errorMiddleware(error, request, response, _next) {
  const { status = 500, message = 'Something went wrong', name } = error;
  const {
    body: { password, ...rest },
    method,
    originalUrl,
    query
  } = request;

  errorLogger.error(`${method} ${originalUrl}`, {
    body: rest,
    query,
    name,
    message
  });
  response.status(status).send({
    message: status === 500 ? 'Something went wrong' : message,
    status
  });
}

module.exports = errorMiddleware;

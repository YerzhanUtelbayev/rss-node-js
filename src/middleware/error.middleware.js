const { errorLogger } = require('../common/logger.config');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, request, response, next) {
  const { status = 500, message = 'Something went wrong' } = error;
  const {
    // eslint-disable-next-line no-unused-vars
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

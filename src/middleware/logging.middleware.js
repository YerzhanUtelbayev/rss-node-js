const { userLogger, commonLogger } = require('../common/logger.config');

function logUserRequests(request, response, next) {
  const {
    // eslint-disable-next-line no-unused-vars
    body: { password, ...rest },
    method,
    originalUrl,
    query
  } = request;
  userLogger.info(`${method} ${originalUrl}`, {
    body: rest,
    query
  });
  next();
}

function logCommonRequests(request, response, next) {
  const { method, originalUrl, body, query } = request;
  commonLogger.info(`${method} ${originalUrl}`, {
    body,
    query
  });
  next();
}

module.exports = {
  logUserRequests,
  logCommonRequests
};

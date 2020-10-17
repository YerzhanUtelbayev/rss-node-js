const ValidationException = require('../exceptions/ValidationException');

function validationMiddleware(schema, property) {
  return function middleware(request, response, next) {
    const { error } = schema.validate(request[property]);
    if (error) {
      const { details } = error;
      const messages = details.map(({ message }) => message).join(', ');
      return next(new ValidationException(messages));
    }
    return next();
  };
}

module.exports = validationMiddleware;

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, request, response, next) {
  const { status = 500, message = 'Something went wrong' } = error;
  response.status(status).send({ message, status });
}

module.exports = errorMiddleware;

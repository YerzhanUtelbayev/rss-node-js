const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loggerMiddleware = require('./middleware/logging.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const { errorLogger } = require('./common/logger.config');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', loggerMiddleware.logUserRequests, userRouter);
app.use('/boards', loggerMiddleware.logCommonRequests, boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorMiddleware);

process
  .on('unhandledRejection', (reason, promise) => {
    errorLogger.error('Unhandled Rejection at: ', {
      stack: reason.stack,
      promise
    });
  })
  .on('uncaughtException', (error) => {
    errorLogger.error('Uncaught Exception thrown', { stack: error.stack });
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

module.exports = app;

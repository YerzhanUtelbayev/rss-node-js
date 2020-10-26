const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

const loggerMiddleware = require('./middleware/logging.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const { errorLogger, commonLogger } = require('./common/logger.config');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_CONNECTION_STRING).catch((error) =>
  errorLogger.warn('Mongoose connection error:', {
    name: error.name,
    message: error.message
  })
);

const connected = mongoose.connection;
connected.on('error', (error) =>
  errorLogger.error('Mongoose connection error:', {
    name: error.name,
    message: error.message
  })
);
connected.once('open', () => {
  commonLogger.info('Mongoose connection established');
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
});

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

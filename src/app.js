const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loggerMiddleware = require('./middleware/logging.middleware');
const errorMiddleware = require('./middleware/error.middleware');
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

app.use(errorMiddleware);

app.use('/users', loggerMiddleware.logUserRequests, userRouter);
app.use('/boards', loggerMiddleware.logCommonRequests, boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

module.exports = app;

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const userLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const commonLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'board-service, task-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'error-middleware' },
  transports: [
    new transports.Console({ level: 'error' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

module.exports = { userLogger, commonLogger, errorLogger };

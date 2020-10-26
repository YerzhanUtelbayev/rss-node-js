const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, simple } = format;

const userLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({ level: 'info', format: simple() }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const commonLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'common' },
  transports: [
    new transports.Console({ level: 'info', format: simple() }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({ level: 'error', format: simple() }),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

module.exports = { userLogger, commonLogger, errorLogger };

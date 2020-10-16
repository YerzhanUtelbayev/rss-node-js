const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, simple } = format;

const userLogger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({ format: simple() }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const commonLogger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
  defaultMeta: { service: 'board-service, task-service' },
  transports: [
    new transports.Console({ format: simple() }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = { userLogger, commonLogger };

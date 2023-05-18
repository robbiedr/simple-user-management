const {createLogger, format, transports} = require('winston');

// Define the log format
const logFormat = format.printf(({level, message, timestamp}) => {
  return `${timestamp} [${level.toUpperCase()}] - ${message}`;
});

// Create a Winston logger instance
const logger = createLogger({
  format: format.combine(
      format.timestamp(),
      logFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;

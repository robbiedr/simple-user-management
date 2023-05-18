require('dotenv').config();

const express = require('express');
const app = express();
const {APP_PORT} = process.env;
const createError = require('http-errors');
const logger = require('./utils/logger');

// Import the users route
const usersRouter = require('./routes/Users');

app.use(express.json());

// Custom middleware function to log requests
const requestLoggerMiddleware = (req, res, next) => {
  // Log the request details with API parameters
  const {method, url, body, query} = req;
  const params = {...body, ...query};
  logger.info(`${method} ${url} - Parameters: ${JSON.stringify(params)}`);

  // Pass the request to the next middleware or route handler
  next();
};

// Use the request logger middleware for all requests
app.use(requestLoggerMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

// Mount the users route
app.use('/users', usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    // Handle known HTTP errors
    res.status(err.status).json({error: err.message});
  } else {
    // Handle other types of errors
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Start the server
app.listen(APP_PORT, () => {
  logger.info(`Server is running on port ${APP_PORT}`);
});

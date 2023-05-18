require('dotenv').config();

const express = require('express');
const app = express();
const {APP_PORT} = process.env;
const createError = require('http-errors');

// Import the users route
const usersRouter = require('./routes/Users');

app.use(express.json());

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
  console.log(`Server is running on port ${APP_PORT}`);
});

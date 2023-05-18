require('dotenv').config();

const express = require('express');
const app = express();
const {APP_PORT} = process.env;

// Import the users route
const usersRouter = require('./routes/Users');

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

// Mount the users route
app.use('/users', usersRouter);

// Start the server
app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});

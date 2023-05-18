const express = require('express');
const app = express();
const port = 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

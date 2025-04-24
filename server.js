// Node.js express server for time.atserver.us
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins
const allowedOrigins = [
  'https://windows-10-eol.pages.dev',
  'https://ripwindows10.com',
  'https://windows-10-eol.atserver.us'
];

// CORS middleware with origin restriction
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    
    return callback(null, true);
  }
}));

// Time endpoint
app.get('/', (req, res) => {
  // Get current timestamp in milliseconds
  const now = Date.now();
  
  // Return as plain text
  res.setHeader('Content-Type', 'text/plain');
  res.send(now.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Time server running on port ${port}`);
});

module.exports = app; // For testing purposes

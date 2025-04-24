// Simplified single-file server.js for faster deployment
const http = require('http');

// List of allowed origins
const allowedOrigins = [
  'https://windows-10-eol.pages.dev',
  'https://ripwindows10.com',
  'https://windows-10-eol.atserver.us'
];

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Handle CORS
  const origin = req.headers.origin;
  
  // Set CORS headers if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Only allow GET requests to the root path
  if (req.method === 'GET' && req.url === '/') {
    // Get current timestamp
    const now = Date.now();
    
    // Return as plain text
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(now.toString());
  } else {
    // Handle other requests
    res.writeHead(404);
    res.end('Not found');
  }
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Time server for Windows 10 EOL countdown
// This is a pure Cloudflare Worker script with no require statements
// List of allowed origins
const allowedOrigins = [
  'https://windows-10-eol.pages.dev',
  'https://ripwindows10.com',
  'https://windows-10-eol.atserver.us'
  'https://cf-test.atserver.us'
];

// API path to respond to
const API_PATH = '/api/v1';

// This is the entry point for Cloudflare Workers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Get the URL and path
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Check if the request is for our API path
  if (path !== API_PATH) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  // Handle CORS
  const origin = request.headers.get('Origin') || '';
  
  // Set CORS headers if origin is allowed
  const corsHeaders = {};
  if (allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
    corsHeaders['Access-Control-Allow-Methods'] = 'GET';
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders
    });
  }
  
  // If not an allowed origin and not a preflight request
  if (!allowedOrigins.includes(origin) && request.method !== 'OPTIONS') {
    return new Response('Access denied: Origin not allowed', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  // Get current timestamp in milliseconds
  const now = Date.now();
  
  // Return as plain text
  return new Response(now.toString(), {
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders
    }
  });
}

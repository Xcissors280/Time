// Cloudflare Worker script for time.atserver.us
// This runs on Cloudflare's edge network and restricts access to specific domains

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // List of allowed origins
  const allowedOrigins = [
    'https://windows-10-eol.pages.dev',
    'https://ripwindows10.com',
    'https://windows-10-eol.atserver.us'
  ];
  
  // Get the request origin
  const origin = request.headers.get('Origin') || '';
  
  // Check if the origin is allowed
  const isAllowed = allowedOrigins.includes(origin);
  
  // If not allowed and not a preflight check, return 403 Forbidden
  if (!isAllowed && request.method !== 'OPTIONS') {
    return new Response('Access denied: Origin not allowed', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
  
  // Set appropriate CORS headers based on origin
  const corsHeaders = {
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': '86400',
  };
  
  // Only add the origin if it's in the allowed list
  if (isAllowed) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  // Get the current timestamp in milliseconds (UTC)
  const now = Date.now();
  
  // Return the timestamp as a simple text response
  return new Response(now.toString(), {
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders
    }
  });
}

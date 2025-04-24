// Cloudflare Worker script (server.js)
// This runs on Cloudflare's edge network

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS for local development
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
    'Access-Control-Max-Age': '86400',
  }
  
  // Get the current timestamp in milliseconds (UTC)
  const now = Date.now()
  
  // Return the timestamp as a simple text response
  return new Response(now.toString(), {
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders
    }
  })
}

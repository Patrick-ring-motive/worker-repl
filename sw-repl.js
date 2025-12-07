    // This would normally be in sw-repl.js
    (() => {
      if (typeof Window === 'undefined') return;
      
      // Check if we need to create the SW file
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(document.currentScript?.src ?? new Error().stack.match(/(https?:\/\/[^)\s]+)/)[1].replace(/:\d+(:\d+)?$/, ''));
      }
    })();

    (() => {
  if (typeof Window !== 'undefined') return;
  
  self.addEventListener('install', event => self.skipWaiting());
  self.addEventListener('activate', event => self.clients.claim());
  
  let userCode = '';
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Handle code execution endpoint
    if (url.pathname === '/run-code') {
      event.respondWith(
        event.request.text().then(code => {
          try {
            userCode = code;
            eval(code);
            return new Response('Code executed successfully', { status: 200 });
          } catch (e) {
            console.error('SW Execution Error:', e);
            return new Response(e.message, { status: 500 });
          }
        })
      );
    }
  });
})();

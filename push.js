

(() => {
  if (typeof Window !== 'undefined') return;
  
  self.addEventListener('install', event => self.skipWaiting());
  self.addEventListener('activate', event => self.clients.claim());
  
  let userCode = '';
  
  self.addEventListener('fetch', event => {
      console.log(event);
  });
})();

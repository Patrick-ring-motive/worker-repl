const stringify = x =>{
  try{
    return JSON.stringify(x);
  }catch{
    return String(x);
  }
};

(() => {
  if (typeof Window !== 'undefined') return;
  
  self.addEventListener('install', event => self.skipWaiting());
  self.addEventListener('activate', event => self.clients.claim());
  
  
  self.addEventListener('fetch', event => {
      console.log(event);
  });

  self.addEventListener('push', (event) => {
  console.log('Push received:', event.data);
  
  const data = event.data ? event.data.json() : {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', {
      body: stringify(data) ,
      icon: '/icon.png'
    })
  );
});
})();

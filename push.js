const bc = new BroadcastChannel("web-push");

const stringify = x =>{
  try{
    return JSON.stringify(x).replace(/^["\s]*|["\s]*$/g,'');
  }catch{
    return String(x).replace(/^["\s]*|["\s]*$/g,'');
  }
};
const json = data =>{
  try{
    return data.json();
  }catch{
    return data?.text?.() ?? data;
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
    console.log(event.data);
    const data = json(event.data);
    console.log(data);
    bc.postMessage(stringify(data));
    event.waitUntil(
      self.registration.showNotification(data.title || 'Notification', {
        body: stringify(data) ,
        icon: '/icon.png'
      })
    );
});
})();

const C='sz-v11';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon.svg'])).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(r2=>{const cp=r2.clone();caches.open(C).then(c=>c.put(e.request,cp));return r2}).catch(()=>caches.match('./index.html'))));
  }
});

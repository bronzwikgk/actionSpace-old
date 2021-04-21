var cacheName = 'static';
// var cacheAssets = [
//     'index.html',
//     '/beauty/index.css',
//     'Integration/HttpService.js',
//     '/Integration/Authorization.js'
// ]
self.addEventListener("install",e=>{
    console.log("Install !");
});
self.addEventListener("fetch",e=>{
    console.log('Service Worker:Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res=>{
            const resClone = res.clone();//copy the response
            caches
            .open(cacheName)
            .then(cache=>{
                //Add response to cache
                cache.put(e.request,resClone);
            });
            return res;
        })
        .catch((err)=>caches.match(e.request).then(res=>res))
    );
});
self.addEventListener('activate',e=>{
    console.log("Service Worker : Activated");//Removing unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache != cacheName){
                        console.log('Service Worker:Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

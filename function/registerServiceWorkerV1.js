if("serviceWorker" in navigator){
    navigator.serviceWorker.register("function/sw_CachedSite.js")
    .then(reg =>{
       // console.log("Service Worker Registration :-"+reg);
    })
    .catch(err=>{
      //  console.log("Service Worker Registration Failed due to "+ err);
    })
}
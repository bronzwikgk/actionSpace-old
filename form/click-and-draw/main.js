window.onload = async function(){
   if (document.getElementById('drawlines')){
      await engine.processRequest('CAD', {elem:document.getElementsByClassName('fc')[0], proximityQ:20})
   } 
}
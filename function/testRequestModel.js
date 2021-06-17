var DefaultRequestModel = {
   loop:1,
   declare: {},
   arguments:[],
   condition:true,
   passStates:false
}

var createElem = {
   objectModel : 'document',
   method: 'createElement',
   arguments : 'div',
   response: 'elem',
   callback: {
      objectModel:'document.body',
      method:'appendChild',
      arguments:'$l.elem',
      callback: {
         declare:{
            'elem':{
               'innerHTML':'Helloworld'
            }
         }
      } 
   }
};

var extendCreateElem = {
   extends: 'createElem',
   callback:{
      callback:{
         declare:{
            'elem':{
               'innerHTML':'HOLA! WORKS PROPERLY.'
            }
         }
      }
   }
}

var getElem = {
   objectModel: 'document',
   method:'getElementById'
}
var log = {
   objectModel:'console',
   method:'log',
   arguments:'clicked the button'
};
var req = {
   extends:'getElem',
   arguments:'addDiv',
   response:'elem',
   callback: [
      {
         extends:'log',
         arguments:'$l.elem'
      },
      {
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments: ['$l.elem','click', '$log']
      }
   ]
};
window.onload= function(){
   engine.processRequest(req);
}

// ActionEngine.processRequest(extendCreateElem);
// console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));
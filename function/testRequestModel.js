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

var log = {
    objectModel:'console',
    method:'log',
    arguments:'click event occured'
 };

var evtClick = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'click', 'log']
}
var evtClickBubble = {
    objectModel:'document',
    method:'getElementById',
    arguments:'addDiv',
    response:'elem',
    callback:{
      objectModel: 'eventManager',
      method:'addRequestListener',
      arguments: ['$l.elem', 'click', 'log']
    }
}
window.onload=async function(){
   engine.processRequest('evtClick');
   engine.processRequest('evtClickBubble');
}

// ActionEngine.processRequest(extendCreateElem);
// console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));  
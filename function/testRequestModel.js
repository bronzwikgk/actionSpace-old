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

ActionEngine.processRequest(extendCreateElem);
console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));
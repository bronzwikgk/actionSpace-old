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
var callmeonstatechange = {
   condition: '$l.xhttp.readyState === 4 && l.xhttp.status === 200',
   objectModel: 'console',
   method: 'log',
   arguments: '$l.xhttp.responseText'
};
var objectCreate = {
   objectModel: 'XMLHttpRequest',
   construct: true,
   response: 'xhttp',
   callback: {
      objectModel: '$l.xhttp',
      method: 'open',
      arguments: ['GET', 'actionEntity.js', true],
      declare: {
         callmeonstatechange: { // callback request
             
         },
         xhttp: {
            onreadystatechange: "$ActionEngine.processRequest.bind(null, 'callmeonstatechange', {xhttp: l.xhttp})"
         }
      }
      ,
      callback: [
         {
            objectModel:'$l.xhttp', 
            method: 'send'
         },{
            objectModel: 'console',
            method: 'log', 
            arguments: '$l.xhttp'
         }
      ]
   }
}


// ActionEngine.processRequest(extendCreateElem);
ActionEngine.processRequest(objectCreate);
// console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));
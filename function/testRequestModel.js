var DefaultRequestModel = {
   loop:1,
   declare: {},
   arguments:[],
   condition:true,
   passStates:false
}

var editor = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'addDiv',
    response: 'editor'
}
var req = {
    extends: 'editor',
    callback: {
        declare: {
            'content': '$l.editor.innerHTML'
        },
        // callback:{
          objectModel: 'console',
          method: 'log',
          arguments: '$l.content'
        // }
    }
}
var log = {
    objectModel:'console',
    method:'log',
    arguments:'click event occured'
 };

var evtClick = {
    objectModel: 'eventManager',
    method: 'addListener',
    arguments: ['$window', 'click', function(event){

      ActionEngine.processRequest(log);
    }]
}

window.onload=async function(){
  engine.processRequest('req');
}

// ActionEngine.processRequest(extendCreateElem);
// console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));  
var DefaultRequestModel = {
   loop:1,
   declare: {},
   arguments:[],
   condition:true,
   passStates:true
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
        objectModel: 'console',
        method: 'log',
        arguments: '$l.content'
    }
}
var loginRequest = [
    {
        response:'GetUsername',
        objectModel:'document',
        method: "getElementById",
        arguments: ["username"],
        return:'$l.GetUsername.value',
    },
    {
        response :'GetPassword',
        objectModel:'document',
        method: "getElementById",
        arguments: ["password"],
        return:'$l.GetPassword.value', 
    },
    {
        declare:{
            paramsJSON:{
              'Username':'$l.GetUsername.value'
            }
        }
    }
]

var naturalNumber = {
  declare:{
    x:0, 
    n:5
  },
  callback: {
    loop:'$l.n',
    declare:{
      x:'$l.x+1'
    },
    objectModel:'console', 
    method:'log',
    arguments:'$l.x'
  }
}
window.onload=async function(){
  console.log(await engine.processRequest('naturalNumber'));
}

// ActionEngine.processRequest(extendCreateElem);
// console.log(JSON.stringify(Entity.complexRequestExpander(extendCreateElem)));  
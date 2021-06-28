window.ActionEngine = class {
   
   static maxDebugDepth = 100;
   static async processRequest(flowRequest, l = {}){

      if(! operate.isArray(flowRequest)){
      	flowRequest = [flowRequest];
      }
      var answer = [];
      await Entity.walk(
      	{rngstart:0, rngend: flowRequest.length},
      	{
	      	value : {
	      		func: async function(i, flowRequest, l, answer, ignore) {
                  
                  if(ignore.ignore) return "SIGNAL_IGNORE_REQUEST";

                  var copy = flowRequest[i];

                  if(operate.isString(flowRequest[i])){

                     flowRequest[i] = Entity.get(flowRequest[i], window);
                  }
			         if(operate.isArray(flowRequest[i])){
			         
                     answer.push((await ActionEngine.processRequest(flowRequest[i], l)) || []);
			         
                  } else if(operate.isObject(flowRequest[i])){
			            
                     var result = await ActionEngine.action(Entity.requestExpander(flowRequest[i]), l)
                     
                     if(result[1] === 'SIGNAL_EXIT_FLOW_REQUEST')
                        ignore.ignore = true;

                     answer.push(result[0]);
                  }
                  else {
                        console.error("Request should be an object/array. What's this? ",copy, "evaluates to", flowRequest[i]);
                        throw Error("Terminate Called");
                  } 
                  return false;
			      }, 
			      args: [flowRequest, l, answer, {ignore:false}],
               wait:true
	      	}
	      }
      );
      // console.log("Returning", answer, "for", flowRequest);
      return (answer.length > 1 ? answer : answer[0]);
   }
   /* 
      Request is evaluated Like->
      
         extends{
            delete                     // default:{}
         }


         Loop {                        // default:1
            condition {                //default:true
               declare
               if(method exists){
                  arguments            //default:[]
                  objectModel
                  method
                  response
                  
               }
               callback
            }
         }
         passStates
         return

   */
   //COPYL TO BE REMOVED
   static async action(requestF, l, copyl = false){

   	if(operate.isString(requestF)){
   		requestF = Entity.get(requestF, window);
   	}
      requestF = JSON.parse(JSON.stringify(requestF));

      var lastl;
       
     	lastl = {...l};

      if(! requestF.hasOwnProperty('loop')) requestF.loop = 1;

      requestF.loop = Entity.getValue(requestF.loop, l);

      if((! operate.isInt(requestF['loop'])) || requestF.loop < 0) {
         console.error("Request.loop should be a whole number. What's this?", requestF.loop);
         throw Error("Terminate Called");
      }
      

      await Entity.walk(
      	{rngstart:0, rngend: requestF.loop},
      	{
      		value: {
	      		func: async function(i, requestF, l){
                  var request = JSON.parse(JSON.stringify(requestF));

		            if(request.hasOwnProperty('condition')) request.condition = Entity.getValue(request.condition, l);

		            if(! request.hasOwnProperty('condition')) request.condition = true;
		         
		            if(! request['condition']) { // we should not execute this
		               requestF.__exitRequest = true;
                     return false;
		            }

		            if(! request.hasOwnProperty('declare')) request.declare = {};

		            var x = l;
		            await Entity.setProps(request.declare, l, x);
                  // console.log(l);
		            if(request.hasOwnProperty('method')){

		               if(! request.hasOwnProperty('arguments'))request.arguments = [];

		               if(! operate.isArray(request.arguments)){
		                  request.arguments = [request.arguments];
		               }
		               await Entity.walk(
   				      	{rngstart:0, rngend: request.arguments.length},
   				      	{
   				      		value: {
   					      		func: async function(i, request, l){
   					      			request.arguments[i] = Entity.getValue(request.arguments[i], l);
   					      		},
   					      		args: [request, l],
                              wait:true
   					      	}
   					      }
                     );
                     
		               if(! request.hasOwnProperty('objectModel')){
		               
		                  console.error("Request.objectModel is not present, while Request.method is.");
		                  throw Error("Terminate Called");
		               }

		               var objectModel = Entity.getValue(request.objectModel, l, null) || Entity.get(request.objectModel, window);
		               
                     if(!objectModel){
		                  console.error(objectModel, " is not a valid objectModel");
		                  throw Error("Terminate Called");
		               }
		               var method = objectModel[request.method];
		               if(!operate.isFunction(method))
                        console.error("UNDEFINED METHOD CALL", objectModel, method, request.objectModel, request.method);

                     var response = await method.apply(objectModel, request.arguments);

		               if(request.hasOwnProperty('response')){
		                  if(! operate.isString('response')){
		                     console.error("Request.response should be a string. What's this? ", request['response']);
		                     throw Error("Terminate Called");
		                  }
		                  l[request['response']] = response;
		               }
		            }

		            if(request.hasOwnProperty('callback')){
		               await ActionEngine.processRequest(request['callback'], l);
		            }
		         },
		         args: [requestF, l],
               wait:true
		      }
		   }
		);

      var returnVal, signal = 'SIGNAL_CONTINUE_FLOW_REQUEST';

      if((!requestF.__exitRequest)){
         
         if(requestF.hasOwnProperty('return'))
            returnVal = Entity.getValue(requestF.return, l);

         if(requestF.hasOwnProperty('exit') && requestF.exit)
            signal  = "SIGNAL_EXIT_FLOW_REQUEST";
      }
      // console.log(returnVal);
      if(requestF.hasOwnProperty('passStates') && !requestF.passStates) 
      {
      	var x = {
      		func: function(lastl, key, l){
      			lastl[key] = l[key];
      			return false;
      		},
      		args: [l]
      	};
      	Entity.walk(
      		lastl, 
      		{ object:x, array:x, value:x }
      	);

         l = lastl;
      }
      // console.log(requestF, l, returnVal, requestF.__exitRequest);
      return [returnVal, signal];
   }
}

var engine = {
   maxDebugDepth: ActionEngine.maxDebugDepth,
   processRequest: ActionEngine.processRequest,
   action: ActionEngine.action
};

class ActionEngine{
   
   static maxDebugDepth = 10;
   static processRequest(flowRequest, l = {}){

      if(! operate.isArray(flowRequest)){
      	flowRequest = [flowRequest];
      }
      Entity.walk(
      	{rngstart:0, rngend: flowRequest.length},
      	{
	      	value : {
	      		func: function(i, flowRequest) {
			         if(operate.isArray(flowRequest[i])){
			            ActionEngine.processRequest(flowRequest[i], l);
			            return false;
			         }
			         ActionEngine.action(Entity.requestExpander(flowRequest[i]), l);
			      },
			      args: [flowRequest]
	      	}
	      }
      );

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
   static async action(request, l = {}){

   	if(operate.isString(request)){
   		request = Entity.get(request, window);
   	}

      request = Entity.copy(request); // don't change itself
      var lastl;

     	lastl = Entity.copy(l);

      if(! request.hasOwnProperty('loop')) request.loop = 1;

      if((! operate.isInt(request['loop'])) || request.loop < 0) {
         console.error("Request.loop should be a whole number. What's this?", request.loop);
         throw Error("Terminate Called");
      }
      
      request.loop = Entity.getValue(request.loop, l);

      Entity.walk(
      	{rngstart:0, rngend: request.loop},
      	{
      		value: {
	      		func: async function(i, request){

		            if(request.hasOwnProperty('condition')) request.condition = Entity.getValue(request.condition, l);

		            if(! request.hasOwnProperty('condition')) request.condition = true;
		         
		            if(! eval(request['condition'])){ // we should not execute this
		               return false;
		            }

		            if(! request.hasOwnProperty('declare')) request.declare = {};

		            var x = l;

		            l = Entity.updateProps(request.declare, l, x);

		            if(request.hasOwnProperty('method')){
		               if(! request.hasOwnProperty('arguments'))request.arguments = [];

		               if(! operate.isArray(request.arguments)){
		                  request.arguments = [request.arguments];
		               }
		               Entity.walk(
				      	{rngstart:0, rngend: request.arguments.length},
				      	{
				      		value: {
					      		func: function(i, request){
					      			request.arguments[i] = Entity.getValue(request.arguments[i], l);
					      		},
					      		args: [request]
					      	}
					      });

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
		               ActionEngine.processRequest(request['callback'], l);
		            }
		         },
		         args: [request]
		      }
		   }
		);
      if(!(request.hasOwnProperty('passStates') && request.passStates)) 
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
      if(request.hasOwnProperty('return')){
         return Entity.getValue(request.return);
      }
   }
}

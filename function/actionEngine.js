//Generic observation.
// All the methods' like get, expand, to be moved to actionEntity Class. 
// ALl the test Request Models in form folder, testRequestModel.js file
//All the sample request models in form folder, sampleRequestModel.js file
//All the for loop to be removed from every methods, a generictor iterator as a callback back to be used.
class ActionEngine{
	
	constructor(maxDebugDepth=10) { 
		this.maxDebugDepth = maxDebugDepth;
	}	
	processRequest(flowRequest, l = {}){

		if(operate.isObject(flowRequest)){
			flowRequest = [flowRequest];
		} else if(! operate.isArray(flowRequest)){

			console.error("Request should be an array or object. What's this? ", flowRequest);
			throw Error("Terminate Called");
		}
		for (var i = 0; i < flowRequest.length; i++) {
			if(operate.isArray(flowRequest[i])){
				processRequest(flowRequest[i], l);
				continue;
			}
			this.action(Entity.requestExpander(flowRequest[i]), l);
		}

	}
	/* 
		Request is evaluated Like->
		
		 	extends{
				delete 							// default:{}
		 	}


		 	Loop { 								// default:1
				condition { 					//default:true
					declare
					if(method exists){
						arguments 				//default:[]
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
	async action(request, l = {}){
		// console.log("Request.objectModel: ", request.objectModel);
		request = Entity.copy(request); // don't change itself

		var lastl = Entity.copy(l); // store last states
		
		if(! request.hasOwnProperty('loop')) request.loop = 1;

		if((! operate.isInt(request['loop'])) || request.loop < 0) {
			console.error("Request.loop should be a whole number. What's this?", request.loop);
			throw Error("Terminate Called");
		}
		
		request.loop = Entity.getValue(request.loop, l);

		for (var i = 0; i < request.loop; i++) {
			if(request.hasOwnProperty('condition')) request.condition = Entity.getValue(request.condition, l);

			if(! request.hasOwnProperty('condition')) request.condition = true;
		
			if(! eval(request['condition'])){ // we should not execute this
				break; 
			}
		
			if(! request.hasOwnProperty('declare')) request.declare = {};

			// console.log(request.declare);
			l = Entity.updateProps(request.declare, l);
			// console.log(l);
			if(request.hasOwnProperty('method')){
				if(! request.hasOwnProperty('arguments'))request.arguments = [];

				if(operate.isString(request.arguments)){
					request.arguments = [request.arguments];
				} else if(! operate.isArray(request.arguments)){
					console.error("Request.loop should be a string or an array. What's this?", request.arguments);
					throw Error("Terminate Called");
				}
				
				for (var i = 0; i < request.arguments.length; i++) {
					if(! operate.isString(request.arguments[i])){
						
						console.error("Request.arguments should contain only string. What's this?", request.arguments[i]);
						throw Error("Terminate Called");

					}
					request.arguments[i] = Entity.getValue(request.arguments[i], l);
				}

				if(! request.hasOwnProperty('objectModel')){
				
					console.error("Request.objectModel is not present, while Request.method is.");
					throw Error("Terminate Called");
				}

				var objectModel = Entity.get(request.objectModel, window);
				if(!objectModel){
					console.error(objectModel, " is not a valid objectModel");
					throw Error("Terminate Called");
				}
				// console.log(objectModel);
				var method = objectModel[request.method];
				// console.log(method, objectModel);
				// console.log(request.method);
				var response = await method.apply(objectModel, request.arguments);

				if(request.hasOwnProperty('response')){
					if(! operate.isString('response')){
						console.error("Request.response should be a string. What's this? ", request['response']);
						throw Error("Terminate Called");
					}

					l[request['response']] = response;
					// console.log('done', request['response'], response, l[request['response']]);
				}
			}
			// console.log(l);
			if(request.hasOwnProperty('callback')){
				this.processRequest(request['callback'], l);
			}
		}
		if(request.hasOwnProperty('passState') && !request.passState){
			for(var key in lastl){
				lastl[key] = l[key]; // updated variables
			}
			l = lastl; // return to the state
		}
		if(request.hasOwnProperty('return')){
			return Entity.getValue(request.return);
		}
	}
}

var engine = new ActionEngine();

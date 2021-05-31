class ActionEngine{
	
	constructor() {}

	removeDuplicates(arr){
		var x = [];
		for (var i = 0; i < arr.length; i++) {
			x.push(arr[i]);
		}
		return x;
	}
	
	cloneJSON(obj){
		return JSON.parse(JSON.stringify(obj));
	}
	get(key,parent) {
		if (parent[key]) {
			var response = parent[key];
			return response;
		}else{
			return key;
		}
    }
	requestExpander(request){
		if(! operate.isObject(request)){
			console.error(request, " is not a valid Object");
			throw Error("Terminate Called");
		} 

		//single request

		var rclone = this.cloneJSON(request);
		var parent = null;
		
		if(request.hasOwnProperty('extends')){
			
			var parent = this.requestExpander(request['extends']); // parent is a JSON request
			
			request = this.cloneJSON(parent);
			delete request['extends'];
			// console.log(request);
		}
		for (var key in rclone) {
			if(key != 'extends') 
				request[key] = rclone[key];	
		}
		return request;
		
	}
	complexRequestExpander(flowRequest, response = []){
		if(operate.isObject(flowRequest)){
			flowRequest = [flowRequest];
		} else if(! operate.isArray(flowRequest)){

			console.error("Request should be an array or object. What's this? ", flowRequest);
			throw Error("Terminate Called");
		}
		for (var i = 0; i < flowRequest.length; i++) {
			if(operate.isArray(flowRequest[i])){
				response.push([]);
				this.complexRequestExpander(flowRequest[i], response[response.length-1]);
				continue;
			}
			response.push(this.requestExpander(flowRequest[i]));
			if(flowRequest[i].hasOwnProperty('callback')){
				if(operate.isArray(flowRequest[i].callback)){
					response[i].callback = [];
					this.complexRequestExpander(flowRequest[i].callback, response[i].callback);
					continue;
				} else if(! operate.isObject(flowRequest[i].callback)){
					console.error("Request.callback should be an array or object. What's this", flowRequest[i].callback);
					throw Error("Terminate Called");
				}
				response[i].callback = this.requestExpander(flowRequest[i].callback);
			}
		}
		
		return response;
	}
	processRequest(flowRequest, l = []){
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
			this.action(this.requestExpander(flowRequest[i]), l);
		}

	}
	/* 
		Request is evaluated Like->
		
		 	extends


		 	Loop { // default:1
				condition { //default:true
					declare
					if(request.method exists){
						arguments //default:[]
						objectModel
						method
						resultObj{
							setValueOnExecution
						}
						
					}
					callback
				}
			}

	*/
	async action(request, l = {}){

		var lastl = this.cloneJSON(l); // store last states
		
		if(! request.hasOwnProperty('loop')) request.loop = 1;

		if((! operate.isInt(request['loop'])) || request.loop < 0) {
			console.error("Request.loop should be a whole number. What's this?", request.loop);
			throw Error("Terminate Called");
		}
		
		for (var i = 0; i < request.loop; i++) {
			if(! request.hasOwnProperty('condition')) request.condition = 'true';
		
			if(! eval(request['condition'])){ // we should not execute this
				return; 
			}
		
			if(! request.hasOwnProperty('declare')) request.declare = {};

			for(var key in request.declare){
				l.key = request.declare.key;
			}
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
					if(request.arguments[i].charAt(0) == '$'){
						console.log(request.arguments[i]);
						console.log(request.arguments[i].substr(1));
						request.arguments[i] = eval(request.arguments[i].substr(1));
						console.log(request.arguments[i]);
					}
				}

				if(! request.hasOwnProperty('objectModel')){
				
					console.error("Request.objectModel is not present, while Request.method is.");
					throw Error("Terminate Called");
				}

				var objectModel = this.get(request.objectModel, window);//this.get(request.objectModel, window) || this.get(request.objectModel, document);
				if(!objectModel){
					console.error(objectModel, " is not a valid objectModel");
					throw Error("Terminate Called");
				}

				var method = objectModel[request.method];
				// console.log(method, objectModel);
				// console.log(request.method);
				var response = await method.apply(objectModel, request.arguments);

				if(request.hasOwnProperty('resultObj')){
					if(! operate.isString('resultObj')){
						console.error("Request.resultObj should be a string. What's this? ", request['resultObj']);
						throw Error("Terminate Called");
					}

					l[request['resultObj']] = response;
					// console.log('done', request['resultObj'], response, l[request['resultObj']]);
					if(request.hasOwnProperty('setValueOnExecution')){
						if(! operate.isObject(request['setValueOnExecution'])){
							console.error("Request.setValueOnExecution should be an Object. What's this? ", request['setValueOnExecution']);
							throw Error("Terminate Called");
						}

						// console.log(request['setValueOnExecution']);

						var svoekeys = Object.keys(request['setValueOnExecution']);

						for (var i = 0; i < svoekeys.length; i++) {
							// console.log(svoekeys[i]);
							response[svoekeys[i]] = request['setValueOnExecution'][svoekeys[i]];
						}
					}
				}
			}
			// console.log(l);
			if(request.hasOwnProperty('callback')){
				this.processRequest(request['callback'], l);
			}
		}
		for(var key in lastl){
			lastl.key = l.key; // updated variables
		}
		l = lastl; // return to the state
	}
}

var engine = new ActionEngine();

function logToConsole(arg){
	console.log(arg);
}

var HTMLElement = { //singleFlowRequest
	objectModel: 'document',
	method: 'getElementById'
}
var PrintToConsole = {
	extends: HTMLElement
}
var InputField = {
	extends: HTMLElement, 
	arguments: 'password',
	resultObj: 'myField',
	callback: {
		objectModel:'console',
		method: 'log',
		arguments: '$l.myField'
	}
}
engine.processRequest(InputField);
console.log(engine.complexRequestExpander(InputField));



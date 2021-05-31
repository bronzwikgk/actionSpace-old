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
		console.log(request);
		if(request.hasOwnProperty('extends')){
			
			var parent = this.requestExpander(window[request['extends']]); // parent is a JSON request
			
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
	complexRequestExpander(requestArr, depth = 0){
		if(depth > 10){
			console.error('Cannot Expand Recursion Requests.');
			throw Error("Terminate Called");
		}

		if(operate.isObject(requestArr)){
			requestArr = [requestArr];
		} else if(! operate.isArray(requestArr)){
			console.error(requestArr, " is not a valid Object or Array");
			throw Error("Terminate Called");

		}
		var resultArr = [];
		for (var i = 0; i < requestArr.length; i++) {
			var request = requestArr[i];
			
			//single request

			var rclone = this.cloneJSON(request);
			var parent = null;

			if(request.hasOwnProperty('extends')){
				
				var parent = this.complexRequestExpander(window[request['extends']], depth + 1); // parent is a JSON request
				
				request = this.cloneJSON(parent);
				delete request['extends'];
				// console.log(request);
			}

			for (var key in rclone) {
				if(key != 'extends') 
					request[key] = rclone[key];	
			}
			if(request.hasOwnProperty('callback')){
				request.callback = this.complexRequestExpander(request.callback, depth + 1);
			}
			resultArr.push(request);
		}
		if(resultArr.length == 1){
			return resultArr[0];
		} 
		return resultArr;
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
	getValue(str, l){
		if(operate.isString(str) && str.charAt(0) == '$')
			return eval(str.substr(1));
		return str;
	}
	async action(request, l = {}){
		// console.log(l);
		var lastl = this.cloneJSON(l); // store last states
		
		if(! request.hasOwnProperty('loop')) request.loop = 1;

		if((! operate.isInt(request['loop'])) || request.loop < 0) {
			console.error("Request.loop should be a whole number. What's this?", request.loop);
			throw Error("Terminate Called");
		}
		
		request.loop = this.getValue(request.loop, l);

		for (var i = 0; i < request.loop; i++) {
			if(request.hasOwnProperty('condition')) request.condition = this.getValue(request.condition, l);

			if(! request.hasOwnProperty('condition')) request.condition = true;
		
			if(! eval(request['condition'])){ // we should not execute this
				return; 
			}
		
			if(! request.hasOwnProperty('declare')) request.declare = {};

			for(var key in request.declare){

				l[key] = this.getValue(request.declare[key], l);
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
					request.arguments[i] = this.getValue(request.arguments[i], l);
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

				if(request.hasOwnProperty('response')){
					if(! operate.isString('response')){
						console.error("Request.response should be a string. What's this? ", request['response']);
						throw Error("Terminate Called");
					}

					l[request['response']] = response;
					// console.log('done', request['response'], response, l[request['response']]);
					if(request.hasOwnProperty('setValueOnExecution')){
						if(! operate.isObject(request['setValueOnExecution'])){
							console.error("Request.setValueOnExecution should be an Object. What's this? ", request['setValueOnExecution']);
							throw Error("Terminate Called");
						}

						// console.log(request['setValueOnExecution']);

						var svoekeys = Object.keys(request['setValueOnExecution']);

						for (var i = 0; i < svoekeys.length; i++) {
							// console.log(svoekeys[i]);
							response[svoekeys[i]] = this.getValue(request['setValueOnExecution'][svoekeys[i]], l);
						}
					}
				}
			}
			// console.log(l);
			if(request.hasOwnProperty('callback')){
				this.processRequest(request['callback'], l);
			}
		}
		if(request.hasOwnProperty('passState') && request.passState){
			// console.log('here');
			return; // just pass the states
		}
		// console.log('here');
		for(var key in lastl){
			lastl[key] = l[key]; // updated variables
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
var InputField = {
	extends: 'HTMLElement', 
	arguments: 'password',
	response: 'myField',
	setValueOnExecution:{value:'PasswordChanged'},
	callback: [{
		objectModel:'console',
		method: 'log',
		arguments: '$l.myField.value'

	}, {
		objectModel:'console',
		method: 'log',
		arguments: '$l.myField'
	}]
}
// function factorial(n){
// 	if(n < 0) return 1;
// 	return n*factorial(n-1);
// }
var factorialBaseCase = {
	declare:{
		ans:1
	}
}
var factorialRecurse = {
	condition: '$(l.n > 0) ',
	declare:{
		ans : '$ l.ans * l.n',
		n : '$l.n - 1'
	},
	callback:{
		extends:'factorialRecurse'
	}
}
var factorialOutput = {
	objectModel:'console',
	method:'log',
	arguments:'$l.ans'
}
var factorial5 = [

	{
		extends:'factorialBaseCase',
		declare:{
			n:5,
			ans:1
		},
		callback: [{
			extends: 'factorialRecurse',
			passState:true
		}, {
			extends: 'factorialOutput'
		}]
	}
];

engine.processRequest(factorial5);
console.log(engine.complexRequestExpander(factorial5));



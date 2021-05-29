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
			if(key != 'extends') // it is self-dependent now
				request[key] = rclone[key];	
		}
		return request;
		//now, this is the smallest thing, nice
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
	processRequest(flowRequest){
		if(operate.isObject(flowRequest)){
			flowRequest = [flowRequest];
		}
		for (var i = 0; i < flowRequest.length; i++) {
			if(operate.isArray(flowRequest[i])){
				processRequest(flowRequest[i]);
				continue;
			}
			this.action(this.requestExpander(flowRequest[i]));
		}

	}
	async action(request){
		// console.log(request);
		if(! operate.isActionRequest(request)){
			console.error(request, " is not a valid ActionRequest");
			throw Error("Terminate Called");
		}
		if(request.hasOwnProperty('condition')){
			if(! eval(request['condition'])){ // we should not execute this
				return; 
			}
		}

		if(!request.arguments){
			request.arguments = [];
		}
		if(operate.isString(request.arguments)){
			request.arguments = [request.arguments];
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
			window[request['resultObj']] = response;
		}

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

		if(request.hasOwnProperty('callback')){
			this.processRequest(request['callback']);
		}
	}
}

var engine = new ActionEngine();


var HTMLElement = { //singleFlowRequest
	objectModel: 'document',
	method: 'getElementById'
}

var getValue = {
	extends: HTMLElement
}
var setValue = {
	extends: HTMLElement,

	setValueOnExecution : {
		value : "defaultValue"
	}

}
var PasswordCheck = [
	{
		extends:getValue,
		arguments:'password',
		resultObj: 'globalInputField',
		callback: {
			condition : '(globalInputField.value.length < 8)',
			extends:setValue,
			setValueOnExecution:{
				value:''
			},
			arguments: 'password'
		}
	},
	{
		extends:getValue,
		arguments:'password',
		resultObj: 'globalInputField',
		callback: {
			condition : '(globalInputField.value.length < 8)',
			extends:setValue,
			setValueOnExecution:{
				value:''
			},
			arguments: 'password'
		}
	},
	{
		extends:getValue,
		arguments:'password',
		resultObj: 'globalInputField',
		callback: {
			condition : '(globalInputField.value.length < 8)',
			extends:setValue,
			setValueOnExecution:{
				value:''
			},
			arguments: 'password'
		}
	},
	{
		extends:getValue,
		arguments:'password',
		resultObj: 'globalInputField',
		callback: {
			condition : '(globalInputField.value.length < 8)',
			extends:setValue,
			setValueOnExecution:{
				value:''
			},
			arguments: 'password'
		}
	}
]

engine.processRequest(PasswordCheck);
console.log(engine.complexRequestExpander(PasswordCheck));
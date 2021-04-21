class ActionEngine {
  constructor() {
    this._flowResultState = {};
    this._currentReq=[]; // need to be set in database A quick generator Pattenr .
    this._response ;
  }
  get(key,parent) {
    // console.log("for Initaition", key, objectModel, objectModel[key])
     if (parent[key]) {
        // console.log("for Initaition", key, objectModel, objectModel[key])
         var response = parent[key];
        // console.log("Initaites found",response)
         return response;
     }


 }

  action(req, result) {
    //  console.log("execute req", req)
    //testing if the req is an object
    if (operate.isObject(req) != true) {
      return console.error("Need a JSON, Please refer to the documentation", "Does this >", req, "look like JSON to you. It's damn", operate.is(req));
    }
    //  console.log("objectModel", req.objectModel, window['ActionView']);
    var objectModel = Entity.get(req.objectModel, window);//Getting the object Model from window Object
    // console.log("objectModel", objectModel);
    if (result) {//Used for either callback cases, where 
      var argument = result;
    } else {
      var argument = req.argument;
    }
    //Build Arguments
    for (var i = 0; i < argument.length; i++) {
      //  console.log(argument[i]);
      argument[i] = Entity.get(argument[i], window);
      //  console.log(argument[i]);

    }

    if (req['andThen']) {
      var andThenLength = req['andThen'].length;
      if (andThenLength > 0) {
        console.log(andThenLength);
        switch (andThenLength) {
          case 1:
            var response = objectModel[req.method](argument)[req['andThen']?.[0]];
            console.log("response ", response);
            //  console.log("click", event.type, event.target)
            break;
          case 2:
            var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1]];
            console.log("response ", response);
            //  console.log("click", event.type, event.target)
            break;
          case 3:
            var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1], req['andThen']?.[2]];
            console.log("response ", response);
            //  console.log("click", event.type, event.target)
            break;
          case 4:
            var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1], req['andThen']?.[2], req['andThen']?.[3]];
            console.log("response ", response);
            //  console.log("click", event.type, event.target)
            break;
          default:
          // console.log("I don't know such values",event.type);
        }
      }
    } else {
      console.log(objectModel, req.method, argument)
      var response = objectModel[req.method](argument);
      //     console.log("response ", response);
    }
    req[response] = response;
    if (req['callBack']) {
      //     console.log("callback found")
      var callBack = window[req['callBack']];
      var response = this.action(callBack, req[response]);
    }
    //  console.log(response)
    return response;
  }
  
  /**
   * This method is used for parallel requests
   * @param {FlowRequest} reqObj - request object containing array of objects
   */
  processReqArray(reqObj) {
    const state = this._flowResultState;
    if (Operate.isFlowRequest(reqObj) && Operate.isArray(reqObj.flowRequest)) {
      var flowRequest = reqObj.flowRequest;
      for (var i = 0; i < flowRequest.length; i++) {
        var request = flowRequest[i];
        var args = request.arguments;
        var requestArgs = [];
        for (var p = 0; p < args.length; p++) {
          var reqArg = args[p];
          if (state[reqArg]) { requestArgs[p] = state[reqArg]; }
          else { requestArgs[p] = reqArg; }
        }
        var updatedRequest = { ...request, arguments: requestArgs };
        const result = this.processReq(updatedRequest);
        if (result) {
          state[request.reqName] = result;
        }
      }
    }
    return null;
  }
  /**
   * This method is used for nested requests
   * @param {RequestObj} reqObj - request object containing nested requests
   */
  processReqNestedObject(reqObj) {
    /**
     * This method is used for recursion and ensuring the requests are performed sequentially
     * @param {RequestObj} request - Current request object
     */
    function recursiveThen(request) {
      var reqArg = request.arguments;
      var requestArgs = [];
      for (var j = 0; j < reqArg.length; j++) {
        if (this._flowResultState[reqArg[j]]) {
          requestArgs[j] = this._flowResultState[reqArg[j]];
        } else {
          requestArgs[j] = reqArg[j];
        }
      }

      var updatedRequest = { ...request, arguments: requestArgs };
      var tempRequest = {};
      for (var [key, value] of Object.entries(updatedRequest)) {
        if (key !== "andThen") {
          tempRequest[key] = value
        }
      }
      var result = this.processReq(tempRequest);
      if (result) {
        this._flowResultState[request.reqName] = result;
      }

      if (request.andThen) {
        var nestedReq = request.andThen;
        if (!nestedReq.objectModel) {
          nestedReq.objectModel = result;
        }
        recursiveThen.call(this, nestedReq);
      }
    }
    recursiveThen.call(this, reqObj);
  }
    
  static promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
  validateAllTrue(value, rules) {
    var self = this;
    return rules.every(function (rule) {
        return self[rule](value);
    });
};
  validateSomeTrue(value, rules) {
    var self = this;
    return rules.some(function (rule) {
        return self[rule](value);
    });
};

  validate (value, key,params) {
    if (this.validateAllTrue(value, key.validator)) {
        if (params['onTrue'] === 'true') {
            //doThis
            return true;
        } 
       // key.value = value;
        
    }
    else if (params['onFalse'] === 'false'){
        //do This
        return false;
    }
    
};

}

var engine = new ActionEngine();
//var DOMJson = engine.processReq(singleReq);
console.log("engine is chalu",)

//engine.processReq(actionFlowModelReq)

//engine.processReq(setInnerHTML)

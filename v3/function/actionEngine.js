/** 
*Main Class/ Modal Class/ Processor
*takes requests from actionView and actionEvent
*only class to co-ordinate b/w all other classes for processing input and rendering output
*
*/
class ActionEngine {
    constructor() {
      this._flowResultState = {};
      this._currentReq=[]; // need to be set in database A quick generator Pattenr .
      this._response ;
      //console.log(Entity.create(main, 'html'))
      ActionView.renderDOM(ActionView.getDOM(document, 'getElementById', 'root'), Entity.create(main, 'html'), 'append')
    }

    action(req, result) {
      //testing if the req is an object
      if (!Operate.validate(req, 'isObject')) {
        return console.error("Need a JSON, Please refer to the documentation", "Does this >", req, "look like JSON to you. It's damn", Operate.is(req));
      }
      var scope = Entity.get(req.scope, window);
      var argument = result ? result : req.args;
      
      console.log(scope, req.method, argument)
      scope[req.method](...argument);
      if (req['callBack']) {
        var callBack = window[req['callBack']];
        var response = this.action(callBack, req[response]);
      }
      return response;
    }
  //   /**
  //    *  This method executes an action Request or a callback given duration.
  //    *  few optaional parameter are present.
  //    * @param {*} time : Time in miliseconds
  //    * @param {*} callback : default value is action, can be call back.
  //    */
  //   actionAfter(time, callback) {
  //     let timerId = setTimeout(() => alert("never happens"), 1000);
  
  //   }
  //   /**
  //    * This method exectues an action Reques or makes a callback in conitnues internal with the given time duration.
  //    * An optional Property of time out and number of times can be used to stop the execution.
  //    * 
  //    * @param {*} time 
  //    * @param {*} callback 
  //    */
  //   actionAfterEvery(time, callback) {
  //     let timerId = setTimeout(() => alert("never happens"), 1000);
  //     //   let timerId = setInterval(() => alert('tick'), 2000);
  //     console.log(arguments)
  //     //    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
  //   }
    
  //   /**
  //    * This method is used for parallel requests
  //    * @param {FlowRequest} reqObj - request object containing array of objects
  //    */
  //   processReqArray(reqObj) {
  //     const state = this._flowResultState;
  //     if (Operate.isFlowRequest(reqObj) && Operate.isArray(reqObj.flowRequest)) {
  //       var flowRequest = reqObj.flowRequest;
  //       for (var i = 0; i < flowRequest.length; i++) {
  //         var request = flowRequest[i];
  //         var args = request.arguments;
  //         var requestArgs = [];
  //         for (var p = 0; p < args.length; p++) {
  //           var reqArg = args[p];
  //           if (state[reqArg]) { requestArgs[p] = state[reqArg]; }
  //           else { requestArgs[p] = reqArg; }
  //         }
  //         var updatedRequest = { ...request, arguments: requestArgs };
  //         const result = this.processReq(updatedRequest);
  //         if (result) {
  //           state[request.reqName] = result;
  //         }
  //       }
  //     }
  //     return null;
  //   }
  //   /**
  //    * This method is used for nested requests
  //    * @param {RequestObj} reqObj - request object containing nested requests
  //    */
  //   processReqNestedObject(reqObj) {
  //     /**
  //      * This method is used for recursion and ensuring the requests are performed sequentially
  //      * @param {RequestObj} request - Current request object
  //      */
  //     function recursiveThen(request) {
  //       var reqArg = request.arguments;
  //       var requestArgs = [];
  //       for (var j = 0; j < reqArg.length; j++) {
  //         if (this._flowResultState[reqArg[j]]) {
  //           requestArgs[j] = this._flowResultState[reqArg[j]];
  //         } else {
  //           requestArgs[j] = reqArg[j];
  //         }
  //       }
  
  //       var updatedRequest = { ...request, arguments: requestArgs };
  //       var tempRequest = {};
  //       for (var [key, value] of Object.entries(updatedRequest)) {
  //         if (key !== "andThen") {
  //           tempRequest[key] = value
  //         }
  //       }
  //       var result = this.processReq(tempRequest);
  //       if (result) {
  //         this._flowResultState[request.reqName] = result;
  //       }
  
  //       if (request.andThen) {
  //         var nestedReq = request.andThen;
  //         if (!nestedReq.objectModel) {
  //           nestedReq.objectModel = result;
  //         }
  //         recursiveThen.call(this, nestedReq);
  //       }
  //     }
  //     recursiveThen.call(this, reqObj);
  //   }
      
  //   static promisifyRequest(request) {
  //     return new Promise((resolve, reject) => {
  //         // @ts-ignore - file size hacks
  //         request.oncomplete = request.onsuccess = () => resolve(request.result);
  //         // @ts-ignore - file size hacks
  //         request.onabort = request.onerror = () => reject(request.error);
  //     });
  // }
  //   validateAllTrue(value, rules) {
  //     var self = this;
  //     return rules.every(function (rule) {
  //         return self[rule](value);
  //     });
  // };
  //   validateSomeTrue(value, rules) {
  //     var self = this;
  //     return rules.some(function (rule) {
  //         return self[rule](value);
  //     });
  // };
  
  //   validate (value, key,params) {
  //     if (this.validateAllTrue(value, key.validator)) {
  //         if (params['onTrue'] === 'true') {
  //             //doThis
  //             return true;
  //         } 
  //        // key.value = value;
          
  //     }
  //     else if (params['onFalse'] === 'false'){
  //         //do This
  //         return false;
  //     }
      
  // };
  
  }
  
  
  //var DOMJson = engine.processReq(singleReq);
  console.log("engine is chalu")
  
  //engine.processReq(actionFlowModelReq)
  
  //engine.processReq(setInnerHTML)
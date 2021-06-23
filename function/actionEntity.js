var counter = 0;

class Entity {
    
    static get(key,parent) {
        var keys = Entity.stringToPath(key);
        var hold = parent;

        var l = {keys: keys, hold: hold};

        Entity.walk({rngstart:0, rngend:keys.length}, {
            value: {
                func : function(i, l){
                    var key = l.keys[i];
                    if(!l.hold) return false;
                    l.hold = l.hold[key];
                    return false;
                }, 
                args: [l]
            }
        });

        if (l.hold) {
            return l.hold;
        }else{
            return key;
        }
    }
    static getValue(str, l, x){
        if(operate.isString(str) && str.charAt(0) == '$'){
                // console.log(str, l, x, eval(str.substr(1)));
            return eval(str.substr(1));
        }
        return (x !== undefined) ? x : str;
    }
    static uniqueId(obj){
        if(obj === window) return 'window';
        if(obj === document) return 'document';
        if(! obj.__uniqueId && !obj.hasAttribute('data-__uniqueId')){
            obj.__uniqueId = counter;
            obj.setAttribute('data-__uniqueId', counter++);
        }
        return (obj.__uniqueId || obj.getAttribute('data-__uniqueId'));
    }
    static requestExpander(request){
        if(request == null) return;
        
        if(operate.isString(request)){
            request = window[request];
        }

        if(! operate.isObject(request)){
            console.error(request, " is not a valid Object");
            throw Error("Terminate Called");
        } 
        
        var rclone = {...request};
        var parent = null;
        
        if(request.hasOwnProperty('extends')){

            var parent = Entity.requestExpander(window[request['extends']]); // parent is a JSON request
            
            request = {...parent};
            delete request['extends'];
            
            var del = rclone.delete;
            delete rclone.delete;

            request = Entity.extends(rclone, request, del);

            delete request['extends'];
        }
        return request;
        
    }
    static complexRequestExpander(requestArr, maxDebugDepth = 10, depth = 0){
        if(requestArr == null) return;
        
        if(operate.isString(requestArr)){
            requestArr = window[requestArr];
        }

        if(depth > maxDebugDepth){
            console.warn('Will not expand when depth > ', maxDebugDepth);
            return resultArr;
        }

        if(operate.isObject(requestArr)){
            requestArr = [requestArr];
        } else if(! operate.isArray(requestArr)){
            console.error(requestArr, " is not a valid Object or Array");
            throw Error("Terminate Called");

        }
        var resultArr = [];

        Entity.walk(
            {rngstart:0, rngend:requestArr.length}, 
            {
                value: {
                    func : function(i, requestArr, resultArr) {
                        var request = requestArr[i];
            
                        //single request
                        // console.log(request);
                        var rclone = Entity.copy(request);
                        var parent = null;

                        if(request.hasOwnProperty('extends')){
                            
                            var parent = Entity.complexRequestExpander(window[request['extends']], depth); // parent is a JSON request
                            
                            request = Entity.copy(parent);
                        
                            var del = rclone.delete;
                            delete rclone.delete;

                            request = Entity.extends(rclone, request, del);

                            delete request['extends'];
                        }
                        
                        if(request.hasOwnProperty('callback')){
                            request.callback = Entity.complexRequestExpander(request.callback, depth + 1);
                        }

                        resultArr.push(request);
                    },
                    args: [requestArr, resultArr]
                }
            }
        );
        if(resultArr.length == 1){
            return resultArr[0];
        } 
        return resultArr;
    }
    static stringToPath (path) {

        // If the path isn't a string, return it
        if (typeof path !== 'string') return path;
        // Create new array
        var output = [];

        // Split to an array with dot notation
        path.split('.').forEach(function (item, index) {

            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {

                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }

            });

        });

        return output;

    }
    static equalizeArraysInDelete(req, del){ //Fixing function
        var l = {req:req};
        var callback = {
            object:{
                func: function(del, key, l){
                    var clone = l.req;

                    l.req = l.req[key];
                    Entity.walk(del[key], l.callback);
                    l.req = clone;

                    return false;
                },
                args:[l]
            },
            array: {
                func: function(del, key, l){
                    while(del[key].length < l.req[key].length){
                        del[key].push(null);
                    }
                    var clone = l.req;
                    
                    l.req = l.req[key];
                    Entity.walk(del[key], l.callback);
                    l.req = clone;

                    return false;
                }, 
                args: [l]
            }
        }
        l.callback = callback;
        Entity.walk(del, callback);

        return del;
    }
    static deleteProps(req, del){ 
        // console.log(del);
        del = Entity.equalizeArraysInDelete(req, del);
        // console.log(del);
        var l = {req: req};

        var callback = { // iterating over del
            value:{
                func: function(obj, key, l){
                    // console.log(l.tmp);
                    if(l.tmp){  // is not null
                        if(obj[key]){ // ignore this
                            return ;
                        } else { // add this to the array
                            l.tmp.push(l.req[key]);
                        }
                    } else if(obj[key]) // is not null
                        delete l.req[key];

                    return false;

                },
                args: [l]
            }, 
            array: {
                func: function(obj, key, l){

                    var clone = l.req;
                    var clonetmp = l.tmp || null;

                    l.tmp = [];
                    l.req = l.req[key];
                    Entity.walk(obj[key], l.callback);
                    l.req = clone;

                    var anstmp = l.tmp;


                    if(clonetmp)
                        clonetmp.push(anstmp);
                    else 
                        l.req[key] = anstmp;

                    l.tmp = clonetmp;

                    return false;
                },
                args: [l]
            }, 
            object: {
                func: function(obj, key, l){
                    var clone = l.req;
                    var clonetmp  = l.tmp || null;

                    l.tmp = null;

                    l.req = l.req[key];
                    Entity.walk(obj[key], l.callback);
                    l.req = clone;

                    if(clonetmp)
                        clonetmp.push(l.req[key]);
                    // else 
                    //     l.req[key] = l.req[key]; //lol

                    l.tmp = clonetmp;

                    return false;
                },
                args: [l]
            }

        }
        l.callback = callback;

        Entity.walk(del, callback);
        
        return l.req;
    }
    static updateProps(req,model, ALLSTATES = {}, parse = true){
        

        if(operate.trueTypeOf(req) != operate.trueTypeOf(model)){
            model = req;
            return req;
        }

        var l = {model: model};

        var callback = {
            array: {
                func: function(obj, key, l){
                    
                    l.model[key] = l.model[key] || [];
                    var clone = l.model;

                    l.model = l.model[key];
                    Entity.walk(obj[key], l.callback);
                    l.model = clone;

                    return false;
                },
                args: [l]
            },
            object: {
                func: function(obj, key, l){
                    

                    l.model[key] = l.model[key] || {};
                    var clone = l.model;

                    l.model = l.model[key];
                    Entity.walk(obj[key], l.callback);
                    l.model = clone;

                    return false;
                },
                args: [l]
            }, 
            value:{
                func: function(obj,  key, l, ALLSTATES, parse){
                    
                    if(parse) l.model[key] = Entity.getValue(obj[key], ALLSTATES);
                    else l.model[key] = obj[key];

                    // console.log(obj[key]);
                    return false;
                }, 
                args: [l, ALLSTATES, parse]
            }
        };
        l.callback = callback;
        Entity.walk(req, callback, ALLSTATES);

        return l.model;
    }
    static extends(req, model, del){

        model = {...model};
        if(del) model = Entity.deleteProps(model, del);
        model = Entity.updateProps(req , model, {}, false);

        return model;
    }
    static async walk(req, callback, ALLSTATES = {}, maxdepth = 0, depth = 0){ // it goes for depth first 

        if(depth > maxdepth) return;

        var emp = function() {};

        if(! callback.value) callback.value = {};
        if(! callback.value.func) callback.value.func = emp;
        if(! callback.value.args) callback.value.args = [];

        if(! callback.l ) callback.l = {};

        var rtype = operate.trueTypeOf(req);
        
        if(rtype === 'object' && req.hasOwnProperty('rngstart')){
            if(!req.delta){
                req.delta = 1;
            }
            for(var i=req.rngstart; i != req.rngend; i += req.delta){
                callback.l.args = [i, ...callback.value.args];

                if(operate.isFunction(callback['value'].func)){
                    if(callback['value'].wait){
                        if(await callback['value'].func(...callback.l.args))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);

                    }
                    else if(callback['value'].func(...callback.l.args))
                        Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    
                }
                else{
                    if(callback['value'].wait){
                        if(await engine.processRequest(callback['value'].func, callback.l))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    } 
                    else if(engine.processRequest(callback['value'].func, callback.l))
                        Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                }
            }
        } else if(rtype === 'array'){

            for(var i in req){

                var type = operate.trueTypeOf(req[i]);
                if(callback.hasOwnProperty(type)){
                    
                    callback.l.args = [req, i, ...callback[type].args];

                    if(operate.isFunction(callback[type].func)){
                        if(callback[type].wait){
                            if(await callback[type].func(...callback.l.args))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);

                        }
                        else if(callback[type].func(...callback.l.args))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        
                    }
                    else{
                        if(callback[type].wait){
                            if(await engine.processRequest(callback[type].func, callback.l))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        } 
                        else if(engine.processRequest(callback[type].func, callback.l))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    }   
                } else {
                    callback.l.args = [req, i, ...callback['value'].args];

                    if(operate.isFunction(callback['value'].func)){
                        if(callback['value'].wait){
                            if(await callback['value'].func(...callback.l.args))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);

                        }
                        else if(callback['value'].func(...callback.l.args))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        
                    }
                    else{
                        if(callback['value'].wait){
                            if(await engine.processRequest(callback['value'].func, callback.l))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        } 
                        else if(engine.processRequest(callback['value'].func, callback.l))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    }
                }
            }
        } else if(rtype === 'object'){
            for(var i in req){
                i = Entity.getValue(i, ALLSTATES);

                var type = operate.trueTypeOf(req[i]);
                if(callback.hasOwnProperty(type)){
                    
                    callback.l.args = [req, i, ...callback[type].args];

                    if(operate.isFunction(callback[type].func)){
                        if(callback[type].wait){
                            if(await callback[type].func(...callback.l.args))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);

                        }
                        else if(callback[type].func(...callback.l.args))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        
                    }
                    else{
                        if(callback[type].wait){
                            if(await engine.processRequest(callback[type].func, callback.l))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        } 
                        else if(engine.processRequest(callback[type].func, callback.l))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    }   
                } else {
                    callback.l.args = [req, i, ...callback['value'].args];

                    if(operate.isFunction(callback['value'].func)){
                        if(callback['value'].wait){
                            if(await callback['value'].func(...callback.l.args))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);

                        }
                        else if(callback['value'].func(...callback.l.args))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        
                    }
                    else{
                        if(callback['value'].wait){
                            if(await engine.processRequest(callback['value'].func, callback.l))
                                Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                        } 
                        else if(engine.processRequest(callback['value'].func, callback.l))
                            Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth+1);
                    }
                }
            }
        } else {
            console.warn("req should be an object/array.What's this? ", req);
            return;
        }
    }
}
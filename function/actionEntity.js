var counter = 0;

class Entity {
    
    static get(key,parent) {
        var keys = Entity.stringToPath(key);

        var hold = parent;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if(!hold) break;
            hold = hold[key];
        }
        if (hold) {
            return hold;
        }else{
            return key;
        }
    }
    static uniqueId(obj){
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
        
        var rclone = Entity.copy(request);
        var parent = null;
        
        if(request.hasOwnProperty('extends')){

            var parent = Entity.requestExpander(window[request['extends']]); // parent is a JSON request
            
            request = Entity.copy(parent);
            delete request['extends'];
            
            // console.log(request);

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
        for (var i = 0; i < requestArr.length; i++) {
            var request = requestArr[i];
            
            //single request
            // console.log(request);
            var rclone = Entity.copy(request);
            var parent = null;

            if(request.hasOwnProperty('extends')){
                
                var parent = Entity.complexRequestExpander(window[request['extends']], depth); // parent is a JSON request
                
                request = Entity.copy(parent);
                // console.log(request);
            
                var del = rclone.delete;
                delete rclone.delete;

                request = Entity.extends(rclone, request, del);

                delete request['extends'];
            }
            
            if(request.hasOwnProperty('callback')){
                request.callback = Entity.complexRequestExpander(request.callback, depth + 1);
            }

            resultArr.push(request);
        }
        if(resultArr.length == 1){
            return resultArr[0];
        } 
        return resultArr;
    }
    static getValue(str, l){
        if(operate.isString(str) && str.charAt(0) == '$')
            return eval(str.substr(1));
        return str;
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
    static deleteProps(req, del){ 
        if(operate.isArray(del)){ //delete elements or properties of objects present in array

            var arr = [];
            var counter = 0;
            for (var i = 0; i < del.length; i++) {
                if(del[i] == undefined){
                    arr.push(req[i]);
                    counter++;
                    
                    continue;
                }
                if(operate.isObject(del[i])){

                    arr.push(req[i]);
                    arr[counter] = Entity.deleteProps(req[i], del[i]);
                    counter++;
                
                } else if(operate.isArray(del[i])){
                    
                    arr.push(req[i]);
                    arr[counter] = Entity.deleteProps(req[i], del[i]);
                    counter++;
                
                } else {
                    // delete (ignore this)
                }
                
            }
            return arr;
        } 
        if(operate.isObject(del)){
            for(var key in del){
                if(operate.isObject(del[key])){
                
                    req[key] = Entity.deleteProps(req[key], del[key]);
                
                
                } else if(operate.isArray(del[key])){

                    req[key] = Entity.deleteProps(req[key], del[key]);
                
                } else {
                    delete req[key];
                }
            }
            return req;
        }

        return req;
    }
    static updateProps(req,model){
        if(operate.isArray(req)){
            for(var i=0;i<req.length;i++){
                if(i >= model.length) model.push(null);
                
                if(req[i]) // if it's not undefined
                    model[i] = Entity.updateProps(req[i], model[i]);
            }
        }
        else if(operate.isObject(req)){
            for(var key in req){
                if(operate.isObject(req[key])){
                
                    if(! model[key]) model[key] = {};
                
                
                } else if(operate.isArray(req[key])){

                    if(! model[key]) model[key] = [];
                }
                model[key] = Entity.updateProps(req[key], model[key]);
            }
        } else {
            model = req;
        }
        return model;
    }
    static extends(req, model, del){

        model = Entity.copy(model);
        if(del) model = Entity.deleteProps(model, del);
        model = Entity.updateProps(req , model);

        return model;
    }
    static walk(req, callback, maxdepth = 0, depth = 0){ // it goes for depth first 
        console.log('call');
        if(depth > maxdepth) return;
        // console.log(callback);
        var emp = function() {};

        if(! callback.value) callback.value = {};
        if(! callback.object) callback.object = {};
        if(! callback.array) callback.array = {};
        if(! callback.l ) callback.l = {};


        if(! callback.value.func) callback.value.func = emp;
        if(! callback.object.func) callback.object.func = emp;
        if(! callback.array.func) callback.array.func = emp;


        
        if(! callback.value.args) callback.value.args = [];
        if(! callback.object.args) callback.object.args = [];
        if(! callback.array.args) callback.array.args = [];

        if(! operate.isArray(callback.value.args)) callback.value.args = [callback.value.args];
        if(! operate.isArray(callback.object.args)) callback.object.args = [callback.object.args];
        if(! operate.isArray(callback.array.args)) callback.array.args = [callback.array.args];


        if(operate.isObject(req) && req.hasOwnProperty('rngstart')){
            if(!req.delta){
                req.delta = 1;
            }
            for(var i=req.rngstart; i != req.rngend; i += req.delta){
                callback.l.args = [i, ...callback.value.args];

                if(operate.isFunction(callback.value.func)){

                    callback.value.func(...callback.l.args);
                } else{
                    engine.processRequest(callback.value, callback.l)
                }
            }
        } else if(operate.isArray(req)){

            for(var i=0;i<req.length;i++){
            

                if(operate.isObject(req[i])){

                    callback.l.args = [req, i, ...callback.object.args];

                    if(operate.isFunction(callback.object.func)){

                        if(callback.object.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.object.func, callback.l))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
            
                } else if(operate.isArray(req[i])){
                    callback.l.args = [req, i, ...callback.array.args];
                    
                    if(operate.isFunction(callback.array.func)){
                        if(callback.array.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.array.func, callback.l))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
            
                } else {
                    callback.l.args = [req, i, ...callback.value.args];

                    if(operate.isFunction(callback.value.func)){

                        if(callback.value.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.value.func))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
                }
            }
        } else if(operate.isObject(req)){

            for(var i in req){
                
                if(operate.isObject(req[i])){

                    callback.l.args = [req, i, ...callback.object.args];

                    if(operate.isFunction(callback.object.func)){

                        if(callback.object.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.object.func, callback.l))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
            
                } else if(operate.isArray(req[i])){
                    callback.l.args = [req, i, ...callback.array.args];
                    
                    if(operate.isFunction(callback.array.func)){
                        
                        if(callback.array.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.array.func, callback.l))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
            
                } else {
                    callback.l.args = [req, i, ...callback.value.args];

                    if(operate.isFunction(callback.value.func)){

                        if(callback.value.func(...callback.l.args))
                            Entity.walk(req[i], callback, maxdepth, depth+1);
                    }
                    else if(engine.processRequest(callback.value.func))
                        Entity.walk(req[i], callback, maxdepth, depth+1);
                }
            }
        } else {
            console.warn("req should be an object/array.What's this? ", req);
            return;
        }
    }
    static copy(obj) {
        // creates an immultable copy of  object/array
        var clone;
        if(operate.isArray(obj)){
            clone = [];
        } else if(operate.isObject(obj)){
            clone = {};
        } else 
            return obj;

        var dynamicArguments = [clone];
        var callback = {
            array: {
                func: function(obj, key, clone, callback, dynamicArguments){
                    //obj[key] is array, now what
                    if(operate.isArray(obj))
                        clone.push([]);
                    else 
                        clone[key] = [];


                    dynamicArguments[0] = clone[key];
                    Entity.walk(obj[key], callback);
                    dynamicArguments[0] = clone;

                    return false;
                },
                args: dynamicArguments
            },
            object: {
                func: function(obj, key, clone, callback, dynamicArguments){
                    //obj[key] is array, now what
                    
                    if(operate.isArray(obj))
                        clone.push({});
                    else 
                        clone[key] = {};

                    dynamicArguments[0] = clone[key];
                    Entity.walk(obj[key], callback);
                    dynamicArguments[0] = clone;

                    return false;
                },
                args: dynamicArguments
            }, 
            value:{
                func: function(obj,  key, clone, callback, dynamicArguments){
                    if(operate.isArray(obj))
                        clone.push(obj[key]);
                    else 
                        clone[key] = obj[key];

                    return false;
                }, 
                args: dynamicArguments
            }
        };

        dynamicArguments.push(callback);
        dynamicArguments.push(dynamicArguments);

        Entity.walk(obj,callback);

        return clone;
    }
}

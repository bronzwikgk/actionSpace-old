
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
        
        if(depth > maxdepth) return;

        if(operate.isObject(req) && req.rngstart && req.rngend){
            if(!req.delta){
                req.delta = 1;
            }
            for(var i=req.rngstart; i != req.rngstart; i += req.delta){
                callback.value(i);
            }
        } else if(opearte.isArray(req)){

            for(var i=0;i<req.length;i++){
            
                if(operate.isObject(req[i])){
            
                    if(callback.object(req, i)) 
                        walk(req[i], callback, maxdepth, depth+1);
            
                } else if(operate.isArray(req, i)){
            
                    if(callback.array(req, i))
                        walk(req[i], callback, maxdepth, depth+1);
            
                } else {
                    callback.value(req, i);
                }
            }
        } else if(operate.isObject(req)){

            for(var i in req){
                if(operate.isObject(req[i])){
            
                    if(callback.object(req, i)) 
                        walk(req[i], callback, maxdepth, depth+1);
            
                } else if(operate.isArray(req, i)){
            
                    if(callback.array(req, i))
                        walk(req[i], callback, maxdepth, depth+1);
            
                } else {
                    callback.value(req, i);
                }
            }
        } else {
            console.error("req should be an object/array.What's this? ", req);
        }
    }
    static copy(obj) {

        //
        // Methods
        //

        /**
         * Copy properties from the original object to the clone
         * @param {Object|Function} clone The cloned object
         */
        function copyProps(clone) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clone[key] = Entity.copy(obj[key]);
                }
            }
        }

        /**
         * Create an immutable copy of an object
         * @return {Object}
         */
        function cloneObj() {
            let clone = {};
            copyProps(clone);
            return clone;
        }

        /**
         * Create an immutable copy of an array
         * @return {Array}
         */
        function cloneArr() {
            return obj.map(function (item) {
                return Entity.copy(item);
            });
        }

        /**
         * Create an immutable copy of a Map
         * @return {Map}
         */
        function cloneMap() {
            let clone = new Map();
            for (let [key, val] of obj) {
                clone.set(key, Entity.copy(val));
            }
            return clone;
        }

        /**
         * Create an immutable clone of a Set
         * @return {Set}
         */
        function cloneSet() {
            let clone = new Set();
            for (let item of set) {
                clone.add(copy(item));
            }
            return clone;
        }

        /**
         * Create an immutable copy of a function
         * @return {Function}
         */
        function cloneFunction() {
            let clone = obj.bind(this);
            copyProps(clone);
            return clone;
        }


        //
        // Inits
        //

        // Get object type
        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

        // Return a clone based on the object type
        if (type === 'object') return cloneObj();
        if (type === 'array') return cloneArr();
        if (type === 'map') return cloneMap();
        if (type === 'set') return cloneSet();
        if (type === 'function') return cloneFunction();
        return obj;

    }
        
}

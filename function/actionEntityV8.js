
class Entity {
    static get(key, parent) {
        console.log("for Initaition", key, parent)
        if (operate.isString(key)) {
            if (parent[key]) {
              console.log("for Initaition", key, objectModel, objectModel[key])
                var response = parent[key];

                console.log("Initaites found", response)
                return response;
            }
        } else if (typeof key == 'object' || key.indexOf(".") > 0) {
           // console.log(key)
            return this.get4rmPath(key,parent)
        } else{
            return console.log("objectNotfound");
        }
    }

    //https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/#:~:text=return%20our%20match.-,var%20get%20%3D%20function%20(obj%2C%20path%2C%20def)%20%7B,(or%20null)%20if%20(!
    static get4rmPath(path,obj,def){
        

            /**
             * If the path is a string, convert it to an array
             * @param  {String|Array} path The path
             * @return {Array}             The path array
             */
           
            // Get the path as an array
        path = Entity.stringToPath(path);
        console.log(path)
            // Cache the current object
            var current = obj;
            // For each item in the path, dig into the object
            for (var i = 0; i < path.length; i++) {
        
                // If the item isn't found, return the default (or null)
                if (!current[path[i]]) return def;
        
                // Otherwise, update the current  value
                current = current[path[i]];
        
            }
            return current;
        
        
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
 
    static evalDelete(req,  query, l = []){
        delete eval('req.'+query);
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

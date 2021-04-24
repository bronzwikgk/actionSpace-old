
/**
 * Entity often referred as Action Entity, provides a wrapper for generic CRUD operation on an typeof object === ' object;
 * Basic premise being, this becomes our template/componenet generator. Works similar to Web Componeents and provides similar api.
 * 
 * It has method a. create: it takes 2 arguments( input , output); a times more arguments can be passed. Ie. For iteration.
 *               b. Append : it takes 2 arguemtns( input, parent); it appends the input to parent
 *               c. set :
 *               d. insert: 
 *               d. get :
 *               e. update:
 *               f.get4rmPath:
 *               g.string2Path
 * 
 * * 
 */
class Entity {
    constructor(input, output) {
       console.log("entity", input, output)
        this.input = input;
        this.output = output;
        this.entity = process.processReq(input, output);
    }
    static create(input, output, key, value,) {
      //  console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            if (operate.isInt(parseInt(key))) {
               // console.log("check me")
                var response = document.createElement('option');
            }
            else {
                // console.log(operate.is())
                var response = document.createElement(key);
            }

            // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            //   console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (!response) console.log("no response", output);
        return response;
    }
    static append(input, output, key, value,) {
        // console.log('appending', input,output)

        if (operate.is(output).includes("HTML")) { //Only HTML creation
            var response = output.appendChild(input);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output[key] = input;
            var response = output;
            //var response = document.createElement(key);

        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output.push(input);
            var response = output;
            //var response = document.createElement(key);

        }



        // console.log('appended',response)
        return response;
    }
    static set(input, output, key, value) {
      // console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation

            if (operate.isInsideArray(key, htmlAttributesListV2)) {


                output.setAttribute(key, value)
                if (key == "innerText") {
                    console.log("setting", key, value, "in", output)
                }
            } else {
                // console.log("set", key, value, "in", output)

                //var buffer = output;
                output[key] = input[key];
                //buffer=output;
            }

        }
        return output;
    }
    /**
     * 
     */
    static insert(str, index, value) {
        var response = str.substr(0, index) + value + str.substr(index);
        //  console.log("inserted",response)
        return response;
    }

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
    /*!
 * Create a new object composed of properties that meet specific criteria
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object}   obj      The original object
 * @param  {Function} callback The callback test to run
 * @return {Object}            The new, filtered object
 * https://vanillajstoolkit.com/helpers/objectfilter/
 */

    static objectFilter (obj, callback) {

	// Setup a new object
	let filtered = {};

	// Loop through each item in the object and test it
	for (let key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {

			// If the callback validates true, push item to the new object
			if (callback(obj[key], key, obj)) {
				filtered[key] = obj[key];
			}

		}
	}

	// Return the new object
	return filtered;

}

    //This method walks through all the keys of an obect. By default it retunrs all the keys wile getting them from Window scope.
    // It has optional patameter of Max Item, Max Depth and Recurse.

    // walkReqModel = {
//     name: 'eachKey',
//     objectModel: 'ActionEngine',
//     method: 'eachKey',
//     argument: ['input'],
//     params: {
//         response: {},// If present the response is stored here. If an object returned as an object, if an array return as an array.
//         recurse: 'true',
//         maxDepth: 5,
//         maxItem: 10,
//     }
// }

    static walk(req) {
        console.log("walk request", req['argument'])
        //  if (!req['currentDepth']) { req['currentDepth'] = 0;console.log("it's a fresh start")}     
        if (typeof req === 'object') {

            for (var key in req['argument'][0]) {
                //  req['currentDepth'] = req['currentDepth'] + 1; // add a break || continue condition to exit if more than max Depth
                if (req['argument'][0].hasOwnProperty(key)) {

                    //  console.log("iam Here raw", key, req['argument'][0][key]);

                    if (operate.isString(req['argument'][0][key])) {

                         console.log("before",req['argument'][0][key]);
                        //checking if the value has a dot in it. Normally used to add Scope before a method
                        //get the string Object from the window.
                        
                        var buffer = Entity.get(req['argument'][0][key], window);
                        //console.log("found Object", key, req[key],)
                      
                        if (operate.isUseless(buffer) === false) {

                        req['argument'][0][key] = buffer;
                        //  console.log("this updated", key,buffer)
                    }
                    } else if (typeof req['argument'][0][key] == 'object') {
                        if (req.params['recurse'] == 'true') {
                            //  console.log("recurse", req['argument'][0][key])
                            var newWalkModelReq = walkReqModel;
                            newWalkModelReq['argument'] = [req['argument'][0][key]];
                            Entity.walk(newWalkModelReq);
                        }


                    }


                 
                    if (req['callBack']) {
                        //   console.log("callback found", req['callBack'])
                        //  var callBack = window[req['callBack']];
                        //var response = this.reqProcessor(callBack, req[response]);
                    }


                    //  console.log("found string",key,req[key]) 
                }


                //  console.log("iam Here Intiated", key, req['argument'][0][key]);
            }
            //f(m,loc,expr,val,path);
        }
        return req;
    }
/**
 * This method is supposed to bind 2 Elements. Work in progress
 * @param {*} arg1 
 * @param {*} arg2 
 */
    static bindObject(arg1,arg2){

    }

    //this method is supposed to execute the callback in the reqModel for the keys on the keys of the input Object.
    //can be used with 
    // the code logic has to go like this.
    // each key of model sent to each
    //
    /**
     * This method is used for converting DOM element to JSON object
     * @param {HTMLElement} object - HTML DOM Element to convert to JSON
     * @param {object} model - Model Schema for JSON object
     */
    static toJSON(object, model) {
        const output = {}; // Initialize output object
        // iterate over the properties of the model
        for (var key in model) {
            var value = model[key];
            if (model.hasOwnProperty(key) && Validators.validate(object[key], value)) {
                if (value.type === 'object') {  // check if values is a nested object
                    var nestedItem = value.value;
                    output[key] = this.toJSON(object[key], nestedItem) // Create corresponding nested object in output object
                }
                else if (value.type === 'array') {  // Check if value is an array
                    output[key] = [];
                    for (var i = 0; i < object[key].length; i++) {
                        output[key].push(this.toJSON(object[key][i], model));
                    }
                }
                else {
                    output[key] = object[key] || '' // if the value is neither an array or an object, assign the corresponding output[key] to the Elements' object property's value
                }
            }
        }
        return output;

    }

    /*!
 * Create an immutable clone of data (an array, object, map, set, etc.)
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*} obj The data object to copy
 * @return {*}     The clone of the array or object
 */
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
                clone[key] = copy(obj[key]);
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
            return copy(item);
        });
    }

    /**
     * Create an immutable copy of a Map
     * @return {Map}
     */
    function cloneMap() {
        let clone = new Map();
        for (let [key, val] of obj) {
            clone.set(key, copy(val));
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
//Tests
var obj = {
    'a': [
        {
            'b': {
                'c': 3
            }
        }
    ]
};

// var req = ['recentStoriesCollectionView','workSpaceBody']
// console.log('testing req', req, typeof req)
// var req1 = ['a', '0', 'b', 'c'];
// var req2 = 'a[0].b.c';

// var newWalkModelReq = walkReqModel;
// newWalkModelReq['argument'] = req;
// var getPath = Entity.walk(newWalkModelReq);


// // Logs 3
// console.log("get Path",getPath);
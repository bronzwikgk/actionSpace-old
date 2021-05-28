/**
 * Entity often referred as Action Entity, provides a wrapper for generic CRUD operation on an typeof object === ' object; 
 * Accept command only from actionEngine.
 * Basic premise being, this becomes our template/componenet generator. Works similar to Web Componeents and provides similar api.
 * It has following methods :-
 *a. create: this method is used to create any kind of entity(html, JSON, File)
 *   it takes 2 arguments( input <can be JSONObject,HTMLElement,File> , output<can be JSONObject,HTMLElement,File>); a times more arguments can be passed. Ie. For iteration, specified properties.
 *b.read:this method is used to read/get any kind of entity(html, JSON, File)
 *   it takes 2 arguments( parent<can be JSONObject,HTMLElement,File>, key <can be String,Object,Array>); a times more arguments can be passed. Ie. For sync or async, fetching data from url, kind of result<JSONObject/HTMLElement/File> etc.
 * 
 * +points:- smartly using create or read, we can 
 *             > deep clone object, function or anything else.
 *             > filter object with specified properties and a particular Schema modal.
 *
 *c.update:this method is used to update any kind of entity(html, JSON, File);
 *   it takes 3 arguments( parent<can be JSONObject,HTMLElement,File>, key <can be String,Object,Array>, value<can be JSONObject,HTMLElement,File> ); a times more arguments can be passed. Ie. For iteration, .
 *d.delete: underConstruction
 *e.get4rmPath:helper
 *f.string2Path:helper
 *  
 */
class Entity {
    constructor(input, output) {
        //    console.log("entity", input, output)
        this.input = input;
        this.output = output;
        //this.entity = process.processReq(input, output);
    }
    /**
     *
     */
    static create(input, output) {
        if (Operate.validate(input, {
                'yes': 'isObject',
                'no': 'isEmpty'
            })) {
            if (output.toUpperCase() == 'HTML') {
                return this.createHTMLEntity(input);
            } else if (output.toUpperCase() == 'JSON') {
                return this.createJSONEntity(input);
            }
        }

    }
    static createHTMLEntity(obj) {
        let result,
            doc = document,
            tagName = obj["name"] || obj["tagName"];
        if (htmlElementList.includes(tagName)) result = doc.createElement(tagName);
        for (const key in obj) {
            if (typeof obj[key] == "object") result.appendChild(this.makeHtmlEntity(obj[key]));
            else if (htmlAttributesList.includes(key)) result[key] = obj[key];
        }
        return result;
    }
    static createJSONEntity(obj) {
        let output = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (Operate.validate(element, 'isObject')) {
                    output[key] = this.createJSONEntity(element);
                } else if (Operate.validate(element, 'isFunction')) {
                    try {
                        output[key] = eval(element.toString());
                    } catch (error) {
                        continue;
                    }
                } else {
                    output[key] = element;
                }
            }
        }
        return output;
    }
    static createFileEntity(params, content) {
        // console.log('Just working to create a file with ',params,content);
        // console.log('Hoping to be completed soon :)')
    }
    static read(key, parent) {
        //console.log("for Initaition", key, parent);
        if (Operate.validate(key, ["isString", "isNumber"], false)) {
            if (key.indexOf(".") >= 0) return this.get4rmPath(key, parent)
            return parent[key] ? parent[key] : false;
        } else if (Operate.validate(key, ["isArray", "isObject"], false)) return this.get4rmPath(key, parent);
        else return console.log("objectNotfound");
    }

    static get4rmPath(path, obj, def) {
        /**
         * If the path is a string, convert it to an array
         * @param  {String|Array} path The path
         * @return {Array}             The path array
         */
        // Get the path as an array
        path = this.stringToPath(path);
        //console.log(path)
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
    static stringToPath(path) {
        // If the path isn't a string, return it
        if (!Operate.validate(path, "isString")) return path;
        // Create new array
        let output = [];
        // Split to an array with dot notation
        path.split('.').forEach(function (item, index) {
            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {
                // Push to the new array
                if (Operate.validate(parseInt(key), ['isNumber', 'isNotNegative'])) output.push(key);
            });
        });
        return output;
    }

    static update(parent, key, value) {
        if (Operate.validate(parent, 'isHTML')) { //Only HTML creation
            if (Operate.isInsideArray(key, htmlAttributesListV2)) {
                parent.setAttribute(key, value)
                if (key == "innerText") {
                    console.log("setting", key, value, "in", output)
                }
            } else {
                output[key] = input[key];
            }
        }
    }

    /*************************************************************************************************************
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ***************************************************************************************************************/

    // static append(input, output, key, value,) {
    //     // console.log('appending', input,output)

    //     if (operate.is(output).includes("HTML")) { //Only HTML creation
    //         var response = output.appendChild(input);
    //     }
    //     if (operate.is(output).includes("Object")) { //Only HTML creation
    //         // console.log("append request for ",input,output)     
    //         output[key] = input;
    //         var response = output;
    //         //var response = document.createElement(key);

    //     }
    //     if (operate.is(output).includes("Array")) { //Only HTML creation
    //         // console.log("append request for ",input,output)     
    //         output.push(input);
    //         var response = output;
    //         //var response = document.createElement(key);

    //     }



    //     // console.log('appended',response)
    //     return response;
    // }
    // static set(input, output, key, value) {
    //   // console.log("setting",key, value,"in",output)
    //     if (operate.is(output).includes("HTML")) { //Only HTML creation

    //         if (operate.isInsideArray(key, htmlAttributesListV2)) {


    //             output.setAttribute(key, value)
    //             if (key == "innerText") {
    //                 console.log("setting", key, value, "in", output)
    //             }
    //         } else {
    //             // console.log("set", key, value, "in", output)

    //             //var buffer = output;
    //             output[key] = input[key];
    //             //buffer=output;
    //         }

    //     }
    //     return output;
    // }

    //https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/#:~:text=return%20our%20match.-,var%20get%20%3D%20function%20(obj%2C%20path%2C%20def)%20%7B,(or%20null)%20if%20(!

    /*!
     * Create a new object composed of properties that meet specific criteria
     * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {Object}   obj      The original object
     * @param  {Function} callback The callback test to run
     * @return {Object}            The new, filtered object
     * https://vanillajstoolkit.com/helpers/objectfilter/
     */

    //     static objectFilter (obj, callback) {

    // 	// Setup a new object
    // 	let filtered = {};

    // 	// Loop through each item in the object and test it
    // 	for (let key in obj) {
    // 		if (Object.prototype.hasOwnProperty.call(obj, key)) {

    // 			// If the callback validates true, push item to the new object
    // 			if (callback(obj[key], key, obj)) {
    // 				filtered[key] = obj[key];
    // 			}

    // 		}
    // 	}

    // 	// Return the new object
    // 	return filtered;

    // }

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

    // static walk(req) {
    //     console.log("walk request", req['argument'])
    //     //  if (!req['currentDepth']) { req['currentDepth'] = 0;console.log("it's a fresh start")}     
    //     if (typeof req === 'object') {

    //         for (var key in req['argument'][0]) {
    //             //  req['currentDepth'] = req['currentDepth'] + 1; // add a break || continue condition to exit if more than max Depth
    //             if (req['argument'][0].hasOwnProperty(key)) {

    //                 //  console.log("iam Here raw", key, req['argument'][0][key]);

    //                 if (operate.isString(req['argument'][0][key])) {

    //                      console.log("before",req['argument'][0][key]);
    //                     //checking if the value has a dot in it. Normally used to add Scope before a method
    //                     //get the string Object from the window.

    //                     var buffer = Entity.get(req['argument'][0][key], window);
    //                     //console.log("found Object", key, req[key],)

    //                     if (!Operate.validate(buffer, 'isUseless')) {

    //                     req['argument'][0][key] = buffer;
    //                     //  console.log("this updated", key,buffer)
    //                 }
    //                 } else if (typeof req['argument'][0][key] == 'object') {
    //                     if (req.params['recurse'] == 'true') {
    //                         //  console.log("recurse", req['argument'][0][key])
    //                         var newWalkModelReq = walkReqModel;
    //                         newWalkModelReq['argument'] = [req['argument'][0][key]];
    //                         Entity.walk(newWalkModelReq);
    //                     }


    //                 }



    //                 if (req['callBack']) {
    //                     //   console.log("callback found", req['callBack'])
    //                     //  var callBack = window[req['callBack']];
    //                     //var response = this.reqProcessor(callBack, req[response]);
    //                 }


    //                 //  console.log("found string",key,req[key]) 
    //             }


    //             //  console.log("iam Here Intiated", key, req['argument'][0][key]);
    //         }
    //         //f(m,loc,expr,val,path);
    //     }
    //     return req;
    // }
    // /**
    //  * This method is supposed to bind 2 Elements. Work in progress
    //  * @param {*} arg1 
    //  * @param {*} arg2 
    //  */
    //     static bindObject(arg1,arg2){

    //     }




    // Return a clone based on the object type
    // if (type === 'object') return cloneObj();
    // if (type === 'array') return cloneArr();
    // if (type === 'map') return cloneMap();
    // if (type === 'set') return cloneSet();
    // if (type === 'function') return cloneFunction();
    // return obj;

}
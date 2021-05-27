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
        //console.log(input, output)
        if (Operate.validate(input, 'isObject')) {
            if (output.toUpperCase() == 'HTML') {
                return this.createHTMLEntity(input);
            } else if (output.toUpperCase() == 'JSON') {
                return this.createJSONEntity(input);
            }
        }
    }
    static createHTMLEntity(obj) {
        if (Operate.validate(obj, 'isUseless')) return console.log('useless');
        if (Operate.validate(obj, 'isString')) return document.createTextNode(obj)
        if (Operate.validate(obj, 'isHTML')) return obj;
        let result,
            tagName = obj["name"] || obj["tagName"];
        if (Operate.validate(obj, "isArray")) {
            result = [];
            for (let i = 0; i < obj.length; i++) {
                if(!Operate.validate(obj[i], 'isUseless') ){
                    let value = this.createHTMLEntity(obj[i]);
                    if (value) result[i] = value;
                }
            }
        }
        else{
            if (htmlElementList.includes(tagName) && ! bannedElements.includes(tagName)) 
                result = document.createElement(tagName);
            else return;
        for (const key in obj) {
            let attr = obj[key];
            if (key==="tagName") continue;
            else if (Operate.validate(attr, 'isObject')) {
                let val = this.createHTMLEntity(attr);
                if(!Operate.validate(val, 'isUseless')){
                    if (Operate.validate(val, "isArray")) {
                        for (let i = 0; i < val.length; i++) {
                            result.appendChild(val[i])
                        }
                    } else {
                        result.appendChild(val)
                    }
                }
                
            }
            else if (htmlInheritedAttributes.includes(key) || htmlManualAttributes.includes(key))
            result.setAttribute(key, attr);
        }
        }
        
        return result;
    }
    static createJSONEntity(obj, schema) {
        let output = {};
        for (const key in schema) {
            let element = obj[key],
            schemaVal = schema[key];
            if (Operate.validate(element, 'isObject')) { output[key] = this.createJSONEntity(element, schemaVal); }
            else if (Operate.validate(element, 'isFunction')) {
                output[key] = element.bind(obj);
                for (let keyProp in element.prototype) {
                    if (Object.prototype.hasOwnProperty.call(element.prototype, keyProp)) {
                        output[key].prototype = { [keyProp]: element.prototype[keyProp] }
                    }
                }
            } else { output[key] = Operate.convert(element, schemaVal); }
        }
        return output;
    }

    static async createFileEntity(content, params, fileHandle) {
        if (!fileHandle) fileHandle = await getHandle('OpenFile', params);
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        return fileHandle;
    }

    static async getFileEntity(fileHandle, method){
        const file = await fileHandle.getFile();
        return await file[method]();
    }

    

    static get(key, parent, output) {
        //console.log("for Initaition", key, parent);
        if (Operate.validate(key, ["isString", "isNumber"], false)) {
            let getFromPath = Operate.validate([key, '.'],'isInside') ||  Operate.validate([key, '['],'isInside');
            return getFromPath ? get4rmPath(key, parent) : parent[key] ? parent[key] : undefined;
        } else if (Operate.validate(key, ["isArray", "isObject"], false)) return get4rmPath(key, parent);
        else return console.log("objectNotfound");
    }

    

static update(parent, [key, value], actionVal) {
    let current = parent;
    if (Operate.validate(parent, 'isHTML')) { //Only HTML creation
        if (value) parent[actionVal](key, value);
        else parent[actionVal](key)
    }
    else if (Operate.validate(parent, 'isObject')) {
        let path = stringToPath(actionVal);
        for (var i = 0; i < path.length; i++) {
            if (!current[path[i]]) return ;
            current = current[path[i]];
        }
        current[key] = value;
    }
    return parent;
}



    static async del(entity){
        if (Operate.validate(entity, 'isHTML')) {
            entity.remove()
        } else if (Operate.validate(entity, 'isFile')){
            let directoryHandle = await this.getHandle('Directory', entity);
            directoryHandle.removeEntry(entity.name, {recursive:true});
        }
    }

    static async getHandle (action, params){
        let defaultParams = {
            suggestedName: 'Untitled.txt',
            types:[{
                description: 'Text Documents',
                accept:{
                    'text/plain':['.txt']
                }
            }]
        }
        if (!params) params = defaultParams;
        let [fileHandle] = await window[`show${action}Picker`](params);
        return fileHandle;
    }

static get4rmPath(path, obj, def) {
    // Get the path as an array
    path = this.stringToPath(path);
    console.log(path)
var current = obj;
for (var i = 0; i < path.length; i++) {
    if (!current[path[i]]) return def;
    current = current[path[i]];
}
return current;
}
/**
     * If the path is a string, convert it to an array
     * @param  {String|Array} path The path
     * @return {Array}             The path array
     */
static stringToPath(path) {
    // If the path isn't a string, return it
    if (!Operate.validate(path, "isString")) return path;
// Create new array
let output = [];
console.log()
// Split to an array with dot notation
path.split('.').forEach(function (item, index) {
    // Split to an array with bracket notation
    item.split(/\[([^}]+)\]/g).forEach(function (key) {
        // Push to the new array
        if (key !== '') output.push(key);
    
    });
});
return output;
}

static merge(objects, filterFn){
    let result = {};
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i], 
        filtered = filter(obj, filterFn);
        result = {...result, ...filtered};
    }
    return result;
}
static filter(obj, filterFn){
    let result = {};
    for (const key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (Operate.validate([value,'object'], 'isTypeof')) result[key] = filter(value, filterFn);
            else if(value.constructor.name.includes('Function')) result[key] = value.bind(obj);
            else if (filterFn(key, value, obj)) result[key] = value;
        }
    }
    return result;
}

    /*************************************************************************************************************
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ***************************************************************************************************************/

   

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




   
}
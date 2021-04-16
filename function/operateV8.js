
class operate {
    //This method takes a string input, and makes a search in an object, irrelevent weder object or Array.
    //It takes options paramerte like
    // Recurse: Boolean, true makes an isInside Search Recursive.
    //LookAt:Key/Values/All. Where should it look at .Key only looks at keys, values only looks at values. All looks at all
    //Strict. looks for Exact Match/ 
    static isInside(entity2SearchIn, string2Search, options) {
        console.log(Object.values(entity2SearchIn), string2Search)
    }

    // operate to check if the input is not null or undefined to be added
    static isEmpty(argA) { return Object.keys(argA).length === 0 ? true : false }
    static isNotEmpty(argA) { return argA !== '' && argA !== null && typeof argA !== 'undefined' ? true : false }
    //returs the data Type of the input.
    static is(argA) {
       // console.log(argA);
        return Object.getPrototypeOf(argA).constructor.name;
    }
    static isInt(argA) { return Number.isInteger(argA); }
    static isNumber(argA) { return Number.parseFloat(argA).toString() !== 'NaN' }
    static isString(argA) { return typeof argA === 'string' ? true : false }
    /**
     * returns if the input is a key/value in the object options.argB
     * @param {*} argA
     * @param {*} argB  is required to be not empty
     * 
     */
    static isInsideArray(argA, argB) {
        // console.log("IsInside", argA, argB);
        return argB.indexOf(argA) > -1 ? true : false;
    }
    //Find iside an object, array or Object, returns if find keys
    static find(entity, keyTofind, lookat) {
       // console.log("yo")
  //  console.log("finding", keyTofind, "in", entity, lookat);

        var result = Object[lookat](entity).filter(function (key, index, self) {

          //  console.log(keyTofind, key, index, self);
            return !key.indexOf(keyTofind);
        });
      // console.log("found result", result)
        return result;
    }


    static findMatchingInArrayOfObject(entity,keyTofind,value2Match, lookat) {
      
     //   console.log("matching Values for keyword", keyTofind, "in", entity, lookat);

        var result = Object[lookat](entity).filter(function (key, index, self) {

         //   console.log(key, index, value2Match, self);
            if (key[keyTofind] === value2Match) {
               // console.log("found", key[keyTofind], key)
                return key;
            }
            
        });
        return result;
    }
    //curently works only for string numbers
    static isEqualStrict(argA, argB) { return argA === argB ? true : false; }
    //for array's one sided value existence check, return true if each element of a is present in b
    static isGreaterThan(argA, argB) { return argA > argB ? true : false }
    static isGreaterthanOrEqual(argA, argB) { return argA => argB ? true : false }
    static isSmallerthan(argA, argB) { return argA < argB ? true : false }
    static isSmallerthanOrEqual(argA, argB) { return argA <= argB ? true : false }
    static instanceof(argA, argB) { return console.log("work in process"); }
    //validate 2 Object, with key's and values
    static isSameObject(argA, argB) {

        return console.log("work in process");
    }
    //check if argB has all the keys from argA // only for array.
    static hasAllof(argA, argB) { return argA.every(function (value) { console.log(value, argB); return operate.isIn(value, argB) }); }
    static arrayIncludes(argA, argB) { return argA.includes(function (value) { return operate.isIn(value, argB); }); }
    //Check for bothArgument to be Number and Integer to be added.
    static isInRangeNumbers(argA, argB) { return argA.every(function (value) { return operate.isGreaterthanOrEqual(value, argB.min) && operate.isSmallerthanOrEqual(value, argB.max); }); }
    //return true if all items are the same in two unordered Array need to add a return of mismatch values as option.
    static isSameArray(argA, argB) {
        argA.sort(); argB.sort(); if (argA.length !== argB.length) return false;
        for (let i = 0; i < argA.length; i++) { if (argA[i] !== argB[i]) return false; } return true;
    }
       // checks for null and undefined
       static isIterable(obj) {
     
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }

    // Returns if a value is an array
    static isArray(value) { return value && Array.isArray(value) && typeof value === 'object' && value.constructor === Array; }
    // Returns if a value is a static
    static isstatic(value) { return typeof value === 'static'; }
    // Returns if a value is an object
    static isObject(value) { return value && typeof value === 'object' && value.constructor === Object; }
    static isHTML(argA) { return operate.is(argA).includes("HTML") }
    //Retuns if a values is either of null or undefined
    static isUseless(value) { return value === null || typeof value === 'undefined'; }
    // Returns if a value is null
    static isNull(value) { return value === null; }
    // Returns if a value is undefined 
    static isUndefined(value) { return typeof value === 'undefined'; }
    // Returns if a value is a boolean 
    static isBoolean(value) { return typeof value === 'boolean'; }
    //Returns if a value is a regexp
    static isRegExp(value) { return value && typeof value === 'object' && value.constructor === RegExp; }
    // Returns if value is an error object
    static isError(value) { return value instanceof Error && typeof value.message !== 'undefined'; }
    // Returns if value is a date object
    static isDate(value) { return value instanceof Date; }
    //Returns if the value is a Prototyp
    static isPrototype(value) { console.log(Object.getPrototypeOf(value) === prototype1); }
    // Returns if a Symbol
    static isSymbol(value) { return typeof value === 'symbol'; }
    //This function validates a valid Url, Returns True or false
    static isValidUrl(string) { try { new URL(string); } catch (_) { return false; } return true; }
    static isValidJSONString(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }
    /**
     *  * Returns true if the given test value is an array containing at least one object; false otherwise.
     * */
    static isObjectArray_(argA) {
        for (var i = 0; i < argA.length; i++) {
            if (operate.isObject(argA[i])) {
                return true;
            }
        }
        return false;
    }
    static isNegative(x) { return x < 0; }
    static isChild(argA, argB) { }
    static isParent(argA, argB) { }
    static isEven(argA) { return numbers.every(function (e) { return e % 2 == 0; }); }
    static isOdd(argA) { return numbers.every(function (e) { return Math.abs(e % 2) == 1; }); }
    /**
     * 
     * @param {*} argA This is the input argument, it has to be a string operate.enforce(operate.isString(value), true)
     * @param {*} Object The Object to search this string in .
     * @param {*} options Currently there are 3 optional Parameters.
     *  options.Recurse : true [true,false] Work In progress
     * optoins.filter()
     * options.Lookin : keys [keys, values, all]
     * 
     */
    static isFlowRequest(obj) {
        return "flowRequest" in obj;
    }
    static isArray(value) {
        return (
            value&&
            Array.isArray(value)&&
            typeof value==="object"&&
            value.constructor===Array
        );
    }
    static isFunction(obj) {
        return typeof obj==='function';
    }
}

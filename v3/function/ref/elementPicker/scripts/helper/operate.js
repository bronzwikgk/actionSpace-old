
// https://www.javascripttutorial.net/javascript-logical-operators/
// https://www.javascripttutorial.net/es-next/javascript-optional-chaining-operator/
// https://www.javascripttutorial.net/javascript-ternary-operator/
// https://frontstuff.io/build-a-simple-validator-service-in-javascript
// defaultOutput = { output: 'self', when: 'onTrue' };

// static modeIndicator() {
//     if (input === "{") {
//         //create a range.This position being starter
//         //set RangeType to Object;
//         //Intitiate ObjectRuleModel;
//         //add reflection to editor;
//         // update editor


//     }
//     if (input === "[") {
// //create a range.This position being starter
//         //set RangeType to Object;
//         //Intitiate ObjectRuleModel;
//         //add reflection to editor;
//         // update editor
//     }



// }



// // static onEveryEntity1(a, b, callback) {
// //     a.every(static (element) { callback(element, b); });
// // }


// //https://github.com/google/data-layer-helper
// //https://sites.google.com/site/scriptsexamples/custom-methods/2d-arrays-library


/**
 *  we should merge conductor and operator into 1 class
 * we need to add few more methods eg. conductFlow , that conducts an array of operation, similar to operator.Onevery1
 */
class conductor {
    //this function calls a callback function with a and b parameter. Conducted Routes have to be registered before else will throw error.
    //  on param = [ anyEvent ]
    static conduct(a, b, c, d, callback, callbackClass) {
        // console.log(a, b, callback)
        //eval(callbackClass.callback(a, b))
        var response = callbackClass[callback](a, b, c, d);
        //  console.log("conduct response",response)
        return response;
    }

    static conductForEachFlow(a, b, options) {


    }
}

class operator {
    //    //arr.every(callback(element[, index[, array]])[, thisArg])
    static onEvery1(a, b, callbacks) { return callbacks.every(function (callback) {return operate[callback](a, b);}); }

}

class operate {

    // operate to check if the input is not null or undefined to be added
    static isEmpty(argA) { return Object.keys(argA).length === 0 }
    static isNotEmpty(argA) { return argA !== '' && argA !== null && typeof argA !== 'undefined' }
    //returs the data Type of the input.
    static is(argA) { return Object.getPrototypeOf(argA).constructor.name; }
    static isInt(argA) { return Number.isInteger(argA); }
    static isNumber(argA) { return Number.parseFloat(argA).toString() !== 'NaN' }
    static isString(argA) { return typeof argA === 'string' }
    /**
     * returns if the input is a key/value in the object options.argB
     * @param {*} argA
     * @param {*} argB  is required to be not empty
     *
     */
    static isIn(argA, argB) { return argB.indexOf(argA) > -1; }
    //curently works only for string numbers
    static isEqualStrict(argA, argB) { return argA === argB; }
    //for array's one sided value existence check, return true if each element of a is present in b
    static isGreaterThan(argA, argB) { return argA > argB }
    static isGreaterthanOrEqual(argA, argB) { return argA => !!argB }
    static isSmallerthan(argA, argB) { return argA < argB }
    static isSmallerthanOrEqual(argA, argB) { return argA <= argB }
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
    // Returns if a value is an array
    static isArray(value) { return value && Array.isArray(value) && typeof value === 'object' && value.constructor === Array; }
    // Returns if a value is a static
    static isstatic(value) { return typeof value === 'static'; }
    // Returns if a value is an object
    static isObject(value) { return value && typeof value === 'object' && value.constructor === Object; }
    static isHTML(argA) { return operate.is(argA).includes("HTML") }
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
    static isChild(argA, argB) { }
    static isParent(argA, argB) { }
    static isEven(argA) { return numbers.every(function (e) { return e % 2 === 0; }); }
    static isOdd(argA) { return numbers.every(function (e) { return Math.abs(e % 2) === 1; }); }
}

function* createIndex() {
    let number = 1;
    while (true)
        yield number++;
}




//console.log(isInRange)
//output = operate.isHTML(inputElement, inputB);
//console.log(output);
//console.log(inputElement)

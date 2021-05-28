/**
 * This class is used to validate any kind of entity,
 * It has following methods :-
 * 1. validate : to validate given rules on a given entity, it takes three parameters :-
 *          a. value : which is to be validated,
 *          b. rules : rules for which validation to be checked , <String, Array, Object>
 *                     sampleObject = {
 *                          'yes':(which should be true <string or array>),
 *                          'no':(which should be false <string or array>)
 *                     }
 *          c.every: 
 *                  true:every rule provided resulting true will return true (default).
 *                  false:any rule provided resulting true will return true .
 * 2. operators : object containing methods corresponding to a given rule.
  */
class Operate {
        static validate = (value, rules, every = true) => {
            if (typeof rules === 'string') rules = [rules];
            else if (typeof rules === 'object' && !Array.isArray(rules)) {
                if (!rules['yes']) rules['yes'] = ["true"];
                if (!rules['no']) rules['no'] = ["false"];
                return Operate.validate(value, rules['yes'], every) && !Operate.validate(value, rules['no'], every);
            }
            return rules[every ? "every" : "some"](rule => this["operators"][rule](value));
        }
        static convert = (value, type)=> this["converters"][type](value);
        static converters = {
            "toInt" : argA => Number.isInteger(parseInt(argA)) ? parseInt(argA) : null ,
            "toFloat" : argA => ! Number.isNaN(parseFloat(argA)) ? parseFloat(argA) : null ,
            "toString": argA => argA.toString(),
        }
        static operators = {
            "true": () => true,
            "false": () => false,
            "is": (argA) => Object.getPrototypeOf(argA).constructor.name,
            "isEmpty": (argA) => argA == '' || argA == null || typeof argA == 'undefined' ? true : false,
            "isInt": (argA) => Number.isInteger(argA),
            "isNumber": (argA) => Number.parseFloat(argA).toString() !== 'NaN',
            "isString": (argA) => typeof argA === 'string',
            "isObject": (argA) => typeof argA === 'object',
            "isFunction": (argA) => argA.constructor.name == "Function",
            "isInside": ([argA, argB, inKeys]) => {
                let keys, values, result = false;
                if (typeof argB === 'object' && ! Array.isArray(argB)) {
                    keys = inKeys ? Object.keys(argB) : [];
                    values = Object.values(argB);
                    result = values.indexOf(argA) > -1 || keys.indexOf(argA) > -1 ;
                }
                else result = argB.indexOf(argA) > -1 ? true : false
                return result;
            },
            "isEqualStrict": ([argA, argB]) => argA === argB ? true : false,
            "isGreaterThan": ([argA, argB]) => argA > argB ? true : false,
            "isGreaterthanOrEqual": ([argA, argB]) => argA >= argB ? true : false,
            "isSmallerthan": ([argA, argB]) => argA < argB ? true : false,
            "isSmallerthanOrEqual": ([argA, argB]) => (argA <= argB) ? true : false,
            "isTypeof":([argA, argB])=> typeof argA === argB ? true : false,
            "isInstanceOf": ([argA, argB]) => argA instanceof argB ? true : false,
            "isSameObject": ([argA, argB]) => console.log("work in process"),
            "hasAllof": ([argA, argB]) => argA.every(function (value) {
                console.log(value, argB);
                return operate.isIn(value, argB)
            }), //check if argB has all the keys from argA // only for array.
            "arrayIncludes": ([argA, argB]) => argA.includes(function (value) {
                return operate.isIn(value, argB);
            }), //Check for bothArgument to be Number and Integer to be added.
            "isInRangeNumbers": ([argA, argB]) => argA.every(function (value) {
                return operate.isGreaterthanOrEqual(value, argB.min) && operate.isSmallerthanOrEqual(value, argB.max);
            }),
            "isSameArray": ([argA, argB]) => {
                argA.sort();
                argB.sort();
                if (argA.length !== argB.length) return false;
                for (let i = 0; i < argA.length; i++) {
                    if (argA[i] !== argB[i]) return false;
                }
                return true;
            },
            // checks for null and undefined
            "isIterable": (obj) => {
                if (obj == null) {
                    return false;
                }
                return typeof obj[Symbol.iterator] === 'function';
            },
    
            // Returns if a value is an array
            "isArray": (value) => Array.isArray(value) && typeof value === 'object' && value.constructor === Array,
            // Returns if a value is a static
            "isstatic": (value) => typeof value === 'static',
            // Returns if a value is an object
            // "isObject": ([value]) => value && typeof value === 'object' && value.constructor === Object,
            "isHTML": (argA) => Object.getPrototypeOf(argA).constructor.name.includes("HTML"),
            //Retuns if a values is either of null or undefined
            "isUseless": (value) => (value === null || typeof value === 'undefined') ? true : false,
            // Returns if a value is null
            "isNull": (value) => value === null,
            // Returns if a value is undefined 
            "isUndefined": (value) => typeof value === 'undefined',
            // Returns if a value is a boolean 
            "isBoolean": (value) => typeof value === 'boolean',
            //Returns if a value is a regexp
            "isRegExp": (value) => value && typeof value === 'object' && value.constructor === RegExp,
            // Returns if value is an error object
            "isError": (value) => value instanceof Error && typeof value.message !== 'undefined',
            // Returns if value is a date object
            "isDate": (value) => value instanceof Date,
            //Returns if the value is a Prototyp
            "isPrototype": (value) => {
                console.log(Object.getPrototypeOf(value) === prototype1);
            },
            // Returns if a Symbol
            "isSymbol": (value) => typeof value === 'symbol',
            //This function validates a valid Url, Returns True or false
            "isValidUrl": (string) => {
                try {
                    new URL(string);
                } catch (_) {
                    return false;
                }
                return true;
            },
            "isValidJSONString": (str) => {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            },
            /**
             *  * Returns true if the given test value is an array containing at least one object; false otherwise.
             * */
            "isObjectArray_": (argA) => {
                for (var i = 0; i < argA.length; i++) {
                    if (Operate.isObject(argA[i])) {
                        return true;
                    }
                }
                return false;
            },
            "isNegative": x => x < 0,
            "isZero": x => parseFloat(x) === 0,
            "isPositive": x => x > 0,
            "isChild": ([argA, argB]) => {},
            "isParent": ([argA, argB]) => {},
            "isEven": (argA) => {
                return numbers.every(function (e) {
                    return e % 2 == 0;
                });
            },
            "isOdd": (argA) => {
                return numbers.every(function (e) {
                    return Math.abs(e % 2) == 1;
                });
            }
        }
    
    }

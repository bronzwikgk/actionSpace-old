





class Entity {
    constructor(input, output) {
        this.entity = process.processReq(input, output);
        // console.log(this);
    }

    static create(input, output, key, value, callback, callbackClass) {
        // console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            var response = document.createElement(key);
            // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            console.log("create request for ", input, output, key, value);

            response = new Object();

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            console.log("create request for ", input, output, key, value);

            response = new Object();

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

    static append(input, output, key, value, callback, callbackClass) {
        console.log('appending', input, output);

        if (operate.is(output).includes("HTML")) { //Onl
            console.log(output)// y HTML creation
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
        // console.log(document.getElementsByTagName('toolbar'))
        return response;
    }

    static set(input, output, key, value, callback, callbackClass) {
        // console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation

            if (operate.isIn(key, htmlAttributesList)) {
                //console.log("setting",key, value,"in",output)
                output.setAttribute(key, value);
                //console.log(output);
            } else {
                //var buffer = output;
                output[key] = input[key];
                //buffer=output;

            }

        }
        return output;
    }



}

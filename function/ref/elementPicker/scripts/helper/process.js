
class process {
    static processReq(input, output, key, value) {
        console.log(input);
        if (operate.is(input) === 'Object') {
            // console.log("obj")
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'Array') {
            // console.log("arr")
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'String') {

            console.log('String >>>', key, value);
            //Entity.set(input,this.output,key,value);
        }
        return buffer;
    }

    static iterateObj(input, output) {
        for (var key in input) {
            const value = input[key];
            // console.log("found", key, input[key])
            if (operate.is(value) === 'Object') {
                // console.log("Object", output);
                var buffer = Entity.create(input, output, key);
                process.iterateObj(input[key], buffer, key, value)
                Entity.append(buffer, output);
            } else if (operate.is(value) === 'Array') {
                // console.log("foundArray", key)


                var buffer = Entity.create(input, output, key);
                process.iterateArr(input[key], buffer, key, value)
                Entity.append(buffer, output);
                // console.log('Array',key, value, buffer);
            } else if (operate.is(value) === 'String' || operate.is(value) === 'Boolean') {
                // console.log('String',key, value);
                Entity.set(input, output, key, value);
                //Entity.set(input,this.entity,key,value);
            }

        }
        // console.log('Iterate Objoutput',output)
        return output;
    }

    static iterateArr(input, output, key, value, callback, callbackClass) {
        //  console.log("Iterating Array", input, output, key, value);

        for (var i = 0; i < input.length; i++) {
            //console.log("Object found in array", input[i]);

            if (operate.is(input[i]) === 'Object') { //console.log("Object in array",response)

                var response = Entity.create(input[i], output, input[i].name);
                process.iterateObj(input[i], response, input[i].name);
                Entity.append(response, output);

            } else if (operate.is(input[i]) === 'Array') { // console.log("found Array", key, input[key])

            } else if (operate.is(input[i]) === 'String') { //  console.log("found property, Set Attributes in output", key, input[key])

                // Entity.set(input,output,key,input[key])
            } else {

                console.log("stray found")
            }
            //console.log(callbackClass,callback)
            //   console.log(key, input[key])
            //var response = operate.isNotEmpty(callback) ? conductor.conduct(input, output, key, input[key], callback, callbackClass) : null;
            if (operate.isNotEmpty(callback)) {

                //  var response = conductor.conduct(input, output, key, input[key], callback, callbackClass);

            }
        }
        console.log("iterator Array response", response);
        return response;
    }
    static json2HTML(form) {
        var output = document.createElement(form.tagName);
        process.assignAttributes(form, output);
        if (form.innerText) {
            output.innerText = form.innerText;
        }
        if (form.childNodes.length > 0) {
            process.assignChildNodes(form.childNodes, output, process.json2HTML);
        }
        return output;
    }

    static assignAttributes(obj, objResponse) {
        if (!obj) return;
        if (!objResponse) {
            var objResponse = {};
        }
        for (var key in obj) {
            if (key !== "tagName" && key !== "childNodes")
                objResponse = process.setData(obj, objResponse, key);
        }
        return objResponse;
    }

    static assignChildNodes(child, childResponse, callback) {
        if (!child) return;
        if (!childResponse) {
            var childResponse = [];
        }
        ;
        for (var i = 0; i < child.length; i++) {
            childResponse = process.setData(child, childResponse, i, callback);
        }
        return childResponse;
    }

    static setData(input, output, key, callback = {}) {
        if (output instanceof Array) {
            if (input[key].nodeType === Node.TEXT_NODE)
                output.push(input[key].textContent);
            else if (typeof callback === "function")
                output.push(callback(input[key]));
        }
        if (typeof output === 'object' && input[key].value !== undefined)
            output[input[key].name] = input[key].value;
        if (output instanceof HTMLElement)
            if (typeof key === 'number' && typeof callback === "function")
                output.appendChild(callback(input[key]));
            else
                output.setAttribute(key, input[key]);
        return output;
    }

    static HTML2json(nodeE) {
        return {
            tagName: nodeE.tagName,
            attributes: process.assignAttributes(nodeE.attributes, {}),
            childNodes: process.assignChildNodes(nodeE.childNodes, [], process.HTML2json),
        };
    }
}

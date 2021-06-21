window.CreateEntity = class {
    constructor() {

    }
    static create(input, output) {
        //console.log(input, output)
        if (operate.isUseless(input)) return;
        // object, html, 2d array, textContent
        try {
            if (operate.isString(input)) {
                input = JSON.parse(input);
            }
        } catch (error) {
            console.log('input file content is not in JSON format.');
            return input;
        }

        if (Array.isArray(input)) {
            if (operate.isHTML(output)) {
                // check if it's 2d array (strictly)
                let canTable = input.every(item => Array.isArray(item));
                if (canTable) {
                    this.append(output, this.parse2D(input));
                }
                else{
                    for (let i = 0; i < input.length; i++) {
                        var element = input[i];
                        if (operate.isObject(element)) {
                            this.create(element, output)
                        } else {
                            console.log('under construction');
                        }
                    }
                }
            } else if(operate.isObject(output)){
                for(let i = 0; i<input.length; i++){
                    let value = input[i];
                    output[`${i}`] = value;
                }
            }else if(Array.isArray(output)) {
                output.push(this.clone(input));
            }
        } else if (operate.isObject(input)) {
            if (operate.isHTML(output)) {
                var tag = input['name'] || 'span',
                    result = document.createElement(tag);

                for (let key in input) {
                    if (Object.hasOwnProperty.call(input, key)) {
                        let value = input[key];
                        if (key == 'attributes') {
                            this.setProps(result, value);
                        } else if (key == 'items') {
                            this.append(result, value);
                        } else if (key == 'id') {
                            if (value.indexOf('<uid>') > -1) {
                                result.id = this.uniqueId(5);
                            } else {
                                result.id = value;
                            }
                        }
                    }
                }
                this.append(output, result);
            } else if (Array.isArray(output)) {
                this.append(output, Object.values(input));
            } else if (operate.isObject(output)) {
                output["result"] = this.clone(input);
            }
        } else if (operate.isHTML(input)) {
            if (Array.isArray(output)) {
                if (input.tagName == "TABLE") {
                    this.append(output, this.parse2D(input));
                } else {
                    console.log("Under Construction");
                }
            } else if (operate.isHTML(output)) {
                this.append(output, input);
            } else if (operate.isObject(output)) {
                this.setProps(output, this.toJSON(input));
            }

        }
    }

    static setProps(input, props) {
        if (operate.isUseless(input)) return;

        for (let key in props) {
            if (Object.hasOwnProperty.call(props, key)) {
                let value = props[key];
                if (operate.is(input).includes('HTML')) {
                    input.setAttribute(key, value);
                } else if (operate.isObject(input)) {
                    input[key] = value;
                }
            }
        }
    }

    static getProps(input, props){
        var result = [];
        for (let i = 0; i < props.length; i++) {
            var key = props[i];
            if (operate.is(input).includes('HTML')) {
                result.push(input.getAttribute(key));
            } else if (operate.isObject(input)) {
                result.push(input[key]);
            }
            
        }
        return result;
    }

    static append(input, valueObj, entryName) {
        if (operate.isUseless(input)) return;

        if (operate.is(input).includes('HTML')) {
            if (!operate.is(valueObj).includes('Object')) {
                input.append(valueObj);
            } else {
                for (let key in valueObj) {
                    if (Object.hasOwnProperty.call(valueObj, key)) {
                        let value = valueObj[key],
                            type = key;
                        if(key.indexOf("##") > -1){
                            type = key.slice(0, key.indexOf("##"));
                        }
                        switch (type) {
                            case 'text':
                                this.append(input, document.createTextNode(value));
                                break;

                            case 'html':
                                input.innerHTML += value;
                                break;

                            case 'comment':
                                this.append(input, document.createComment(value));
                                break;

                            case 'element':
                                this.create(value, input);
                                break;
                            default:
                                console.error('Not a valid element', key, value);
                                break;
                        }
                    }
                }
            }

        } else if (operate.is(input).includes('Object')) {
            input[entryName] = valueObj;
        } else if (Array.isArray(input)) {
            if (operate.isObject(valueObj)) {
                valueObj = Object.values(valueObj);
            } else if (!Array.isArray(valueObj)) {
                valueObj = [valueObj];
            }
            for (let i = 0; i < valueObj.length; i++) {
                input.push(valueObj[i]);
            }
        }
    }

    static parse2D(input) {
        var result;
        if (operate.is(input).includes("HTML")) {
            var ary = [],
                rows = input.rows;
            for (let i = 0; i < rows.length; i++) {
                var row = rows[i],
                    cells = row.cells,
                    tempArr = [];
                for (let j = 0; j < cells.length; j++) {
                    var cell = cells[j];
                    tempArr.push(cell.innerHTML);
                }
                ary.push(tempArr);
            }
            return ary;
        } else if (Array.isArray(input)) {
            var table = document.createElement('table');
            var tableBody = document.createElement('tbody');

            for (let i = 0; i < input.length; i++) {
                var rowData = input[i];
                var row = document.createElement('tr');

                for (let j = 0; j < rowData.length; j++) {
                    var cellData = rowData[j],
                        cell = document.createElement('td'),
                        div = document.createElement('div');

                    div.innerHTML = cellData;
                    cell.append(div);
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
            }

            table.appendChild(tableBody);
            return table;
        }
    }

    static clone(obj) {
        if (typeof obj === 'undefined' || obj === null) return;
        else if (obj === window || obj === document) return obj;
        
        var output;
        if (Array.isArray(obj)) {
            output = [];
        } else if (operate.isObject(obj)) {
            output = {};
        } else return obj;

        for (let key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                var element = obj[key];
                if (operate.isObject(element) || Array.isArray(obj)) {
                    output[key] = this.clone(element);
                } else if (operate.isFunction(element)) {
                    output[key] = element.bind(obj);
                    // for (let keyProp in element.prototype) {
                    //     if (Object.prototype.hasOwnProperty.call(element.prototype, keyProp)) {
                    //         output[key].prototype = {
                    //             [keyProp]: element.prototype[keyProp]
                    //         }
                    //     }
                    // }
                } else {
                    output[key] = element;
                }
            }
        }

        return output;
    }

    static toJSON(object) {
        if (operate.isUseless(object)) return;
        if (!operate.isHTML(object)) {
            console.error('Object is not valid HTML type. It is :', operate.is(object));
            return object;
        }
        var output = {};

        output["name"] = object['tagName'].toLowerCase();

        output["attributes"] = {}
        for (var i = 0; i < object.attributes.length; i++) {
            var attribute = object.attributes[i];
            output["attributes"]["" + attribute.name] = attribute.value;
        }

        output["items"] = {};
        let index = 0;
        for (var i = 0; i < object.childNodes.length; i++) {
            var node = object.childNodes[i];
            if (node == null || typeof node == 'undefined') continue;
            switch (node.nodeType) {
                case 1:
                    output["items"]["element##" + index++] = this.toJSON(node);
                    break;
                case 3:
                    var nodeContent = node.textContent.trim();
                    if (nodeContent !== "") {
                        output["items"]["text##" + index++] = nodeContent;
                    }
                    break;
                case 8:
                    nodeContent = node.textContent.trim();
                    if (nodeContent !== "") {
                        output["items"]["comment##" + index++] = nodeContent;
                    }
                    break;
                default:
                    console.log("cannot process given node", node);
                    break;
            }
        }

        return output;

    }

    static uniqueId(length) {
        if (operate.isUseless(length) || !operate.isInt(length)) length = 12;
        let randy = Math.floor(Math.random() * Math.pow(10, 4) * 36),
            timmy = Date.now();
        length = Math.min(12, length);
        return (timmy.toString(36).slice(-8) +randy.toString(36).padStart(4, '0'));
    }

}
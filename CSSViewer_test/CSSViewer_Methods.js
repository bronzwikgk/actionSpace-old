var renderDOM = function (parent, element, method) {
    if (Array.isArray(parent) || parent.constructor.name.includes('Object')) parent = parent[0];

    if (Array.isArray(element) || element.constructor.name.includes('Object')) {
        for (key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                renderDOM(parent, element[key], method)
            }
        }
    } else parent[method](element);
}

var processReq = function (reqModel) {
    let result = {};

    if (typeof reqModel === 'undefined') return;

    if (typeof reqModel === 'string') { // if reqModel Not found, throw Error
        reqModel = window[reqModel]
        if (!reqModel) throw new Error('req Model not found', reqModel);
    }

    if (Array.isArray(reqModel)) {
        reqModel.forEach((item, i) => {
            result[i] = processReq(item);
        })
    } else if (!reqModel['reqName']) { // if reqModel object is not a valid reqModel, return it
        return reqModel;
    }

    if (!reqModel['loop']) reqModel['loop'] = 1;
    if (!reqModel['arguments']) reqModel['arguments'] = [];
    if (!reqModel['andThen']) reqModel['andThen'] = [];

    for (const key in reqModel) {
        if (Object.hasOwnProperty.call(reqModel, key)) {
            let value = reqModel[key];

            if (key === 'objectModel' && typeof value === 'string') {
                value = window[value];
                if (typeof value === 'object') value = processReq(value);
            }

            if (key === 'arguments' || key === 'andThen') {
                if (!value) value = [];
                else {
                    value.forEach((item, i) => {
                        if (typeof item === 'object') {
                            value[i] = processReq(item);
                        } else {
                            value[i] = item;
                        }
                    })
                }
            }

            if (key === 'loop' && !value) value = 1;

            result[key] = value;
        }
    }

    return result;
}

var action = function (reqModel) {
    let result = {};

    if (typeof reqModel === 'undefined') return;

    if (Array.isArray(reqModel)) {
        reqModel.forEach((item, i) => {
            result[i] = action(item);
        })
    } else if (!reqModel['reqName']) { // if reqModel object is not a valid reqModel, return it
        return reqModel;
    }


    let loop = reqModel['loop'],
        callBackOuter = reqModel['callBackOutLoop'];
    if (loop['reqName']) loop = action(processReq(loop));

    for (let i = 0; i < loop; i++) {

        let objModel = reqModel['objectModel'],
            args = clone(reqModel['arguments']), // clone to avoid any changes in reqModel,
            path = clone(reqModel['path']), //  so in every run, it gets same reqModel
            andThen = clone(reqModel['andThen']),
            callBackInner = reqModel['callBackInLoop'],
            tempVal = clone(objModel);

        if (typeof tempVal === 'object' && tempVal['reqName']) tempVal = action(tempVal)['0'];

        for (let j = 0; j < path.length - 1; j++) {
            if (typeof path[j] === 'object' && path[j]['reqName']) path[j] = action(path[j]);
            tempVal = tempVal[path[j]];
        }

        for (let j = 0; j < args.length; j++) { // building args
            if (typeof args[j] === 'object' && args[j]['reqName']) {
                // console.log('inside args');
                args[j] = action(args[j]);
            };
        }

        tempVal = tempVal[path[path.length - 1]](...args);

        for (let j = 0; j < andThen.length; j++) { // processing andThen
            if (typeof andThen[j] === 'object' && andThen[j]['reqName']) andThen[j] = action(andThen[j]);

            if (tempVal) tempVal = tempVal[andThen[j]];
            else throw new Error("tempVal can't handle more andThen args, tempVal is", tempVal);
        }

        result[i] = tempVal;

        action(processReq(callBackInner));
    }

    if (loop < 2) result = result[0];

    action(processReq(callBackOuter));

    return result;
}

var createHTMLEntity = function (obj) {
    if (Operate.validate(obj, 'isUseless')) {
        console.log('useless')
        return document.createTextNode('');
    };
    if (Operate.validate(obj, 'isHTML')) return obj;
    if (obj['reqName']) {
        obj = action(processReq(obj));
    }
    if (Operate.validate(obj, 'isString')) return document.createTextNode(obj);

    let result;

    if (Operate.validate(obj, "isArray")) {
        result = [];
        for (let i = 0; i < obj.length; i++) {
            let value = createHTMLEntity(obj[i]);
            if (value) result.push(value);
        }
    } else {
        obj = clone(obj);

        let tagName = obj["name"] || obj["tagName"];
        if (!htmlElementList.includes(tagName) || bannedElements.includes(tagName)) return;
        let buffer = document.createElement(tagName);

        for (const key in obj) {
            let value = obj[key];
            if (key === "tagName") continue;

            if (value['reqName']) value = action(processReq(value));

            if (key === 'childNodes' || key === 'children') {
                let val = createHTMLEntity(value);
                if (!Operate.validate(val, 'isUseless')) {
                    for (let i = 0; i < val.length; i++) {
                        renderDOM(buffer, val[i], 'appendChild');
                    }
                }
            }

            if (htmlInheritedAttributes.includes(key) || htmlManualAttributes.includes(key)) {
                buffer.setAttribute(key, value);
            }

        }
        result = buffer;
    }
    return result;
}

var clone = function (obj) {
    if (typeof obj === 'undefined' || obj === null) return;
    if (obj === window || obj === document) return obj;
    let output = new window[obj.constructor.name]();
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            let element = obj[key];
            if (element.constructor.name.includes('Object')) {
                output[key] = clone(element);
            } else if (element.constructor.name.includes('Function') && typeof element === 'function') {
                output[key] = element.bind(obj);
                for (let keyProp in element.prototype) {
                    if (Object.prototype.hasOwnProperty.call(element.prototype, keyProp)) {
                        output[key].prototype = {
                            [keyProp]: element.prototype[keyProp]
                        }
                    }
                }
            } else {
                output[key] = element;
            }
        }
    }

    return output;
}

var updateCSSObj = function (elem, obj) {
    let CSSObj = window.getComputedStyle(elem);

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            let value = obj[key];
            if (typeof value === 'object' && value.constructor.name.includes('Object')) updateCSSObj(elem, value)
            else if (typeof key === 'string' && value == '') obj[key] = CSSObj.getPropertyValue(key);
        }
    }
    return obj;
}
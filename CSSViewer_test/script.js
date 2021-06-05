var CSSViewer_categoriesProperties = {
    'pFontText': {
        'font-family': '',
        'font-size': '',
        'font-style': '',
        'font-variant': '',
        'font-weight': '',
        'letter-spacing': '',
        'line-height': '',
        'text-decoration': '',
        'text-align': '',
        'text-indent': '',
        'text-transform': '',
        'vertical-align': '',
        'white-space': '',
        'word-spacing': ''
    },
    'pColorBg': {
        'background-attachment': '',
        'background-color': '',
        'background-image': '',
        'background-position': '',
        'background-repeat': '',
        'color': '',
    },
    'pBox': {
        'height': '',
        'width': '',
        'border': '',
        'border-top': '',
        'border-right': '',
        'border-bottom': '',
        'border-left': '',
        'margin': '',
        'padding': '',
        'max-height': '',
        'min-height': '',
        'max-width': '',
        'min-width': ''
    },
    'pPositioning': {
        'position': '',
        'top': '',
        'bottom': '',
        'right': '',
        'left': '',
        'float': '',
        'display': '',
        'clear': '',
        'z-index': ''
    },
    'pList': {
        'list-style-image': '',
        'list-style-type': '',
        'list-style-position': ''
    },
    'pTable': {
        'border-collapse': '',
        'border-spacing': '',
        'caption-side': '',
        'empty-cells': '',
        'table-layout': ''
    },
    'pMisc': {
        'overflow': '',
        'cursor': '',
        'visibility': ''
    },
    'pEffect': {
        'transform': '',
        'transition': '',
        'outline': '',
        'outline-offset': '',
        'box-sizing': '',
        'resize': '',
        'text-shadow': '',
        'text-overflow': '',
        'word-wrap': '',
        'box-shadow': '',
        'border-top-left-radius': '',
        'border-top-right-radius': '',
        'border-bottom-left-radius': '',
        'border-bottom-right-radius': ''
    }
}

var CSSViewer_categoriesTitle = {
    'pFontText': 'Font & Text',
    'pColorBg': 'Color & Background',
    'pBox': 'Box',
    'pPositioning': 'Positioning',
    'pList': 'List',
    'pTable': 'Table',
    'pMisc': 'Miscellaneous',
    'pEffect': 'Effects'
};

var CSSViewerPropTemp = {
    "tagName": "span",
    "class": "property",
    "childNodes": [{
            "tagName": "span",
            "class": "propName",
            "style": "user-select: text;",
            "childNodes": [{
                reqName: "propName",
                    objectModel: "window",
                    type: "method",
                    path: ["Object", "keys"],
                    arguments: [{
                        reqName: "lastTabId",
                        objectModel: "window",
                        type: "method",
                        path: ["Object", "getOwnPropertyDescriptor"],
                        arguments: [CSSViewer_categoriesProperties, {
                            reqName: "index",
                            objectModel: "document",
                            type: "method",
                            path: ["querySelector"],
                            arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child"],
                            andThen: ["id"]
                        }],
                        andThen: ["value"]
                    }],
                    andThen: [{
                        reqName: "propertyIndexNumber",
                        objectModel: "document",
                        type: "method",
                        path: ["querySelector"],
                        arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child>#tabContent"],
                        andThen: ["children", "length"]
                    }]
            }],
        },
        ":",
        {
            "tagName": "input",
            "class": "propVal",
            "type": "text",
            "placeholder": "Property Value",
            "value": {
                reqName: "propName",
                    objectModel: "window",
                    type: "method",
                    path: ["Object", "values"],
                    arguments: [{
                        reqName: "lastTabId",
                        objectModel: "window",
                        type: "method",
                        path: ["Object", "getOwnPropertyDescriptor"],
                        arguments: [CSSViewer_categoriesProperties, {
                            reqName: "index",
                            objectModel: "document",
                            type: "method",
                            path: ["querySelector"],
                            arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child"],
                            andThen: ["id"]
                        }],
                        andThen: ["value"]
                    }],
                    andThen: [{
                        reqName: "propertyIndexNumber",
                        objectModel: "document",
                        type: "method",
                        path: ["querySelector"],
                        arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child>#tabContent"],
                        andThen: ["children", "length"]
                    }]
            }
        }
    ]
};

/* 



                
*/

var propValReqModel = {
    reqName: "propValTemp",
    objectModel: "window",
    type: "method",
    path: ["renderDOM"],
    arguments: [{
        reqName: "appendProperty",
        objectModel: "document",
        type: "method",
        path: ["querySelector"],
        arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child>#tabContent"]
    }, {
        reqName: "CSSViewerPropTemp",
        objectModel: "window",
        type: "method",
        path: ["createHTMLEntity"],
        arguments: [CSSViewerPropTemp]
    }, "append"],
    loop: {
        reqName: "propertiesLoopValue",
        objectModel: "window",
        type: "method",
        path: ["Object", "keys"],
        arguments:[{
        reqName: "propertiesObject",
        objectModel: "window",
        type: "method",
        path: ["Object", "getOwnPropertyDescriptor"],
        arguments: [CSSViewer_categoriesProperties, {
            reqName: "lastTabId",
            objectModel: "document",
            type: "method",
            path: ["querySelector"],
            arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child"],
            andThen: ["id"]
        }],
        andThen: ["value"]
    }],
    andThen: ["length"]
    }
}

// document["querySelector"]("#CSSViewerBox>#tabContainer>.tab:last-child>.tabContent").children.length


// {
//     reqName: "tabName_Id",
//     objectModel: "window",
//     type: "method",
//     path: ["Object", "values"],
//     arguments: [CSSViewer_categories],
//     andThen: [{
//         reqName: "index",
//         objectModel: "document",
//         type: "method",
//         path: ["querySelector"],
//         arguments: ["#CSSViewerBox>#tabContainer"],
//         andThen: ["children", "length"]
//     }]
// }

var CSSViewerTabTemp = {
    "tagName": "div",
    "id": {
        reqName: "tabName_Id",
        objectModel: "window",
        type: "method",
        path: ["Object", "keys"],
        arguments: [CSSViewer_categoriesTitle],
        andThen: [{
            reqName: "index",
            objectModel: "document",
            type: "method",
            path: ["querySelector"],
            arguments: ["#CSSViewerBox>#tabContainer"],
            andThen: ["children", "length"]
        }]
    },
    "class": "tab",
    "childNodes": [{
            "tagName": "span",
            "class": "tabTitle",
            "id": "tabTitle",
            "childNodes": [{
                    "tagName": "span",
                    "class": "pointer",
                    "childNodes": [
                        "+"
                    ]
                },
                {
                    reqName: "tabTitle_Title",
                    objectModel: "window",
                    type: "method",
                    path: ["Object", "values"],
                    arguments: [CSSViewer_categoriesTitle],
                    andThen: [{
                        reqName: "index",
                        objectModel: "document",
                        type: "method",
                        path: ["querySelector"],
                        arguments: ["#CSSViewerBox>#tabContainer"],
                        andThen: ["children", "length"]
                    }]
                }
            ]
        },
        {
            "tagName": "div",
            "class": "tabContent",
            "id": "tabContent",
            "style": "user-select: none;",
            "childNodes": []
        }
    ]
}
//document.getElementsByClassName('CSSViewerActiveElem')[0].tagName
var CSSViewerTemp = {
    "tagName": "div",
    "class": "CSSViewer",
    "id": "CSSViewerBox",
    "childNodes": [{
            "tagName": "span",
            "class": "elemIdentifier",
            "id": "elemIdentifier",
            "childNodes": [{
                    reqName: "CSSViewerActiveElemTagName",
                    objectModel: "document",
                    type: "method",
                    path: ["querySelector"],
                    arguments: [".CSSViewerActiveElem"],
                    andThen: ["tagName"]
                },
                "#",
                {
                    reqName: "CSSViewerActiveElemTagName",
                    objectModel: "document",
                    type: "method",
                    path: ["querySelector"],
                    arguments: [".CSSViewerActiveElem"],
                    andThen: ["id"]
                },
                ".",
                {
                    reqName: "CSSViewerActiveElemTagName",
                    objectModel: "document",
                    type: "method",
                    path: ["querySelector"],
                    arguments: [".CSSViewerActiveElem"],
                    andThen: ["className"]
                }
            ]
        },
        {
            "tagName": "div",
            "class": "accordion scroll--simple",
            "id": "tabContainer",
            "childNodes": []
        }
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var alertHello = {
    reqName: "alertHello",
    objectModel: "window",
    type: "method",
    path: ["alert"],
    arguments: ["Hello, This is Vipin Suthar"]
}

var CSSViewerBox = {
    reqName: "CSSViewerBox",
    objectModel: "document",
    type: "method",
    path: ["getElementById"],
    arguments: ["CSSViewerBox"]
}
var elemIdentifier = {
    reqName: "elemIdentifier",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#elemIdentifier"]
}

var tabContainer = {
    reqName: "tabContainer",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer"],
    loop: 1,
    andThen: []
}

// var CSSViewerCatName = {
//     reqName: "CSSViewerCatName",
//     objectModel: "document",
//     type: "method",
//     path: ["querySelector"],
//     arguments: ["#CSSViewerBox>#tabContainer"],
//     andThen: ["children", "length"]
// }

// var CSSViewerCatName = {
//     reqName: "CSSViewerCatName",
//     objectModel: "Object",
//     type: "method",
//     path: ["keys"],
//     arguments: [CSSViewer_categories],
//     andThen: ["children", "length"]
// }

var bodyElem = {
    reqName: "Any",
    objectModel: "document",
    type: "method",
    path: ["getElementsByTagName"],
    arguments: ["body"]
};

var dataModelT = {
    reqName: "dataModelT",
    objectModel: "window",
    type: "method",
    path: ["renderDOM"],
    arguments: [tabContainer, {
        reqName: "tabTemp",
        objectModel: "window",
        type: "method",
        path: ["createHTMLEntity"],
        arguments: [CSSViewerTabTemp],
        loop: 1
    }, "append"],
    callBackInLoop: propValReqModel,
    loop: Object.keys(CSSViewer_categoriesProperties).length
}

var dataModel = {
    reqName: "Any",
    objectModel: "bodyElem",
    type: "method",
    path: ["append"],
    arguments: [{
        reqName: "a",
        objectModel: "window",
        type: "method",
        path: ["createHTMLEntity"],
        arguments: [CSSViewerTemp]
    }],
    callBackOutLoop: dataModelT
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

var updateCSSObj = function(elem, obj){
    let CSSObj = window.getComputedStyle(elem);

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            let value = obj[key];
            if (typeof value === 'object' && value.constructor.name.includes('Object')) updateCSSObj(elem, value)
            else if(typeof key ==='string' && value == '') obj[key] = CSSObj.getPropertyValue(key);
        }
    }
    return obj;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onmouseover = function (e) {
    let targetElem = e.target,
        datamod = targetElem.getAttribute('data-model'),
        cssbox = document.getElementById('CSSViewerBox'),
        activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
    if (cssbox && !e.path.includes(cssbox)) {
        cssbox.remove();
        activeElem.classList.remove('CSSViewerActiveElem');
    }
    if (datamod !== null && typeof datamod !== 'undefined') {
        updateCSSObj(targetElem, CSSViewer_categoriesProperties);
        targetElem.classList.add('CSSViewerActiveElem');
        let result = processReq(datamod);
        action(result);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelectorAll(".accordion>.tab>.tabTitle>.pointer").forEach(function (item) {
            item.onclick = function (e) {
                let targetTab = this.parentElement.parentElement,
                    activeTab = document.querySelector('.accordion>.tab.active');
                if (targetTab.classList.contains('active')) {
                    targetTab.classList.remove('active');
                    targetTab.style.height = "30px";
                } else {
                    if (activeTab) {
                        activeTab.classList.remove("active");
                        activeTab.style.height = "30px";
                    };
                    targetTab.classList.add("active");
                    targetTab.style.height = targetTab.scrollHeight + "px"
                }

            };
        })
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

}
// window.onmouseout = function () {
//     let cssbox = document.getElementById('CSSViewerBox');
//     if (cssbox && !cssBoxRemove) {
//         cssBoxRemove = true;
//     }
// }
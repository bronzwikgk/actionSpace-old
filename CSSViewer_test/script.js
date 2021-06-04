var CSSViewer_pFont = new Array(
    'font-family',
    'font-size',
    'font-style',
    'font-variant',
    'font-weight',
    'letter-spacing',
    'line-height',
    'text-decoration',
    'text-align',
    'text-indent',
    'text-transform',
    'vertical-align',
    'white-space',
    'word-spacing'
);

var CSSViewer_pColorBg = new Array(
    'background-attachment',
    'background-color',
    'background-image',
    'background-position',
    'background-repeat',
    'color'
);

var CSSViewer_pBox = new Array(
    'height',
    'width',
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'margin',
    'padding',
    'max-height',
    'min-height',
    'max-width',
    'min-width'
);

var CSSViewer_pPositioning = new Array(
    'position',
    'top',
    'bottom',
    'right',
    'left',
    'float',
    'display',
    'clear',
    'z-index'
);

var CSSViewer_pList = new Array(
    'list-style-image',
    'list-style-type',
    'list-style-position'
);

var CSSViewer_pTable = new Array(
    'border-collapse',
    'border-spacing',
    'caption-side',
    'empty-cells',
    'table-layout'
);

var CSSViewer_pMisc = new Array(
    'overflow',
    'cursor',
    'visibility'
);

var CSSViewer_pEffect = new Array(
    'transform',
    'transition',
    'outline',
    'outline-offset',
    'box-sizing',
    'resize',
    'text-shadow',
    'text-overflow',
    'word-wrap',
    'box-shadow',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius'
);

// CSS Property categories
var CSSViewer_categories = {
    'pFontText': CSSViewer_pFont,
    'pColorBg': CSSViewer_pColorBg,
    'pBox': CSSViewer_pBox,
    'pPositioning': CSSViewer_pPositioning,
    'pList': CSSViewer_pList,
    'pTable': CSSViewer_pTable,
    'pMisc': CSSViewer_pMisc,
    'pEffect': CSSViewer_pEffect
};

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

var CSSViewerTabTemp = {
    "tagName": "div",
    "id": {
        reqName: "tabName_Id",
        objectModel: "window",
        type: "method",
        path: ["Object", "keys"],
        arguments: [CSSViewer_categories],
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
                }

            ]
        },
        {
            "tagName": "div",
            "class": "tabContent",
            "id": "tabContent",
            "style": "user-select: none;",
            "childNodes": [{
                    "tagName": "span",
                    "class": "propName",
                    "style": "user-select: text;",
                    "childNodes": ["Property Name"]
                },
                ":",
                {
                    "tagName": "input",
                    "class": "propVal",
                    "type": "text",
                    "placeholder": "Property Value"
                }
            ]
        }
    ]
}

var CSSViewerTemp = {
    "tagName": "div",
    "class": "CSSViewer",
    "id": "CSSViewerBox",
    "childNodes": [{
            "tagName": "span",
            "class": "elemIdentifier",
            "id": "elemIdentifier",
            "childNodes": ["TAG#id.class"]
        },
        {
            "tagName": "div",
            "class": "accordion scroll--simple",
            "id": "tabContainer",
            "childNodes": [CSSViewerTabTemp]
        }
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    arguments: ["body"],
    andThen: ["0"]
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
    loop: Object.keys(CSSViewer_categories).length
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
    }]
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var renderDOM = function (parent, element, method) {
    if (Array.isArray(parent) || parent.constructor.name.includes('Object')) parent = parent[0];

    if (Array.isArray(element) || element.constructor.name.includes('Object')) {
        for (key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                parent[method](element[key]);
            }
        }
    } else parent[method](element);
}

var processReq = function (reqModel) {
    let result = {};
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

    if (Array.isArray(reqModel)) {
        reqModel.forEach((item, i) => {
            result[i] = action(item);
        })
    } else if (!reqModel['reqName']) { // if reqModel object is not a valid reqModel, return it
        return reqModel;
    }

    let loop = reqModel['loop'];

    for (let i = 0; i < loop; i++) {

        let objModel = reqModel['objectModel'],
            args = clone(reqModel['arguments']), // clone to avoid any changes in reqModel,
            path = clone(reqModel['path']),     //  so in every run, it gets same reqModel
            andThen = clone(reqModel['andThen']),
            tempVal = objModel;

        if (typeof tempVal === 'object' && tempVal['reqName']) tempVal = action(clone(tempVal))['0'];

        for (let j = 0; j < path.length - 1; j++) {
            if (typeof path[j] === 'object' && path[j]['reqName']) path[j] = action(path[j]);
            tempVal = tempVal[path[j]];
        }

        for (let j = 0; j < args.length; j++) { // building args
            if (typeof args[j] === 'object' && args[j]['reqName']) {
                console.log('inside args');
                args[j] = action(args[j]);
            };
        }

        tempVal = tempVal[path[path.length - 1]](...args);

        andThen = clone(andThen);
        for (let j = 0; j < andThen.length; j++) { // processing andThen
            if (typeof andThen[j] === 'object' && andThen[j]['reqName']) andThen[j] = action(andThen[j]);

            if (tempVal) tempVal = tempVal[andThen[j]];
            else throw new Error("tempVal can't handle more andThen args, tempVal is", tempVal);
        }

        result[i] = tempVal;
    }

    if (loop < 2) result = result[0];

    return result;
}

var createHTMLEntity = function (obj) {
    if (Operate.validate(obj, 'isUseless')) return console.log('useless');
    if (Operate.validate(obj, 'isString')) return document.createTextNode(obj);
    if (Operate.validate(obj, 'isHTML')) return obj;
    if (obj['reqName']) {
        obj = action(processReq(obj));
    }
    let result;
    if (Operate.validate(obj, "isArray")) {
        result = [];
        for (let i = 0; i < obj.length; i++) {
            let value = createHTMLEntity(obj[i]);
            if (value) result.push(value);
        }
    } else {
        let tagName = obj["name"] || obj["tagName"];
        if (!htmlElementList.includes(tagName) || bannedElements.includes(tagName)) return;
        let buffer = document.createElement(tagName);
        for (const key in obj) {
            let attr = obj[key];
            if (key === "tagName") continue;
            if (attr['reqName']) {
                attr = action(processReq(attr));
                console.log(key, attr);
            }
            if (htmlInheritedAttributes.includes(key) || htmlManualAttributes.includes(key)) {
                buffer.setAttribute(key, attr);
            } else if (Operate.validate(attr, 'isArray')) {
                let val = createHTMLEntity(attr);
                if (!Operate.validate(val, 'isUseless')) {
                    for (let i = 0; i < val.length; i++) {
                        buffer.appendChild(val[i])
                    }
                }
            }
        }
        result = buffer;
    }
    return result;
}

var clone = function (obj) {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onmouseover = function (e) {
    let targetElem = e.target,
        datamod = targetElem.getAttribute('data-model'),
        cssbox = document.getElementById('CSSViewerBox'),
        activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
    // if (cssbox && !e.path.includes(cssbox)) {
    //     cssbox.remove();
    //     activeElem.classList.remove('CSSViewerActiveElem');
    // }
    if (datamod !== null && typeof datamod !== 'undefined') {
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
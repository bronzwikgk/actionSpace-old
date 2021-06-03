/* 
<div class="CSSViewer" id="CSSViewerBox">
        <span class="elemIdentifier">TAG#id.class</span>
        <div class="accordion scroll--simple">
            <div id="item1" class="tab">
                <span class="tabTitle"><span class="pointer">&#43;</span> A long paragraph</span>
                <div class="tabContent" style="user-select: none;">
                    <span class="propName" style="user-select: text;">Property</span>
                    &nbsp;:&nbsp;
                    <input class="propVal" type="text">
                </div>
            </div>
        </div>
    </div>
*/

var CSSViewerTabTemp = {
    "tagName": "div",
    "id": "item1",
    "class": "tab",
    "childNodes": [{
            "tagName": "span",
            "class": "tabTitle",
            "childNodes": [{
                    "tagName": "span",
                    "class": "pointer",
                    "childNodes": [
                        "+"
                    ]
                },
                "Tab Name"
            ]
        },
        {
            "tagName": "div",
            "class": "tabContent",
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
            "childNodes": ["TAG#id.class"]
        },
        {
            "tagName": "div",
            "class": "accordion scroll--simple",
            "childNodes": [CSSViewerTabTemp]
        }
    ]
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var bodyElem = {
    reqName: "Any",
    objectModel: "document",
    type: "method",
    path: ["getElementsByTagName"],
    arguments: ["body"]
};

var dataModel = {
    reqName: "Any",
    objectModel: "bodyElem",
    type: "method",
    path: [0, "append"],
    arguments: [{
        reqName: "a",
        objectModel: "window",
        type: "method",
        path: ["createHTMLEntity"],
        arguments: [CSSViewerTemp]
    }]
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var renderDOM = function (parent, element, method) {
    if (Array.isArray(element)) {
        for (let i = 0; i < element.length; i++) {
            parent[method](element[i]);
        }
    } else parent[method](element);

}

var processReq = function (reqModel) {
    let result = {};
    if (typeof reqModel === 'string') {
        if (window[reqModel]) {
            reqModel = window[reqModel]
        } else {
            throw new Error('req Model not found', reqModel)
        }
    }

    if (!reqModel['reqName']) {
        return reqModel;
    }

    let path = reqModel['path'],
        args = reqModel['arguments'],
        objModel = reqModel['objectModel'];

    if (typeof objModel === 'string') {
        objModel = window[reqModel['objectModel']];
        if (objModel.constructor.name.includes('Object')) {
            objModel = action(processReq(objModel));
        }
    }

    result['objectModel'] = objModel;
    result['path'] = path;
    result['arguments'] = [];

    args.forEach((item, i) => {
        if (typeof item === 'object') {
            result['arguments'].push(action(processReq(item)));
        } else {
            result['arguments'].push(item);
        }
    })

    return result;
}

var action = function (reqModel) {

    if (Array.isArray(reqModel) || !reqModel['objectModel']) {
        return reqModel;
    }

    let objModel = reqModel['objectModel'],
        args = reqModel['arguments'],
        path = reqModel['path'],
        result = objModel;

    let temp = objModel;

    for (let i = 0; i < path.length - 1; i++) {
        temp = temp[path[i]];
    }
    result = temp[path[path.length - 1]](...args);

    return result;
}

var createHTMLEntity = function (obj) {
    if (Operate.validate(obj, 'isUseless')) return console.log('useless');
    if (Operate.validate(obj, 'isString')) return document.createTextNode(obj);
    if (Operate.validate(obj, 'isHTML')) return obj;
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
            else if (htmlInheritedAttributes.includes(key) || htmlManualAttributes.includes(key)) {
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var cssBoxRemove = false;
window.onmouseover = function (e) {
    let targetElem = e.target,
        datamod = targetElem.getAttribute('data-model');
    if (cssBoxRemove) {
        let cssbox = document.getElementById('CSSViewerBox'),
            activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
        if (!e.path.includes(cssbox)) {
            cssbox.remove();
            activeElem.classList.remove('CSSViewerActiveElem');
        }
    cssBoxRemove = false;
    }
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
window.onmouseout = function () {
    let cssbox = document.getElementById('CSSViewerBox');
    if (cssbox && !cssBoxRemove) {
        cssBoxRemove = true;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
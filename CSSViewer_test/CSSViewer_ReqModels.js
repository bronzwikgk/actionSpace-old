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

///////////////////////////////////////////////////////////////////////////////////////////////////////

var lastTabId = {
    reqName: "lastTabId",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child"],
    andThen: ["id"]
}

var propCategoryObject = {
    reqName: "propCategoryObject",
    objectModel: "window",
    type: "method",
    path: ["Object", "getOwnPropertyDescriptor"],
    arguments: [CSSViewer_categoriesProperties, lastTabId],
    andThen: ["value"]
}

var propertyIndexNumber = {
    reqName: "propertyIndexNumber",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child>#tabContent"],
    andThen: ["children", "length"]
}

var tabContainerChLen = {
    reqName: "index",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer"],
    andThen: ["children", "length"]
}

var lastTab_TabCtnt = {
    reqName: "appendProperty",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer>.tab:last-child>#tabContent"]
}

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
                arguments: [propCategoryObject],
                andThen: [propertyIndexNumber]
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
                arguments: [propCategoryObject],
                andThen: [propertyIndexNumber]
            }
        }
    ]
};

var propValReqModel = {
    reqName: "propValTemp",
    objectModel: "window",
    type: "method",
    path: ["renderDOM"],
    arguments: [lastTab_TabCtnt, {
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
        arguments: [propCategoryObject],
        andThen: ["length"]
    }
}

var CSSViewerTabTemp = {
    "tagName": "div",
    "id": {
        reqName: "tabName_Id",
        objectModel: "window",
        type: "method",
        path: ["Object", "keys"],
        arguments: [CSSViewer_categoriesTitle],
        andThen: [tabContainerChLen]
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
                    andThen: [tabContainerChLen]
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

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Test Data Model
var alertHello = {
    reqName: "alertHello",
    objectModel: "window",
    type: "method",
    path: ["alert"],
    arguments: ["Hello, This is Vipin Suthar"]
}

var bodyElem = {
    reqName: "Any",
    objectModel: "document",
    type: "method",
    path: ["getElementsByTagName"],
    arguments: ["body"]
};

var tabContainer = {
    reqName: "tabContainer",
    objectModel: "document",
    type: "method",
    path: ["querySelector"],
    arguments: ["#CSSViewerBox>#tabContainer"]
}

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
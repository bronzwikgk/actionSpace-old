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

////////////////////////////////////////////////////////////////////////////////////////////////

var addCSSViewerBox = [{
        objectModel: "document",
        method: "getElementById",
        arguments: "rightNavTabs",
        response: "rightNavTabs"
    }, {
        objectModel: 'document',
        method: 'querySelector',
        arguments: '.CSSViewerActiveElem',
        response: 'activeElem',
    }, {
        objectModel: "$l.rightNavTabs.classList",
        method: "add",
        arguments: "CSSViewerActiveElem"
    },
    // {
    //     objectModel: 'CreateEntity',
    //     method: 'create',
    //     arguments: ['$CSSViewer_ui', '$l.rightNavTabs.children[1]'],
    //     response: "cssBox"
    // },
    {

        // callback: {
        //     declare: {
        //         'activeElemTagName': '$l.activeElem.tagName',
        //         'activeElemId': '$l.activeElem.id',
        //         'activeElemClassName': '$l.activeElem.className',
        //         'CSSBox.children[0].innerHTML': '$l.activeElemTagName + "#" + l.activeElemId + "." + l.activeElemClassName',
        //         'tabContainer': '$l.CSSBox.children[1]',
        //     },
        // }
    },
    // {
    //     declare: {
    //         'x': -1,
    //         'm': Object.keys(CSSViewer_categoriesTitle).length,
    //         'catkeys': Object.keys(CSSViewer_categoriesTitle),
    //         'catTitles': Object.values(CSSViewer_categoriesTitle),
    //         'catProperties': Object.values(CSSViewer_categoriesProperties)
    //     },
    //     objectModel: 'document',
    //     method: 'getElementById',
    //     arguments: 'CSSViewerBox',
    //     response: 'CSSBox',
    // }, {
    //     declare: {
    //         'x': '$l.x + 1',
    //     },
    //     objectModel: 'CreateEntity',
    //     method: 'create',
    //     arguments: ['$CSSViewerTabTemp', '$l.tabContainer'],
    //     loop: '$l.m',
    //     callback: {
    //         objectModel: 'document',
    //         method: 'querySelector',
    //         arguments: '#CSSViewerBox>#tabContainer>.tab:last-child',
    //         response: 'lastTab',
    //         callback: {
    //             declare: {
    //                 'lastTabTitleElem': '$l.lastTab.children[0].children[1]',
    //                 'lastTabContent': '$l.lastTab.children[1]',
    //                 'props': {
    //                     'id': '$l.catkeys[l.x]'
    //                 }
    //             },
    //             objectModel: 'CreateEntity',
    //             method: 'setProps',
    //             arguments: ['$l.lastTab', '$l.props'],
    //             callback: {
    //                 declare: {
    //                     'lastTabTitleElem.innerHTML': '$l.catTitles[l.x]'
    //                 },
    //                 objectModel: 'window.Object',
    //                 method: 'keys',
    //                 arguments: '$l.catProperties[l.x]',
    //                 response: 'propertiesNames',
    //                 callback: {
    //                     declare: {
    //                         'y': -1,
    //                         'n': '$l.propertiesNames.length',
    //                     },
    //                     objectModel: 'window.Object',
    //                     method: 'values',
    //                     arguments: '$l.catProperties[l.x]',
    //                     response: 'propertiesValues',
    //                     callback: {
    //                         objectModel: 'CreateEntity',
    //                         method: 'create',
    //                         arguments: ['$CSSViewerPropTemp', '$l.lastTabContent'],
    //                         loop: '$l.n',
    //                         callback: {
    //                             declare: {
    //                                 'y': '$l.y + 1',
    //                             },
    //                             callback: {
    //                                 declare: {
    //                                     // 'lastPropElem': '$l.lastTabContent.children[l.y]',
    //                                     'lastPropNameElem': '$l.lastTabContent.children[l.y].children[0]',
    //                                     'lastPropNameElem.innerHTML': '$l.propertiesNames[l.y]',
    //                                     'lastPropValueElem': '$l.lastTabContent.children[l.y].children[1]',
    //                                     'lastPropValueElem.value': '$l.propertiesValues[l.y]'
    //                                 },
    //                                 callback: {
    //                                     declare: {
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// var updateCSSObj = function (elem, obj) {
//     let CSSObj = window.getComputedStyle(elem);

//     for (const key in obj) {
//         if (Object.hasOwnProperty.call(obj, key)) {
//             let value = obj[key];
//             if (typeof value === 'object' && value.constructor.name.includes('Object')) updateCSSObj(elem, value)
//             else if (typeof key === 'string') obj[key] = CSSObj.getPropertyValue(key);
//         }
//     }
//     return obj;
// }



async function loadCSSCors(stylesheet_uri) {

    try {
        var resp = await HttpService.fetchRequest(stylesheet_uri, {
            method: 'GET',
            cache: 'no-cache',
        }, 'text');
    } catch (error) {
        return new Promise.reject();
    }

    var style_tag = document.createElement('style');
    style_tag.appendChild(document.createTextNode(resp));
    style_tag.setAttribute('data-for-href', stylesheet_uri);
    document.head.appendChild(style_tag);

    return new Promise((res, rej) => {
        style_tag.onload = () => {
            console.log('loaded');
            res();
        }
    });




    // console.log();
    // var _xhr = window.XMLHttpRequest;
    // var has_cred = false;
    // try {
    //     has_cred = _xhr && ('withCredentials' in (new _xhr()));
    // } catch (e) {}
    // if (!has_cred) {
    //     console.error('CORS not supported');
    //     return;
    // }
    // var xhr = new _xhr();
    // xhr.open('GET', stylesheet_uri);
    // xhr.onload = function () {
    //     xhr.onload = xhr.onerror = null;
    //     if (xhr.status < 200 || xhr.status >= 300) {
    //         console.error('style failed to load: ' + stylesheet_uri);
    //     } else {
    //         var style_tag = document.createElement('style');
    //         style_tag.appendChild(document.createTextNode(xhr.responseText));
    //         document.head.appendChild(style_tag);
    //         console.log(style_tag)
    //     }
    // };
    // xhr.onerror = function () {
    //     xhr.onload = xhr.onerror = null;
    //     console.error('XHR CORS CSS fail:' + styleURI);
    // };
    // xhr.send();
}

function cssRuleToObj(rule) {
    var result = {};

    for (const [prop, [val]] of rule.styleMap) {
        switch (val.constructor.name) {
            case 'CSSKeywordValue':
                result[prop] = val.value;
                break;
            case 'CSSUnitValue':
                result[prop] = val.value + val.unit;
                break;
            case 'CSSStyleValue':
                result[prop] = val.toString();
                break;
            default:
                break;
        }
    }

    return result;
}

async function css(el) {
    var sheets = document.styleSheets,
        result = {},
        i = 0,
        rules;
    el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector ||
        el.msMatchesSelector || el.oMatchesSelector;

    var i = 0;
    while (i < sheets.length) {
        try {
            rules = sheets[i].rules || sheets[i].cssRules;
        } catch (error) {
            if (error.name == 'SecurityError') {
                try {
                    await loadCSSCors(sheets[i].href);
                } catch (error) {
                    console.log("can't process CORS CSS");
                }
            } else {
                console.error(`Error Code: ${error.code}\nError Name: ${error.name}\nError Message: ${error.message}`);
            }
        }

        if (!operate.isUseless(rules)) {
            for (var r in rules) {
                if (el.matches(rules[r].selectorText)) {
                    console.log(rules[r].cssText);
                    result = cssRuleToObj(rules[r]);
                }
            }
        }

        i++;
    }

    document.querySelectorAll('style[data-for-href]').forEach(item => item.remove());

    return result;
}
var CSSViewer_categoriesProperties = {
    'pFontText': [
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
    ],
    'pColorBg': [
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-repeat',
        'color',
    ],
    'pBox': [
        'height',
        'width',
        'border',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'margin',
        'padding',
        'max-height',
        'min-height',
        'max-width',
        'min-width'
    ],
    'pPositioning': [
        'position',
        'top',
        'bottom',
        'right',
        'left',
        'float',
        'display',
        'clear',
        'z-index'
    ],
    'pList': [
        'list-style-image',
        'list-style-type',
        'list-style-position'
    ],
    'pTable': [
        'border-collapse',
        'border-spacing',
        'caption-side',
        'empty-cells',
        'table-layout'
    ],
    'pMisc': [
        'overflow',
        'cursor',
        'visibility'
    ],
    'pEffect': [
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
    ]
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
/**
 * we can use it as a tool to view css
 */
var addCSSViewerBox = [{
    objectModel: "document",
    method: "getElementById",
    arguments: "rightNavTabs",
    response: "rightNavTabs",
    callback: {
        objectModel: "$l.rightNavTabs.classList",
        method: "add",
        arguments: "CSSViewerActiveElem"
    }
}, {
    objectModel: 'document',
    method: 'querySelector',
    arguments: '.CSSViewerActiveElem',
    response: 'activeElem',
}, {
    objectModel: "window",
    method: "compCss",
    arguments: "$l.activeElem",
    response: "cssValObj"
}, {
    objectModel: 'CreateEntity',
    method: 'create',
    arguments: ['$CSSViewer_ui', '$document.body'],
    response: "cssBox"
}, {
    declare: {
        'className': '$l.activeElem.className',
    },
    objectModel: "$l.className",
    method: "split",
    arguments: " ",
    response: "classNameArr",
    callback: {
        declare: {
            'tagName': '$l.activeElem.tagName',
            'id': '$l.activeElem.id',
            "class": "$l.classNameArr.join('.')",
            "idf": '$l.tagName + (l.id != "" ? "#" : "") + l.id + (l.class != "" ? "." : "") + l.class',
            'cssBox.children[0].innerText': '$l.idf',
            'cssBox.children[0].title': '$l.idf',
            'x': 0,
            'keys': "$Object.keys(CSSViewer_categoriesTitle)",
            'container': '$l.cssBox.children[1]'
        }
    }
}, {
    declare: {
        "key": "$l.keys[l.x]",
        "x": "$l.x + 1",
    },
    objectModel: 'CreateEntity',
    method: 'create',
    arguments: ['$CSSViewerTabTemp', '$l.container'],
    response: "tab",
    loop: '$l.keys.length',
    callback: [{
        declare: {
            "tab.id": "$l.key",
            'tab.children[0].children[1].innerText': '$CSSViewer_categoriesTitle[l.key]',
            'y': 0,
            "ikeys": "$CSSViewer_categoriesProperties[l.key]",
        }
    }, {
        declare: {
            'ikey': '$l.ikeys[l.y]',
            'y': '$l.y + 1'
        },
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$CSSViewerPropTemp', '$l.tab.children[1]'],
        response: "prop",
        loop: '$l.ikeys.length',
        callback: {
            declare: {
                'prop.children[0].innerText': '$l.ikey',
                "prop.children[0].title": "$l.ikey",
                'prop.children[1].value': '$l.cssValObj[l.ikey] || ""',
                "args": {
                    "activeElem": "$l.activeElem"
                }
            },
            objectModel: 'eventManager',
            method: 'addRequestListener',
            arguments: ['$l.prop.children[1]', 'change', 'setCss', '$l.args']
        }
    }]
}]

String.prototype.camelize = function () {
    return this.replace(/[-_]+/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

var setCss = [{
    declare: {
        "value": "$l.event.target.value",
        "propName": "$l.event.target.previousElementSibling.title"
    },
    objectModel: "$l.propName",
    method: "camelize",
    response: "name",
    callback: {
        condition: "$l.activeElem.style[l.name] = l.value",
        objectModel: "console",
        method: 'log',
        arguments: "$l.activeElem"
    }
}]

////////////////////////////////////////////////////////////////////////////////////////////////////////////


function compCss(elem) {
    let CSSObj = window.getComputedStyle(elem),
        obj = {};

    for (const key in CSSViewer_categoriesProperties) {
        if (Object.hasOwnProperty.call(CSSViewer_categoriesProperties, key)) {
            let arr = CSSViewer_categoriesProperties[key];
            if (Array.isArray(arr)) {
                arr.forEach(key => {
                    obj[key] = CSSObj.getPropertyValue(key);
                })
            }
        }
    }
    return obj;
}



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
                    result = {
                        ...result,
                        ...cssRuleToObj(rules[r])
                    };
                }
            }
        }

        i++;
    }

    document.querySelectorAll('style[data-for-href]').forEach(item => item.remove());

    console.log(result)
    return result;
}
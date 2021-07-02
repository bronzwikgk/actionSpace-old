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

var addCSSViewerBox = {
    objectModel: 'CreateEntity',
    method: 'create',
    arguments: ['$CSSViewer_ui_main', '$document.body'],
    callback: {
        declare: {
            'x': -1,
            'm': Object.keys(CSSViewer_categoriesTitle).length,
            'catkeys': Object.keys(CSSViewer_categoriesTitle),
            'catTitles': Object.values(CSSViewer_categoriesTitle),
            'catProperties': Object.values(CSSViewer_categoriesProperties)
        },
        objectModel: 'document',
        method: 'getElementById',
        arguments: 'CSSViewerBox',
        response: 'CSSBox',
        callback: {
            objectModel: 'document',
            method: 'querySelector',
            arguments: '.CSSViewerActiveElem',
            response: 'activeElem',
            callback: {
                declare: {
                    'activeElemTagName': '$l.activeElem.tagName',
                    'activeElemId': '$l.activeElem.id',
                    'activeElemClassName': '$l.activeElem.className',
                    'CSSBox.children[0].innerHTML': '$l.activeElemTagName + "#" + l.activeElemId + "." + l.activeElemClassName', // 
                    'tabContainer': '$l.CSSBox.children[1]',
                },
                // objectModel: 'console',
                // method: 'log',
                // arguments: ['$l.CSSBox.children[0].innerHTML'],
                callback: {
                    declare: {
                        'x': '$l.x + 1',
                    },
                    objectModel: 'CreateEntity',
                    method: 'create',
                    arguments: ['$CSSViewerTabTemp', '$l.tabContainer'],
                    loop: '$l.m',
                    callback: {
                        objectModel: 'document',
                        method: 'querySelector',
                        arguments: '#CSSViewerBox>#tabContainer>.tab:last-child',
                        response: 'lastTab',
                        callback: {
                            declare: {
                                'lastTabTitleElem': '$l.lastTab.children[0].children[1]',
                                'lastTabContent': '$l.lastTab.children[1]',
                                'props': {
                                    'id': '$l.catkeys[l.x]'
                                }
                            },
                            objectModel: 'CreateEntity',
                            method: 'setProps',
                            arguments: ['$l.lastTab', '$l.props'],
                            callback: {
                                declare: {
                                    'lastTabTitleElem.innerHTML': '$l.catTitles[l.x]'
                                },
                                objectModel: 'window.Object',
                                method: 'keys',
                                arguments: '$l.catProperties[l.x]',
                                response: 'propertiesNames',
                                callback: {
                                    declare: {
                                        'y': -1,
                                        'n': '$l.propertiesNames.length',
                                    },
                                    objectModel: 'window.Object',
                                    method: 'values',
                                    arguments: '$l.catProperties[l.x]',
                                    response: 'propertiesValues',
                                    callback: {
                                        objectModel: 'CreateEntity',
                                        method: 'create',
                                        arguments: ['$CSSViewerPropTemp', '$l.lastTabContent'],
                                        loop: '$l.n',
                                        callback: {
                                            declare: {
                                                'y': '$l.y + 1',
                                            },
                                            callback: {
                                                declare: {
                                                    // 'lastPropElem': '$l.lastTabContent.children[l.y]',
                                                    'lastPropNameElem': '$l.lastTabContent.children[l.y].children[0]',
                                                    'lastPropNameElem.innerHTML': '$l.propertiesNames[l.y]',
                                                    'lastPropValueElem': '$l.lastTabContent.children[l.y].children[1]',
                                                    'lastPropValueElem.value': '$l.propertiesValues[l.y]'
                                                },
                                                callback: {
                                                    declare: {
                                                        
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////


var updateCSSObj = function (elem, obj) {
    let CSSObj = window.getComputedStyle(elem);

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            let value = obj[key];
            if (typeof value === 'object' && value.constructor.name.includes('Object')) updateCSSObj(elem, value)
            else if (typeof key === 'string') obj[key] = CSSObj.getPropertyValue(key);
        }
    }
    return obj;
}
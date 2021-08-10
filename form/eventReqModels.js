var handleClickEvent = [{
        declare: {
            "trueTarget": "$l.event.target",
            "n": "$l.event.path.length - 2",
            "x": -1,
            "flag": true
        },
        callback: {
            condition: "$l.flag",
            declare: {
                "x": "$l.x + 1",
                "element": "$l.event.path[l.x]"
            },
            loop: "$l.n",
            callback: {
                condition: "$l.element.hasAttribute('data-action-type')",
                declare: {
                    "trueTarget": "$l.element",
                    "flag": false
                },
                objectModel: "console",
            method: "log",
            arguments: ["$l.trueTarget", "$l.flag"],
            }
        }
    },
    {
        objectModel: "$l.trueTarget",
        method: "getAttribute",
        arguments: "data-action-type",
        response: "actionType"
    }, {
        condition: "$l.actionType == 'closeNavTab'",
        declare: {
            "args": {
                "trueTarget": "$l.trueTarget"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["closeTab", "$l.args"]
    },
    [{
            objectModel: "$l.trueTarget",
            method: "getAttribute",
            arguments: "data-action-value",
            response: "actionValue"
        },
        {
            condition: "$l.actionType == 'toggleClass'",
            objectModel: "$l.trueTarget.parentElement.classList",
            method: "toggle",
            arguments: "$l.actionValue"
        },
        {
            condition: "$l.actionType == 'processFileOrDir'",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "$l.actionValue"
        },
        {
            condition: "$l.actionType == 'toggleLeftSideNav'",
            declare: {
                "args": {
                    "trueTarget": "$l.trueTarget",
                    "actionValue": "$l.actionValue"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["toggleLeftSideNav", "$l.args"]
        }
    ],
    [{
        objectModel: "$l.trueTarget",
        method: "getAttribute",
        arguments: "data-attached-file-id",
        response: "attachedFileId"
    }, {
        condition: "$l.actionType == 'switchFileNavTab'",
        declare: {
            "props": {
                "uid": "$l.attachedFileId",
                "tabLink": "$l.trueTarget"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["openTab", "$l.props"]
    }, {
        condition: "$l.actionType == 'openFileFromNavigator'",
        declare: {
            "props": {
                'DBName': 'ActionSpaceDefaultDB',
                'storeName': 'fileOrDirHandles',
                'key': '$l.attachedFileId',
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["getFromIDB", "$l.props"],
        response: "fH",
        callback: {
            declare: {
                "props": {
                    "uid": "$l.attachedFileId",
                    "fH": "$l.fH"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["openFileInEditor", "$l.props"]
        }
    }]
]



var handleClickEventFunc = async function (event) {
    // ActionEngine.processRequest('log');
    // console.log(event);
    var trueTarget = event.target;
    for (let i = 0; i < event.path.length - 2; i++) { // leave window and document
        let element = event.path[i];
        if (element.hasAttribute('data-action-type')) {
            trueTarget = element;
            break;
        }
    }
    var actionType = trueTarget.getAttribute('data-action-type'),
        actionValue = trueTarget.getAttribute('data-action-value'),
        actionHelperValue = trueTarget.getAttribute('data-action-helper-value'),
        actionTargetElementId = trueTarget.getAttribute('data-action-target-element-id'),
        actionTargetElement;
    if (!operate.isUseless(actionTargetElementId)) {
        if (actionTargetElementId == 'this') {
            actionTargetElementId = trueTarget.id;
        }
        actionTargetElement = document.getElementById(actionTargetElementId);
    }

    if (actionType === 'format') {
        Editor.setFormatting(actionValue, false, actionHelperValue);
    } else if (actionType === 'anchorLink') {
        ActionEngine.processRequest('getPage', {
            'page': 'signInView'
        })
        // get(actionValue.split('/').pop());
    } else if (actionType === 'chngEditorMode') {
        let values = document.getElementsByName('editorMode'),
            value;
        for (let i = 0; i < values.length; i++) {
            if (values[i].checked) value = values[i].value;
        }
        ActionEngine.processRequest(switchEditorMode, {
            modeName: value
        })
    }
}


var evtClick = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'click', '$handleClickEvent']
}

var handlePopStateEventFunc = function (event) {
    const state = event.state;
    document.getElementById("root").innerHTML = state.content;
}

var evtPopState = {
    objectModel: 'eventManager',
    method: 'addListener',
    arguments: ['$window', 'popstate', '$handlePopStateEventFunc']
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var handleLoadEventFunc = async function (event) {
    await ActionEngine.processRequest([
        'generalUI',
        'newFileReqFlow',
        'evtClick',
        // 'evtPopState'
    ])
    document.getElementById('loaderPage').remove();
}

// var evtLoad = {
//     objectModel: 'eventManager',
//     method: 'addListener',
//     arguments: ['$window', 'load', '$handleLoadEventFunc']
// }

window.onload = handleLoadEventFunc;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// window.ondblclick = async function (e) {
//     var targetElem = e.target,
//         cssbox = document.getElementById('CSSViewerBox'),
//         activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
//     if (cssbox && !e.path.includes(cssbox)) {
//         console.log('removed');
//         cssbox.remove();
//         activeElem.classList.remove('CSSViewerActiveElem');
//     }
//     // console.log(e)
//     if ((cssbox == null || typeof cssbox === 'undefined') && e.path.includes(document.getElementById('workSpace'))) {
//         updateCSSObj(targetElem, CSSViewer_categoriesProperties);
//         targetElem.classList.add('CSSViewerActiveElem');
//         await ActionEngine.processRequest(addCSSViewerBox);

//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//         // var top = e.offsetY, left = e.offsetX, width = e.target.scrollWidth, height = e.target.scrollHeight;
//         // if (top + height > window.innerHeight/2) {
//         // console.log(top, height,  window.innerHeight, cssbox.scrollHeight, (top - cssbox.scrollHeight) + "px")
//         // cssbox.style.position = (top - cssbox.scrollHeight) + "px";
//         // }
//         // else{
//         //     cssbox.style.position = (top + height) + "px";
//         // }


//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         document.querySelectorAll("#CSSViewerBox>#tabContainer>.tab>.tabContent>.property>input").forEach(function (item) {
//             item.onchange = function (e) {
//                 let propName = this.previousElementSibling.innerText.trim(),
//                     value = this.value.trim();
//                 document.querySelector(".CSSViewerActiveElem").style[propName] = value;
//             }
//         })
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         document.querySelectorAll(".accordion>.tab>.tabTitle>.pointer").forEach(function (item) {
//             item.onclick = function (e) {
//                 let targetTab = this.parentElement.parentElement,
//                     activeTab = document.querySelector('.accordion>.tab.active');
//                 if (targetTab.classList.contains('active')) {
//                     targetTab.classList.remove('active');
//                     targetTab.style.height = "30px";
//                 } else {
//                     if (activeTab) {
//                         activeTab.classList.remove("active");
//                         activeTab.style.height = "30px";
//                     };
//                     targetTab.classList.add("active");
//                     targetTab.style.height = targetTab.scrollHeight + "px"
//                 }

//             };
//         })
//     }
// }
var getTrueTarget = {
    declare: {
        "trueTarget": "$l.event.target",
        "n": "$l.event.path.length - 2",
        "x": 0,
        "flag": true
    },
    return: "$l.trueTarget",
    callback: {
        condition: "$l.flag",
        declare: {
            "element": "$l.event.path[l.x++]"
        },
        loop: "$l.n",
        callback: {
            condition: "$l.element.hasAttribute('data-action-type')",
            declare: {
                "trueTarget": "$l.element",
                "flag": false
            }
        }
    }
}

var handleClickEvent = [{
    declare: {
        "args": {
            "event": "$l.event"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getTrueTarget", "$l.args"],
    response: "trueTarget",
}, {
    condition: "$l.trueTarget",
    declare: {
        "actionType": "$l.trueTarget.dataset.actionType",
        "actionValue": "$l.trueTarget.dataset.actionValue"
    },
    callback: [
        //////////////////////////////////////// common events ////////////////////////////////////////
        {
            condition: "$l.actionType == 'switchView'",
            objectModel: "window",
            method: "getPage",
            arguments: "$l.actionValue"
        },
        {
            condition: "$l.actionType == 'loginPrompt'",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "generateAuthCode"
        },
        //////////////////////////////////////// loginView events ////////////////////////////////////////
        {
            condition: "$l.actionType == 'switchLoginOrSignup'",
            declare: {
                "args": {
                    "value": "$l.actionValue"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["switchLogInOrSignup", "$l.args"]
        },
        //////////////////////////////////////// editorView events ////////////////////////////////////////
        {
            condition: "$l.actionType == 'closeNavTab'",
            declare: {
                "args": {
                    "trueTarget": "$l.trueTarget",
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["closeTab", "$l.args"]
        }, {
            condition: "$l.actionType == 'toggleClass'",
            declare: {
                "pEl": "$l.trueTarget.parentElement"
            },
            objectModel: "$l.pEl.classList",
            method: "toggle",
            arguments: "$l.actionValue",
        }, {
            condition: "$l.trueTarget.parentElement.classList.contains('collection')",
            declare: {
                "pEl": "$l.trueTarget.parentElement"
            },
            objectModel: "document",
            method: "querySelector",
            arguments: ".collection.selected",
            response: "selectedColl",
            callback: [{
                condition: "$!l.selectedColl",
                objectModel: "$l.pEl.classList",
                method: "add",
                arguments: "selected"
            }, {
                condition: "$l.selectedColl && (l.selectedColl != l.pEl)",
                objectModel: "$l.selectedColl.classList",
                method: "remove",
                arguments: "selected",
                callback: {
                    objectModel: "$l.pEl.classList",
                    method: "add",
                    arguments: "selected"
                }
            }]
        }, {
            condition: "$l.actionType == 'processFileOrDir'",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "$l.actionValue"
        }, {
            condition: "$l.actionType == 'switchFileNavTab'",
            declare: {
                "args": {
                    "tabLink": "$l.trueTarget"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["openTab", "$l.args"]
        }, {
            condition: "$l.actionType == 'openFileFromNavigator'",
            declare: {
                "uid": "$l.trueTarget.dataset.fileUid",
                "fileName": "$l.trueTarget.dataset.fileName",
                "args": {
                    "uid": "$l.uid",
                    "rootUid": "$l.trueTarget.dataset.rootUid",
                    "pathFromRoot": "$l.trueTarget.dataset.pathFromRoot",
                    "fileName": "$l.fileName"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["getFileContent", "$l.args"],
            response: "fileContent",
            callback: {
                declare: {
                    "args": {
                        "uid": "$l.uid",
                        "name": "$l.fileName",
                        "content": "$l.fileContent"
                    }
                },
                objectModel: 'ActionEngine',
                method: 'processRequest',
                arguments: ['openFileInEditor', '$l.args']
            }
        }
    ]
}]


var handleHoverEvent = {
    declare: {
        "args": {
            "event": "$l.event"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getTrueTarget", "$l.args"],
    response: "trueTarget",
    callback: [{
        objectModel: "$l.trueTarget",
        method: "getAttribute",
        arguments: "data-action-type",
        response: "actionType"
    }]

}
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeElement(elem) {

    var activeSide = null,
        activeElem = null,
        w = 0,
        h = 0,
        x = 0,
        y = 0;

    // Handle the mousedown event
    // that's triggered when user drags the resizer
    const mouseDownHandler = function (e) {
        activeSide = this;
        activeElem = activeSide.parentElement;
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;

        // Calculate the dimension of element
        const styles = window.getComputedStyle(activeElem);
        w = parseInt(styles.width, 10);
        h = parseInt(styles.height, 10);

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        var dx = e.clientX - x,
            dy = e.clientY - y,
            side = "xy";

        if (activeSide !== null) side = activeSide.getAttribute('data-side');

        if (side.indexOf('x') > -1) {
            activeElem.style.width = `${w + dx}px`;
        }
        if (side.indexOf('y') > -1) {
            activeElem.style.height = `${h + dy}px`;
        }
    };

    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // to add resizers
    (function () {
        [
            ["r", "x"]
        ].forEach(resizer => {
            let resizerElem = document.createElement('span');
            resizerElem.className = `resizer resizer-${resizer[0]}`;
            resizerElem.setAttribute('data-side', `${resizer[1]}`);
            resizerElem.addEventListener('mousedown', mouseDownHandler);
            elem.append(resizerElem);
        });
    })();

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var evtClick = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'click', 'handleClickEvent']
}
var evtHover = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'mouseover', 'handleHoverEvent']
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var handleLoadEventFunc = async function (event) {
    await ActionEngine.processRequest([
        'evtPopState',
        'evtClick'
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
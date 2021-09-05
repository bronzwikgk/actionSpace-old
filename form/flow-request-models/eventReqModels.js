/**
 * It gets the true target (element in `(event's)path` hierarchy, for which we are supposed to act), and returns it.
 * Element in `(event's)path` hierarchy, having the attribute `data-action-type` (except `window` and `document`), is known as true target.
 ** Initial Variables :-
 ** `'event'`: event object
 ** Return :- true target (HTML elemnent's reference).
 */
var getTrueTarget = {
    declare: {
        "trueTarget": "$l.event.target",
        "n": "$l.event.path.length - 2",
        "flag": true,
        "x": 0
    },
    return: "$l.trueTarget",
    callback: {
        condition: "$l.flag",
        declare: {
            "element": "$l.event.path[l.x]",
            "x": "$l.x + 1"
        },
        loop: "$l.n",
        callback: {
            condition: "$l.element && l.element.hasAttribute && l.element.hasAttribute('data-action-type')",
            declare: {
                "trueTarget": "$l.element",
                "flag": false
            }
        }
    }
}

/**
 * It handles the click event and acts accordingly.
 * It first gets true target, then gets required attributes of the true target, and then acts accordingly.
 ** Initial Variables :-
 ** `'event'` : click event object
 */
var handleClickEvent = [{
    condition: "$l.event",
    declare: {
        "args": {
            "event": "$l.event"
        },
        "actionTypeArr": [],
        "actionValArr": []
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getTrueTarget", "$l.args"],
    response: "trueTarget",
}, {
    condition: "$l.trueTarget && l.trueTarget.hasAttribute && l.trueTarget.hasAttribute('data-action-type')",
    declare: {
        "actionTypeStr": "$l.trueTarget.dataset.actionType ? l.trueTarget.dataset.actionType : ''",
        "actionValStr": "$l.trueTarget.dataset.actionValue ? l.trueTarget.dataset.actionValue : ''",
        "x": 0
    },
    callback: [{
        objectModel: "$l.actionTypeStr.trim()",
        method: "split",
        arguments: " ",
        response: "actionTypeArr"
    }, {
        objectModel: "$l.actionValStr",
        method: "split",
        arguments: " ",
        response: "actionValArr"
    }]
}, {
    condition: "$(!operate.isUseless(l.actionTypeArr)) && operate.isArray(l.actionTypeArr)",
    declare: {
        "actionType": "$l.actionTypeArr[l.x]",
        "actionValue": "$l.actionValArr[l.x] == '-' ? undefined : l.actionValArr[l.x]",
        "x": "$l.x + 1"
    },
    loop: "$l.actionTypeArr.length", 
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
            arguments: "setUserInfo"
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
        },
        // [{
        //     declare: {
        //         "n": "$l.event.path.length - 2",
        //         "x": 0,
        //         "flag": true
        //     },
        //     callback: {
        //         condition: "$l.flag",
        //         declare: {
        //             "elem": "$l.event.path[l.x++]"
        //         },
        //         loop: "$l.n",
        //         callback: {
        //             condition: "$l.element.hasAttribute('data-action-type')",
        //             declare: {
        //                 "trueTarget": "$l.element",
        //                 "flag": false
        //             }
        //         }
        //     }
        // },
        //     {
        //     objectModel: "document",
        //     method: "querySelectorAll",
        //     arguments: ".dropdown.active[data-multiple-open=\"false\"]",
        //     response: "activeDropdowns",
        //     callback: [{
        //         declare: {
        //             "activeDropdown": "$l.activeDropdowns[l.x ? ++l.x : l.x=0]"
        //         },
        //         loop: "$l.activeDropdowns.length",
        //         callback: {
        //             condition: "$l.activeDropdown != l.trueTarget.parentElement",
        //             objectModel: "$l.activeDropdown.classList",
        //             method: "remove",
        //             arguments: "active"
        //         }
        //     }]
        // },
        // {
        //     condition: "$l.actionType == 'toggleDropdown'",
        //     declare: {
        //         "pEl": "$l.trueTarget.parentElement"
        //     },

        // }],
        {
            condition: "$l.trueTarget.parentElement && l.trueTarget.parentElement.classList.contains('collection')",
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
            declare: {
                "args": {
                    "entityType": "$l.trueTarget.dataset.entityType"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["$l.actionValue", "$l.args"]
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
        },
        //////////////////////////////////////// workflow doc events ////////////////////////////////////////
        {
            condition: "$l.actionType == 'addNewWorkflowItem'",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "addNewWorkflowItem"
        }, {
            condition: "$l.actionType == 'switchWorkflowDoc'",
            declare: {
                "args": {
                    "docIdOrNode": "$l.actionValue"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["switchWorkflowDoc", "$l.args"]
        }
    ]
}]

var evtClick = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'click', 'handleClickEvent']
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var handleLoadEventFunc = async function (event) {
    await ActionEngine.processRequest([
        'evtClick'
    ])
    document.getElementById('loaderPage').remove();
}

window.onload = handleLoadEventFunc;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* function resizeElement(elem) {

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

} */

/* var handleHoverEvent = {
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
var evtHover = {
    objectModel: 'eventManager',
    method: 'addRequestListener',
    arguments: ['$window', 'mouseover', 'handleHoverEvent']
} */

/* window.ondblclick = async function (e) {
    var targetElem = e.target,
        cssbox = document.getElementById('CSSViewerBox'),
        activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
    if (cssbox && !e.path.includes(cssbox)) {
        console.log('removed');
        cssbox.remove();
        activeElem.classList.remove('CSSViewerActiveElem');
    }
    if ((cssbox == null || typeof cssbox === 'undefined') && e.path.includes(document.getElementById('workSpace'))) {
        updateCSSObj(targetElem, CSSViewer_categoriesProperties);
        targetElem.classList.add('CSSViewerActiveElem');
        await ActionEngine.processRequest(addCSSViewerBox);

        document.querySelectorAll("#CSSViewerBox>#tabContainer>.tab>.tabContent>.property>input").forEach(function (item) {
            item.onchange = function (e) {
                let propName = this.previousElementSibling.innerText.trim(),
                    value = this.value.trim();
                document.querySelector(".CSSViewerActiveElem").style[propName] = value;
            }
        })
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
    }
} */
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
        fileKey = trueTarget.getAttribute('data-fileid'),
        actionTargetElementId = trueTarget.getAttribute('data-action-target-element-id'),
        actionTargetElement;
    if (!operate.isUseless(actionTargetElementId)) {
        if (actionTargetElementId == 'this') {
            actionTargetElementId = trueTarget.id;
        }
        actionTargetElement = document.getElementById(actionTargetElementId);
    }

    if (actionType === 'format') {
        // if (document.queryCommandState(actionValue)) {
        //     trueTarget.classList.add('active');
        // } else{
        //     if (trueTarget.classList.contains('active')) {
        //         trueTarget.classList.remove('active')
        //     }
        // }
        Editor.setFormatting(actionValue, false, actionHelperValue);
    } else if (actionType === 'file') {
        Editor.handleFileSys(actionValue);
    } else if (actionType === 'dir') {
        Editor.handleDirSystem(actionValue);
    } else if (actionType === 'toggleClass') {
        actionTargetElement.classList.toggle(actionValue);
    } else if (actionType === 'openFromNavigation') {
        let result = await ActionEngine.processRequest('getFromIDB', {
            'DBName': 'ActionSpaceDefaultDB',
            'storeName': 'fileOrDirHandles',
            'key': fileKey
        });

        ActionEngine.processRequest('openFileInEditor', {
            'fH': result,
            'uid': fileKey
        });
    } else if (actionType === 'anchorLink') {
        ActionEngine.processRequest('getPage', {
            'page': 'signInView'
        })
        // get(actionValue.split('/').pop());
    } else if(actionType === 'chngEditorMode'){
        let values = document.getElementsByName('editorMode'), value;
        for(let i=0;i<values.length;i++){
            if(values[i].checked) value = values[i].value;
        }
        ActionEngine.processRequest(switchEditorMode, {
            modeName: value
        })
    } else if (actionType === 'toggleNavBar') {
        if (trueTarget.classList.contains('active')) {
            trueTarget.classList.remove('active');
            ActionEngine.processRequest('hideSideNavBar');
        } else {
            let activeElem = document.querySelector("#leftSideNav .active");
            if (activeElem) activeElem.classList.remove('active');
            trueTarget.classList.add('active');
            ActionEngine.processRequest(actionValue);
        }
    }
}


var evtClick = {
    objectModel: 'eventManager',
    method: 'addListener',
    arguments: ['$window', 'click', '$handleClickEventFunc']
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
        'switchEditorMode',
        //'newFileReqFlow',
        'evtClick',
        'evtPopState'
    ],{
        modeName: 'code'
    })
    document.getElementById('loaderPage').remove();
}

// var evtLoad = {
//     objectModel: 'eventManager',
//     method: 'addListener',
//     arguments: ['$window', 'load', '$handleLoadEventFunc']
// }

// ActionEngine.processRequest('evtLoad');
window.onload = handleLoadEventFunc;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

window.ondblclick = async function (e) {
    var targetElem = e.target,
        cssbox = document.getElementById('CSSViewerBox'),
        activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
    if (cssbox && !e.path.includes(cssbox)) {
        console.log('removed');
        cssbox.remove();
        activeElem.classList.remove('CSSViewerActiveElem');
    }
    // console.log(e)
    if ((cssbox == null || typeof cssbox === 'undefined') && e.path.includes(document.getElementById('workSpace'))) {
        updateCSSObj(targetElem, CSSViewer_categoriesProperties);
        targetElem.classList.add('CSSViewerActiveElem');
        await ActionEngine.processRequest(addCSSViewerBox);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // var top = e.offsetY, left = e.offsetX, width = e.target.scrollWidth, height = e.target.scrollHeight;
        // if (top + height > window.innerHeight/2) {
            // console.log(top, height,  window.innerHeight, cssbox.scrollHeight, (top - cssbox.scrollHeight) + "px")
            // cssbox.style.position = (top - cssbox.scrollHeight) + "px";
        // }
        // else{
        //     cssbox.style.position = (top + height) + "px";
        // }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelectorAll("#CSSViewerBox>#tabContainer>.tab>.tabContent>.property>input").forEach(function (item) {
            item.onchange = function (e) {
                let propName = this.previousElementSibling.innerText.trim(),
                    value = this.value.trim();
                document.querySelector(".CSSViewerActiveElem").style[propName] = value;
            }
        })
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
    }
}
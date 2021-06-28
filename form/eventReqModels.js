var handleClickEventFunc = async function (event) {
    // ActionEngine.processRequest('log');
    // console.log(event);
    var trueTarget = event.target;
    for (let i = 0; i < event.path.length - 2; i++) {
        let element = event.path[i];
        if (element.hasAttribute('data-action-type')) {
            trueTarget = element;
            break;
        }
    }
    var actionType = trueTarget.getAttribute('data-action-type'),
        actionValue = trueTarget.getAttribute('data-action-value'),
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
        // }
        // else{
        //     if (trueTarget.classList.contains('active')) {
        //         trueTarget.classList.remove('active')
        //     }
        // }
        Editor.setFormatting(actionValue);
    } else if (actionType === 'file') {
        Editor.handleFileSys(actionValue);
    } else if (actionType === 'dir') {
        Editor.handleDirSystem(actionValue);
    } else if (actionType === 'toggleClass') {
        actionTargetElement.classList.toggle(actionValue);
    } else if (actionType === 'openFromNavigation'){
        let result = await ActionEngine.processRequest('getFromIDB', {
            'DBName': 'ActionSpaceDefaultDB',
            'storeName': 'fileOrDirHandles',
            'key': fileKey
        });
        
        ActionEngine.processRequest('openFileInEditor', {
            'fH': result,
            'uid': fileKey
        });
    }
}


var evtClick = {
objectModel: 'eventManager',
method: 'addListener',
arguments: ['$window', 'click', '$handleClickEventFunc' ]
}



window.onload = async function () {
    await ActionEngine.processRequest('newFileReqFlow');
    await ActionEngine.processRequest('evtClick');
    await ActionEngine.processRequest(getOpenFileID);
}
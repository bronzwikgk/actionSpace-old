var getColorReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getLinkReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getFblockReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getHeadingReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getHtmlReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getTextReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}

var getImageReqFlow = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'clickBtn',
    response: 'elem',
    return: "$l.elem"
}



//ActionEngine.processRequest(getUserInputFile)


class Editor {
    static async setFormatting(cmdName, showUI = false, value = "") {

        if (operate.isUseless(cmdName) || !operate.isString(cmdName) || cmdName === "") {
            console.error("Please give a valid command", cmdName);
            return;
        }

        if (operate.isUseless(value) || !operate.isString(value)) {
            console.error("Please give a valid value", value);
            return;
        }
        switch (cmdName) {
            case "backColor":
                value = await ActionEngine.processRequest(getColorReqFlow);
                console.log(cmdName, value)
                break;
            case "createLink":
                value = await ActionEngine.processRequest(getLinkReqFlow);
                console.log(cmdName, value)
                break;
            case "foreColor":
                value = await ActionEngine.processRequest(getColorReqFlow);
                console.log(cmdName, value)
                break;
            case "formatBlock":
                value = await ActionEngine.processRequest(getFblockReqFlow);
                console.log(cmdName, value)
                break;
            case "hiliteColor":
                value = await ActionEngine.processRequest(getColorReqFlow);
                console.log(cmdName, value)
                break;
            case "heading":
                value = await ActionEngine.processRequest(getHeadingReqFlow);
                console.log(cmdName, value)
                break;
            case "insertHTML":
                value = await ActionEngine.processRequest(getHtmlReqFlow);
                console.log(cmdName, value)
                break;
            case "insertImage":
                value = await ActionEngine.processRequest(getImageReqFlow);
                console.log(cmdName, value)
                break;
            case "insertText":
                value = await ActionEngine.processRequest(getTextReqFlow);
                console.log(cmdName, value)
                break;
            default:
                document.execCommand(cmdName, showUI)
                break;
        }
        if (value) {
            return document.execCommand(cmdName, showUI, value)
        }
    }

    static handleFileSys(reqName) {
        if (operate.isUseless(reqName) || !operate.isString(reqName)) {
            console.error('Not a valid request', reqName)
        }
        var isFileOpen = "false",
            hasUnsavedData = "false",
            fileID = "";
        switch (reqName) {
            case 'new':
                fileID = ActionEngine.processRequest(getOpenFileID);
                if (fileID != "0") {
                    ActionEngine.processRequest([
                        saveFileToLS,
                        closeFileInEditor
                    ])
                }
                ActionEngine.processRequest(newFileReqFlow);
                break;
            case 'open':
                fileID = ActionEngine.processRequest(getOpenFileID);
                if (fileID != "0") {
                    // ActionEngine.processRequest([
                    //     saveFileToLS,
                    //     closeFileInEditor
                    // ])
                }
                ActionEngine.processRequest(getUserInputFile);
                break;
            case 'download':
                fileID = ActionEngine.processRequest(getOpenFileID);
                if (fileID != "0") {
                    // ActionEngine.processRequest([
                    //     saveFileToLS,
                    //     closeFileInEditor
                    // ])
                }
                ActionEngine.processRequest(exportFile);
                break;
            case 'export':
                fileID = ActionEngine.processRequest(getOpenFileID);
                if (fileID != "0") {
                    // ActionEngine.processRequest([
                    //     saveFileToLS,
                    //     closeFileInEditor
                    // ])
                }
                ActionEngine.processRequest(getUserSaveFile);
                break;

            default:
                break;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

var evtClick = {
    objectModel: 'eventManager',
    method: 'addListener',
    arguments: ['$window', 'click', function (event) {
        //ActionEngine.processRequest('log');
        //console.log(event);
        var trueTarget = event.target.hasAttribute('data-action-type') ? event.target : event.target.parentElement,
         actionType = event.target.getAttribute('data-action-type') || event.target.parentElement.getAttribute('data-action-type'),
        actionValue = event.target.getAttribute('data-action-value') || event.target.parentElement.getAttribute('data-action-value'),
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
        }
        else if (actionType === 'file') {
            Editor.handleFileSys(actionValue);
        }
        else if (actionType === 'toggleClass') {
            actionTargetElement.classList.toggle(actionValue);
        }
    }]
}

window.onload = function () {
    ActionEngine.processRequest(newFileReqFlow);
    ActionEngine.processRequest(evtClick);
}
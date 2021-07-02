window.Editor = class {
    static async setFormatting(cmdName, showUI = false, value = "") {

        console.log(cmdName, showUI, value)
        if (operate.isUseless(cmdName) || !operate.isString(cmdName) || cmdName === "") {
            console.error("Please give a valid command", cmdName);
            return;
        }

        // if (operate.isUseless(value) || !operate.isString(value)) {
        //     console.error("Please give a valid value", value);
        //     return;
        // }
        switch (cmdName) {
            case "backColor":
                value = await ActionEngine.processRequest(getColorReqFlow);
                console.log(cmdName, value)
                break;
            case "createLink":
                value = window.prompt('Enter Link', '#');
                await ActionEngine.processRequest(getLinkReqFlow);
                console.log(cmdName, value)
                break;
            case "foreColor":
                value = await ActionEngine.processRequest(getColorReqFlow);
                console.log(cmdName, value)
                break;
            case "formatBlock":
                console.log(cmdName, value);
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
            case "insertEmoji":
                console.log(cmdName, value, "Under Construction")
                break;
            default:
                document.execCommand(cmdName, showUI);
                break;
        }
        if (value) {
            return document.execCommand(cmdName, showUI, value)
        }
    }

    static handleFileSys(reqName, reqValue) {
        if (operate.isUseless(reqName) || !operate.isString(reqName)) {
            console.error('Not a valid request', reqName);
            return;
        }
        switch (reqName) {
            case 'new':
                ActionEngine.processRequest([
                    saveFileToLS,
                    closeFileInEditor,
                    newFileReqFlow
                ])
                break;
            case 'open':
                ActionEngine.processRequest([
                    saveFileToLS,
                    closeFileInEditor,
                    getUserInputFile
                ])
                break;
            case 'openInEditor':
                break;
            case 'save':
                ActionEngine.processRequest([
                    saveFileToLS
                ])
                break;
            case 'export':
                    ActionEngine.processRequest([
                        saveFileToLS,
                        getUserSaveFile
                    ])
                break;

            default:
                break;
        }
    }
    static async handleDirSystem(reqName) {
        var dirHandle;
        switch (reqName) {
            case 'open':
                dirHandle = await HandleFileSys.getDirHandle();
                ActionEngine.processRequest(getUserInputDir, {
                    'currHandle': dirHandle,
                    'activeCollDom': document.getElementById('fileSysNavigation'),
                    'isDone': false
                });
                break;

            default:
                break;
        }
    }
}
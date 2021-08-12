const dataContObj = {}

/*
ActionEngine.processRequest('getFromIDB', {
    'DBName': <Name of the DataBase>,
    'storeName': <Name of the Store>,
    'key': <key>
})
*/
var getFromIDB = {
    objectModel: 'IndexedDataBase',
    method: 'createStore',
    arguments: ['$l.DBName', '$l.storeName'],
    response: 'storeFunc',
    return: '$l.result',
    callback: {
        objectModel: 'IndexedDataBase',
        method: 'get',
        arguments: ['$l.key', '$l.storeFunc'],
        response: 'result',
        return: '$l.result'
    }
}

/*
ActionEngine.processRequest('setToIDB', {
    'DBName': <Name of the DataBase>,
    'storeName': <Name of the Store>,
    'key': <key>,
    'value': <value>
})
*/
var setToIDB = {
    objectModel: 'IndexedDataBase',
    method: 'createStore',
    arguments: ['$l.DBName', '$l.storeName'],
    response: 'storeFunc',
    callback: {
        objectModel: 'IndexedDataBase',
        method: 'set',
        arguments: ['$l.key', '$l.value', '$l.storeFunc'],
        response: 'result'
    }
}

var getEditorElementSet = [{
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'workspace',
    response: 'workspace'
}, {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor'
}, {
    objectModel: 'document',
    method: 'querySelector',
    arguments: '.workspace-container .tab-links',
    response: 'tabLinks'
}, {
    objectModel: 'document',
    method: 'querySelector',
    arguments: '.workspace-container .tab-link.active',
    response: 'activeTabLink'
}, {
    declare: {
        "resp": {
            "workspace": "$l.workspace",
            "editor": "$l.editor",
            "tabLinks": "$l.tabLinks",
            "activeTabLink": "$l.activeTabLink"
        }
    },
    return: "$l.resp"
}]

var makeFileRecord = {
    declare: {
        "key": "$l.workspace.getAttribute('data-open-fileid')",
        "value": {
            "file": {
                "name": "$l.workspace.getAttribute('data-filename')",
                "ext": "$l.workspace.getAttribute('data-fileext')",
                "mimeType": "$l.workspace.getAttribute('data-filetype')"
            },
            "content": "$l.editor.innerHTML"
        }
    },
    objectModel: "Entity",
    method: "setObjKeyVal",
    arguments: ["$dataContObj", "$l.key", "$l.value"],
    // callback: {
    //     objectModel: "console",
    //     method: "log",
    //     arguments: "$dataContObj"
    // }
}

/*
ActionEngine.processRequest('newTabLink', {
    'resp': <set of Editor Elements>,
    'uid': <uid of file>,
    'file': {
        'name': <file Name>,
        'ext': <file Extension>
    }
})
*/
var newTabLink = {
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$navtabLinkTemp", "$l.resp.tabLinks.children[0]"],
    response: "tabLink",
    callback: {
        declare: {
            "props": {
                "data-action-type": "switchFileNavTab",
                "data-attached-fileid": "$l.uid"
            },
            "tabLink.children[0].innerText": "$l.file.name + l.file.ext"
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.tabLink', '$l.props']
    }
}

/*
ActionEngine.processRequest('switchToTab', {
    'resp': <set of Editor Elements>,
    'uid': <uid of file>,
    'file': {
        'name': <file Name>,
        'ext': <file Extension>,
        'mimeType': <mime Type of file>
    },
    'tabLink': <HTML element .tab-link which we want to go to / click target tablink element>
})
*/
var switchToTab = [{
    condition: "$l.resp.activeTabLink",
    objectModel: "$l.resp.activeTabLink.classList",
    method: "remove",
    arguments: "active",
    callback: {
        declare: {
            "args": {
                "workspace": "$l.resp.workspace",
                "editor": "$l.resp.editor"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["makeFileRecord", "$l.args"]
    }
}, {
    declare: {
        "props": {
            'data-open-fileid': '$l.uid',
            'data-filename': '$l.file.name',
            'data-fileext': '$l.file.ext',
            'data-filetype': '$l.file.mimeType'
        }
    },
    objectModel: 'CreateEntity',
    method: 'setProps',
    arguments: ['$l.resp.workspace', '$l.props']
}, {
    objectModel: "$l.tabLink.classList",
    method: "add",
    arguments: "active"
}]

/*
ActionEngine.processRequest('openTab', {
    'uid': <uid of file>,
    'tabLink': <HTML element .tab-link which we want to go to / click target tablink element>
})
*/

var openTab = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
    callback: {
        declare: {
            "resp": "$l.resp[l.resp.length - 1]"
        }
    }
}, {
    condition: "$l.tabLink !== l.resp.activeTabLink",
    declare: {
        "args": {
            "uid": "$l.uid",
            "resp": "$l.resp",
            "tabLink": "$l.tabLink",
            "file": {
                "name": "$dataContObj[l.uid].file.name",
                "ext": "$dataContObj[l.uid].file.ext",
                "mimeType": "$dataContObj[l.uid].file.mimeType"
            }
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["switchToTab", "$l.args"],
    callback: {
        declare: {
            "resp.editor.innerText": "$dataContObj[l.uid].content"
        }
    }
}]

// New File Request Model Flow
var newFileReqFlow = [{
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 20,
    response: 'uid'
}, {
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
    callback: {
        declare: {
            "resp": "$l.resp[l.resp.length - 1]"
        }
    }
}, {
    declare: {
        "args": {
            "uid": "$l.uid",
            "resp": "$l.resp",
            "file": {
                "name": "Untitled",
                "ext": ".txt",
                "mimeType": "text/plain"
            }
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: [
        ["newTabLink", "switchToTab"], "$l.args"
    ],
    callback: {
        declare: {
            "resp.editor.innerHTML": "$initialStory"
        }
    }
}]

/*
ActionEngine.processRequest('openFileInEditor', {
    'fH': <fileHandle>,
    'uid': <uid of fileHandle in IDB>
})
*/
var openFileInEditor = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
    callback: {
        declare: {
            "resp": "$l.resp[l.resp.length - 1]"
        }
    }
}, {
    condition: '$HandleFileSys.verifyPermission(l.fH, true)',
    objectModel: 'HandleFileSys',
    method: 'getFile',
    arguments: ['$l.fH'],
    response: 'file',
    callback: {
        objectModel: 'HandleFileSys',
        method: 'readFile',
        arguments: ['$l.file'],
        response: 'fileText',
    }
}, {
    declare: {
        'fileName': '',
        'fileExt': '',
    },
    objectModel: 'CreateEntity',
    method: 'setProps',
    arguments: ['$l.resp.workspace', '$l.props']
}, {
    declare: {
        "args": {
            "uid": "$l.uid",
            "resp": "$l.resp",
            "file": {
                "name": "$l.fH.name.slice(0,l.fH.name.lastIndexOf('.'))",
                "ext": "$l.fH.name.slice(l.fH.name.lastIndexOf('.'))",
                "mimeType": "text/plain"
            }
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: [
        ["newTabLink", "switchToTab"], "$l.args"
    ],
    callback: {
        declare: {
            "resp.editor.innerText": "$l.fileText"
        }
    }
}]

// Open File Request Flow Model
var getUserInputFile = {
    declare: {
        "args": {
            types: [{
                description: 'Text file',
                accept: {
                    'text/plain': ['.txt']
                },
            }],
        }
    },
    objectModel: 'HandleFileSys',
    method: 'getFileHandle',
    arguments: ["$l.args"],
    response: 'fH',
    callback: {
        objectModel: 'CreateEntity',
        method: 'uniqueId',
        arguments: 20,
        response: 'uid',
        callback: {
            declare: {
                'IDBSetReqArgs': {
                    'DBName': 'ActionSpaceDefaultDB',
                    'storeName': 'fileOrDirHandles',
                    'key': '$l.uid',
                    'value': '$l.fH'
                }
            },
            objectModel: 'ActionEngine',
            method: 'processRequest',
            arguments: ['$setToIDB', '$l.IDBSetReqArgs'],
            callback: {
                declare: {
                    'IDBGetReqArgs': {
                        'DBName': 'ActionSpaceDefaultDB',
                        'storeName': 'fileOrDirHandles',
                        'key': '$l.uid',
                    }
                },
                objectModel: 'ActionEngine',
                method: 'processRequest',
                arguments: ['$getFromIDB', '$l.IDBGetReqArgs'],
                response: 'retrivedfH',
                callback: {
                    declare: {
                        'args': {
                            'fH': '$l.retrivedfH',
                            'uid': '$l.uid'
                        }
                    },
                    objectModel: 'ActionEngine',
                    method: 'processRequest',
                    arguments: ['openFileInEditor', '$l.args']
                }
            }
        }
    }
}

var closeTab = {
    declare: {
        "prevSib": "$l.trueTarget.parentElement.previousElementSibling",
        "nextSib": "$l.trueTarget.parentElement.nextElementSibling"
    },
    callback: [{
        condition: "$l.trueTarget.parentElement.classList.contains('active') && (l.prevSib || l.nextSib)",
        callback: [{
            condition: "$l.prevSib",
            declare: {
                "tabLink": "$l.prevSib"
            }
        }, {
            condition: "$!l.prevSib && l.nextSib",
            declare: {
                "tabLink": "$l.nextSib"
            }
        }, {
            objectModel: "$l.tabLink",
            method: "getAttribute",
            arguments: "data-attached-file-id",
            response: "uid",
        }, {
            declare: {
                "props": {
                    "uid": "$l.uid",
                    "tabLink": "$l.tabLink"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["openTab", "$l.props"]
        }]
    }, {
        objectModel: "$l.trueTarget.parentElement",
        method: "remove"
    }]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

var getUserInputDir = [{
    objectModel: "HandleFileSys",
    method: "getDirHandle",
    response: "dH"
}, {
    objectModel: "document",
    method: "getElementById",
    arguments: "fileSysNavigation",
    response: "fileNavigator"
}, {
    objectModel: "$l.fileNavigator",
    method: "querySelector",
    arguments: ".collection",
    response: "coll",
    callback: {
        condition: "$l.coll",
        objectModel: "$l.coll",
        method: "remove"
    }
}, {
    declare: {
        "args": {
            "currHandle": "$l.dH",
            "activeColl": "$l.fileNavigator",
            "isDone": false
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["setUserInputDir", "$l.args"]
}, {
    objectModel: "$l.fileNavigator",
    method: "querySelector",
    arguments: ".collection",
    response: "coll",
    callback: {
        condition: "$!l.coll.classList.contains('active')",
        objectModel: "$l.coll.classList",
        method: "add",
        arguments: "active"
    }
}]


var setUserInputDir = [{
        objectModel: 'CreateEntity',
        method: 'uniqueId',
        arguments: 20,
        response: 'uid',
    }, {
        declare: {
            "args": {
                'DBName': 'ActionSpaceDefaultDB',
                'storeName': 'fileOrDirHandles',
                'key': '$l.uid',
                'value': '$l.currHandle'
            }
        },
        objectModel: 'ActionEngine',
        method: 'processRequest',
        arguments: ['setToIDB', '$l.args'],
        callback: {
            declare: {
                "args": {
                    'DBName': 'ActionSpaceDefaultDB',
                    'storeName': 'fileOrDirHandles',
                    'key': '$l.uid',
                }
            },
            objectModel: 'ActionEngine',
            method: 'processRequest',
            arguments: ['getFromIDB', '$l.args'],
            response: "currHandle",
        }
    }, {
        condition: '$l.currHandle.kind === "file"',
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$navigatorFileTemp', '$l.activeColl'],
        response: "activeTemp",
        callback: {
            declare: {
                'activeTemp.innerText': '$l.currHandle.name',
                'props': {
                    'id': '$"file_" + l.uid',
                    'data-attached-fileid': '$l.uid'
                }
            },
            objectModel: 'CreateEntity',
            method: 'setProps',
            arguments: ['$l.activeTemp', '$l.props']
        }
    },
    {
        condition: '$l.currHandle.kind === "directory"',
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$navigatorCollTemp', '$l.activeColl'],
        response: "activeTemp",
        callback: {
            declare: {
                'activeTemp.id': '$"collection_" + l.uid',
                'activeTemp.children[0].innerText': '$l.currHandle.name'
            },
            objectModel: '$l.currHandle',
            method: 'values',
            response: 'dirValuesItr',
            callback: {
                condition: '$!l.isDone',
                objectModel: '$l.dirValuesItr',
                method: 'next',
                response: 'nextResult',
                loop: Math.pow(10, 2),
                callback: {
                    declare: {
                        "isDone": "$l.nextResult.done",
                        "args": {
                            "currHandle": "$l.nextResult.value",
                            "isDone": "$l.isDone",
                            "activeColl": "$l.activeTemp.children[1]"
                        }
                    },
                    callback: {
                        condition: '$!l.isDone',
                        objectModel: 'ActionEngine',
                        method: 'processRequest',
                        arguments: ['$setUserInputDir', '$l.args']
                    }
                }
            }
        }
    }
]
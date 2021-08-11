var log = {
    objectModel: 'console',
    method: 'log',
    arguments: ['Hello Handsome!']
};

var tryModel = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "log"
}, {
    objectModel: 'console',
    method: 'log',
    arguments: '$l'
}]

const dataContObj = {}

////////////////////////////////////////////////////////////////////////////////////////////////////////

var addXplorerTools = {
    objectModel: "document",
    method: "getElementById",
    arguments: "navbarSideLeftAddtnl",
    response: "addtnlNavbar",
    callback: {
        declare: {
            "addtnlNavbar.innerHTML": ""
        },
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$xplorerTools", "$l.addtnlNavbar"]
    }
}

var getOpenFileID = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'workspace',
    response: 'workspace',
    callback: {
        objectModel: "$l.workspace",
        method: 'getAttribute',
        arguments: 'data-open-fileid',
        response: 'fileID',
        return: '$l.fileID'
    }
}

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
    method: 'getElementById',
    arguments: 'docName',
    response: 'docName'
}, {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'tabLinks',
    response: 'tabLinks'
}, {
    objectModel: 'document',
    method: 'querySelector',
    arguments: '#tabLinks .tab-link.active',
    response: 'activeTabLink'
}, {
    declare: {
        "resp": {
            "workspace": "$l.workspace",
            "editor": "$l.editor",
            "docName": "$l.docName",
            "tabLinks": "$l.tabLinks",
            "activeTabLink": "$l.activeTabLink"
        }
    },
    return: "$l.resp"
}]

var makeFileRecord = {
    declare: {
        "uid": "$l.workspace.getAttribute('data-open-fileid')",
        "file": {
            "name": "$l.workspace.getAttribute('data-filename')",
            "ext": "$l.workspace.getAttribute('data-fileext')",
            "mimeType": "$l.workspace.getAttribute('data-filetype')"
        }
    },
    callback: {
        declare: {
            "temp": "$dataContObj[l.uid] ? dataContObj[l.uid] : dataContObj[l.uid] = {}",
            "temp.file": "$l.file",
            "temp.content": "$l.editor.innerHTML"
        }
    }
}

var newTabLink = {
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$navtabLinkTemp", "$l.resp.tabLinks.children[0]"],
    response: "tabLink",
    callback: {
        declare: {
            "props": {
                "data-attached-file-id": "$l.uid"
            },
            "tabLink.children[0].innerText": "$l.file.name + l.file.ext"
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.tabLink', '$l.props']
    }
}

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
        "resp.docName.value": "$l.file.name + l.file.ext",
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
            "resp.editor.innerHTML": "$dataContObj[l.uid].content"
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
    objectModel: 'HandleFileSys',
    method: 'getFileHandle',
    arguments: [{
        types: [{
            description: 'Text file',
            accept: {
                'text/plain': ['.txt']
            },
        }],
    }],
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

var toggleLeftSideNav = {
    objectModel: "document",
    method: "querySelector",
    arguments: ".navbar-side-left .active",
    response: "activeElement",
    callback: [{
        objectModel: "document",
        method: "getElementById",
        arguments: "navbarSideLeftAddtnl",
        response: "navLeftSideAddtnl",
    }, {
        condition: "$!l.activeElement",
        objectModel: "$l.trueTarget.classList",
        method: "add",
        arguments: "active",
        callback: {
            objectModel: "$l.navLeftSideAddtnl.classList",
            method: "add",
            arguments: "active",
            callback: {
                objectModel: "ActionEngine",
                method: "processRequest",
                arguments: "$l.actionValue"
            }
        }
    }, {
        condition: "$l.activeElement",
        objectModel: "$l.activeElement.classList",
        method: "remove",
        arguments: "active",
        callback: [{
                condition: "$l.activeElement !== l.trueTarget",
                objectModel: "$l.trueTarget.classList",
                method: "add",
                arguments: "active",
                callback: {
                    objectModel: "ActionEngine",
                    method: "processRequest",
                    arguments: "$l.actionValue"
                }
            },
            {
                condition: "$l.activeElement == l.trueTarget",
                objectModel: "$l.navLeftSideAddtnl.classList",
                method: "remove",
                arguments: "active"
            }
        ]
    }]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

var saveFileToLS = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
        condition: '$l.editor.getAttribute("data-is-unsaved") === "true"', // 
        objectModel: "CreateEntity",
        method: 'getProps',
        arguments: ['$l.editor', ['data-open-fileid']],
        response: 'respArr',
        callback: {
            declare: {
                'fileID': '$l.respArr[0]'
            },
            objectModel: "StorageHelper",
            method: 'set',
            arguments: ['$l.fileID', '$l.editor.innerHTML']
        }
    }
}

var exportFile = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
        declare: {
            'handleOpts': {
                'id': 'exportFile',
                'suggestedName': '$l.editor.getAttribute("data-filename")',
                'types': [{
                    'description': 'Text file',
                    'accept': {
                        'text/plain': ['.txt']
                    },
                }],
            }
        },
        objectModel: 'HandleFileSys',
        method: 'getNewFileHandle',
        arguments: ['$true', '$l.handleOpts'],
        response: 'fH',
        callback: {
            objectModel: 'CreateEntity',
            method: 'getProps',
            arguments: ['$l.editor', ['data-fileid']],
            response: 'respArr',
            callback: {
                declare: {
                    'uid': '$l.respArr[0]',
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
                            'content': '$l.editor.innerHTML'
                        },
                        objectModel: 'HandleFileSys',
                        method: 'writeFile',
                        arguments: ['$l.retrivedfH', '$l.content']
                    }
                }

            }
        }
    }
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
                    'data-attached-file-id': '$l.uid'
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
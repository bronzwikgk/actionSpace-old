/**
 * additional Request Models which are associated with a given view ( view and UI name mapping in `'pageReqModels'`)
 */
var pageAssocReq = {
    'editorUI': ['initFS', 'checkLogin'],
    'dashBoardUI': ['setCardInfo']
}

/**
 * checks if user is logged in via google and set user's info at user icon at top right 
 */
var checkLogin = [{
    objectModel: "localStorage",
    method: "getItem",
    arguments: "from_redirect",
    response: "fromRedirect"
}, {
    condition: "$l.fromRedirect != 'true'",
    objectModel: "localStorage",
    method: "setItem",
    arguments: ["from_redirect", "false"],
}, {
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "setUserInfo"
}]

/**
 * It processes UI for a given view (view and UI name mapping in `'pageReqModels'`)
 */
var generalUi = [{
    objectModel: "console",
    method: "log",
    arguments: ["i'm here", "$l.pageReqModel"]
}, {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'root',
    response: 'root',
    callback: {
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$window[l.pageReqModel]', '$l.root']
    }
}, {
    condition: "$pageAssocReq[l.pageReqModel] && pageAssocReq[l.pageReqModel].length > 0",
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "$pageAssocReq[l.pageReqModel]"
}]

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * It gets set of element required generally
 ** Return:-
        ** Object containing html elements' references
 */
var getEditorElementSet = {
    return: "$l",
    callback: [{
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
    }]
}

/**
 * It creates a new tabLink element in the tabLinks
 ** Initial Variables :-
        ** `'resp'` : set of Editor Elements
        ** `'uid'` : uid of file
        ** `'fileName'` : name of file
        ** `'fileExt'` : extension of file
 ** Return :- It returns newly created tablink HTML Element
 */
var newTabLink = {
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$navtabLinkTemp", "$l.resp.tabLinks.children[0]"],
    response: "tabLink",
    return: "$l.tabLink",
    callback: {
        declare: {
            "props": {
                "data-action-type": "switchFileNavTab",
                "data-attached-fileid": "$l.uid",
                "data-attached-filename": "$l.fileName + l.fileExt"
            },
            "tabLink.children[0].innerText": "$l.fileName + l.fileExt"
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.tabLink', '$l.props']
    }
}

/**
 * It switches from one tab to another (or one opened editor to another).
 ** Initial Variables :-
        ** `'resp'` : set of Editor Elements
        ** `'uid'` : uid of file
        ** `'fileName'` : name of file
        ** `'fileExt'` : extension of file
        ** `'fileType'` : mime Type of file
        ** `'fileContent'` : content of file
        ** `'tabLink'` : HTML element `.tab-link` which we want to go to / click target tablink element
*/
var switchToTab = [{
    condition: "$l.resp.activeTabLink",
    objectModel: "$l.resp.activeTabLink.classList",
    method: "remove",
    arguments: "active",
    callback: {
        declare: {
            "openUid": "$l.resp.workspace.dataset.openFileid",
            "openFileContent": "$l.resp.editor.innerText"
        },
        objectModel: "Entity",
        method: "setObjKeyVal",
        arguments: ["$editorDataSet['fileContents']", "$l.openUid", "$l.openFileContent"],
    }
}, {
    declare: {
        "resp.editor.innerText": "$l.fileContent",
        "props": {
            'data-open-fileid': '$l.uid',
            'data-filename': '$l.fileName',
            'data-fileext': '$l.fileExt',
            'data-filetype': '$l.fileType'
        },
    },
    objectModel: 'CreateEntity',
    method: 'setProps',
    arguments: ['$l.resp.workspace', '$l.props']
}, {
    objectModel: "$l.tabLink.classList",
    method: "add",
    arguments: "active"
}]

/**
 * It opens the given tab and sets content in editor from a given tablink.
 ** Initial Variables :-
        ** 'tabLink': HTML element .tab-link which we want to go to / click target tablink element
*/
var openTab = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
}, {
    condition: "$l.tabLink !== l.resp.activeTabLink",
    declare: {
        "uid": "$l.tabLink.dataset.attachedFileid",
        "args": {
            "uid": "$l.uid",
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
                'name': "$l.tabLink.dataset.attachedFilename",
                'content': "$l.fileContent"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["openFileInEditor", "$l.args"]
    }
}]

/**
 * It is request flow for creating a new entity (actionStory, directory, workflow doc)
 ** Initial Variables :-
        ** `'entityType'`: type of entity
 */
var newEntityReqFlow = [{
    objectModel: "document",
    method: "querySelector",
    arguments: '#fileSysNavigation .collection.selected',
    response: "selectedColl",
    callback: {
        condition: "$l.selectedColl",
        declare: {
            "path": "$l.selectedColl.dataset.pathFromRoot",
            "pathFromRoot": "$l.path == '' ? './' : (l.path + '/' + l.selectedColl.dataset.collName)"
        },
        callback: [{
            condition: "$l.entityType == 'directory'",
            declare: {
                "dirName": "$newDirectoryParams.name ? newDirectoryParams.name : 'NoName'",
                "handle": {
                    "kind": "directory",
                    "name": "$l.dirName"
                }
            }
        }, {
            condition: "$l.entityType !== 'directory'",
            declare: {
                "fileName": "$newFileParams.name ? newFileParams.name : 'NoName'",
                "fileExt": "$entityTypeMap[l.entityType]['ext'] || entityTypeMap[newFileParams.type]['ext']",
                "handle": {
                    "kind": "file",
                    "name": "$l.fileName + l.fileExt"
                }
            }
        }, {
            declare: {
                "args": {
                    "uid": "$l.selectedColl.dataset.rootUid"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["getHandleFromIDB", "$l.args"],
            response: "rootHandle",
            callback: {
                condition: "$editorDataSet.fsSync && l.rootHandle",
                declare: {
                    "args": {
                        "handle": "$l.rootHandle",
                        "pathFromRoot": "$l.pathFromRoot",
                        'create': '$false'
                    }
                },
                callback: [{
                    condition: "$l.handle",
                    declare: {
                        "x": "$l.x ? (l.x + 1) : 1",
                        "modFileName": "$l.fileName ? (l.fileName + l.x.toString()) : undefined",
                        "modDirName": "$l.dirName ? (l.dirName + l.x.toString()) : undefined",
                        "args.fileName": "$l.fileName ? (l.modFileName + l.fileExt) : undefined",
                        "args.dirName": "$l.dirName ? l.modDirName : undefined"
                    },
                    objectModel: "ActionEngine",
                    method: "processRequest",
                    arguments: ["getHandleFromDirHandle", "$l.args"],
                    response: "handle",
                    loop: 100,
                }, {
                    condition: "$!l.handle",
                    declare: {
                        "args.create": "$true",
                    },
                    objectModel: "ActionEngine",
                    method: "processRequest",
                    arguments: ["getHandleFromDirHandle", "$l.args"],
                    response: "handle",
                }]
            }
        }, {
            condition: "$l.handle",
            declare: {
                "args": {
                    'handle': "$l.handle",
                    'rootUid': "$l.selectedColl.dataset.rootUid",
                    'pathFromRoot': '$l.pathFromRoot',
                    'nav': "$l.selectedColl.children[1]"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["enumContents", "$l.args"]
        }]
    }
}, {
    condition: "$l.handle && l.handle.kind == 'file'",
    declare: {
        "args": {
            "uid": "$l.selectedColl.children[1].lastElementChild.dataset.fileUid",
            "kind": "file",
            "name": "$l.handle.name",
            "content": "$sampleActionStory"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["openFileInEditor", "$l.args"]
}]

/**
 * It opens a file in the editor (editable area), with given params
 ** Initial Variables :-
        ** `'uid'`: uid of file,
        ** `'name'`: full name of file (with ext)
        ** `'content'`: content of file

*/
var openFileInEditor = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
}, {
    declare: {
        "fileName": "$l.name.slice(0,l.name.lastIndexOf('.'))",
        "fileExt": "$l.name.slice(l.name.lastIndexOf('.'))",
        "entityType": "$entityTypeMap[extEntityTypeMap[l.fileExt] || '']"
    },
    objectModel: "document",
    method: "querySelector",
    arguments: '$".tab-link[data-attached-fileid=" + l.uid + "]"',
    response: "tabLink",
    callback: {
        condition: "$!l.tabLink",
        declare: {
            "args": {
                'resp': "$l.resp",
                'uid': "$l.uid",
                'fileName': "$l.fileName",
                'fileExt': "$l.fileExt"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["newTabLink", "$l.args"],
        response: "tabLink"
    }
}, {
    declare: {
        "args": {
            "uid": "$l.uid",
            "resp": "$l.resp",
            "tabLink": "$l.tabLink",
            "fileName": "$l.fileName",
            "fileExt": "$l.fileExt",
            "fileType": "$l.entityType?.['mimeType'] || 'xxxxx'",
            "fileContent": "$l.content"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["switchToTab", "$l.args"]
}, {
    declare: {
        "reqModels": "$l.entityType?.['entityReqModels'] || []"
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "$l.reqModels"
}, {
    declare: {
        "openUid": "$l.resp.workspace.dataset.openFileid",
        "openFileContent": "$l.resp.editor.innerText"
    },
    objectModel: "Entity",
    method: "setObjKeyVal",
    arguments: ["$editorDataSet['fileContents']", "$l.openUid", "$l.openFileContent"],
}]

/**
 * It takes input file (`FileSystemFileHandle`) from user, sets it (file handle) to IDB and opens it in editor
 */
var getUserInputFile = [{
    objectModel: 'HandleFileSys',
    method: 'getFileHandle',
    response: 'fH',
}, {
    declare: {
        "args": {
            "handle": "$l.fH"
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['storeHandleToIDB', '$l.args'],
    response: "respArr",
    callback: {
        declare: {
            "uid": "$l.respArr[0]",
            "handle": "$l.respArr[1]",
        }
    }
}, {
    declare: {
        "args": {
            "uid": "$l.uid",
            "handle": "$l.handle"
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['getFileContent', '$l.args'],
    response: "content",
}, {
    declare: {
        "args": {
            "uid": "$l.uid",
            "name": "$l.handle.name",
            "content": "$l.content"
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['openFileInEditor', '$l.args']
}]

/**
 * It closes a given tablink and also switch to previous tablink (if no previous tablink, then next tablink)
 ** Initial Variables :-
        ** `'trueTarget'`: close element in `.tab-link` which is clicked 
 */
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
            declare: {
                "props": {
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

/**
 * It takes input directory (`FileSystemDirectoryHandle`) from user, and opens it in actionSpace
 */
var getUserInputDir = [{
    objectModel: "HandleFileSys",
    method: "getDirHandle",
    response: "dH"
}, {
    declare: {
        "args": {
            "handle": "$l.dH"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["setUserInputDir", "$l.args"]
}, {
    objectModel: "document",
    method: "querySelector",
    arguments: '.collection[data-collection-type="userCollection"]',
    response: "coll",
    callback: [{
        condition: "$l.coll",
        objectModel: "$l.coll.classList",
        method: "add",
        arguments: "selected"
    }, {
        condition: "$l.coll && !l.coll.classList.contains('active')",
        objectModel: "$l.coll.classList",
        method: "add",
        arguments: "active"
    }]
}]

/**
 * It sets given directory (`FileSystemDirectoryHandle`) to IDB and opens in left side nav bar (by enumerating its contents)
 ** Initial Variables :-
        ** `'handle'`: directory handle (`FileSystemDirectoryHandle`)
 */
var setUserInputDir = [{
    declare: {
        "args": {
            "handle": "$l.handle"
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['storeHandleToIDB', '$l.args'],
    response: "respArr",
    callback: {
        declare: {
            "uid": "$l.respArr[0]",
            "handle": "$l.respArr[1]",
        }
    }
}, {
    objectModel: "document",
    method: "getElementById",
    arguments: 'fileSysNavigation',
    response: "fileSysNavigation",
}, {
    objectModel: "$l.fileSysNavigation",
    method: "querySelector",
    arguments: '.collection[data-collection-type="userCollection"]',
    response: "coll",
    callback: [{
        condition: "$!l.coll",
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$navigatorCollTemp', '$l.fileSysNavigation'],
        response: "coll",
    }, {
        declare: {
            "coll.children[0].innerText": "$l.handle.name",
            "coll.children[1].innerHTML": "",
            'props': {
                "id": "$'collection_' + l.uid",
                "data-coll-uid": "$l.uid",
                "data-root-uid": "$l.uid",
                "data-path-from-root": "",
                "data-collection-type": "userCollection"
            }
        },
        objectModel: "CreateEntity",
        method: "setProps",
        arguments: ["$l.coll", "$l.props"]
    }]
}, {
    declare: {
        "args": {
            "handle": "$l.handle",
            "callbackReq": "enumContents",
            "callbackReqParams": {
                "nav": "$l.coll.children[1]",
                "rootUid": "$l.uid",
                "pathFromRoot": "./"
            }
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["itrDirItems", "$l.args"],
}]

/**
 * It iterates through each item in directory and calls a request model for each.
 ** Initial Variables :-
        ** `'handle'`: directory handle
        ** `'callbackReq'`: reqest model, which is to be called for each item in directory
        ** `'callbackReqParams'`: parameters of callback request
 */
var itrDirItems = {
    condition: "$l.handle.kind === 'directory'",
    objectModel: '$l.handle',
    method: 'values',
    response: 'dirValuesItr',
    callback: {
        objectModel: '$l.dirValuesItr',
        method: 'next',
        response: 'nextResult',
        loop: Math.pow(10, 2),
        callback: {
            condition: '$!l.nextResult.done',
            declare: {
                "args": "$l.callbackReqParams",
                "args.handle": "$l.nextResult.value"
            },
            objectModel: 'ActionEngine',
            method: 'processRequest',
            arguments: ['$l.callbackReq', '$l.args']
        }
    }
}

/**
 * It takes a handle (not necessarily `FileSystemFileHandle`/`FileSystemDirectoryHandle`, you can create an Object with similar properties and use), and makes entries in given `nav` and if it's directory, then request goes recursive
 ** Initial Variables :-
        ** `'handle'`: file/directory handle
        ** `'rootUid'`: uid of root directory
        ** `'pathFromRoot'`: path of file/directory from root directory
        ** `'nav'`: element to whom the new entry is to be appended
 */
var enumContents = [{
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 20,
    response: 'uid',
}, {
    condition: '$l.handle.kind === "file"',
    declare: {
        "args": {
            'uid': "$l.uid",
            'fileName': "$l.handle.name",
            "rootUid": "$l.rootUid",
            "pathFromRoot": "$l.pathFromRoot",
            'nav': "$l.nav"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["addFileToFilesNavigation", "$l.args"],
    response: "activeFile"
}, {
    condition: '$l.handle.kind === "directory"',
    declare: {
        "args": {
            'uid': "$l.uid",
            "rootUid": "$l.rootUid",
            'dirName': "$l.handle.name",
            "pathFromRoot": "$l.pathFromRoot",
            'nav': "$l.nav"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["addDirToFilesNavigation", "$l.args"],
    response: "activeColl",
    callback: [{
        declare: {
            "args": {
                "initialPath": "$l.pathFromRoot",
                "pathToAdd": "$l.handle.name"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["makePath", "$l.args"],
        response: "path",
    }, {
        declare: {
            "args": {
                "handle": "$l.handle",
                "callbackReq": "enumContents",
                "callbackReqParams": {
                    "rootUid": "$l.rootUid",
                    "nav": "$l.activeColl.children[1]",
                    "pathFromRoot": "$l.path"
                }
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["itrDirItems", "$l.args"],
    }]
}]

/**
 * It creates html like an file entry in left side nav bar and appends it to given `nav`
 ** Initial Variables :-
        ** `'uid'`: uid of file
        ** `'rootUid'`: uid of root directory
        ** `'fileName'`: name of file
        ** `'pathFromRoot'`: path of directory from root directory
        ** `'nav'`: element to whom the new entry is to be appended
 ** Return :- newly created HTML element.
 */
var addFileToFilesNavigation = {
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$navigatorFileTemp", "$l.nav"],
    response: "fileTemp",
    return: "$l.fileTemp",
    callback: {
        declare: {
            'fileTemp.innerText': '$l.fileName',
            // 'mimeType': "$mimeMap[l.file.ext]",
            'props': {
                'id': '$"file_" + l.uid',
                'data-file-uid': '$l.uid',
                "data-root-uid": "$l.rootUid",
                "data-file-name": "$l.fileName.trim()",
                "data-path-from-root": "$l.pathFromRoot"
            }
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.fileTemp', '$l.props']
    }
}

/**
 * It creates html like a directory entry in left side nav bar and appends it to given `nav`
 ** Initial Variables :-
        ** `'uid'`: uid of directory
        ** `'rootUid'`: uid of root directory
        ** `'fileName'`: name of directory
        ** `'pathFromRoot'`: path of directory from root directory
        ** `'nav'`: element to whom the new entry is to be appended
 ** Return :- newly created HTML element.
 */
var addDirToFilesNavigation = {
    objectModel: 'CreateEntity',
    method: 'create',
    arguments: ['$navigatorCollTemp', '$l.nav'],
    response: "collTemp",
    return: "$l.collTemp",
    callback: {
        declare: {
            'collTemp.children[0].innerText': '$l.dirName',
            'props': {
                "id": "$'collection_' + l.uid",
                "data-coll-uid": "$l.uid",
                "data-coll-name": "$l.dirName.trim()",
                "data-root-uid": "$l.rootUid",
                "data-path-from-root": "$l.pathFromRoot"
            }
        },
        objectModel: "CreateEntity",
        method: "setProps",
        arguments: ["$l.collTemp", "$l.props"]
    }
}

/**
 * opens a default directory (initially) in left side nav bar
 */
var initFS = [{
        objectModel: 'CreateEntity',
        method: 'uniqueId',
        arguments: 20,
        response: 'uid',
    }, {
        objectModel: "document",
        method: "getElementById",
        arguments: "fileSysNavigation",
        response: "fileNavigator"
    }, {
        declare: {
            "args": {
                "uid": "$l.uid",
                "rootUid": "$l.uid",
                "dirName": "$defaultDir['name']",
                "nav": "$l.fileNavigator",
                "pathFromRoot": ""
            },
            "children": "$defaultDir['child']",
            "n": "$l.children.length",
            "x": 0
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["addDirToFilesNavigation", "$l.args"],
        response: "activeColl",
        callback: {
            declare: {
                "props": {
                    "data-collection-type": "userCollection"
                }
            },
            objectModel: 'CreateEntity',
            method: 'setProps',
            arguments: ["$l.activeColl", "$l.props"],
        }
    },
    {
        declare: {
            "fH": "$l.children[l.x++]",
            "fileContent": "$l.fH.content",
            "args": {
                "handle": "$l.fH",
                "rootUid": "$l.activeColl.dataset.collUid",
                "nav": "$l.activeColl.querySelector('.content')",
                "pathFromRoot": "./"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["enumContents", "$l.args"],
        loop: "$l.n",
        callback: [{
            objectModel: "$l.activeColl",
            method: "querySelector",
            arguments: ".content .file:last-child",
            response: "activeFile"
        }, {
            declare: {
                "fileUid": "$l.activeFile.dataset.fileUid"
            },
            objectModel: "Entity",
            method: "setObjKeyVal",
            arguments: ["$editorDataSet['fileContents']", "$l.fileUid", "$l.fileContent"],
        }]
    }, {
        objectModel: "document",
        method: "querySelector",
        arguments: '.collection[data-collection-type="userCollection"]',
        response: "coll",
        callback: [{
            objectModel: "$l.coll.classList",
            method: "add",
            arguments: "selected"
        }, {
            condition: "$!l.coll.classList.contains('active')",
            objectModel: "$l.coll.classList",
            method: "add",
            arguments: "active"
        }]
    }, {
        declare: {
            "args": {
                "uid": "$l.fileUid",
                "name": "$l.activeFile.dataset.fileName",
                "content": "$editorDataSet['fileContents'][l.fileUid]"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["openFileInEditor", "$l.args"],
    }
]

/**
 * It makes a path (used in `pathFromRoot`, or generally `'relative'` path to file), from given params
 ** Initial Variables :-
        ** `'initialPath'`: initial path (string)
        ** `'pathToAdd'`: path to be added (string/array)
 ** Return :- created path (string).
 */
var makePath = {
    declare: {
        'newPath': '$l.initialPath'
    },
    return: "$l.newPath",
    callback: [{
        condition: "$operate.isArray(l.pathToAdd)",
        objectModel: "$l.pathToAdd",
        method: "join",
        arguments: "/",
        response: "pathToAdd"
    }, {
        condition: "$operate.isString(l.pathToAdd)",
        declare: {
            "initialPath": "$(l.initialPath ==  '' || l.initialPath ==  '/') ? './' : l.initialPath + (l.initialPath.at(-1) == '/' ? '' : '/')",
            "newPath": "$l.initialPath + l.pathToAdd"
        }
    }]
}

/**
 * It gets a file/directory handle inside the given directory handle(`FileSystemDirectoryHandle`), from a given name (of file/directory), and if it does not exists, whether to create it or not (if given intial variable is `'create'` true, then it is created)
 ** Initial Variables :-
        ** `'handle'`: handle of root directory
        ** `'pathFromRoot'`: path of directory from root directory
        ** `'fileName'`/`'dirName'`: file/directory name whose handle is needed (optional)
        ** `'create'`: whether to create a handle or not, if not present
 ** Return :- a required handle.
 */
var getHandleFromDirHandle = {
    condition: "$l.handle && l.handle.kind == 'directory'",
    declare: {
        "x": 0,
        "pathFromRoot": "$l.pathFromRoot.trim()",
        "respHandle": "$l.handle"
    },
    objectModel: "$l.pathFromRoot",
    method: "split",
    arguments: "/",
    response: "pathFromRootArr",
    return: "$l.respHandle",
    callback: [{
        declare: {
            "currName": "$l.pathFromRootArr[l.x++]"
        },
        loop: "$l.pathFromRootArr.length",
        callback: {
            condition: "$l.currName != '' && l.currName != '.'",
            objectModel: "HandleFileSys",
            method: "getNewDirHandle",
            arguments: ["$l.respHandle", "$l.currName", "$false"],
            response: "respHandle",
        }
    }, {
        condition: "$l.fileName && l.fileName.indexOf('.') > -1",
        objectModel: "HandleFileSys",
        method: "getNewFileHandle",
        arguments: ["$false", "$l.respHandle", "$l.fileName", "$l.create"],
        response: "respHandle",
    }, {
        condition: "$l.dirName",
        objectModel: "HandleFileSys",
        method: "getNewDirHandle",
        arguments: ["$l.respHandle", "$l.dirName", "$l.create"],
        response: "respHandle",
    }]
}

/**
 * It gets content (text content) from either a given file id (which is stored in `editorDataSet['fileContents']`), or from a handle.
 ** Initial Variables :-
        ** `'uid'`: uid of file
        ** `'fileName'`: full name of file (with ext)
        ** `'handle'`: handle of file/root directory
        ** `'pathFromRoot'`: path of directory from root directory (if root directory is used)
 ** Return :- required file's content.
 */
var getFileContent = {
    condition: "$l.uid",
    declare: {
        "fileContent": "$editorDataSet['fileContents'][l.uid]"
    },
    return: "$l.fileContent",
    callback: {
        condition: "$!l.fileContent && (l.handle || l.rootUid)",
        callback: [{
            condition: "$!l.handle",
            declare: {
                "args": {
                    'uid': '$l.rootUid ? l.rootUid : l.uid',
                }
            },
            objectModel: 'ActionEngine',
            method: 'processRequest',
            arguments: ['getHandleFromIDB', '$l.args'],
            response: "handle",
        }, {
            condition: "$l.handle && l.handle.kind == 'directory'",
            declare: {
                "args": {
                    "handle": "$l.handle",
                    "pathFromRoot": "$l.pathFromRoot",
                    "fileName": "$l.fileName",
                    "create": "$false"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["getHandleFromDirHandle", "$l.args"],
            response: "fH",
        }, {
            condition: "$l.handle && l.handle.kind == 'file'",
            declare: {
                "fH": "$l.handle"
            }
        }, {
            condition: "$l.fH && l.fH.kind == 'file'",
            objectModel: 'HandleFileSys',
            method: 'getFile',
            arguments: ['$l.fH'],
            response: 'file',
            callback: {
                objectModel: 'HandleFileSys',
                method: 'readFile',
                arguments: ['$l.file'],
                response: 'fileContent',
            }
        }]
    }
}

/**
 * It saves (to fileSystem, if it is from fileSystem, either opened (import) by user as a file, or a directory) the current open file in editor.
 */
var saveFileReqFlow = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
}, {
    declare: {
        "uid": "$l.resp.activeTabLink.dataset.attachedFileid"
    },
    objectModel: "document",
    method: "getElementById",
    arguments: '$"file_"+ l.uid',
    response: "openFileTab",
}, {
    declare: {
        "args": {
            "uid": "$l.openFileTab ? l.openFileTab.dataset.rootUid : l.uid"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getHandleFromIDB", "$l.args"],
    response: "handle",
    callback: {
        condition: "$l.handle && l.handle.kind == 'directory' && l.openFileTab",
        declare: {
            "args": {
                "handle": "$l.handle",
                "pathFromRoot": "$l.openFileTab.dataset.pathFromRoot",
                "fileName": "$l.openFileTab.dataset.fileName",
                "create": "$false"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["getHandleFromDirHandle", "$l.args"],
        response: "handle",
    }
}, {
    condition: "$l.handle && l.handle.kind == 'file'",
    declare: {
        'content': '$l.resp.editor.innerText'
    },
    objectModel: 'HandleFileSys',
    method: 'writeFile',
    arguments: ['$l.handle', '$l.content']
}]

/**
 * It exports the current open file in editor to user's desired location.
 * Irrespective of the fact that whether the file is opened from file system or not
 */
var exportFile = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
}, {
    declare: {
        'handleOpts': {
            'id': 'exportFile',
            'suggestedName': '$l.resp.workspace.dataset.filename',
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
}, {
    declare: {
        "args": {
            "uid": "$l.resp.workspace.dataset.openFileid",
            "handle": "$l.fH"
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['storeHandleToIDB', '$l.args'],
    response: "respArr",
}, {
    objectModel: "console",
    method: "log",
    arguments: "$l.resp.editor.innerText"
}, {
    declare: {
        "fH": "$l.respArr[1]",
        'content': '$l.resp.editor.innerText'
    },
    objectModel: 'HandleFileSys',
    method: 'writeFile',
    arguments: ['$l.fH', '$l.content']
}]

var autoSave = {

}

/////////////////////////////////////////////////////////////////////////////////////////

/* 

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

*/
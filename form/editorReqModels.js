var log = {
    objectModel: 'console',
    method: 'log',
    arguments: 'Hello Handsome!'
};

var getFileName = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'fileName',
    response: 'Fname'
}

var getUniqueID = {
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 12,
    response: 'uid',
    return: '$l.uid'
}

var editor = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

var getOpenFileID = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    return: '$l.fileID',
    callback: {
        objectModel: "$l.editor",
        method: 'getAttribute',
        arguments: 'data-open-fileid',
        response: 'fileID'
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

/*
ActionEngine.processRequest('openFileInEditor', {
    'fH': <fileHandle>,
    'uid': <uid of fileHandle in IDB>
})
*/
var openFileInEditor = {
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
        callback: {
            objectModel: 'document',
            method: 'getElementById',
            arguments: 'editor',
            response: 'editor',
            callback: {
                declare: {
                    'editor.innerHTML': '$l.fileText', // editor[l.editor.setContent]
                    'fileName': '$l.fH.name.slice(0,l.fH.name.lastIndexOf("."))',
                    'fileExt': '$l.fH.name.slice(l.fH.name.lastIndexOf("."))',
                    'editorProps': {
                        'data-fileid': '$l.uid',
                        'data-filename': '$l.fileName',
                        'data-fileext': '$l.fileExt',
                        'data-filetype': 'text/plain'
                    }
                },
                objectModel: 'CreateEntity',
                method: 'setProps',
                arguments: ['$l.editor', '$l.editorProps'],
                callback: {
                    objectModel: 'document',
                    method: 'querySelector',
                    arguments: '.titleBar .dName',
                    response: 'docNameElem',
                    callback: {
                        declare: {
                            'docNameElem.value': '$l.fileName + l.fileExt'
                        }
                    }
                }
            }
        }
    }
}

var closeFileInEditor = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
        declare: {
            'editor.innerHTML': '',
            'props': {
                'data-fileid': '',
                'data-filename': '',
                'data-fileext': '',
                'data-filetype': '',
                'data-has-unsaved-data': ''
            }
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.editor', '$l.props']
    }
}

var newFileReqFlow = {
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 12,
    response: 'uid',
    callback: {
        objectModel: 'document',
        method: 'getElementById',
        arguments: 'editor',
        response: 'editor',
        callback: {
            declare: {
                'props': {
                    'data-open-fileid': '$l.uid',
                    'data-filename': 'Untitled.txt',
                    'data-fileext': '.txt',
                    'data-filetype': 'text/plain'
                }
            },
            objectModel: 'CreateEntity',
            method: 'setProps',
            arguments: ['$l.editor', '$l.props']
        }
    }
}

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
        arguments: 12,
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
                        'reqArgs': {
                            'fH': '$l.retrivedfH',
                            'uid': '$l.uid'
                        }
                    },
                    objectModel: 'ActionEngine',
                    method: 'processRequest',
                    arguments: ['$openFileInEditor', '$l.reqArgs']
                }
                // }
            }
        }
    }
}

var exportFile = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'workSpace',
    response: 'editor',
    callback: {
        declare: {
            'handleOpts': {
                'id': 'saveFile',
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

///////////////////////////////////////////////////////////////////////////////////////////////////////

var getUserInputDir = {
    condition: '$!l.isDone',
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 12,
    response: 'uid',
    callback: {
        objectModel: 'IndexedDataBase',
        method: 'createStore',
        arguments: ['ActionSpaceDefaultDB', 'fileOrDirHandles'],
        response: 'storeFunc',
        callback: {
            objectModel: 'IndexedDataBase',
            method: 'set',
            arguments: ['$l.uid', '$l.currHandle', '$l.storeFunc'],
            callback: [{
                    condition: '$l.currHandle.kind === "file"',
                    objectModel: 'CreateEntity',
                    method: 'create',
                    arguments: ['$navigatorFileTemp', '$l.activeCollDom'],
                    callback: {
                        objectModel: 'document',
                        method: 'querySelector',
                        arguments: '.navigator .activeFileTemp',
                        response: 'activeFileTemp',
                        callback: {
                            declare: {
                                'activeFileTemp.innerHTML': '$l.currHandle.name',
                                'fileProps': {
                                    'data-fileid': '$l.uid'
                                }
                            },
                            objectModel: 'CreateEntity',
                            method: 'setProps',
                            arguments: ['$l.activeFileTemp', '$l.fileProps'],
                            callback: {
                                objectModel: '$l.activeFileTemp.classList',
                                method: 'remove',
                                arguments: 'activeFileTemp'
                            }
                        }
                    }
                },
                {
                    condition: '$l.currHandle.kind === "directory"',
                    objectModel: 'CreateEntity',
                    method: 'create',
                    arguments: ['$navigatorCollTemp', '$l.activeCollDom'],
                    callback: {
                        objectModel: 'document',
                        method: 'querySelector',
                        arguments: '.navigator .activeCollTemp',
                        response: 'activeCollTemp',
                        callback: {
                            declare: {
                                'activeCollTemp.id': '$"collection_" + l.uid',
                                'activeCollTemp.children[0].childNodes[1].textContent': '$l.currHandle.name',
                                'collProps': {
                                    'data-action-target-element-id': '$"collection_" + l.uid'
                                },
                            },
                            // objectModel: 'console',
                            // method: 'log',
                            // arguments: ['$l.collProps']
                            objectModel: 'CreateEntity',
                            method: 'setProps',
                            arguments: ['$l.activeCollTemp.children[0]', '$l.collProps'],
                            callback: {
                                objectModel: '$l.currHandle',
                                method: 'values',
                                response: 'dirValuesItr',
                                callback: {
                                    condition: '$!l.isDone',
                                    objectModel: '$l.dirValuesItr',
                                    method: 'next',
                                    response: 'nextResult',
                                    loop: 1000,
                                    callback: {
                                        objectModel: '$l.activeCollTemp.classList',
                                        method: 'remove',
                                        arguments: 'activeCollTemp',
                                        callback: {
                                            declare: {
                                                reqArgs: {
                                                    currHandle: "$l.nextResult.value",
                                                    isDone: "$l.nextResult.done",
                                                    activeCollDom: "$l.activeCollTemp"
                                                }
                                            },
                                            objectModel: 'ActionEngine',
                                            method: 'processRequest',
                                            arguments: ['$getUserInputDir', '$l.reqArgs']
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    }
}
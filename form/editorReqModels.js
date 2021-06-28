var createElem = {
    objectModel: 'document',
    method: 'createElement',
    arguments: 'div',
    response: 'elem',
    callback: {
        objectModel: 'document.body',
        method: 'appendChild',
        arguments: '$l.elem',
        callback: {
            declare: {
                'elem': {
                    'innerHTML': 'Helloworld'
                }
            }
        }
    }
};

var log = {
    objectModel: 'console',
    method: 'log',
    arguments: 'Hello Handsome!'
};

// /////////////////////////////////////////////////////////////////////////////////////////////////////

var editor = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor'
}

var getOpenFileID = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
        objectModel: "$l.editor",
        method: 'getAttribute',
        arguments: 'data-open-fileid',
        response: 'fileID',
        return: '$l.fileID'
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
    condition: '$l.editor.getAttribute("data-is-unsaved")',
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
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
                'data-has-unsaved-data': 'false'
            }
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.editor', '$l.props']
    }
}

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
            objectModel: 'IndexedDataBase',
            method: 'createStore',
            arguments: ['ActionSpaceDefaultDB', 'fileOrDirHandles'],
            response: 'storeFunc',
            callback: {
                objectModel: 'IndexedDataBase',
                method: 'set',
                arguments: ['$l.uid', '$l.fH', '$l.storeFunc'],
                callback: {
                    objectModel: 'IndexedDataBase',
                    method: 'get',
                    arguments: ['$l.uid', '$l.storeFunc'],
                    response: 'retrivedfH',
                    callback: {
                        objectModel: 'HandleFileSys',
                        method: 'getFile',
                        arguments: ['$l.retrivedfH'],
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
                                        'editor.innerHTML': '$l.fileText',
                                        'editorProps': {
                                            'data-fileid': '$l.uid',
                                            'data-filename': '$l.retrivedfH.name',
                                            'data-fileext': '.txt',
                                            'data-filetype': 'text/plain'
                                        }
                                    },
                                    objectModel: 'CreateEntity',
                                    method: 'setProps',
                                    arguments: ['$l.editor', '$l.editorProps']
                                }
                            }
                        }
                    }
                }
            }
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
                    'uid': '$l.respArr[0]'
                },
                objectModel: 'IndexedDataBase',
                method: 'createStore',
                arguments: ['ActionSpaceDefaultDB', 'fileOrDirHandles'],
                response: 'storeFunc',
                callback: {
                    objectModel: 'IndexedDataBase',
                    method: 'set',
                    arguments: ['$l.uid', '$l.fH', '$l.storeFunc'],
                    callback: {
                        objectModel: 'IndexedDataBase',
                        method: 'get',
                        arguments: ['$l.uid', '$l.storeFunc'],
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
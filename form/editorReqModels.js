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
    objectModel:'console',
    method:'log',
    arguments:'click event occured'
 };

// /////////////////////////////////////////////////////////////////////////////////////////////////////

var editor = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor'
}

var getOpenFileID = {
    extends: 'editor',
    callback: {
        objectModel: "$l.editor",
        method: 'getAttribute',
        arguments: 'data-fileID',
        response: 'fileID',
        return: '$l.fileID'
    }
}

var saveFileToLS = {
    condition: '$l.editor.getAttribute("data-has-unsaved-data")',
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'editor',
    response: 'editor',
    callback: {
        objectModel: "CreateEntity",
        method: 'getProps',
        arguments: ['$l.editor', ['data-fileid']],
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
    extends: 'editor',
    callback: {
        declare: {
            'editor.innerHTML': ''
        },
        objectModel: 'CreateEntity',
        method: 'setProps',
        arguments: ['$l.editor', {
            'data-fileid': '',
            'data-filename': '',
            'data-has-unsaved-data': 'false'
        }]
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
                    'data-fileid': '$l.uid',
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
                                // objectModel: 'console',
                                // method: 'log',
                                // arguments: '$l.fileText'
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

var getUserSaveFile = {
    objectModel: 'HandleFileSys',
    method: 'getNewFileHandle',
    arguments: [true, {
        suggestedName: 'Untitled Text.txt',
        types: [{
            description: 'Text file',
            accept: {
                'text/plain': ['.txt']
            },
        }],
    }],
    response: 'fH',
    callback: {
        objectModel: 'document',
        method: 'getElementById',
        arguments: 'editor',
        response: 'editor',
        callback: {
            // declare: {
            //     'editor': {
            //         'uid': '$l.fileText'
            //     },
            //     'editorProps': {
            //         'data-fileid': '$l.uid',
            //         'data-filename': '$l.retrivedfH.name',
            //         'data-fileext': '.txt',
            //         'data-filetype': 'text/plain'
            //     }
            // },
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
                            // objectModel: 'window',
                            // method: 'alert',
                            // arguments: '$l.content'
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


var exportFile = {

    callback: {
        objectModel: 'HandleFileSys',
        method: 'getNewFileHandle',
        arguments: [false, {
            suggestedName: 'Untitled Text.txt',
            types: [{
                description: 'Text file',
                accept: {
                    'text/plain': ['.txt']
                },
            }],
        }],
        response: 'fileHandle',
        callback: {
            objectModel: 'document',
            method: 'getElementById',
            arguments: 'editor',
            response: 'editor',
            callback: {
                declare: {
                    'content': '$l.editor.innerHTML'
                },
                // objectModel: 'console',
                // method: 'log',
                // arguments: '$l.content'
                objectModel: 'HandleFileSys',
                method: 'writeFile',
                arguments: ['$l.fileHandle', '$l.content']
            }
        }
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////



var log = {
    objectModel: 'console',
    method: 'log',
    arguments: ['Hello Handsome!']
};

var tryReq = {
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getEditorElementSet",
    response: "resp",
    callback: {
        objectModel: "console",
        method: "log",
        arguments: "$l.resp"
    }
}

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



/* var toggleLeftSideNav = {
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
} */

///////////////////////////////////////////////////////////////////////////////////////////////////////

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
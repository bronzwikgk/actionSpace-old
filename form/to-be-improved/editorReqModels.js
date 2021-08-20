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
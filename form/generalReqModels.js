var requiredScripts = {
    "code": [
        "./form/editorReqModels.js",
        "./function/editorV1.js"
    ],
    "richtext": [
        "./form/editorReqModels.js",
        "./function/editorV1.js"
    ],
    "canvas": [
        "./form/click-and-draw/sorted-set.js",
        "./form/click-and-draw/cad.js",
        "./form/click-and-draw/main.js"
    ]
}

var switchEditorMode = [{
        objectModel: "document",
        method: "getElementById",
        arguments: "workSpaceContainer",
        response: "editorContainer",
    },
    {
        condition: "$!operate.isUseless(l.modeName)",
        declare: {
            "editorContainer.innerHTML": ""
        },
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$window[l.modeName + 'UI']", "$l.editorContainer"],
        callback: {
            condition: '$l.modeName === "canvas"',
            declare: {
                cadProps: {
                    "elem": "$document.getElementsByClassName('fc')[0]",
                    "proximityQ": 20
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ['CAD', '$l.cadProps'] //{elem:document.getElementsByClassName('fc')[0], proximityQ:20}
        }
    }
    // {
    //     objectModel: "document",
    //     method: "getElementsByName",
    //     arguments: "specialScript",
    //     response: "presentScripts",
    //     callback: {
    //         declare: {
    //             n: '$l.presentScripts.length'
    //         },
    //         callback: {
    //             loop: "$l.n",
    //             objectModel: "$l.presentScripts[0].parentNode",
    //             method: "removeChild",
    //             arguments: ["$l.presentScripts[0]"]
    //         }
    //     }
    // },
    // {
    //     condition: "$!operate.isUseless(l.modeName)",
    //     declare: {
    //         "scriptProps": {
    //             "attrs": {
    //                 "name": "specialScript"
    //             }
    //         },
    //     },
    //     objectModel: "CreateEntity",
    //     method: "injectScripts",
    //     arguments: ["$requiredScripts[l.modeName]", "$l.scriptProps"]
    // }
]

var generalUI = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'root',
    response: 'root',
    callback: {
        objectModel: 'CreateEntity',
        method: 'create',
        arguments: ['$editor_main', '$l.root']
    }
}

var hideSideNavBar = {
    objectModel: "document",
    method: "getElementById",
    arguments: "leftSide",
    response: "leftSide",
    callback: {
        declare: {
            'leftSide.innerHTML': ""
        },
        objectModel: "$l.leftSide.classList",
        method: "remove",
        arguments: "active"
    }
}

var recentsReqModel = {
    objectModel: "document",
    method: "getElementById",
    arguments: "leftSide",
    response: "leftSide",
    callback: {
        declare: {
            'leftSide.innerHTML': ""
        },
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$leftNavBarTitle", "$l.leftSide"],
        callback: {
            declare: {
                "leftSide.children[0].children[0].innerHTML": "Recents"
            },
            objectModel: "$l.leftSide.classList",
            method: "add",
            arguments: "active"
        }
    }
}

var xplorerReqModel = {
    objectModel: "document",
    method: "getElementById",
    arguments: "leftSide",
    response: "leftSide",
    callback: {
        declare: {
            'leftSide.innerHTML': ""
        },
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$leftNavBarTitle", "$l.leftSide"],
        callback: {
            declare: {
                "leftSide.children[0].children[0].innerHTML": "Xplorer"
            },
            objectModel: "$l.leftSide.classList",
            method: "add",
            arguments: "active"
        }
    }
}

var editorConfigReqModel = {
    objectModel: "document",
    method: "getElementById",
    arguments: "leftSide",
    response: "leftSide",
    callback: {
        declare: {
            'leftSide.innerHTML': "",
            'elemsToAppend': ["$leftNavBarTitle", "$editorModesUI"]
        },
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$l.elemsToAppend", "$l.leftSide"],
        callback: {
            declare: {
                "leftSide.children[0].children[0].innerHTML": "Editor Configuration"
            },
            objectModel: "$l.leftSide.classList",
            method: "add",
            arguments: "active"
        }
    }
}
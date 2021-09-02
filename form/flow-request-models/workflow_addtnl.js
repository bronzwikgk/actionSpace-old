/**
 * It initiates ui in editor, required for a workflow doc.
 */
var initWorkflowUI = [{
    objectModel: "document",
    method: "getElementById",
    arguments: "editor",
    response: "editor"
}, {
    objectModel: 'CreateEntity',
    method: 'uniqueId',
    arguments: 20,
    response: 'uid',
}, {
    declare: {
        "content": "$'item id: ' + l.uid",
        "rootNode": "$new HeapNode(l.uid, l.content)"
    },
    objectModel: "$HeapNode.rootNodes",
    method: "push",
    arguments: "$l.rootNode"
}, {
    objectModel: "console",
    method: "log",
    arguments: "$HeapNode.rootNodes"
}, {
    condition: "$l.editor",
    declare: {
        "editor.innerHTML": "",
        "editor.contentEditable": "$false"
    },
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$workflowUI", "$l.editor"],
}, {
    declare: {
        "args": {
            "docIdOrNode": "$l.rootNode"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["switchWorkflowDoc", "$l.args"]
}, {
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "addNewWorkflowItem"
}]

/**
 * It inserts a new workflow item at the `active node`
 */
var addNewWorkflowItem = [{
    declare: {
        "node": "$HeapNode.activeNode"
    },
    objectModel: "document",
    method: "getElementById",
    arguments: "workflowRoot",
    response: "workflowRoot"
}, {
    objectModel: "CreateEntity",
    method: "uniqueId",
    arguments: 20,
    response: "uid"
}, {
    condition: "$(!operate.isUseless(l.node)) && l.node instanceOf HeapNode", 
    declare: {
        "content": "$'item id: ' + l.uid"
    },
    objectModel: "$l.node",
    method: "add",
    arguments: ["$l.uid", "$l.content"],
    response: "newNode"
}, {
    declare: {
        "args": {
            "node": "$l.newNode",
            "elem": "$l.workflowRoot",
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["setWorkflowItems", "$l.args"]
}]

/**
 * It iterates given node's children, nad for each children in the node, it executes a callback request with given params.
 ** Initial Variable :- 
        ** `'node'` : a workflow node
        ** `'callbackReq'` : callback request's name, which is to be executed for each child in the given node
        ** `'callbackReqParams'` : callback request's params      
 */
var itrWorkflowNodeChildren = {
    condition: "$!operate.isUseless(l.node)",
    declare: {
        "children": "$l.node.descendants",
        "x": 0
    },
    callback: {
        condition: "$!operate.isUseless(l.children)",
        declare: {
            "child": "$l.children[l.x]",
            "x": "$l.x + 1",
            "callbackReqParams.node": "$l.child"
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["$l.callbackReq", "$l.callbackReqParams"],
        loop: "$l.children.length"
    }
}

/**
 * It creates a new item (HTML Element), in the given element, with the given info from node.
 ** Initial Variable :- 
        ** `'node'` : a workflow node
        ** `'elem'` : where the newly created item's template is to be appended (HTML Element)   
 */
var setWorkflowItems = {
    condition: "$l.node && l.elem",
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$workflowItemTemp", "$l.elem"],
    response: "item",
    callback: [{
        objectModel: "$l.item",
        method: "querySelector",
        arguments: ".accordian-label>.bullet-point",
        response: "itemBullet",
        callback: {
            declare: {
                "props": {
                    "data-action-value": "$l.node.__id"
                }
            },
            objectModel: "CreateEntity",
            method: "setProps",
            arguments: ["$l.itemBullet", "$l.props"]
        }
    }, {
        objectModel: "$l.item",
        method: "querySelector",
        arguments: ".accordian-label>.title",
        response: "itemLabel",
        callback: {
            declare: {
                "itemLabel.innerText": "$l.node.value"
            },
        }
    }, {
        declare: {
            "args": {
                "node": "$l.node",
                "callbackReq": "setWorkflowItems",
                "callbackReqParams": {
                    "elem": "$l.item.children[1]"
                }
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["itrWorkflowNodeChildren", "$l.args"]
    }]
}

/**
 * It finds a node in the `rootNode` of the `activeNode` with a given id.
 ** Initial Variables :-
        ** `'docIdOrNode'` : docId or a workflow node
 ** Return :- a workflow node (if input is not a string, then returns the input)
 */
var getHeapNode = {
    condition: "$!operate.isUseless(l.docIdOrNode)",
    return: "$l.node",
    callback: [{
        condition: "$!operate.isString(l.docIdOrNode)",
        declare: {
            "node": "$l.docIdOrNode"
        }
    }, {
        condition: "$operate.isString(l.docIdOrNode)",
        declare: {
            "activeNode": "$HeapNode.activeNode"
        },
        callback: {
            condition: "$!operate.isUseless(l.activeNode)",
            objectModel: "$l.activeNode",
            method: "findNodeDfs",
            arguments: ["$l.docIdOrNode", "$true"],
            response: "node"
        }
    }]
}

/**
 * It switches from one workflow doc to another with given docId or Node (whether it is via back button, or bullet point), and sets it, and all it's children, in the workflow's root element.
 ** Initial Variables :-
        ** `'docIdOrNode'` : docId or a workflow node
 */
var switchWorkflowDoc = [{
    objectModel: "document",
    method: "getElementById",
    arguments: "workflowRoot",
    response: "workflowRoot"
}, {
    condition: "$!operate.isUseless(l.docIdOrNode)",
    declare: {
        "args": {
            "docIdOrNode": "$l.docIdOrNode"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getHeapNode", "$l.args"],
    response: "node"
}, {
    condition: "$!operate.isUseless(l.node)",
    callback: [{
        objectModel: "Entity",
        method: "setObjKeyVal",
        arguments: ["$HeapNode", "activeNode", "$l.node"],
    }, {
        declare: {
            "x": 0
        },
        objectModel: "$l.workflowRoot",
        method: "querySelectorAll",
        arguments: ".item",
        response: "items",
        callback: {
            condition: "$l.items[l.x]",
            declare: {
                "item": "$l.items[l.x]",
                "x": "$l.x + 1",
            },
            objectModel: "$l.item",
            method: "remove",
            loop: "$l.items.length"
        }
    }, {
        declare: {
            "props": {
                "data-doc-id": "$l.node.__id"
            }
        },
        objectModel: "CreateEntity",
        method: "setProps",
        arguments: ["$l.workflowRoot", "$l.props"],
    }, {
        objectModel: "$l.workflowRoot",
        method: "querySelector",
        arguments: ".title-container>.title",
        response: "titleElem",
        callback: {
            declare: {
                "titleElem.innerText": "$l.node.value"
            }
        }
    }, {
        objectModel: "$l.workflowRoot",
        method: "querySelector",
        arguments: ".title-container>.back-btn",
        response: "backIcon",
        callback: {
            declare: {
                "parentId": "$l.node.parent ? l.node.parent.__id : ''",
                "props": {
                    "data-action-value": "$l.parentId"
                }
            },
            objectModel: "CreateEntity",
            method: "setProps",
            arguments: ["$l.backIcon", "$l.props"]
        }
    }, {
        declare: {
            "args": {
                "node": "$l.node",
                "callbackReq": "setWorkflowItems",
                "callbackReqParams": {
                    "elem": "$l.workflowRoot"
                }
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["itrWorkflowNodeChildren", "$l.args"],
    }]
}]
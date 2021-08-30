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
    response: "workflowRoot",
    callback: [{
        declare: {
            "props": {
                "data-doc-id": "$l.uid"
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
                "titleElem.innerText": "$l.rootNode.value"
            }
        }
    }]
}, {
    objectModel: "Entity",
    method: "setObjKeyVal",
    arguments: ["$HeapNode", "activeNode", "$l.rootNode"],
}, {
    declare: {
        "args": {
            "node": "$l.rootNode",
            "elem": "$l.workflowRoot"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["addNewWorkflowItem", "$l.args"]
}]


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

// node, callbackReq, callbackReqParams
var itrWorkflowNodeChildren = {
    condition: "$!operate.isUseless(l.node)",
    declare: {
        "children": "$l.node.descendants",
    },
    callback: {
        condition: "$!operate.isUseless(l.children)",
        declare: {
            "child": "$l.children[l.x ? ++l.x : l.x = 0]",
            "callbackReqParams.node": "$l.child"
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["$l.callbackReq", "$l.callbackReqParams"],
        loop: "$l.children.length"
    }
}

// node, elem
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

// docId
// 
var switchWorkflowDoc = [{
    objectModel: "console",
    method: "log",
    arguments: ["switchWorkflowDoc","$l.docId"]
}, {
    condition: "$!(operate.isUseless(l.docId) || l.docId == '')",
    declare: {
        "activeNode": "$HeapNode.activeNode"
    },
    objectModel: "document",
    method: "getElementById",
    arguments: "workflowRoot",
    response: "workflowRoot"
}, {
    condition: "$!operate.isUseless(l.activeNode)",
    objectModel: "$l.activeNode",
    method: "findNodeDfs",
    arguments: ["$l.docId", "$true"],
    response: "node"
}, {
    objectModel: "console",
    method: "log",
    arguments: ["$l.node"]
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
            loop: "$l.items.length",
            callback: {
                objectModel: "console",
                method: "log",
                arguments: "$l.item.children[0].children[0].dataset.actionValue"
            }
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
        condition: "$!operate.isUseless(l.node)",
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
        condition: "$!operate.isUseless(l.node)",
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

// function switchDoc(docID) {
//     if (docID == "") {
//         return;
//     }

//     activeNode = activeNode.findNodeDfs(docID, true);
//     var rootDoc = document.getElementById('rootDoc'),
//         parentID = "";

//     if (activeNode) {
//         rootDoc.querySelectorAll('.item').forEach(item => {
//             item.remove();
//         });
//         rootDoc.setAttribute('data-doc-id', docID);
//         if (activeNode.parent) {
//             parentID = activeNode.parent.value
//         }
//         rootDoc.querySelector('.pageTitle>.backIcon').setAttribute('data-action-value', parentID);
//         rootDoc.querySelector('.pageTitle>.title').innerHTML = dataContainer[docID];
//         if (activeNode.descendants.length > 0) {
//             getItems(activeNode, rootDoc);
//         }
//         // else{
//         //     addItem(activeNode, rootDoc);
//         // }

//     }
// }

// function getItems(node, elem) {
//     var children = node.descendants,
//         item, tabLabel, tabContent;
//     children.forEach(child => {
//         CreateEntity.create(itemTemp, elem);
//         item = elem.lastElementChild;
//         tabLabel = item.querySelector('.tab:last-child>.tab-label');
//         tabContent = item.querySelector('.tab:last-child>.tab-content');
//         tabLabel.children[0].setAttribute('data-action-value', child.value);
//         tabLabel.children[1].innerHTML = dataContainer[child.value];
//         getItems(child, tabContent);
//     })
// }


// function addItem(node, elem) {
//     if (!node) {
//         node = activeNode;
//     }
//     if (!elem) {
//         elem = document.getElementById('rootDoc');
//     }
//     var uid, item, itemTab, itemLabel;
//     uid = uniqueID();
//     node.add(uid);
//     CreateEntity.create(itemTemp, elem);
//     item = elem.lastElementChild;
//     itemLabel = item.querySelector('.tab:last-child>.tab-label');
//     itemLabel.children[0].setAttribute('data-action-value', uid);
//     itemLabel.children[1].innerText = `item id: ${uid}`;
//     dataContainer[uid] = itemLabel.children[1].innerHTML;
// }

// (function () {
//     var initId, rootNode, rootDoc;
//     initId = uniqueID();
//     rootNode = new HeapNode(initId);
//     HeapNode.rootNodes.push(rootNode);
//     activeNode = rootNode;
//     CreateEntity.create(ui, document.getElementById('root'));

//     rootDoc = document.getElementById('rootDoc');
//     rootDoc.setAttribute('data-doc-id', initId);
//     rootDoc.querySelector('.pageTitle>.title').innerText = `item id: ${rootNode.value}`
//     dataContainer[rootNode.value] = rootDoc.querySelector('.pageTitle>.title').innerHTML;

//     addItem(rootNode, rootDoc);
//     addItem(rootNode, rootDoc);
//     console.log(HeapNode.rootNodes);
//     console.log(dataContainer);

//     window.onclick = function (e) {
//         var target = e.target,
//             actionType = target.getAttribute('data-action-type'),
//             actionValue = target.getAttribute('data-action-value');
//         if (actionType === "accordianToggle") {
//             target.parentElement.classList.toggle(actionValue);
//         } else if (actionType === "switchDoc") {
//             switchDoc(actionValue.trim());
//         } else if (actionType === "addDoc") {
//             addItem();
//         }
//     }
// });
// ();

var tempWorkflowDataContainer = {};
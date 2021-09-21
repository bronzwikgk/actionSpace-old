var treeMapUI = {
    "name": "div",
    "attributes": {
        "id": "treeMapRoot",
        "class": "treemap",
        "data-map-id": ""
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "title-container",
                "data-action-type": "switchTreeMap",
                "data-action-value": "zoomout"
            },
            "items": {
                "text##0": "Title"
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "content-container"
            },
            "items": {}
        }
    }
}

var treeMapItemTemp = {
    "name": "span",
    "attributes": {
        "class": "item",
        "data-action-type": "switchTreeMap",
        "data-action-value": "zoomin:n"
    },
    "item": {
        "text##0": "Title"
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////

class TreeMap {
    static rootNode;
    static activeNode = null;
    constructor(id, name = '') {
        this.__id = id;
        this.name = name;
        this.value = null;
        this.descendants = [];
        this.parent = null;
        this.root = null;
    }

    get child() {
        return this.descendants;
    }

    set child(node) {
        this.descendants.push(node);
        if (node) {
            node.parent = this;
        }
    }
};

TreeMap.prototype.add = function (id, name = '') {
    const newNode = new TreeMap(id, name),
        found = this.findNodeDfs(id, true);
    if (found) { // duplicated: value already exists on the tree
        console.warn(`Document with id:${id} already exists!!`);
        return false;
    } else {
        this.child = newNode;
    }

    newNode.root = this.root ? this.root : this;

    return newNode;
}

TreeMap.prototype.findNodeDfs = function (id, fromRoot = false) {
    var parent = null,
        found = null,
        node = fromRoot && this.root ? this.root : this,
        i = 0;
    // dfs
    if (node.__id === id) {
        found = node;
    } else {
        if (!parent) parent = node;
        node = parent.descendants[i];
        while (node) {
            found = node.findNodeDfs(id);
            if (found) break;
            node = parent.descendants[++i];
        }
    }
    return found;
}

TreeMap.prototype.setRoot = function (node) {
    this.root = node;
    this.descendants.forEach(descendant => {
        descendant.setRoot(node);
    })
}

TreeMap.prototype.attachTo = function (node) {
    node.child = this;
    this.setRoot(node.root ? node.root : node);
}

TreeMap.prototype.detach = function () {
    this.parent = null;
    this.root = null;
    this.descendants.forEach(descendant => {
        descendant.setRoot(this);
    })
    TreeMap.rootNodes.push(this);
}

TreeMap.prototype.remove = function (id, attachToParent = false) {
    const nodeToRemove = this.findNodeDfs(id),
        parent = nodeToRemove.parent,
        descendants = nodeToRemove.descendants;
    if (!nodeToRemove) {
        console.warn(`No document with id:${id} is found!!`);
        return false;
    }

    if (attachToParent) {
        if (parent) {
            descendants.forEach(descendant => {
                parent.child = descendant;
            });
        } else {
            console.warn(`No parent is there for document with id:${id}`)
        }
    }

    if (parent) {
        parent.descendants.splice(parent.descendants.indexOf(nodeToRemove), 1);
    } else {
        nodeToRemove.descendants = [];
        delete nodeToRemove.value;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////

var switchTreeMap = function (val) {
    var valArr = val.split(':'),
        rootElem = document.getElementById('treeMapRoot');

    if (TreeMap.activeNode) {
        switch (valArr[0]) {
            case 'zoomout':
                if (TreeMap.activeNode.parent) {
                    prcssDataObj(TreeMap.activeNode.parent, rootElem);
                }
                break;

            case 'zoomin':
                if (parseInt(valArr[1]) != NaN) {
                    prcssDataObj(TreeMap.activeNode.descendants[parseInt(valArr[1])], rootElem);
                }
                break;

            default:
                break;
        }
    }

}

const maxDepth = 1;

function itrTreeMapChildren(map, elem, callback = () => {}, depth = 1) {
    if (!(map && map instanceof TreeMap)) return;

    if (depth > maxDepth) return;
    var children = map.descendants;

    if (Array.isArray(children)) {
        children.forEach((child, index) => {
            callback(child, elem, callback, depth + 1, index);
        });
    }
}

function prcssDataObj(map, rootElem) {
    if (!(map && map instanceof TreeMap)) return;

    if (map.descendants.length <= 0) return;

    TreeMap.activeNode = map;
    rootElem.setAttribute("data-map-id", map.__id);

    var titleElem = rootElem.querySelector('.title-container');

    if (!titleElem) return;

    if (map.parent) {
        titleElem.title = "click to zoom out",
        titleElem.setAttribute("data-has-parent", true);
    } else{
        titleElem.removeAttribute("title");
        titleElem.removeAttribute("data-has-parent")
    }
    titleElem.innerText = `name: ${map.name} \n value: ${map.value}`;

    rootElem.children[1].innerHTML = '';

    itrTreeMapChildren(map, rootElem.children[1], (child, elem, callback = () => {}, depth = 0, index = 0) => {
        var newElem = CreateEntity.create(treeMapItemTemp, elem);
        newElem.innerText = `name: ${child.name} \n value: ${child.value}`;
        newElem.setAttribute("data-action-value", `zoomin:${index}`);

        if (child.descendants.length > 0) {
            newElem.title = "click to zoom in",
            newElem.setAttribute("data-has-children", true);
            itrTreeMapChildren(child, newElem, callback, depth);
        } else {
            if (!(child.value && parseInt(child.value) !== NaN)) child.value = 0;
        }
    });
}

function initTreeMap(obj, node) {
    if (!(obj && typeof obj === 'object')) return;

    if (!(node && node instanceof TreeMap)) return;

    var sum = 0;

    if (Array.isArray(obj)) {
        obj.forEach(item => {
            sum += initTreeMap(item, node);
        })
    } else if (obj.constructor.name.includes('Object')) {
        var uid = CreateEntity.uniqueId(20),
            newNode = node.add(uid, obj.name);

        if (obj.children) {
            if (!Array.isArray(obj.children)) obj.children = [obj.children];
            sum = initTreeMap(obj.children, newNode);
            newNode.value = sum;
        } else {
            if (!(obj.value && parseInt(obj.value) !== NaN)) obj.value = 0;
            sum += parseInt(obj.value);

            newNode.value = sum;
        }
    }

    return sum;
}

// var initTreeMapChildren = {
//     condition: "$operate.isObject(l.obj) && l.pNode instanceof TreeMap",
//     declare: {
//         "x": 0,
//         "sum": 0
//     },
//     return: "$l.sum",
//     callback: [{
//         condition: "$operate.isArray(l.obj)",
//         declare: {
//             "item": "$l.obj[l.x]",
//             "x": "$l.x+1",
//             "args": {
//                 "obj": "$l.item",
//                 "pNode": "$l.pNode"
//             }
//         },
//         objectModel: "ActionEngine",
//         method: "processRequest",
//         arguments: ["initTreeMapChildren", "$l.args"],
//         response: "childSum",
//         loop: "$l.obj.length",
//         callback: {
//             declare: {
//                 "sum": "$l.sum+l.childSum"
//             }
//         }
//     }],

// }


function init(obj) {
    if (!(obj && obj.constructor.name.includes('Object'))) return;

    if (!obj.name) return;

    var uid = CreateEntity.uniqueId(20),
        node = new TreeMap(uid, obj.name);

    TreeMap.rootNode = node;

    if (!obj.children) obj.children = [];

    if (!Array.isArray(obj.children)) obj.children = [obj.children];

    node.value = initTreeMap(obj.children, TreeMap.rootNode);

    return node;
}

// var initTreeMap = {
//     condition: "$operate.isObject(l.data) && l.data.name",
//     callback: [{
//             objectModel: "CreateEntity",
//             method: "uniqueId",
//             arguments: 20,
//             response: "uid"
//         }, {
//             declare: {
//                 "rootNode": "$new TreeMap(l.uid, l.data.name)"
//             },
//             objectModel: "Entity",
//             method: "setObjKeyVal",
//             arguments: ["$TreeMap", "rootNode", "$l.node"],
//         },
//         [{
//             condition: "$operate.isUseless(l.data.children)",
//             declare: {
//                 "data.children": []
//             }
//         }, {
//             condition: "$!operate.isArray(l.data.children)",
//             declare: {
//                 "data.children": "$[l.data.children]"
//             }
//         }], {
//             declare: {
//                 "args": {
//                     "obj": "$l.data",
//                     "pNode": "$l.rootNode"
//                 }
//             },
//             objectModel: "ActionEngine",
//             method: "processRequest",
//             arguments: ["initTreeMapChildren", "$l.args"]
//         }
//     ]
// }

var initTreeMapUI = [{
    objectModel: "document",
    method: "getElementById",
    arguments: "root",
    response: "rootElem"
}, {
    condition: "$l.rootElem",
    declare: {
        "rootElem.innerHTML": "",
    },
    objectModel: "CreateEntity",
    method: "create",
    arguments: ["$treeMapUI", "$l.rootElem"],
}]
////////////////////////////////////////////////////////////////////////////////////////////////

var inpObj = {
    name: "a0",
    children: [{
        name: "b0",
        children: [{
            name: "c0",
            value: 3
        }, {
            name: "c1",
            value: 4
        }, {
            name: "c2",
            children: [{
                name: "d0",
                value: 2
            }, {
                name: "d1",
                value: 1
            }]
        }]
    }, {
        name: "b1",
        value: 7
    }]
};

////////////////////////////////////////////////////////////////////////////////////////

ActionEngine.processRequest('initTreeMapUI');
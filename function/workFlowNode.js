window.HeapNode = class {
    static rootNodes = [];
    static activeNode = null;
    constructor(id, value = '') {
        this.__id = id;
        this.value = value;
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

HeapNode.prototype.add = function (id, value = '') {
    const newNode = new HeapNode(id, value),
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

HeapNode.prototype.setContent = function (value = '') {
    node.value = value;
}

HeapNode.prototype.findNodeDfs = function (id, fromRoot = false) {
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

HeapNode.prototype.setRoot = function (node) {
    this.root = node;
    this.descendants.forEach(descendant => {
        descendant.setRoot(node);
    })
}

HeapNode.prototype.attachTo = function (node) {
    node.child = this;
    this.setRoot(node.root ? node.root : node);
}

HeapNode.prototype.detach = function () {
    this.parent = null;
    this.root = null;
    this.descendants.forEach(descendant => {
        descendant.setRoot(this);
    })
    HeapNode.rootNodes.push(this);
}

HeapNode.prototype.remove = function (id, attachToParent = false) {
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
console.log("iterater is up")

function iterateNode(node, callback) {
    if (node.hasChildNodes()) {
        node.ChildNodes.forEach(iterateNode)
    } else if (node.nodeType === Text.TEXT_NODE) {
        console.log("doSomething");
    }
}


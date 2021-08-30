var workflowUI = {
    "name": "div",
    "attributes": {
        "id": "workflowRoot",
        "class": "workflow-doc",
        "data-doc-id": ""
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "title-container"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "back-btn",
                        "data-action-type": "switchWorkflowDoc",
                        "data-action-value": ""
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "title",
                        "contenteditable": "true"
                    },
                    "items": {
                        "text##0": "Title"
                    }
                }
            }
        },
        "element##1": {
            "name": "button",
            "attributes": {
                "data-action-type": "addNewWorkflowItem"
            },
            "items": {
                "text##0": "Add"
            }
        }
    }
}

var workflowItemTemp = {
    "name": "div",
    "attributes": {
        "class": "item accordian"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "accordian-label",
                "data-action-type": "toggleClass",
                "data-action-value": "active"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "bullet-point",
                        "data-action-type": "switchWorkflowDoc",
                        "data-action-value": ""
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "title",
                        "contenteditable": "true"
                    },
                    "items": {
                        "text##0": "Title"
                    }
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "accordian-content"
            },
            "items": {}
        }
    }
}
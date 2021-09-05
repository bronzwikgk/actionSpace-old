var CSSViewer_ui = {
    "name": "div",
    "attributes": {
        "class": "CSSViewer",
        "id": "CSSViewerBox"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "elemIdf",
            },
            "items": {
                "text##0": "TAG#id.class"
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "accordion",
                "id": "tabContainer"
            },
            "items": {}
        }
    }
}

var CSSViewerTabTemp = {
    "name": "div",
    "attributes": {
        "id": "template",
        "class": "tab"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "tabTitle",
                "id": "tabTitle",
                "data-action-type": "toggleClass",
                "data-action-value": "active"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "pointer"
                    },
                    "items": {
                        "text##0": "+"
                    }
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "title"
                    },
                    "items":{
                        "text##0": "Sample title"
                    }
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "tabContent",
                "id": "tabContent",
                "style": "user-select: none;"
            },
            "items": {}
        }
    }
}

var CSSViewerPropTemp = {
    "name": "span",
    "attributes": {
        "class": "property"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "propName",
                "style": "user-select: text;"
            },
            "items": {
                "text##0": "Property"
            }
        },
        "text##1": ":",
        "element##2": {
            "name": "input",
            "attributes": {
                "class": "propVal",
                "type": "text",
                "value": "property value"
            },
            "items": {}
        }
    }
}
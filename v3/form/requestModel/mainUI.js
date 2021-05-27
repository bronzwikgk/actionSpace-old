const main = [{
    "tagName": "div",
    "class": "topNavBar",
    "childNodes": [{
        "tagName": "div",
        "class": "titleBar",
        "childNodes": [{
            "tagName": "span",
            "class": "backIcon",
            "childNodes": [{
                "tagName": "i",
                "class": "fas fa-angle-left",
                "childNodes": []
            }]
        }, {
            "tagName": "input",
            "type": "text",
            "class": "dName",
            "value": "Document Name",
            "childNodes": []
        }, {
            "tagName": "label",
            "class": "dLabel",
            "childNodes": ["anyTag"]
        }, {
            "tagName": "span",
            "class": "sharedLabels",
            "childNodes": [{
                "tagName": "label",
                "class": "title",
                "childNodes": ["Shared"]
            }, {
                "tagName": "label",
                "class": "description",
                "childNodes": ["working"]
            }, {
                "tagName": "span",
                "class": "userIcons",
                "childNodes": [{
                    "tagName": "label",
                    "childNodes": ["AA"]
                }, {
                    "tagName": "label",
                    "childNodes": ["BB"]
                }, {
                    "tagName": "label",
                    "childNodes": ["CC"]
                }, {
                    "tagName": "label",
                    "childNodes": ["+"]
                }]
            }]
        }, {
            "tagName": "span",
            "class": "searchBar",
            "childNodes": [{
                "tagName": "input",
                "type": "text",
                "placeholder": "Search",
                "childNodes": []
            }, {
                "tagName": "i",
                "class": "fas fa-search",
                "childNodes": []
            }]
        }, {
            "tagName": "span",
            "class": "notification",
            "childNodes": [{
                "tagName": "i",
                "class": "fas fa-bell",
                "childNodes": []
            }]
        }, {
            "tagName": "span",
            "class": "userIcon dropdown",
            "childNodes": [{
                "tagName": "span",
                "class": "dropbtn fas fa-user",
                "childNodes": []
            }, {
                "tagName": "span",
                "class": "dropdown-content",
                "childNodes": [{
                    "tagName": "a",
                    "childNodes": ["Profile"]
                }]
            }]
        }]
    }, {
        "tagName": "div",
        "class": "actionBar",
        "childNodes": [{
            "tagName": "div",
            "class": "editorTools",
            "childNodes": [{
                "tagName": "span",
                "data-command": "Format",
                "data-action": "bold",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-bold",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "italic",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-italic",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "underline",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-underline",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "strikeThrough",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-strikethrough",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "subscript",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-subscript",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "superscript",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-superscript",
                    "childNodes": []
                }]
            }, {
                "tagName": "a",
                "class": "toolSeparator",
                "childNodes": ["|"]
            }, {
                "tagName": "span",
                "class": "dropdown",
                "childNodes": [{
                    "tagName": "span",
                    "class": "dropbtn fas fa-align-center",
                    "childNodes": [{
                        "tagName": "i",
                        "class": "fas fa-caret-up",
                        "childNodes": []
                    }]
                }, {
                    "tagName": "span",
                    "class": "dropdown-content",
                    "childNodes": [{
                        "tagName": "span",
                        "data-command": "Format",
                        "data-action": "justifyCenter",
                        "childNodes": [{
                            "tagName": "i",
                            "class": "fas fa-align-center",
                            "childNodes": []
                        }]
                    }, {
                        "tagName": "span",
                        "data-command": "Format",
                        "data-action": "justifyFull",
                        "childNodes": [{
                            "tagName": "i",
                            "class": "fas fa-align-justify",
                            "childNodes": []
                        }]
                    }, {
                        "tagName": "span",
                        "data-command": "Format",
                        "data-action": "justifyLeft",
                        "childNodes": [{
                            "tagName": "i",
                            "class": "fas fa-align-left",
                            "childNodes": []
                        }]
                    }, {
                        "tagName": "span",
                        "data-command": "Format",
                        "data-action": "justifyRight",
                        "childNodes": [{
                            "tagName": "i",
                            "class": "fas fa-align-right",
                            "childNodes": []
                        }]
                    }]
                }]
            }, {
                "tagName": "a",
                "class": "toolSeparator",
                "childNodes": ["|"]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "insertUnorderedList",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-list-ul",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "insertOrderedList",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-list-ol",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "",
                "childNodes": [{
                    "tagName": "i",
                    "class": "far fa-laugh",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "createLink",
                "data-value": "href",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-link",
                    "childNodes": []
                }]
            }, {
                "tagName": "input",
                "type": "text",
                "id": "link_addr",
                "placeholder": "Type or Paste your link here",
                "hidden": "",
                "childNodes": []
            }, {
                "tagName": "span",
                "class": "dropdown",
                "childNodes": [{
                    "tagName": "span",
                    "class": "dropbtn fas fa-code",
                    "childNodes": [{
                        "tagName": "i",
                        "class": "fas fa-caret-up",
                        "childNodes": []
                    }]
                }, {
                    "tagName": "span",
                    "class": "dropdown-content",
                    "childNodes": [{
                        "tagName": "h1",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<H1>",
                        "childNodes": ["Title 1"]
                    }, {
                        "tagName": "h2",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<H2>",
                        "childNodes": ["Title 2"]
                    }, {
                        "tagName": "h3",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<H3>",
                        "childNodes": ["Subheading 1"]
                    }, {
                        "tagName": "h4",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<H4>",
                        "childNodes": ["Subheading 2"]
                    }, {
                        "tagName": "h5",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<H5>",
                        "childNodes": ["Subheading 3"]
                    }, {
                        "tagName": "p",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<P>",
                        "childNodes": ["paragraph"]
                    }, {
                        "tagName": "pre",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<PRE>",
                        "childNodes": ["Code Block"]
                    }, {
                        "tagName": "blockquote",
                        "data-command": "Format",
                        "data-action": "insertBlock",
                        "data-value": "<BLOCKQUOTE>",
                        "childNodes": ["Quote"]
                    }]
                }]
            }, {
                "tagName": "span",
                "data-command": "Format",
                "data-action": "insertImage",
                "data-value": "image",
                "childNodes": [{
                    "tagName": "i",
                    "class": "far fa-image",
                    "childNodes": []
                }]
            }, {
                "tagName": "input",
                "id": "filePicker",
                "type": "file",
                "accept": "image/*",
                "hidden": "",
                "childNodes": []
            }]
        }, {
            "tagName": "div",
            "class": "documentTools",
            "childNodes": [{
                "tagName": "span",
                "childNodes": [{
                    "tagName": "i",
                    "class": "far fa-star",
                    "childNodes": []
                }]
            }, {
                "tagName": "span",
                "childNodes": [{
                    "tagName": "i",
                    "class": "fas fa-download",
                    "childNodes": []
                }]
            }]
        }]
    }]
}, {
    "tagName": "div",
    "class": "leftSideNav",
    "childNodes": [{
        "tagName": "span",
        "id": "leftNavBar",
        "class": "barsIcon",
        "childNodes": [{
            "tagName": "i",
            "class": "fas fa-bars",
            "childNodes": []
        }]
    }, {
        "tagName": "span",
        "data-command": "newDoc",
        "childNodes": [{
            "tagName": "i",
            "class": "fas fa-plus",
            "childNodes": []
        }, {
            "tagName": "label",
            "childNodes": ["New Document"]
        }]
    }, {
        "tagName": "span",
        "id": "newColl",
        "childNodes": [{
            "tagName": "i",
            "class": "fas fa-folder-plus",
            "childNodes": []
        }, {
            "tagName": "label",
            "childNodes": ["New Collection"]
        }]
    }, {
        "tagName": "span",
        "id": "saveDoc",
        "childNodes": [{
            "tagName": "i",
            "class": "fas fa-save",
            "childNodes": []
        }, {
            "tagName": "label",
            "childNodes": ["Save Document"]
        }]
    }, {
        "tagName": "span",
        "id": "exportDoc",
        "childNodes": [{
            "tagName": "i",
            "class": "fas fa-external-link-alt",
            "childNodes": []
        }, {
            "tagName": "label",
            "childNodes": ["Export"]
        }]
    }]
}, {
    "tagName": "div",
    "class": "centerArea",
    "childNodes": [{
        "tagName": "div",
        "class": "rightSide",
        "childNodes": [{
            "tagName": "div",
            "class": "navigator",
            "childNodes": [{
                "tagName": "span",
                "class": "collection accordion active",
                "childNodes": [{
                    "tagName": "label",
                    "class": "collectionLabel",
                    "childNodes": [{
                        "tagName": "i",
                        "class": "arrow gt fas fa-angle-right",
                        "childNodes": []
                    }, "Root"]
                }, {
                    "tagName": "span",
                    "class": "panel",
                    "childNodes": ["Lorem ipsum ..."]
                }]
            }]
        }]
    }, {
        "tagName": "div",
        "class": "textEditorContainer scroll--simple",
        "childNodes": [{
            "tagName": "div",
            "id": "editor",
            "class": "editor",
            "contenteditable": "true",
            "childNodes": []
        }]
    }]
}]
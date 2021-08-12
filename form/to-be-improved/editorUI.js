/* 
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "docInfo",
                "class": "doc-info"
            },
            "items": {
                "element##0": {
                    "name": "input",
                    "attributes": {
                        "type": "text",
                        "id": "docName",
                        "class": "doc-name",
                        "value": "Document Name"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {
                        "id": "docTag",
                        "class": "doc-tag"
                    },
                    "items": {
                        "text##0": "anyTag"
                    }
                }
            }
        },
        "element##2": menuBar,
        // "element##3": sharedLabels,
        "element##4": 
        }

*/

var canvasUI = {
    "name": "div",
    "attributes": {
        "id": "workSpace"
    },
    "items": {
        "element##0": {
            "name": "canvas",
            "attributes": {
                "id": "drawlines",
            },
            "items": {}
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "fc",
                "data-tag": "editable"
            },
            "items": {}
        }
    }

}

var codeUI = {
    "name": "textarea",
    "attributes": {
        "id": "editor",
        "class": "editor",
        "data-open-fileid": "",
        "data-filename": "",
        "data-is-unsaved": "false",
    },
    "items": {}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

var sharedLabels = {
    "name": "span",
    "attributes": {
        "class": "sharedLabels"
    },
    "items": {
        "element##0": {
            "name": "label",
            "attributes": {
                "class": "title"
            },
            "items": {
                "text##0": "Shared"
            }
        },
        "element##1": {
            "name": "label",
            "attributes": {
                "class": "description"
            },
            "items": {
                "text##0": "working"
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "class": "userIcons"
            },
            "items": {
                "element##0": {
                    "name": "img",
                    "attributes": {
                        "id": "",
                        "class": "",
                        "src": "./assets/user_img.jpg",
                        "alt": "User A",
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "img",
                    "attributes": {
                        "id": "",
                        "class": "",
                        "src": "./assets/user_img.jpg",
                        "alt": "User B",
                    },
                    "items": {}
                },
                "element##2": {
                    "name": "img",
                    "attributes": {
                        "id": "",
                        "class": "",
                        "src": "./assets/user_img.jpg",
                        "alt": "User C",
                    },
                    "items": {}
                },
                "element##3": {
                    "name": "img",
                    "attributes": {
                        "id": "",
                        "class": "",
                        "src": "",
                        "alt": "",
                    },
                    "items": {}
                }
            }
        }
    }
}

var tools = {
    "name": "div",
    "attributes": {
        "class": "editorTools"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "bold"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-bold"
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "italic"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-italic"
                    },
                    "items": {}
                }
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "underline"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-underline"
                    },
                    "items": {}
                }
            }
        },
        "element##3": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "strikeThrough"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-strikethrough"
                    },
                    "items": {}
                }
            }
        },
        "element##4": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "subscript"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-subscript"
                    },
                    "items": {}
                }
            }
        },
        "element##5": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "superscript"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-superscript"
                    },
                    "items": {}
                }
            }
        },
        "element##6": {
            "name": "a",
            "attributes": {
                "class": "toolSeparator"
            },
            "items": {
                "text##0": "|"
            }
        },
        "element##7": {
            "name": "span",
            "attributes": {
                "id": "alignDropdown",
                "class": "dropdown"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "dropbtn fas fa-align-center",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active",
                        "data-action-target-element-id": "alignDropdown"
                    },
                    "items": {
                        "element##0": {
                            "name": "i",
                            "attributes": {
                                "class": "fas fa-caret-up"
                            },
                            "items": {}
                        }
                    }
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {
                        "element##0": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "justifyCenter"
                            },
                            "items": {
                                "element##0": {
                                    "name": "i",
                                    "attributes": {
                                        "class": "fas fa-align-center"
                                    },
                                    "items": {}
                                }
                            }
                        },
                        "element##1": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "justifyFull"
                            },
                            "items": {
                                "element##0": {
                                    "name": "i",
                                    "attributes": {
                                        "class": "fas fa-align-justify"
                                    },
                                    "items": {}
                                }
                            }
                        },
                        "element##2": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "justifyLeft"
                            },
                            "items": {
                                "element##0": {
                                    "name": "i",
                                    "attributes": {
                                        "class": "fas fa-align-left"
                                    },
                                    "items": {}
                                }
                            }
                        },
                        "element##3": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "justifyRight"
                            },
                            "items": {
                                "element##0": {
                                    "name": "i",
                                    "attributes": {
                                        "class": "fas fa-align-right"
                                    },
                                    "items": {}
                                }
                            }
                        }
                    }
                }
            }
        },
        "element##8": {
            "name": "a",
            "attributes": {
                "class": "toolSeparator"
            },
            "items": {
                "text##0": "|"
            }
        },
        "element##9": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "insertUnorderedList"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-list-ul"
                    },
                    "items": {}
                }
            }
        },
        "element##10": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "insertOrderedList"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-list-ol"
                    },
                    "items": {}
                }
            }
        },
        "element##11": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "insertEmoji",
                "data-action-helper-value": "<getLink>"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "far fa-laugh"
                    },
                    "items": {}
                }
            }
        },
        "element##12": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "createLink",
                "data-action-helper-value": "<getLink>"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-link"
                    },
                    "items": {}
                }
            }
        },
        "element##14": {
            "name": "span",
            "attributes": {
                "id": "insertBlockDropdown",
                "class": "dropdown"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "dropbtn fas fa-code",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active",
                        "data-action-target-element-id": "insertBlockDropdown"
                    },
                    "items": {
                        "element##0": {
                            "name": "i",
                            "attributes": {
                                "class": "fas fa-caret-up"
                            },
                            "items": {}
                        }
                    }
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {
                        "element##0": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "h1"
                            },
                            "items": {
                                "text##0": "Title 1"
                            }
                        },
                        "element##1": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "h2"
                            },
                            "items": {
                                "text##0": "Title 2"
                            }
                        },
                        "element##2": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "h3"
                            },
                            "items": {
                                "text##0": "Subheading 1"
                            }
                        },
                        "element##3": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "h4"
                            },
                            "items": {
                                "text##0": "Subheading 2"
                            }
                        },
                        "element##4": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "h5"
                            },
                            "items": {
                                "text##0": "Subheading 3"
                            }
                        },
                        "element##5": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "p"
                            },
                            "items": {
                                "text##0": "paragraph"
                            }
                        },
                        "element##6": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "pre"
                            },
                            "items": {
                                "text##0": "Code Block"
                            }
                        },
                        "element##7": {
                            "name": "span",
                            "attributes": {
                                "data-action-type": "format",
                                "data-action-value": "formatBlock",
                                "data-action-helper-value": "blockquote"
                            },
                            "items": {
                                "text##0": "Quote"
                            }
                        }
                    }
                }
            }
        },
        "element##15": {
            "name": "span",
            "attributes": {
                "data-action-type": "format",
                "data-action-value": "insertImage",
                "data-action-helper-value": "<getImg>"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "far fa-image"
                    },
                    "items": {}
                }
            }
        }
    }
}

var xplorerTools = {
    "name": "div",
    "attributes": {
        "id": "xplorerTools",
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "tools"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "id": "newFile",
                        "class": "fas fa-plus",
                        "data-action-type": "processFileOrDir",
                        "data-action-value": "newFileReqFlow"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "id": "openFile",
                        "class": "fas fa-external-link-alt",
                        "data-action-type": "processFileOrDir",
                        "data-action-value": "getUserInputFile"
                    },
                    "items": {}
                },
                "element##2": {
                    "name": "span",
                    "attributes": {
                        "id": "dir",
                        "class": "fas fa-folder-plus",
                        "data-action-type": "processFileOrDir",
                        "data-action-value": "getUserInputDir"
                    },
                    "items": {}
                }
            }
        }
    }
}
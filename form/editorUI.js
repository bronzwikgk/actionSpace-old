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

var actionBar = {
    "name": "div",
    "attributes": {
        "class": "actionBar"
    },
    "items": {
        "element##0": {
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
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "id": "fileSysNavigation",
                "class": "navigator"
            },
            "items": {}
        }
    }
}




var navigatorFileTemp = {
    "name": "span",
    "attributes": {
        "class": "file",
        "data-action-type": "openFileFromNavigator",
        "data-attached-file-id": ""
    },
    "items": {
        "text##0": " Lorem ipsum ..."
    }
}

var navigatorCollTemp = {
    "name": "div",
    "attributes": {
        "id": "collection_uid",
        "class": "collection"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "title",
                "data-action-type": "toggleClass",
                "data-action-value": "active",
            },
            "items": {
                "text##0": "collection Template"
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "content"
            },
            "items": {}
        }
    }
}


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

var richtextUI = {
    "name": "div",
    "attributes": {
        "id": "editor",
        "class": "editor",
        "contenteditable": "true"
    },
    "items": {}
}

var breadNavItemTemp = {
    "name": "li",
    "attributes": {},
    "items": {
        "element##0": {
            "name": "a",
            "attributes": {
                "href": ""
            },
            "items": {
                "text##0": "Text"
            }
        }
    }
}

var breadNav = {
    "name": "nav",
    "attributes": {
        "id": "breadNav",
        "class": "breadcrumb",
        "aria-label": "Breadcrumb",
        // "style": "background-color: #fff;"
    },
    "items": {
        "element##0": {
            "name": "ul",
            "attributes": {
                "class": "breadcrumb-list"
            },
            "items": {
                "element##0": breadNavItemTemp,
                "element##1": breadNavItemTemp,
                "element##2": breadNavItemTemp
            }
        }
    }
}

var navtabLinkTemp = {
    "name": "span",
    "attributes": {
        "class": "tab-link",
        "data-action-type": "switchFileNavTab",
        "data-attached-file-id": "0"
    },
    "items": {
        "element##0": {
            "name": "label",
            "attributes": {
                "class": "tab-title"
            },
            "items": {
                "text##0": "fileName"
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "class": "close-btn",
                "data-action-type": "closeNavTab"
            },
            "items": {}
        }
    }
}

var navTabs = {
    "name": "div",
    "attributes": {
        "class": "nav-tabs"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "tabLinks",
                "class": "tab-links"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "min-width": "100%",
                        "width": "max-content",
                        "height": "100%"
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "tab-contents"
            },
            "items": {
                "element##0": breadNav,
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "id": "workspace",
                        "class": "tab-content"
                    },
                    "items": {
                        "element##0": richtextUI
                    }
                }
            }
        }
    }
}



var menuBar = {
    "name": "div",
    "attributes": {
        "id": "menuBar",
        "class": "menu-bar"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "id": "fileMenu",
                "class": "menu-item"
            },
            "items": {
                "text##0": "File"
                // "element##0": {
                //     "name": "span",
                //     "attributes": {
                //         "class": "dropbtn",
                //         "data-action-type": "toggleDropdown",
                //         "data-action-value": "active"
                //     },
                //     "items": {
                //         "text##0": "File"
                //     }
                // },
                // "element##1": {
                //     "name": "span",
                //     "attributes": {
                //         "class": "dropdown-content"
                //     },
                //     "items": {
                //         "element##0": {
                //             "name": "span",
                //             "attributes": {
                //                 // "class": ""
                //             },
                //             "items": {
                //                 "text##0": "New"
                //             }
                //         },
                //         "element##1": {
                //             "name": "span",
                //             "attributes": {
                //                 // "class": "dropbtn"
                //             },
                //             "items": {
                //                 "text##0": "Open"
                //             }
                //         }
                //     }
                // }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "editMenu",
                "class": "menu-item"
            },
            "items": {
                "text##0": "Edit"
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "id": "insertMenu",
                "class": "menu-item"
            },
            "items": {
                "text##0": "Insert"
            }
        },
        "element##3": {
            "name": "span",
            "attributes": {
                "id": "viewMenu",
                "class": "menu-item"
            },
            "items": {
                "text##0": "View"
            }
        }
    }
}

var topNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarTop",
        "class": "navbar-top"
    },
    "items": {
        "element##0": {
            "name": "img",
            "attributes": {
                "id": "logoImg",
                "class": "logo-img",
                "src": "./assets/download.jpg",
                "alt": "Ehh",
                // "width": "80",
                // "height": "60"
            },
        },
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
        "element##4": {
            "name": "button",
            "attributes": {
                "class": "share-btn"
            },
            "items": {
                "text##0": "Share ",
                "element##1": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-share"
                    },
                    "items": {}
                }
            }
        },
        "element##5": {
            "name": "span",
            "attributes": {
                "class": "user-info dropdown",
                "data-dropdown-position": "bottom",
                // "data-action-type": "anchorLink",
                // "data-action-value": "/signInView"
            },
            "items": {
                "element##0": {
                    "name": "img",
                    "attributes": {
                        "id": "userImg",
                        "class": "user-img dropbtn",
                        "src": "./assets/user_img.jpg",
                        "alt": "User Name",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {
                        "element##0": {
                            "name": "a",
                            "attributes": {},
                            "items": {
                                "text##0": "Profile"
                            }
                        }
                    }
                }
            }
        }
    }
}

var leftNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarSideLeft",
        "class": "navbar-side-left"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "id": "",
                "class": "fas fa-file-alt",
                "data-action-type": "toggleLeftSideNav",
                "data-action-value": "addXplorerTools"
            },
            "items": {}
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "newDoc",
                "class": "fas fa-file-export",
                "data-action-type": "toggleLeftSideNav",
                "data-action-value": "addXportTools"
            },
            "items": {}
        }
    }
}

var addtnlLeftNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarSideLeftAddtnl",
        "class": "navbar-side-left-addtnl"
    },
    "items": {}
}

var centralArea = {
    "name": "div",
    "attributes": {
        "id": "centralArea",
        "class": "central-area"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "workspace-container"
            },
            "items": {
                "element##0": navTabs
            }
        }
    }
}

var rightNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarSideRight",
        "class": "navbar-side-right"
    },
    "items": {}
}

var mainSection = {
    "name": "div",
    "attributes": {
        "class": "main-section"
    },
    "items": {
        "element##0": leftNavBar,
        "element##1": addtnlLeftNavBar,
        "element##2": centralArea,
        "element##3": rightNavBar
    }
}

var bottomNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarBottom",
        "class": "navbar-bottom"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "footer",
                "class": "infoBlock"
            },
            "items": {}
        }
    }
}

var editorUI = [
    topNavBar,
    mainSection,
    bottomNavBar
];

// CreateEntity.create(editorUI, document.getElementById('root'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

*/
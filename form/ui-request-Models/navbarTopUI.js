/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//  Action Bar UI

var logoImg = {
    "name": "img",
    "attributes": {
        "id": "logoImg",
        "class": "logo-img",
        "src": "./assets/download.jpg",
        "alt": "Ehh",
        // "width": "80",
        // "height": "60"
    },
}

var fileMenuItems = {
    "element##0": {
        "name": "span",
        "attributes": {
            "id": "newFile",
            "title": "New",
            // "class": "fas fa-plus",
            "data-action-type": "processFileOrDir",
            "data-action-value": "newFileReqFlow"
        },
        "items": {
            "text##0": "New"
        }
    },
    "element##1": {
        "name": "span",
        "attributes": {
            "id": "openFile",
            "title": "Open File",
            // "class": "fas fa-external-link-alt",
            "data-action-type": "processFileOrDir",
            "data-action-value": "getUserInputFile"
        },
        "items": {
            "text##0": "Open File"
        }
    },
    "element##2": {
        "name": "span",
        "attributes": {
            "id": "dir",
            "title": "Open Directory",
            // "class": "fas fa-folder-plus",
            "data-action-type": "processFileOrDir",
            "data-action-value": "getUserInputDir"
        },
        "items": {
            "text##0": "Open Directory"
        }
    },
    "element##3": {
        "name": "span",
        "attributes": {
            "id": "dir",
            "title": "Save File",
            // "class": "fas fa-folder-plus",
            "data-action-type": "processFileOrDir",
            "data-action-value": "saveFile"
        },
        "items": {
            "text##0": "Save File"
        }
    },
    "element##4": {
        "name": "span",
        "attributes": {
            "id": "dir",
            "title": "Export File",
            // "class": "fas fa-folder-plus",
            "data-action-type": "processFileOrDir",
            "data-action-value": "exportFile"
        },
        "items": {
            "text##0": "Export File"
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
                "class": "menu-item dropdown",
                "data-dropdown-position": "bottom",
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "File",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active"
                    },
                    "items": {
                        "text##0": "File"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": fileMenuItems
                }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "editMenu",
                "class": "menu-item dropdown"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "Edit"
                    },
                    "items": {
                        "text##0": "Edit"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {}
                }
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "id": "insertMenu",
                "class": "menu-item dropdown"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "Insert"
                    },
                    "items": {
                        "text##0": "Insert"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {}
                }
            }
        },
        "element##3": {
            "name": "span",
            "attributes": {
                "id": "viewMenu",
                "class": "menu-item dropdown"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "View"
                    },
                    "items": {
                        "text##0": "View"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": {}
                }
            }
        }
    }
}

var share = {
    "name": "button",
    "attributes": {
        "class": "share-btn fas fa-share",
        "title": "share"
    },
    "items": {}
}

var explore = {
    "name": "span",
    "attributes": {
        "class": "explore",
        "title": "explore"
    },
    "items": {
        "text##0": "explore",
    }
}

var settings = {
    "name": "span",
    "attributes": {
        "class": "settings fas fa-cog",
        "title": "settings"
    },
    "items": {}
}

var userInfoElem = {
    "name": "span",
    "attributes": {
        "id": "userInfo",
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
                "title": "UserName",
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
                    "attributes": {
                        "data-action-type": "switchView",
                        "data-action-value": "signInView"
                    },
                    "items": {
                        "text##0": "SignIn"
                    }
                }
            }
        }
    }
}

var actionBar = {
    "name": "div",
    "attributes": {
        "id": "actionBar",
        "class": "action-bar"
    },
    "items": {
        "element##0": logoImg,
        "element##1": menuBar,
        "element##2": share,
        "element##3": explore,
        "element##4": settings,
        "element##5": userInfoElem
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// ToolBar UI

var toolBar = {
    "name": "div",
    "attributes": {
        "id": "toolBar",
        "class": "tool-bar"
    },
    "items": {
        // "element##0": tools
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

var topNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarTop",
        "class": "navbar-top"
    },
    "items": {
        "element##0": actionBar,
        "element##1": toolBar
    }
}
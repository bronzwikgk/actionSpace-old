/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//  Action Bar UI

var logoImg = {
    "name": "img",
    "attributes": {
        "id": "logoImg",
        "class": "logo-img",
        "src": "./assets/ehh_logo_live.jpg",
        "alt": "Ehh",
        // "width": "80",
        // "height": "60"
    },
}

var searchBar = {};
var actionCreateItems = {
    "element##0": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "actionStory",
            "data-action-type": "processFileOrDir",
            "data-action-value": "newEntityReqFlow",
            "data-entity-type": "text"
        },
        "items": {
            "text##0": "actionStory"
        }
    },
    "element##1": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "workFlow Doc",
            "data-action-type": "processFileOrDir",
            "data-action-value": "newEntityReqFlow",
            "data-entity-type": "workflow",
        },
        "items": {
            "text##0": "workFlow Doc"
        }
    },
    "element##2": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "directory",
            "data-action-type": "processFileOrDir",
            "data-action-value": "newEntityReqFlow",
            "data-entity-type": "directory",
        },
        "items": {
            "text##0": "directory"
        }
    }
}

var actionImportItems = {
    "element##0": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "file",
            "data-action-type": "processFileOrDir",
            "data-action-value": "getUserInputFile"
        },
        "items": {
            "text##0": "a file"
        }
    },
    "element##1": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "directory",
            "data-action-type": "processFileOrDir",
            "data-action-value": "getUserInputDir"
        },
        "items": {
            "text##0": "a directory",

        }
    },"element##2": {
        "name": "span",
        "attributes": {
            // "id": "actionStory",
            "title": "directory",
            "data-action-type": "processFileOrDir",
            "data-action-value": "getUserInputDir"
        },
        "items": {
            "text##0": "from sheet",

        }
    }
}

var actionMenuItems = {
    "element##0": {
        "name": "span",
        "attributes": {
            "id": "create",
            "class": "dropdown",
            "data-dropdown-type": "hover",
            "data-dropdown-position": "right"
        },
        "items": {
            "element##0": {
                "name": "label",
                "attributes": {
                    "class": "dropbtn",
                    "title": "create (do not press ctrl+n ,key shortcuts needs to be added)",
                    "data-arrow-icon": ""
                },
                "items": {
                    "text##0": "create ctrl+n"
                }
            },
            "element##1": {
                "name": "div",
                "attributes": {
                    "class": "dropdown-content"
                },
                "items": actionCreateItems
            }
        }
    },
    "element##1": {
        "name": "span",
        "attributes": {
            "id": "import",
            "class": "dropdown",
            "data-dropdown-type": "hover",
            "data-dropdown-position": "right",
        },
        "items": {
            "element##0": {
                "name": "label",
                "attributes": {
                    "class": "dropbtn",
                    "title": "import (do not press ctrl+i ,key shortcuts needs to be added)",
                    "data-arrow-icon": ""
                },
                "items": {
                    "text##0": "import ctrl+i"
                }
            },
            "element##1": {
                "name": "div",
                "attributes": {
                    "class": "dropdown-content"
                },
                "items": actionImportItems
            }
        }
    },
    "element##3": {
        "name": "span",
        "attributes": {
            "id": "dir",
            "title": "save (do not press ctrl+s ,key shortcuts needs to be added)",
            "data-action-type": "processFileOrDir",
            "data-action-value": "saveFileReqFlow"
        },
        "items": {
            "text##0": "save ctrl+s"
        }
    },
    "element##4": {
        "name": "span",
        "attributes": {
            "id": "dir",
            "title": "export (do not press ctrl+e ,key shortcuts needs to be added)",
            "data-action-type": "processFileOrDir",
            "data-action-value": "exportFile"
        },
        "items": {
            "text##0": "export ctrl+e"
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
                "id": "actionMenu",
                "class": "menu-item dropdown",
                "data-dropdown-position": "bottom",
                // "data-multiple-open": "false"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "action",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active"
                    },
                    "items": {
                        "text##0": "action"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "dropdown-content"
                    },
                    "items": actionMenuItems
                }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "peopleMenu",
                "class": "menu-item dropdown"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "people",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active"
                    },
                    "items": {
                        "text##0": "people"
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
                "id": "settingMenu",
                "class": "menu-item dropdown"
            },
            "items": {
                "element##0": {
                    "name": "label",
                    "attributes": {
                        "class": "dropbtn",
                        "title": "setting",
                        "data-action-type": "toggleClass",
                        "data-action-value": "active"
                    },
                    "items": {
                        "text##0": "setting"
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
        "element##1": searchBar,
        "element##2": menuBar,
        "element##3": userInfoElem
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
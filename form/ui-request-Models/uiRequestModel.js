/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Left NavBar UI

var navigatorFileTemp = {
    "name": "span",
    "attributes": {
        "class": "file",
        "data-action-type": "openFileFromNavigator"
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

var leftNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarSideLeft",
        "class": "navbar-side-left"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "openFilesNavigation",
                "class": "navigator"
            },
            "items": {}
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

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Central Area UI

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
                "element##2": breadNavItemTemp,
            }
        }
    }
}

var navtabLinkTemp = {
    "name": "span",
    "attributes": {
        "class": "tab-link",
        "data-title-icon": "true",
    },
    "items": {
        "element##0": {
            "name": "label",
            "attributes": {
                "class": "tab-title"
            },
            "items": {
                "text##0": "title"
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
                    "attributes": {},
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

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

var mainSection = {
    "name": "div",
    "attributes": {
        "class": "main-section"
    },
    "items": {
        "element##0": leftNavBar,
        "element##1": centralArea,
        "element##2": rightNavBar
    }
}

var bottomNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarBottom",
        "class": "navbar-bottom"
    },
    "items": {}
}

var editorUI = [
    topNavBar,
    mainSection,
    bottomNavBar
];
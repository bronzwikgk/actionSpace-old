var titleBar = {
    "name": "div",
    "attributes": {
        "class": "titleBar"
    },
    "items": {
        "element##0": {
            "name": "img",
            "attributes": {
                "id": "brandLogo",
                "class": "logo",
                "src": "./assets/download.jpg",
                "alt": "EveryThing Happens Here"
            },
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "class": "docIdentifier"
            },
            "items": {
                "element##0": {
                    "name": "input",
                    "attributes": {
                        "type": "text",
                        "id": "fileName",
                        "class": "dName",
                        "value": "Document Name"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {
                        "class": "dLabel"
                    },
                    "items": {
                        "text##0": "anyTag"
                    }
                }
            }
        },
        "element##2": {
            "name": "div",
            "attributes": {
                "class": "menuBar"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "id": "fileMenu",
                        "class": "menuitem file"
                    },
                    "items": {
                        "text##0": "File"
                    }
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "id": "fileMenu",
                        "class": "menuitem file"
                    },
                    "items": {
                        "text##0": "Edit"
                    }
                },
                "element##2": {
                    "name": "span",
                    "attributes": {
                        "id": "fileMenu",
                        "class": "menuitem file"
                    },
                    "items": {
                        "text##0": "Insert"
                    }
                },
                "element##3": {
                    "name": "span",
                    "attributes": {
                        "id": "fileMenu",
                        "class": "menuitem file"
                    },
                    "items": {
                        "text##0": "View"
                    }
                }
            }
        },
        "element##4": {
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
                            "name": "label",
                            "attributes": {},
                            "items": {
                                "text##0": "AA"
                            }
                        },
                        "element##1": {
                            "name": "label",
                            "attributes": {},
                            "items": {
                                "text##0": "BB"
                            }
                        },
                        "element##2": {
                            "name": "label",
                            "attributes": {},
                            "items": {
                                "text##0": "CC"
                            }
                        },
                        "element##3": {
                            "name": "label",
                            "attributes": {},
                            "items": {
                                "text##0": "+"
                            }
                        }
                    }
                }
            }
        },
        "element##5": {
            "name": "span",
            "attributes": {
                "class": "shareBtn"
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
        "element##6": {
            "name": "span",
            "attributes": {
                "class": "notification"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-bell"
                    },
                    "items": {}
                }
            }
        },
        "element##7": {
            "name": "span",
            "attributes": {
                "class": "userIcon dropdown",
                "data-action-type": "anchorLink",
                "data-action-Value": "/signInView"
            },
            "items": {
                "element##0": {
                    "name": "img",
                    "attributes": {
                        "id": "userImg",
                        "class": "userImg dropbtn",
                        "src": "./assets/user_img.jpg",
                        "alt": "User Name"
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

var editorModesUI = {
    "name": "div",
    "attributes": {
        "id": "editorModes",
        "data-action-type": "chngEditorMode",
        // "data-action-value": ""
    },
    "items": {
        "element##0": {
            "name": "input",
            "attributes": {
                "id": "",
                "type": "radio",
                "name": "editorMode",
                "value": "code",
                "checked": ""
            },
            "items": {}
        },
        "html##1": "Code<br>",
        "element##2": {
            "name": "input",
            "attributes": {
                "id": "",
                "type": "radio",
                "name": "editorMode",
                "value": "canvas"
            },
            "items": {}
        },
        "html##3": "Canvas<br>",
        "element##4": {
            "name": "input",
            "attributes": {
                "id": "",
                "type": "radio",
                "name": "editorMode",
                "value": "richtext"
            },
            "items": {}
        },
        "html##5": "Rich Text<br>",
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
        },
        // "element##1": {
        //     "name": "div",
        //     "attributes": {
        //         "class": "documentTools"
        //     },
        //     "items": {
        //         "element##0": {
        //             "name": "span",
        //             "attributes": {},
        //             "items": {
        //                 "element##0": {
        //                     "name": "i",
        //                     "attributes": {
        //                         "class": "far fa-star"
        //                     },
        //                     "items": {}
        //                 },
        //                 "element##1": {
        //                     "name": "i",
        //                     "attributes": {
        //                         "class": "fas fa-save"
        //                     },
        //                     "items": {}
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}


var leftSideNav = {
    "name": "div",
    "attributes": {
        "id": "leftSideNav",
        "class": "leftSideNav"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "id": "leftNavBar",
                "class": "recents",
                "data-tooltip": "recents",
                "data-action-type": "toggleNavBar",
                "data-action-value": "recentsReqModel",
                "data-action-target-element-id": "leftSide"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-history"
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "newDoc",
                "data-action-type": "toggleNavBar",
                "data-action-value": "xplorerReqModel",
                "data-action-target-element-id": "leftSide"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-file-alt"
                    },
                    "items": {}
                }
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "id": "openDoc",
                "data-action-type": "file",
                "data-action-value": "export"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-file-export"
                    },
                    "items": {}
                }
            }
        },
        "element##4": {
            "name": "span",
            "attributes": {
                "id": "exportDoc",
                "data-action-type": "toggleNavBar",
                "data-action-value": "editorConfigReqModel",
                "data-action-target-element-id": "leftSide"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-tools"
                    },
                    "items": {}
                }
            }
        }
    }
}

var navigatorFileTemp = {
    "name": "span",
    "attributes": {
        "class": "item file activeFileTemp",
        "data-action-type": "openFromNavigation",
        "data-action-value": "file",
        "data-fileid": ""
    },
    "items": {
        "text##0": " Lorem ipsum ..."
    }
}

var navigatorCollTemp = {
    "name": "span",
    "attributes": {
        "id": "collection_uid",
        "class": "item collection activeCollTemp"
    },
    "items": {
        "element##0": {
            "name": "label",
            "attributes": {
                "class": "collectionLabel",
                "data-action-type": "toggleClass",
                "data-action-value": "active",
                "data-action-target-element-id": "collection_uid"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "arrow gt fas fa-angle-right"
                    },
                    "items": {}
                },
                "text##1": "collection Template"
            }
        }
    }
}

var leftNavBarTitle = {
    "name": "div",
    "attributes": {
        "class": "title"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {},
            "items": {
                "text##0": "Title"
            }
        },
        "element##1": {
            "name": "i",
            "attributes": {
                "class": "fas fa-ellipsis-h"
            },
            "items": {}
        }

    }
}

var leftSideFileSysNav = {
    "name": "div",
    "attributes": {
        "id": "leftSide",
        "class": "leftSide"
    },
    "items": {
        // "element##1": {
        //     "name": "div",
        //     "attributes": {
        //         "id": "fileSysNavigation",
        //         "class": "navigator"
        //     },
        //     "items": {}
        // }
    }
}

var centerArea = {
    "name": "div",
    "attributes": {
        "class": "centerArea"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "workSpaceContainer",
                "class": "editorContainer scroll--simple"
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

var richtextUI = {
    "name": "div",
    "attributes": {
        "id": "workSpace",
        "class": "editor",
        "contenteditable": "true",
        "data-open-fileid": "",
        "data-filename": "",
        "data-is-unsaved": "false"
    },
    "items": {}
}

var codeUI = {
    "name": "textarea",
    "attributes": {
        "id": "workSpace",
        "class": "editor",
        "data-open-fileid": "",
        "data-filename": "",
        "data-is-unsaved": "false",
    },
    "items": {}
}

var rightSideInfoNav = {
    "name": "div",
    "attributes": {
        "class": "rightSide"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "InfoNav",
                "class": "infoBlock"
            },
            "items": {}
        }
    }
}

var footer = {
    "name": "div",
    "attributes": {
        "class": "footer"
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

var editor_main = [
    titleBar,
    actionBar,
    leftSideFileSysNav,
    leftSideNav,
    centerArea,
    rightSideInfoNav,
    footer
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

<div class="topNavBar">
      <div class="titleBar">
        <span class="backIcon"><i class="fas fa-angle-left"></i></span>
        <input type="text" class="dName" value="Document Name">
        <label class="dLabel">anyTag</label>
        <span class="sharedLabels">
          <label class="title">Shared</label>
          <label class="description">working</label>
          <span class="userIcons">
            <label>AA</label>
            <label>BB</label>
            <label>CC</label>
            <label>+</label>
          </span>
        </span>
        <span class="searchBar">
          <input type="text" placeholder="Search">
          <i class="fas fa-search"></i>
        </span>
        <span class="notification">
          <i class="fas fa-bell"></i>
        </span>
        <span class="userIcon dropdown">
          <span class="dropbtn fas fa-user"></span>
          <span class="dropdown-content">
            <a>Profile</a>
          </span>
        </span>
      </div>
      <div class="actionBar">
        <div class="editorTools">
          <span data-action="bold"><i class="fas fa-bold"></i></span>
          <span data-action="italic"><i class="fas fa-italic"></i></span>
          <span data-action="underline"><i class="fas fa-underline"></i></span>
          <span data-action="strikeThrough"><i class="fas fa-strikethrough"></i></span>
          <span data-action="subscript"><i class="fas fa-subscript"></i></span>
          <span data-action="superscript"><i class="fas fa-superscript"></i></span>
          <a class="toolSeparator">|</a>

          <span class="dropdown">
            <span class="dropbtn fas fa-align-center"><i class="fas fa-caret-up"></i></span>
            <span class="dropdown-content">
              <span data-action="justifyCenter"><i class="fas fa-align-center"></i></span>
              <span data-action="justifyFull"><i class="fas fa-align-justify"></i></span>
              <span data-action="justifyLeft"><i class="fas fa-align-left"></i></span>
              <span data-action="justifyRight"><i class="fas fa-align-right"></i></span>
            </span>
          </span>
          <a class="toolSeparator">|</a>
          <span data-action="insertUnorderedList"><i class="fas fa-list-ul"></i></span>
          <span data-action="insertOrderedList"><i class="fas fa-list-ol"></i></span>
          <span data-action=""><i class="far fa-laugh"></i></span>

          <span data-action="createLink" data-value="href"><i class="fas fa-link"></i></span>
          <input type="text" id="link_addr" placeholder="Type or Paste your link here" hidden>
          <span class="dropdown">
            <span class="dropbtn fas fa-code"><i class="fas fa-caret-up"></i></span>
            <span class="dropdown-content">
              <h1 data-action="insertBlock" data-value="h1">Title 1</h1>
              <h2 data-action="insertBlock" data-value="h2">Title 2</h2>
              <h3 data-action="insertBlock" data-value="h3">Subheading 1</h3>
              <h4 data-action="insertBlock" data-value="h4">Subheading 2</h4>
              <h5 data-action="insertBlock" data-value="h5">Subheading 3</h5>
              <p data-action="insertBlock" data-value="p">paragraph</p>
              <pre data-action="insertBlock" data-value="pre">Code Block</pre>
              <blockquote data-action="insertBlock" data-value="blockquote">Quote</blockquote>
            </span>
          </span>

          <span data-action="insertImage" data-value="image"><i class="far fa-image"></i></span>
          <input id="filePicker" type="file" accept="image/*" hidden>


        </div>
        <div class="documentTools">
          <span><i class="far fa-star"></i></span>
          <span><i class="fas fa-download"></i></span>
        </div>
      </div>
    </div>


    <div class="leftSideNav">
      <span id="leftNavBar" class="barsIcon"><i class="fas fa-bars"></i></span>
      <span id="newDoc"><i class="fas fa-plus"></i><label>New Document</label></span>
      <span id="newColl"><i class="fas fa-folder-plus"></i><label>New Collection</label></span>
      <span id="saveDoc"><i class="fas fa-save"></i><label>Save Document</label></span>
      <span id="exportDoc"><i class="fas fa-external-link-alt"></i><label>Export</label></span>
    </div>

    <div class="rightSide" data-__uniqueid="3">
        <div class="navigator" data-__uniqueid="2">
            <span id="collection_uid" class="collection active">
                <label class="collectionLabel">
                    <i class="arrow gt fas fa-angle-right"></i>&nbsp;collection
                </label>
                <span class="item collection" data-__uniqueid="1">
                <label class="collectionLabel" data-__uniqueid="0">
                    <i class="arrow gt fas fa-angle-right"></i>&nbsp;collection
                </label>
                <span class="item file">Lorem ipsum ...</span>
            </span>
            </span>
            
        </div>
    </div>

      <div class="textEditorContainer scroll--simple">
        <div id="editor" class="editor" contenteditable="true"></div>
      </div>
    </div>

*/
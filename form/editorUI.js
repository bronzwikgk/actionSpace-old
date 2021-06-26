var sample = {
    "name": "tagName",
    "attributes": {
        "id": "<uid>",
        "class": "classNames", //separated by space or comma
        "style": "CSSStyle", //in case we need inline style
        // any other attribute
    },
    "items": {
        "text": "any text",
        "html": "<p> any html <p>",
        "comment": "any comment",
        "element": {
            /* any element node with the same structure as above */
        }
    }
}
var sampleModel = {
    "name": "div",
    "attributes": {
        "id": "<uid>",
        "class": "anyclass", //separated by space or comma
        // any other attribute
    },
    "items": {
        "text": "any text",
        // "html" : "<p> any html <p>",
        // "comment" : "any comment",
        "element": {
            "id": "child",
            "name": "span",
            "attributes": {
                "class": "anyclass", //separated by space or comma
                // any other attribute
            },
            "items": {
                "text": "i'm child of div",
                "html": "<br>",
                "comment": "and also in testing stage"
            }
        }
    }
}

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

    <div class="centerArea">

      <div class="rightSide">
        <div class="navigator">
          <span class="collection accordion active">
            <label class="collectionLabel"><i class="arrow gt fas fa-angle-right"></i>Root</label>
            <span class="panel">Lorem ipsum ...</span>
          </span>

        </div>
      </div>
      <div class="textEditorContainer scroll--simple">
        <div id="editor" class="editor" contenteditable="true"></div>
      </div>
    </div>

*/

// let result = {};
// CreateEntity.create(document.getElementById('root'), result)
// console.log(JSON.stringify(result));

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var titleBar = {
    "name": "div",
    "attributes": {
        "class": "titleBar"
    },
    "items": {
        "element##0": {
            "name": "span",
            "attributes": {
                "class": "backIcon"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-angle-left"
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "input",
            "attributes": {
                "type": "text",
                "id": "fileName",
                "class": "dName",
                "value": "Document Name"
            },
            "items": {}
        },
        "element##2": {
            "name": "label",
            "attributes": {
                "class": "dLabel"
            },
            "items": {
                "text##0": "anyTag"
            }
        },
        "element##3": {
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
        "element##4": {
            "name": "span",
            "attributes": {
                "class": "searchBar"
            },
            "items": {
                "element##0": {
                    "name": "input",
                    "attributes": {
                        "type": "text",
                        "placeholder": "Search"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-search"
                    },
                    "items": {}
                }
            }
        },
        "element##5": {
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
        "element##6": {
            "name": "span",
            "attributes": {
                "class": "userIcon dropdown"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {
                        "class": "dropbtn fas fa-user"
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
                        "data-action": ""
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
                        "data-action-type": "createLink",
                        "data-action-value": "href"
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
                "element##13": {
                    "name": "input",
                    "attributes": {
                        "type": "text",
                        "id": "link_addr",
                        "placeholder": "Type or Paste your link here",
                        "hidden": ""
                    },
                    "items": {}
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
                                    "name": "h1",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "h1"
                                    },
                                    "items": {
                                        "text##0": "Title 1"
                                    }
                                },
                                "element##1": {
                                    "name": "h2",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "h2"
                                    },
                                    "items": {
                                        "text##0": "Title 2"
                                    }
                                },
                                "element##2": {
                                    "name": "h3",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "h3"
                                    },
                                    "items": {
                                        "text##0": "Subheading 1"
                                    }
                                },
                                "element##3": {
                                    "name": "h4",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "h4"
                                    },
                                    "items": {
                                        "text##0": "Subheading 2"
                                    }
                                },
                                "element##4": {
                                    "name": "h5",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "h5"
                                    },
                                    "items": {
                                        "text##0": "Subheading 3"
                                    }
                                },
                                "element##5": {
                                    "name": "p",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "p"
                                    },
                                    "items": {
                                        "text##0": "paragraph"
                                    }
                                },
                                "element##6": {
                                    "name": "pre",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "pre"
                                    },
                                    "items": {
                                        "text##0": "Code Block"
                                    }
                                },
                                "element##7": {
                                    "name": "blockquote",
                                    "attributes": {
                                        "data-action-type": "insertBlock",
                                        "data-action-value": "blockquote"
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
                        "data-action": "insertImage",
                        "data-value": "image"
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
                },
                "element##16": {
                    "name": "input",
                    "attributes": {
                        "id": "filePicker",
                        "type": "file",
                        "accept": "image/*",
                        "hidden": ""
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "documentTools"
            },
            "items": {
                "element##0": {
                    "name": "span",
                    "attributes": {},
                    "items": {
                        "element##0": {
                            "name": "i",
                            "attributes": {
                                "class": "far fa-star"
                            },
                            "items": {}
                        }
                    }
                },
                "element##1": {
                    "name": "span",
                    "attributes": {},
                    "items": {
                        "element##0": {
                            "name": "i",
                            "attributes": {
                                "class": "fas fa-download"
                            },
                            "items": {}
                        }
                    }
                }
            }
        }
    }
}

var topNavBar = {
    "name": "div",
    "attributes": {
        "class": "topNavBar"
    },
    "items": {
        "element##0": titleBar,
        "element##1": actionBar
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
                "class": "barsIcon",
                "data-action-type": "toggleClass",
                "data-action-value": "active",
                "data-action-target-element-id": "leftSideNav"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-bars"
                    },
                    "items": {}
                }
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "id": "newDoc",
                "data-action-type": "file",
                "data-action-value": "new"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-plus"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {},
                    "items": {
                        "text##0": "New Document"
                    }
                }
            }
        },
        "element##2": {
            "name": "span",
            "attributes": {
                "id": "openDoc",
                "data-action-type": "file",
                "data-action-value": "open"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-external-link-alt"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {},
                    "items": {
                        "text##0": "Open Document"
                    }
                }
            }
        },
        "element##3": {
            "name": "span",
            "attributes": {
                "id": "newColl"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-folder-plus"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {},
                    "items": {
                        "text##0": "New Collection"
                    }
                }
            }
        },
        "element##4": {
            "name": "span",
            "attributes": {
                "id": "saveDoc",
                "data-action-type": "file",
                "data-action-value": "save"
            },
            "items": {
                "element##0": {
                    "name": "i",
                    "attributes": {
                        "class": "fas fa-save"
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "label",
                    "attributes": {},
                    "items": {
                        "text##0": "Save Document"
                    }
                }
            }
        },
        "element##5": {
            "name": "span",
            "attributes": {
                "id": "exportDoc",
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
                },
                "element##1": {
                    "name": "label",
                    "attributes": {},
                    "items": {
                        "text##0": "Export Document"
                    }
                }
            }
        }
    }
}

var navigatorTemp = {
    "name": "span",
    "attributes": {
        "id": "collection_uid",
        "class": "item collection"
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
                "text##1": " collection"
            }
        },
        "element##1": {
            "name": "span",
            "attributes": {
                "class": "item file"
            },
            "items": {
                "text##0": " Lorem ipsum ..."
            }
        }
    }
}

/* 


<div class="rightSide" data-__uniqueid="3">
        <div class="navigator" data-__uniqueid="2">
            <span id="rootCollection" class="collection active" data-__uniqueid="8">
                <label class="collectionLabel root">
                    <i class="arrow gt fas fa-angle-right"></i>&nbsp;Root collection
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
"element##0": {
                                    "name": "i",
                                    "attributes": {
                                        "class": "arrow gt fas fa-angle-right"
                                    },
                                    "items": {}
                                },
                                "text##1": "Root collection"

*/

var centerArea = {
    "name": "div",
    "attributes": {
        "class": "centerArea"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "rightSide"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "class": "navigator"
                    },
                    "items": {
                        "element##0": {
                            "name": "span",
                            "attributes": {
                                "id": "rootCollection",
                                "class": "collection active"
                            },
                            "items": {
                                "element##0": {
                                    "name": "label",
                                    "attributes": {
                                        "class": "collectionLabel root",
                                        "data-action-type": "toggleClass",
                                        "data-action-value": "active",
                                        "data-action-target-element-id": "rootCollection"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "i",
                                            "attributes": {
                                                "class": "arrow gt fas fa-angle-right"
                                            },
                                            "items": {}
                                        },
                                        "text##1": " Root collection"
                                    }
                                },
                                "element##1": navigatorTemp
                            },
                        }
                    }
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "textEditorContainer scroll--simple"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "id": "editor",
                        "class": "editor",
                        "contenteditable": "true",
                        "data-fileid": "",
                        "data-filename": "",
                        "data-has-unsaved-data": "false"
                    },
                    "items": {}
                }
            }
        }
    }
}



var editorUI_main = [
    topNavBar,
    leftSideNav,
    centerArea
];

var processUI = {
    objectModel: 'CreateEntity',
    method: 'create',
    arguments: [sampleModel, document.getElementById('root')]
}

CreateEntity.create(editorUI_main, document.getElementById('root'));

//ActionEngine.processRequest(processUI);
console.log('hello');

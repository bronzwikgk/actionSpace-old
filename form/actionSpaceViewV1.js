
var leftSideNavBar = {
    name: 'section',
    id: 'mySidenav',
    class: 'sidenav',
    item: {
        name: 'div',
        class:'right clickable',
        onclick: "closeNav()",
        close: {
            name: 'i',
            'class': "material-icons",
            'textContent': 'close',
        },
    },
    section1: {
        name: 'a',
        class: '',
        itemCollection1: {
            name: 'div',
            id: 'recentFilesShortCut',
            class: '',
            'data-command': `[{"objModel":"engine","method":"engine.action","req": "loadObject2Dom","arguments":["{StorageHelper.get('recentStoriesCollection')}","document.getElementbyId('workSpaceBody')"]}]`,
            //'href': `#action:loadObject2Dom[storage,'recentStories','workspacebody']`,
            item1: {
                name: 'i',
                'class': "material-icons",
                'textContent': 'schedule',
            },
            item2: {
                name: 'span',
                'class': "content",
                'textContent': 'recent stories',
            }
        },
        itemCollection2: {
            name: 'a',
            'data-command': `[{"objModel":"engine","method":"engine.action","req": "loadObject2Dom","arguments":["{StorageHelper.get('draftsCollection')}","document.getElementbyId('workSpaceBody')"]}]`,
            //  'href': `#action:loadObject2Dom[storage,draft,workspacebody]`,
            class: 'clickable',
            item1: {
                name: 'i',
                'class': "material-icons",
                'textContent': 'insert_drive_file',
            },
            item2: {
                name: 'span',
             
                'textContent': 'drafts',
            }
        },
        itemCollection3: {
            name: 'a',
            'href': '#create:?workspaceBody/newStory',
            class: 'clickable',
            item1: {
                name: 'i',
                'class': "material-icons",
                'textContent': 'add',
            },
            item2: {
                name: 'span',
                
                'textContent': 'new actionStory',
                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },
        itemCollection4: {
            name: 'a',
            'href': '#open:?workspaceBody/openFile',
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'upload_file',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'open file',
            }
        },
        itemCollection5: {
            name: 'a',
            'href': '#open:?workspaceBody/openFolder',
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'folder_open',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'add to collection',




                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },
        hr: {
            name: 'div',
            class: 'hr',
        },
    }
    

}
var brand2 = {
        name: 'span',
        class: 'container clickable',
        id: 'brand',
       
        onclick:"openNav()",
        // class: 'align_center itemsContainer ',
        logo: {
            'name': 'img',
            class: 'appLogo entity',
            'id': 'appLogo',
            'src': '/assets/images/icons_221x.png',
        },
        text: {
            name: 'span',
            class: 'appTitle entity',
            textContent: `[ everything happens here ]`
        }
 
    
}
var searchBar = {
    name: 'span',
    class: 'container',
    id: 'actionSearch',
    
    input: {
        'name': 'input',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'searchInput',
        'placeholder': "search here...",
        'autocomplete': "off",
       
   
    }, menuItem4: {
        'name': 'icon',
        'class': "material-icons right",
        'textContent': 'search',
    },

}
var actionSpaceHeaderUserMenu = {
    "name": "span",
    class: 'container',
    id: 'actionSpaceHeaderUserMenu',
    menuItem1: {
        'name': 'a',
        'class': 'dropdown btn-3',
        'href': '#action',
        'textContent': 'action',
        // dropContent: {
        //     name: 'span',
        //     class: 'dropdown-content column container',
        //     item1: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'create    ctrl+n',
        //     },
        //     item2: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'import  ctrl + i',
        //     },
        //     item3: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'insert   ctrl + Shift + i',
        //     },
        //     item4: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'open   ctrl + 0',
        //     },
        //     item5: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'export   ctrl + e',
        //     },
        //     item6: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'print ctrl + p',
        //     },


        // },
    },
    menuItem2: {
        'name': 'a',
        'class': 'dropdown',
        'href': '#people',
        'textContent': 'People',
        // dropContent: {
        //     name: 'span',
        //     class: 'dropdown-content column container',
        //     item1: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'appointments    ctrl+n',
        //     },
        //     item2: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'activity report  ctrl + i',
        //     },
        //     item3: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'contact',
        //     },
        //     item4: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'open   ctrl + 0',
        //     },
        //     item5: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'export   ctrl + e',
        //     },
        //     item6: {
        //         name: 'div',
        //         class: 'content item',
        //         textContent: 'print ctrl + p',
        //     },


        // },
    },
    menuItem3: {
        'name': 'a',
        'href': '#setting',
        'textContent': 'setting'
    },
    menuItem4: {
        'name': 'button',
        'class': "material-icons",
        style:'display:none',
        'textContent': 'more_vert',
    }
}
var topNav = {
    name: 'div',
    id: 'topNav',
    class:'container row full-width',
  //  class: 'topnav row container full-width ',
    item1: brand2,
    item2: searchBar,
    item3:actionSpaceHeaderUserMenu,    
}
var selectBox = {
    name: 'span',
    style: 'visibility:hidden',
    
    items1: {
        name: 'input',
        type: 'checkbox',
        id:'selectBox',
    },
    items2: {
        name: 'label',
        'for': 'selectBox',
        textContent:"Select",
    }
}
var activeStoryTree = {
    name: 'span',
    class:'sticky verticle ',
    id: 'activeStoryTree',
    textContent: 'activeStoryTree',
    innerHTML:'createTreeElement'
}
var actionSpaceBody = {
    name: 'div',
   // class: 'container row full-width',
    id: 'actionSpaceBody',
   
    editor: {
        name: 'div',
        id: 'actionSpaceEditor',
        mimeType: 'richText',
        "activeStoryTree": activeStoryTree,
        //  class: 'row',
        userInputSpace: {
            name: 'div',
            class:'full-width',
            id: 'userInputSpace',
            activeActionStory: {
                name: 'div',
                id:'activeActionStory',
                title: {
                    name: 'h1',
                    textContent: activeActionStory.title,
                },
                hr: {
                    name:"hr",
                },
                actionStory: activeActionStory,

            },
        },
        editorMenu:'editorMenu',
        richTextMenu:'richTextMenu',
        contextMenu: 'contextMenu',
        insertMenu: 'insertMenu',
        footer: 'actionEditorFooter',

    },
   
   
   
    
}
var activeViewModelV1 = {
    name: 'actionSpace',
    class:'full-width',
    id: 'actionSpace',
  //  textContent: 'Active View',
    topNav: topNav,
    actionSpaceBody:actionSpaceBody,
    selectBox: selectBox,
    

}


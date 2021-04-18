
var leftSideNavBar = {
    name: 'section',
    id: 'mySidenav',
    class: 'sidenav',
    section1: {
        name: 'span',
        class: '',
        itemCollection1: {
            name: 'a',
            id: 'recentFilesShortCut',
            class: '',
            'data-command': `[{"objModel":"engine","method":"engine.action","req": "loadObject2Dom","arguments":["{StorageHelper.get('recentStoriesCollection')}","document.getElementbyId('workSpaceBody')"]}]`,
            //'href': `#action:loadObject2Dom[storage,'recentStories','workspacebody']`,
            item1: {
                name: 'i',
                'class': "material-icons icon",
                'textContent': 'schedule',
            },
            item2: {
                name: 'span',
                'class': "",
                'textContent': 'recent stories',
            }
        },
        itemCollection2: {
            name: 'a',
            'data-command': `[{"objModel":"engine","method":"engine.action","req": "loadObject2Dom","arguments":["{StorageHelper.get('draftsCollection')}","document.getElementbyId('workSpaceBody')"]}]`,
            //  'href': `#action:loadObject2Dom[storage,draft,workspacebody]`,
            class: '',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'insert_drive_file',
            },
            item2: {
                name: 'div',
                'class': "",
                'textContent': 'drafts',
            }
        },
        itemCollection3: {
            name: 'a',
            'href': '#create:?workspaceBody/newStory',
            class: '',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'add',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
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
        sideBar_Collection_withDropDown: {
            name: 'div',
            //  class: 'collection_list',
            collectionTitle: {
                name: 'div',
                //     class: "medium",
                textContent: "actionStories & Collections",
            },
            collectionItem: {
                name: 'div',
                //    class: "container column",
                innerHTML: `
                      <li class='row item justify_SpaceBetween'><span class="parent ">my collection</span>
                      <ul class="nested container column">
                      <li class='item row'>story 1</li>
                    <li class='item row'>story 2</li>
                    <li class='item row' >story 3</li>
                    <li class='item row'>story 4</li>
                    <li class='item row' >
                        <li class='item row'><span class="parent">my Nested Stories</span>
                            <ul class="nested">
                                <li class='item row'>story 1</li>
                                <li class='item row'>story 2</li>
                                <li class='item row'>story 3</li>
                                <li class='item row'>story 4</li>
                            </ul>
                        </li>
                        errands
                    </li>

                    <li><span class="parent">recent Stories</span>
                        <ul class="nested">
                            <li>leaf</li>
                            <li>leaf</li>

                        </ul>
                    </li>
                </ul>
            </li>
            <span class="hozintalLine"></span>
            <li><span class="parent">Recent Files</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>
            <span class="hozintalLine"></span>
            <li><span class="parent">Starred</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>
            <li><span class="parent">Tags</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>
            <li><span class="parent">Trash</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>`
            },
            collectionItem2: {
                name: 'div',
                //  class: "container column",
                id: 'sideLinks',
                li1: {
                    name: 'ul',
                    class: 'row item',
                    parent: {
                        name: 'span',
                        class: 'parent',
                        textContent: 'myCollection'
                    },
                    ul: {
                        name: 'ul',
                        class: 'nested container column children item-collection',
                        items1: {
                            name: 'li',
                            class: 'item row',
                            textContent: 'story/file 1',
                        },
                        items2: {
                            name: 'a',
                            class: 'item row',
                            href: '/load/file2',
                            textContent: 'story/file 2',
                        },
                        parent: {
                            name: 'span',
                            class: 'parent',
                            textContent: 'Folder 1'
                        },
                        ul: {
                            name: 'ul',
                            class: 'nested container column children item-collection',
                            items1: {
                                name: 'li',
                                class: 'item row',
                                textContent: 'files in folder',
                            },
                            items2: {
                                name: 'a',
                                class: 'item row',
                                href: '/load/file2',
                                textContent: 'story/file 2',
                            },

                        },

                    },
                },

            },
        },
    },
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
    class:'sticky verticle',
    id: 'activeStoryTree',
    textContent: 'activeStoryTree',
    innerHTML:'createTreeElement'
}

var actionSpaceBody = {
    name: 'div',
   // class: 'container row full-width',
    id: 'actionSpaceBody',
    "activeStoryTree":activeStoryTree,
    editor: {
        name: 'div',
        id: 'actionSpaceEditor',
        mimeType: 'richText',
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


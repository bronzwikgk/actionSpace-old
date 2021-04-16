
var leftSideNavBar = {
    name: 'section',
    id: 'leftSideNavBar',
    class:'darkTheme',
    section1: {
        name: 'span',
        class: '',
        itemCollection1: {
            name: 'a',
            id:'recentFilesShortCut',
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
var workspaceHeader = {
    "name": "div",
    class: 'container align_center row justify_SpaceBetween',
    id: 'workspaceHeader',
    WorkSpaceActiveTab: {
        'name': 'span',
        class:'subHead',
        'textContent': 'recent Stories', 
    },
    menu: {
        name: 'span',
        class:'container row',
        menuItem2: {
            'name': 'i',
            'class': "material-icons icon",
            'textContent': 'favorite',

        },
        menuItem4: {
            'name': 'i',
            'class': "material-icons icon",
            'textContent': 'file_download',

        },
        menuItem5: {
            'name': 'i',
            'class': "material-icons icon",
            'textContent': 'delete',
        }
    },

    
}
var workSpaceBody = {
    workSpaceBody: {
        name: 'div',
        id: 'workSpaceBody',
        class: 'container card-collection ',
        menu: {
            name: 'span',
            class: 'container row full-width justify_SpaceBetween',
            selectTextClass: {
                name: 'select',
                class: 'select',
                id: 'richTextFormattingSelection',
                options: {
                    name: 'option',
                    selected: '',
                    textContent: 'last viewed',
                },
                option1: {
                    name: 'option',
                    value: 'h1',
                    textContent: 'Alphabetical',
                },
                option2: {
                    name: 'option',
                    value: 'h2',
                    textContent: 'date created',
                },
                option3: {
                    name: 'option',
                    value: 'h3',
                    textContent: 'assending',
                },
                option4: {
                    name: 'option',
                    value: 'h3',
                    textContent: 'desending',
                },
            },
            menu: {
                name: 'span',
                
                class: 'container row',
                menuItem1: {
                    'name': 'button',
                    'action':'[command:layout_Grid]',
                    'class': "material-icons icon",
                    'textContent': 'grid_view',

                },
                menuItem2: {
                    'name': 'i',
                    'class': "material-icons icon",
                    'textContent': 'view_list',

                },

            },

        },
    },
    collection: {
        name: 'div',
        class: 'container row full-width',
        id: 'collectionThumnail',
        recentStoriesCollectionDataSet,
    },
    contextMenu: {
        name: 'span',
        class: 'container column contextMenu',
        style:'display: none',
        itemCollection1: {
            name: 'a',
            class: 'item row align_center justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon",
                'textContent': 'delete',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'delete',
                'onclick': "engine.executeSynReq(newActionStoryReq);"

                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },
        hr: {
            name: 'div',
            class: 'hr',
        },
        itemCollection2: {
            name: 'a',
            'onclick': "engine.executeSynReq(newActionStoryReq);",
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'content_copy',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'dublicate',

                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },

        itemCollection3: {
            name: 'a',
            'onclick': "engine.executeSynReq(newActionStoryReq);",
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon",
                'textContent': 'add',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'move to collection',


                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },
        share: {
            name: 'a',
            'onclick': "engine.executeSynReq(openFileReqModel,event);",
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'share',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'share',




                //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
            }
        },
        edit: {
            name: 'a',
            'onclick': "engine.executeSynReq(openFileReqModel,event);",
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'edit',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'editor',

            }
        },
        itemCollection6: {
            name: 'a',
            'onclick': "engine.executeSynReq(openFileReqModel,event);",
            class: 'item row justify_SpaceBetween',
            item1: {
                name: 'i',
                'class': "material-icons icon mr - 10",
                'textContent': 'settings',
            },
            item2: {
                name: 'div',
                'class': "collection_name",
                'textContent': 'setting',

            }
        },

    }
 
}
var userDashboardWorkSpaceBody = {
    name: 'div',
    class:'container full-width ',
    id:'userDashboardWorkSpaceBody',
    sidebar: {
        name: 'div',
        class: 'container column',
        id: 'sideBar',
        leftSideNavBar,
    },
    body: {
        name: 'div',
        class: 'container column full-width full-height',
        id: 'workSpaceBody',
        bodyHeader: workspaceHeader,
        hr: {
            name: 'div',
            class: 'hr',
        },
        'workSpaceBody': workSpaceBody,
        output: {}, 
    }
}
var brand = {
    name: 'div',
    class:'brand',
    content: {
        name: 'a',
        'href': '#welcome',
        class: 'align_center itemsContainer ',
        logo: {
            'name': 'img',
            'id': 'logo',
            'src': 'images/ehh3dlowres.png',
        },
        text: {
            name: 'span',
            class: 'brandTitle',
            innerHTML: `everything happens here`
        }
    },
}
var searchBar = {
    name: 'span',
    class: 'container item',
    id:'searchBarItem',
    input: {
        'name': 'input',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'actionSearch',
        'placeholder': "search here...",
        'autocomplete': "off"
    
    },
    
}
var actionSpaceHeaderUserMenu = {
    "name": "div",
    class: 'container align_center',
    id: 'actionSpaceHeaderUserMenu',
    menuItem1: {
            'name': 'a',
            'class': 'dropdown',
            'href': '#action',
            'textContent': 'action',
            dropContent: {
                name: 'span',
                class: 'dropdown-content column container',
                item1: {
                    name: 'div',
                    class: 'content item',
                    textContent:'create    ctrl+n',
                },
                item2: {
                    name: 'div',
                    class: 'content item',
                    textContent: 'import  ctrl + i',
                },
                item3: {
                    name: 'div',
                    class: 'content item',
                    textContent: 'insert   ctrl + Shift + i',
                },
                item4: {
                    name: 'div',
                    class: 'content item',
                    textContent: 'open   ctrl + 0',
                },
                item5: {
                    name: 'div',
                    class: 'content item',
                    textContent: 'export   ctrl + e',
                },
                item6: {
                    name: 'div',
                    class: 'content item',
                    textContent: 'print ctrl + p',
                },


        },
        },
    menuItem2:{
        'name': 'a',
        'class': 'dropdown',
        'href': '#people',
        'textContent': 'People',
        dropContent: {
            name: 'span',
            class: 'dropdown-content column container',
            item1: {
                name: 'div',
                class: 'content item',
                textContent: 'appointments    ctrl+n',
            },
            item2: {
                name: 'div',
                class: 'content item',
                textContent: 'activity report  ctrl + i',
            },
            item3: {
                name: 'div',
                class: 'content item',
                textContent: 'contact',
            },
            item4: {
                name: 'div',
                class: 'content item',
                textContent: 'open   ctrl + 0',
            },
            item5: {
                name: 'div',
                class: 'content item',
                textContent: 'export   ctrl + e',
            },
            item6: {
                name: 'div',
                class: 'content item',
                textContent: 'print ctrl + p',
            },


        },
        },
    menuItem3:{
            'name': 'a',
            'href': '#setting',
            'textContent': 'setting'
        },
    menuItem4:{
            'name': 'button',
            'class': "material-icons",
            'textContent': 'more_vert',
        } 
}
var userDashboardTopNav = {
    name:'div',
    class:'container align_center justify_SpaceBetween full-width',
    'brand': brand,
    'search': searchBar,
    'appNav': actionSpaceHeaderUserMenu,
}

var userDashboard = {
    userDashboard: {
        name: 'div',
        class: 'container full-width row full-height',
        id: 'userDashboard',
        topNav: { name: 'div', class: 'container row full-width ', id: 'topNav',userDashboardTopNav },
        workSpaceBodyContainer: { name: 'div', class: 'container row full-width ', id: 'workSpaceBodyContainer',userDashboardWorkSpaceBody },
  
    }
    
}
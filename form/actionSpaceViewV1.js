
var leftSideNavBar = {
    name: 'div',
    id: 'mySidenav',
    class: 'container sidenav column',
    section1: {
        name: 'section',
        class:'full-width',
        itemCollection1: {
            name: 'span',
            class: 'container column',
            //style:'flex-direction:row-reverse',
            item: {
                name: 'div',
                class: 'item  row clickable items-right',
                onclick: "closeNav()",
                close: {
                    name: 'i',
                    'class': "material-icons",
                    'textContent': 'close',
                },
            },
            item2: {
                name: 'a',
                'href': '#action:replaceChild()',
                class: 'row',
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
            item3: {
                name: 'a',
                'href': '#fs:openFile',
                class: 'row',
                item1: {
                    name: 'i',
                    'class': "material-icons icon mr - 10",
                    'textContent': 'upload_file',
                },
                item2: {
                    name: 'div',
                    'class': "collection_name",
                    'textContent': 'open file',
                    //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
                }
            },
            item4: {
                name: 'a',
                'href': '#create:?workspaceBody/newStory',
                class: 'row',
                item1: {
                    name: 'i',
                    'class': "material-icons icon mr - 10",
                    'textContent': 'folder_open',
                },
                item2: {
                    name: 'div',
                    'class': "collection_name",
                    'textContent': 'add collection',
                    //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
                }
            },
            item5: {
                name: 'a',
                'href': '#create:?workspaceBody/newStory',
                class: 'row',
                item1: {
                    name: 'i',
                    'class': "material-icons icon mr - 10",
                    'textContent': 'save',
                },
                item2: {
                    name: 'div',
                    'class': "collection_name",
                    'textContent': 'save',
                    //  'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
                }
            },
        },
    },
    section2:{},
   
   
   
   
    
    // sideBar_Collection_withDropDown: {
    //     name: 'div',
    //     //  class: 'collection_list',
    //     collectionTitle: {
    //         name: 'div',
    //         //     class: "medium",
    //         textContent: "actionStories & Collections",
    //     },
    //     // collectionItem: {
    //     //     name: 'div',
    //     //     //    class: "container column",
    //     //     innerHTML: `
    //     //               <li class='row item justify_SpaceBetween'><span class="parent ">my collection</span>
    //     //               <ul class="nested container column">
    //     //               <li class='item row'>story 1</li>
    //     //             <li class='item row'>story 2</li>
    //     //             <li class='item row' >story 3</li>
    //     //             <li class='item row'>story 4</li>
    //     //             <li class='item row' >
    //     //                 <li class='item row'><span class="parent">my Nested Stories</span>
    //     //                     <ul class="nested">
    //     //                         <li class='item row'>story 1</li>
    //     //                         <li class='item row'>story 2</li>
    //     //                         <li class='item row'>story 3</li>
    //     //                         <li class='item row'>story 4</li>
    //     //                     </ul>
    //     //                 </li>
    //     //                 errands
    //     //             </li>

    //     //             <li><span class="parent">recent Stories</span>
    //     //                 <ul class="nested">
    //     //                     <li>leaf</li>
    //     //                     <li>leaf</li>

    //     //                 </ul>
    //     //             </li>
    //     //         </ul>
    //     //     </li>
    //     //     <span class="hozintalLine"></span>
    //     //     <li><span class="parent">Recent Files</span>
    //     //         <ul class="nested">
    //     //             <li>story 1</li>
    //     //             <li>story 2</li>
    //     //             <li>story 3</li>
    //     //             <li>story 4</li>
    //     //             <li>
    //     //             <li><span class="parent">my Nested Stories</span>
    //     //                 <ul class="nested">
    //     //                     <li>story 1</li>
    //     //                     <li>story 2</li>
    //     //                     <li>story 3</li>
    //     //                     <li>story 4</li>
    //     //                 </ul>
    //     //             </li>
    //     //             errands
    //     //     </li>

    //     //     <li><span class="parent">recent Stories</span>
    //     //         <ul class="nested">
    //     //             <li>leaf</li>
    //     //             <li>leaf</li>

    //     //         </ul>
    //     //     </li>
    //     //     </ul>
    //     //     </li>
    //     //     <span class="hozintalLine"></span>
    //     //     <li><span class="parent">Starred</span>
    //     //         <ul class="nested">
    //     //             <li>story 1</li>
    //     //             <li>story 2</li>
    //     //             <li>story 3</li>
    //     //             <li>story 4</li>
    //     //             <li>
    //     //             <li><span class="parent">my Nested Stories</span>
    //     //                 <ul class="nested">
    //     //                     <li>story 1</li>
    //     //                     <li>story 2</li>
    //     //                     <li>story 3</li>
    //     //                     <li>story 4</li>
    //     //                 </ul>
    //     //             </li>
    //     //             errands
    //     //     </li>

    //     //     <li><span class="parent">recent Stories</span>
    //     //         <ul class="nested">
    //     //             <li>leaf</li>
    //     //             <li>leaf</li>

    //     //         </ul>
    //     //     </li>
    //     //     </ul>
    //     //     </li>
    //     //     <li><span class="parent">Tags</span>
    //     //         <ul class="nested">
    //     //             <li>story 1</li>
    //     //             <li>story 2</li>
    //     //             <li>story 3</li>
    //     //             <li>story 4</li>
    //     //             <li>
    //     //             <li><span class="parent">my Nested Stories</span>
    //     //                 <ul class="nested">
    //     //                     <li>story 1</li>
    //     //                     <li>story 2</li>
    //     //                     <li>story 3</li>
    //     //                     <li>story 4</li>
    //     //                 </ul>
    //     //             </li>
    //     //             errands
    //     //     </li>

    //     //     <li><span class="parent">recent Stories</span>
    //     //         <ul class="nested">
    //     //             <li>leaf</li>
    //     //             <li>leaf</li>

    //     //         </ul>
    //     //     </li>
    //     //     </ul>
    //     //     </li>
    //     //     <li><span class="parent">Trash</span>
    //     //         <ul class="nested">
    //     //             <li>story 1</li>
    //     //             <li>story 2</li>
    //     //             <li>story 3</li>
    //     //             <li>story 4</li>
    //     //             <li>
    //     //             <li><span class="parent">my Nested Stories</span>
    //     //                 <ul class="nested">
    //     //                     <li>story 1</li>
    //     //                     <li>story 2</li>
    //     //                     <li>story 3</li>
    //     //                     <li>story 4</li>
    //     //                 </ul>
    //     //             </li>
    //     //             errands
    //     //     </li>

    //     //     <li><span class="parent">recent Stories</span>
    //     //         <ul class="nested">
    //     //             <li>leaf</li>
    //     //             <li>leaf</li>

    //     //         </ul>
    //     //     </li>
    //     //     </ul>
    //     //     </li>`
    //     // },
    //     collectionItem2: {
    //         name: 'div',
    //         //  class: "container column",
    //         id: 'sideLinks',
    //         li1: {
    //             name: 'ul',
    //             class: 'row item',
    //             parent: {
    //                 name: 'span',
    //                 class: 'parent',
    //                 textContent: 'myCollection'
    //             },
    //             ul: {
    //                 name: 'ul',
    //                 class: 'nested container column children item-collection',
    //                 items1: {
    //                     name: 'li',
    //                     class: 'item row',
    //                     textContent: 'story/file 1',
    //                 },
    //                 items2: {
    //                     name: 'a',
    //                     class: 'item row',
    //                     href: '/load/file2',
    //                     textContent: 'story/file 2',
    //                 },
    //                 parent: {
    //                     name: 'span',
    //                     class: 'parent',
    //                     textContent: 'Folder 1'
    //                 },
    //                 ul: {
    //                     name: 'ul',
    //                     class: 'nested container column children item-collection',
    //                     items1: {
    //                         name: 'li',
    //                         class: 'item row',
    //                         textContent: 'files in folder',
    //                     },
    //                     items2: {
    //                         name: 'a',
    //                         class: 'item row',
    //                         href: '/load/file2',
    //                         textContent: 'story/file 2',
    //                     },

    //                 },

    //             },
    //         },

    //     },
    // },
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
    class: 'container ',
    id: 'actionSearch',
    
    input: {
        'name': 'input',
        class:'autoComplete',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'searchInput',
        'placeholder': "search here...",
        'autocomplete': "off",
       
   
    }, menuItem4: {
        'name': 'icon',
        'class': "material-icons right",
        'textContent': 'search',
    },
    autocomplete: {
        name: 'div',
        id: 'searchAutoComplete',
        class: 'items-list',
        items: {
            name: 'span',
            class: 'autocomplete-items',
            id: 'item-1',
            
        }
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
var actionSpaceBody = {
    name: 'div',
   // class: 'container row full-width',
    id: 'actionSpaceBody',
  //  ViewtoolBar: viewToolBar,
    editor: editorV1 // from 
   
   
   
    
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

var listItem = {
    name: 'div',
    class: 'listItem',
    id: 'listemID',
    innerHTML:'',
}

var itemCollection = {
    
}

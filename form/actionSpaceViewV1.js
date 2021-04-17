
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
var actionSpaceBody = {
    name: 'div',
    class: 'container row full-width',
    id: 'actionSpaceBody',
    editor: {
        name: 'div',
        id: 'actionSpaceEditor',
        class: 'container',
        title: {
            name: 'h1',
            textContent: "Title",
        },
        hr: {
            name: 'hr',
            class: 'hr row',

        },
        contextMenu: 'contextMenu',
        insertMenu: 'insertMenu',
        userInput: 'userInputViewModel',
        blocks: 'actionBlocks',
        hr: {
            name: 'div',
            class: 'hr',
        },
        footer: 'actionEditorFooter',

    },
   
   
   
    
}
var activeViewModelV1 = {
    name: 'actionSpace',
 //   class: 'container row full-width full-height',
    id: 'actionSpace',
  //  textContent: 'Active View',
    topNav: topNav,
    actionSpaceBody:actionSpaceBody,
    selectBox: selectBox,
    

}

  
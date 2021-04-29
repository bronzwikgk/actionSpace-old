var leftSideNavBar= {
    name: 'section',
    id: "navigationSection",
    class: "column",
    inside_navigationSection: {
        name: 'div', id: "inside_navigationSection",
        // sideBar_header: {
        //     name: 'div',
        //     id:'side_bar_header',
        //     class: "justify_SpaceBetween container",
        //     brand: {
        //         name: 'div',
        //         class: "brand_logo",
        //         textContent: 'Sunil Kumar',
        //             },
        //     sideBarControlMenu: {
        //         name: 'div',
        //         class: "HeaderControl align_center justify_center",
        //         button1: {
        //             name: 'button',class: "mode_toggle_btn mr-15", id: "MainHeaderHamburger1",
        //                 },
        //         button2: {
        //             name: 'i','class': "material-icons",'textContent': 'add_box',
        //                 },
        //     },

        // },
        sideBar_CollectionList: {
            name: 'div',
             //   class: 'collection_list',
                    collectionItem: {
                name: 'div',
                   // class: "collection",
                        items: [
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'add',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'new actionStory',
                                },
                                'data-command':`[{"command":"new"}]`,
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'upload_file',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'open file',
                                },
                                'data-command':`[{"command":"OpenFile"}]`
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'folder_open',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'add collection',
                                },
                                'data-command':`[{"command":"OpenDirectory"}]`
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'save',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'save',
                                },
                                'data-command': `[{"command":"FS_Save"}]`,
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent':'Invoice Form',
                                    'data-command': `[{"command":"form","entity":"invoiceForm"}]`,
                                },
                               
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'Export to Sheet',
                                    'data-command': `[{"command":"form","entity":"export"}]`,
                                },
                                
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'Import from Sheet',
                                    'data-command': `[{"command":"form","entity":"import"}]`,
                                },
                                
                            },
                        ]
            }
        },
        hr: {
            name: 'div',
                class: 'hr',
                },

        sideBar_Collection_withDropDown: {
            name: 'div',
                class: 'collection_list',
                    collectionTitle: {
                        name: 'div',
                        class: "medium",
                        textContent: "actionStories & Collections",
                    },
            collectionItem: {
                name: 'div',
                class: "container column",
                 'limyCollection':{
                        'name':'li',
                        'class':'row item justify_SpaceBetween',
                        'span':{
                            'name':'span',
                            'class':'parent',
                            'textContent':'my collection'
                        },
                        'ul':{
                            'name':'ul',
                            'class':'nested container column',
                            'id':'myCollection'
                        }
                 },
                'span1':{
                    'name':'span',
                    'class':'hozintalLine'
                },
                'limyFiles':{
                    'name':'li',
                    'class':'row item justify_SpaceBetween',
                    'span':{
                        'name':'span',
                        'class':'parent',
                        'textContent':'my files'
                    },
                    'ul':{
                        'name':'ul',
                        'class':'nested container column',
                        'id':'myFiles'
                    }
                },
                'span2':{
                    'name':'span',
                    'class':'hozintalLine'
                },
                'liRecentFiles':{
                    'name':'li',
                    'class':'row item justify_SpaceBetween',
                    'span':{
                        'name':'span',
                        'class':'parent',
                        'textContent':'Recent Files'
                    },
                    'ul':{
                        'name':'ul',
                        'class':'nested container column',
                        'id':'RecentFiles'
                    }
                },
                'span3':{
                    'name':'span',
                    'class':'hozintalLine'
                },
                'liStarred':{
                    'name':'li',
                    'span':{
                        'name':'span',
                        'class':'parent',
                        'textContent':'Starred'
                    },
                    'ul':sampleNestedFolder
                },
                'liTags':{
                    'name':'li',
                    'span':{
                        'name':'span',
                        'class':'parent',
                        'textContent':'Tags'
                    },
                    'ul':sampleNestedFolder
                },
                'liTrash':{
                    'name':'li',
                    'span':{
                        'name':'span',
                        'class':'parent',
                        'textContent':'Starred'
                    },
                    'ul':sampleNestedFolder
                }
            },
            collectionItem2: {
                name: 'div',
                class: "container column",
                id: 'sideLinks',
                li1: {
                    name: 'ul',
                    class: 'row item',
                    parent: {
                        name: 'span',
                        class: 'parent',
                        textContent:'myCollection'
                    },
                    ul: {
                        name: 'ul',
                        class: 'nested container column children item-collection',
                        items1: {
                            name: 'li',
                            class: 'item row',
                            textContent:'story/file 1',
                        },
                        items2: {
                            name: 'a',
                            class: 'item row',
                            href:'/load/file2',
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
        sideBar_footer: {
            name: 'div',
                id: "SidebarFooter",
                   
            // footerIcons: {
            //     name: 'div',
            //     class: 'container IconList ',
            //     id:'footerIcons',
            //     itemCollection: {
            //         name: 'ul',
            //         class:'justify_SpaceBetween container',
            //         favouriteIcon: {
            //             name: 'i',
            //             'class': "material-icons",
            //             'textContent': 'favorite',
            //         }, 
            //         download:{
            //             name: 'i',
            //             'class': "material-icons",
            //             'textContent': 'download_for_offline',
            //         },
            //         setting: {
            //             name: 'i',
            //             'class': "material-icons",
            //             'textContent': 'settings',
            //         },
            //     }


            // },

        },

    }
}
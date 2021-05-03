var actionSpaceConfig = {
    tabStop: 'true', // can recive focus with Tab
    autoSave: '',
    mime:'',
    activemode: '',
        
}
var actionSpaceEditorModel = {
    name: 'div',
    config:'actionSpaceConfig',
}
var deviceToolBar = {
    name: 'div',
    class: 'toolbar right clickable',
    id: 'viewToolbar',
    phone: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'smartphone',
    },
    tablet: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'minimize',
    },
    computer: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'computer',
    },

}
var viewToolBar = {
    name: 'div',
    class: 'toolbar right clickable',
    id: 'viewToolbar',
    expand: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'open_in_full',
    },
    minimise: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'minimize',
    },
    close: {
        name: 'i',
        'class': "material-icons",
        'textContent': 'close',
    },

}
var editorV1= {
    name: 'div',
        class: 'column right',
            toolBar: viewToolBar,
                id: 'actionSpaceEditor',
                    mimeType: 'richText',
                        "activeStoryTree": activeStoryTree,
                            //  class: 'row',
                            userInputSpace: {
        name: 'div',
            class: 'full-width',
                id: 'userInputSpace',
                    activeActionStory: {
            name: 'div',
                mode: 'edit',
                    toolbar: 'viewToolBar',
                        id: 'activeActionStory',
                            title: {
                name: 'h1',
                    textContent: activeActionStory.title,
                },
            hr: {
                name: "hr",
                },
            actionStory: activeActionStory,

            },
    },
    // editorMenu:'editorMenu',
    // richTextMenu:'richTextMenu',
    // contextMenu: 'contextMenu',
    // insertMenu: 'insertMenu',
    // footer: 'actionEditorFooter',

}

console.log(editorV1)
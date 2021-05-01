var toolbarJson = {
    toolBar: [
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-right"></i>',
            'data-cmd': 'justifyRight'
        },
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-left"></i>',
            'data-cmd': 'justifyLeft'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-center"></i>',
            'data-cmd': 'justifyCenter'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-justify"></i>',
            'data-cmd': 'justifyFull'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-bold"></i>',
            'data-cmd': 'Bold'
        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-italic"></i>',
            "data-cmd": 'italic'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-underline"></i>',
            "data-cmd": 'underline'

        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ul"></i>',
            "data-cmd": 'insertUnorderedList'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ol"></i>',
            "data-cmd": 'insertOrderedList'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-link"></i>',
            "data-cmd": 'createLink'
        }, {

            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-code"></i>',
            "data-cmd": 'showCode'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-redo"></i>',
            "data-cmd": 'redo'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-undo"></i>',
            "data-cmd": 'undo'
        }
    ]
}
var htmlAttributesList = ['name', 'label', 'onclick', 'lineNumbers', 'class', 'id', 'text', 'title', 'content', 'value', 'type', 'data-cmd'];

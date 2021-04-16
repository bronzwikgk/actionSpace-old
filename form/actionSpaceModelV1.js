
var userInputViewModel = {
    name: 'div',
    class: 'container',
    id: 'userEditorInputView',
    block: {
        name: 'div',
        class: 'blocks',
        id: 'blocks+Index',
        li: {
            name: 'span',
            class: 'inlineContent',
            id: 'inlineContent',
            contentEditable: 'true',
            innerHTML: sampleIntroStory,
        }
    }
}
var actionSpaceModel = {
    name: "div",
    class: 'container row full-height',
    id: uid(),
    title: {
        name: 'div',
        class: 'title h1',
        textContent:"Title",
    },
    editor:{
        name:'div',
        id: 'actionSpaceEditor',
        class: 'container',
        contextMenu: 'contextMenu',
        insertMenu: 'insertMenu',
        userInput: userInputViewModel,
        blocks: 'actionBlocks',
        hr: {
            name: 'div',
            class: 'hr',
        },
        footer: 'actionEditorFooter',
        
    },
    preview: {
        name: 'span',
        id: 'preview',
        class:'container column'
    }

}

var userView= {
            name: 'div',
             class: 'container column',
            id: 'userView',
                editor: {
                  name: 'div',
                   class: 'container column',
                id: 'editor',
                    card: {
            name: 'div',
                class: 'card container column',
                    id: 'autoSuggest',
                        //    style: 'visibility:hidden',
                        CardHeader: {
                name: 'div',
                    class: 'medium',
                        textContent: 'Auto Suggest curated for you'
            },
            itemCollection: {
                name: 'datalist',
                    class: 'container column',
                        items: {
                    name: 'div',
                        class: 'item',
                            textContent: 'I am an item',
                    },
                items2: {
                    name: 'div',
                        class: 'item',
                            textContent: 'I am second Item',
                    },


            }


        },

                    content: {
                        name: 'div',
                        class: 'container column',
                        id: 'content',
                        contentEditable: 'true',
                        activeActionStory: {
                            name: 'div',
                            class: 'container column',
                            id: 'activeActionStory',
                            block: {
                                name: 'div',
                                class: 'blocks',
                                id: 'blocks+Index',
                                li: {
                                    name: 'span',
                                    class: 'inlineContent',
                                    id: 'inlineContent',
                                    innerHTML: sampleIntroStory
                                }
                }

            }

        }
    },
    output: {
        name: 'div',
        class: 'container',
        id: 'output',
        textContent: 'output',   
        }
}

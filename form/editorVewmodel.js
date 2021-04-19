var richTextToolbar = {
    richTextToolbar: {
        textFormatting: {
            name: 'select',
            class: 'container',
            options: {
                name: 'span',
                class: 'text',
                textContent:'Text'
                
            }
        }
        
    }
}

var textFormatting = ['text', 'h1', 'h2', 'h3']
var textAlignment = [ 'left align','center align', 'right align', 'verticleLine', 'decrease indent',' increase indent']
var blockFormatting = ['bullet List', 'Numberd List', 'check list', 'collapsible list']
var blocks=['Quote Block', "Code Block"]
var editor = { richTextToolbar }
var menu= {
    "menus": [
        {
            "command": "formatblock",
            "header": "- formatting -",
            "values": {
                "h1": "Title 1 &lt;h1&gt;",
                "h2": "Title 2 &lt;h2&gt;",
                "h3": "Title 3 &lt;h3&gt;",
                "h4": "Title 4 &lt;h4&gt;",
                "h5": "Title 5 &lt;h5&gt;",
                "h6": "Title 6 &lt;h6&gt;",
                "p": "Paragraph &lt;p&gt;",
                "pre": "Preformatted &lt;pre&gt;"
            }
        }, {
            "command": "fontname",
            "header": "- font -",
            "values": [
                "Arial",
                "Arial Black",
                "Courier New",
                "Times New Roman"
            ]
        }, {
            "command": "fontsize",
            "header": "- size -",
            "values": {
                "1": "Very small",
                "2": "A bit small",
                "3": "Normal",
                "4": "Medium-large",
                "5": "Big",
                "6": "Very big",
                "7": "Maximum"
            }
        }, {
            "command": "forecolor",
            "header": "- color -",
            "values": {
                "red": "Red",
                "blue": "Blue",
                "green": "Green",
                "white": "White",
                "black": "Black"
            }
        }, {
            "command": "backcolor",
            "header": "- background -",
            "values": {
                "white": "White",
                "red": "Red",
                "green": "Green",
                "black": "Black"
            }
        }
    ],
        "buttons" : [
            {
                "text": "Clean",
                "command": "cleanDoc",
                "image": "icons\/clean.gif"
            }, {
                "text": "Print",
                "command": "printDoc",
                "image": "icons\/print.png"
            }, {
                "text": "Undo",
                "command": "undo",
                "image": "icons\/undo.gif"
            }, {
                "text": "Redo",
                "command": "redo",
                "image": "icons\/redo.gif"
            }, {
                "text": "Remove formatting",
                "command": "removeFormat",
                "image": "icons\/format.png"
            }, {
                "text": "Bold",
                "command": "bold",
                "image": "icons\/bold.gif"
            }, {
                "text": "Italic",
                "command": "italic",
                "image": "icons\/italic.gif"
            }, {
                "text": "Underline",
                "command": "underline",
                "image": "icons\/underline.gif"
            }, {
                "text": "Left align",
                "command": "justifyleft",
                "image": "icons\/justifyleft.gif"
            }, {
                "text": "Center align",
                "command": "justifycenter",
                "image": "icons\/justifycenter.gif"
            }, {
                "text": "Right align",
                "command": "justifyright",
                "image": "icons\/justifyright.gif"
            }, {
                "text": "Numbered list",
                "command": "insertorderedlist",
                "image": "icons\/numberedlist.gif"
            }, {
                "text": "Dotted list",
                "command": "insertunorderedlist",
                "image": "icons\/dottedlist.gif"
            }, {
                "text": "Quote",
                "command": "formatblock",
                "value": "blockquote",
                "image": "icons\/quote.gif"
            }, {
                "text": "Delete indentation",
                "command": "outdent",
                "image": "icons\/outdent.gif"
            }, {
                "text": "Add indentation",
                "command": "indent",
                "image": "icons\/indent.gif"
            }, {
                "text": "Hyperlink",
                "command": "createLink",
                "image": "icons\/hyperlink.gif"
            }, {
                "text": "Cut",
                "command": "cut",
                "image": "icons\/cut.gif"
            }, {
                "text": "Copy",
                "command": "copy",
                "image": "icons\/copy.gif"
            }, {
                "text": "Paste",
                "command": "paste",
                "image": "icons\/paste.gif"
            }
        ]
}

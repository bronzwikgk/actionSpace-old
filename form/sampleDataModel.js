var createElem = {
    objectModel: 'document',
    method: 'createElement',
    arguments: 'div',
    response: 'elem',
    callback: {
        objectModel: 'document.body',
        method: 'appendChild',
        arguments: '$l.elem',
        callback: {
            declare: {
                'elem.innerHTML': 'Helloworld'
            }
        }
    }
};

var extendCreateElem = {
    extends: 'createElem',
    callback: {
        callback: {
            declare: {
                'elem.innerHTML': 'HOLA! WORKS PROPERLY.'
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sample = {
    "id": "<uid>",
    "name": "tagName",
    "attributes": {
        "class": "classNames", //separated by space or comma
        "style": "CSSStyle", //in case we need inline style
        // any other attribute
    },
    "items": {
        "text": "any text",
        "html": "<p> any html <p>",
        "comment": "any comment",
        "element": {
            /* any element node with the same structure as above */
        }
    }
}
var sampleModel = {
    "id": "<uid>",
    "name": "div",
    "attributes": {
        "class": "anyclass", //separated by space or comma
        // any other attribute
    },
    "items": {
        "text": "any text",
        // "html" : "<p> any html <p>",
        // "comment" : "any comment",
        "element": {
            "id": "child",
            "name": "span",
            "attributes": {
                "class": "anyclass", //separated by space or comma
                // any other attribute
            },
            "items": {
                "text": "i'm child of div",
                "html": "<br>",
                "comment": "and also in testing stage"
            }
        }
    }
}



// ActionEngine.processRequest(extendCreateElem);
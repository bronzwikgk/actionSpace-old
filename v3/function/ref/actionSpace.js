chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "selectionMode") {
        selectionMode = !selectionMode
    }
    if (request.action === "editing") {
        editingMode = !editingMode
    }
});

var fontawesome=document.createElement('link');
fontawesome.href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
fontawesome.rel="stylesheet"
fontawesome.integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
fontawesome.crossOrigin="anonymous"

document.head.append(fontawesome)




var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
var CHECKED_CLASSNAME = "crx_mouse_checked";
var SELECTED_CHECKBOX = 'selector_checkbox';
var EDITING_MODE_ON = 'editing_on'
var prevEditor = null;
// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;
var selectionMode = false;
var prevDOMEditor = null;
var editingMode = false;

var checkBox = document.createElement('input');
checkBox.setAttribute("type", "checkbox");
checkBox.setAttribute('id', SELECTED_CHECKBOX);

var currentDom;
// Mouse listener for any move event on the current document.
document.addEventListener('mouseover', function (e) {
    if (selectionMode) {
        selection(e)
    } else if (editingMode) {
        editing(e)
    }


}, false);

var toolbar=document.createElement('div');
var toolbarContent=new Entity(toolbarJson,toolbar)
toolbarContent.entity.id="toolbar"



checkBox.addEventListener('click', () => {

    if (checkBox.checked) {

        // var json=processSchema.create(currentDom)
      //  console.log(currentDom)
        // html2Json(currentDom)
        // processTest(process.HTML2json(currentDom))
        // console.log(processRequest())


        try {

            // console.log(process.json2HTML(json))  //throwing error
        } catch (e) {
           // console.log(e)
        }
        currentDom.classList.add(CHECKED_CLASSNAME)
    }
})
var i=0,j=0;
const editing = (e) => {
    var currentElement = e.target;
    i++;
    currentElement.addEventListener('click', () => {
 j++;
        console.log(i+" -"+j)
        if (prevEditor != null) {
            prevEditor.classList.remove(EDITING_MODE_ON)
            document.getElementById('toolbar').remove()
        }

        currentElement.prepend(toolbarContent.entity)
        currentElement.classList.add(EDITING_MODE_ON);
        console.log(currentElement)


        prevEditor = currentElement
    })

    if (prevDOMEditor != null) {
        prevDOMEditor.classList.remove(MOUSE_VISITED_CLASSNAME);
    }


    currentElement.classList.add(MOUSE_VISITED_CLASSNAME)

    prevDOMEditor = currentElement
}


const selection = (e) => {
    var srcElement = e.target;

    if (srcElement.id !== "selector_checkbox" && srcElement.nodeName === "DIV") {

        //
        // srcElement.setAttribute("contenteditable", true);

        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

        }


        srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

        currentDom = srcElement

        if (srcElement.id !== "selector_checkbox") {
            srcElement.prepend(checkBox)
        }
        if (srcElement.classList.contains(CHECKED_CLASSNAME)) {
            document.getElementById('selector_checkbox').checked = true;
        }
        prevDOM = srcElement;
        // prevDOM.setAttribute("contenteditable", false);
        checkBox.checked = false

    }
}





const getCssStyle = (selectedDocument,
                     getCssOfChild = false,
                     CssChildLevel = 0 //How many levels of styles needed
) => {

    let styles = {}
    console.log(selectedDocument)
    try {
        let selectedDomId = selectedDocument.id || `selected_dom_level_${CssChildLevel}`
        selectedDocument.setAttribute('id', selectedDomId);
        const element = document.getElementById(selectedDomId),
            style = window.getComputedStyle(element)


        for (let i = 0; i < style.length; ++i) {
            styles[style[i]] = style.getPropertyValue(style[i]);
        }

    } catch (e) {
        console.warn(e)
    }
    if (getCssOfChild === false) {
        return styles;
    }

    console.log(selectedDocument)
    console.log(selectedDocument.childElementCount)
    console.log(selectedDocument.firstElementChild)
    for (let i = 0; i < selectedDocument.childElementCount; ++i) {


        if (selectedDocument.children[i].classList.contains(SELECTED_CHECKBOX)) {


            // selectedDocument.removeChild(selectedDocument.firstElementChild)
            continue;
        }
        let getChild = false;
        if (CssChildLevel > 0) {
            getChild = true
        }


        styles[i] = getCssStyle(selectedDocument.children[i], getChild, CssChildLevel - 1)


    }

    return styles;

}


const processRequest = () => {
    let stylesheet = document.styleSheets;
    var styles = {}
    for (let i = 0; i < stylesheet.length; ++i) {

        try {
            // console.log(stylesheet[i].cssRules)

            for (let j = 0; j < stylesheet[i].cssRules.length; ++j) {
                // console.log(stylesheet[i].cssRules[j])
                styles[stylesheet[i].cssRules[j].selectorText] = extractCss(stylesheet[i].cssRules[j].cssText)
            }


        } catch (e) {
            console.error(stylesheet[i])
            try {
                fetch(stylesheet[i].href)
                    .then(function (response) {
                        response.text().then(function (text) {
                            var t0 = performance.now()
                            var rawCss = processSchema.cssToJson(text);
                            console.log(rawCss)
                            var t1 = performance.now()
                            // processSchema.addStyleSheet(rawCss)

                            console.log("It Took " + (t1 - t0) + " milliseconds.")
                        });
                    });
            } catch (e1) {
                console.log(e1)
            }
        }
    }

    return styles;
}

const extractCss = (raw) => {
    var re = /{(.*?)}/;
    raw = raw.toString().split(re);

    return raw
}


class processSchema {

    static schema2(input, output, key, value) {
        if (!Object.keys(input).length) return;// if there's no keys, then the call returns undefined
        switch (input?.constructor) {
            case Object:
                processSchema.processObj(input, output, key, value);
            case Array:
                processSchema.processArr(input, output, key, value);
            case String:
            //processSchema.processString(input, output);
            default:
            // return
        }
        return output;
    }

    static create(input, output, key, value) {
        if (getEntityType(output).includes("HTML")) { //Only HTML creation
            //    console.log("got request for  from create", input, output, key, value)

            if (getEntityType(value) === 'Object') {//An object property generates a fieldset, i.e. a <fieldset> element.
                //   console.log("creating div object", key, value)
                var nwEle = document.createElement("div");
                nwEle.className = input;
                //  nwEle.className = "createdFromObject";
            } else if (getEntityType(value) === 'Array') {
                var nwEle = document.createElement(input);
                nwEle.className = "createdFromArrayProperty";

            } else if (getEntityType(value) === 'String' || getEntityType(value) === 'Boolean') {
                //     console.log("create Request property for ", input, output, key, value, formElements.indexOf(input))
                if (formElements.indexOf(input) < 0) { //check if the input is a formElement by crosschecking in the define array.
                    var nwEle = document.createElement("div");
                    nwEle.className = input;
                    // console.log("divElement", nwEle);
                } else {

                    //    console.log("create Request property for ", input, output, key, value, formElements.indexOf(input))
                    var nwEle = document.createElement(input);
                    nwEle.className = "createdFromStringProperty";
                    var content = document.createTextNode(value);
                    nwEle.appendChild(content);
                    //  nwEle.setAttribute("value", key);
                    //    console.log("formElement", nwEle);

                }
            } else {
                console.log("strays")
            }
            // console.log("new element from create",nwEle)
            return nwEle;
        }
    }

    static setAttributes(input, output, key) {

    }

    static appendChild(input, output, key, value) {

        if (getEntityType(output).includes("HTML")) {

            if (getEntityType(input).includes("HTML") && typeof value !== 'string') {
                output.appendChild(input);
            }
            if (getEntityType(input).includes("String") && typeof value !== 'string') {
                //   output.appendChild(currentNode);
            }
        }
    }

    static processObj(input, output, key, value) {

        for (var key in input) {
            if (getEntityType(input[key]) === 'Object') {

                // console.log("creating fieldSet object", key, input[key])

                var currentNode = processSchema.create(key, output, key, input[key]);
                //  console.log("recived from create",currentNode)
                processSchema.schema2(input[key], currentNode, key, input[key]);

                processSchema.appendChild(currentNode, output);

            } else if (getEntityType(input[key]) === 'Array') {

                var currentNode = processSchema.create(key, output, key, input[key]);
                //  console.log("recived from create", currentNode)

                processSchema.schema2(input[key], currentNode, key, input[key]);
                processSchema.appendChild(currentNode, output);


            } else if (getEntityType(input[key]) === 'String' || getEntityType(input[key]) === 'Function' || getEntityType(input[key]) === 'Boolean') {
                //   console.log("create req property object", key, input[key])
                var currentNode = processSchema.create(key, output, key, input[key]);

                if (processSchema.validate(input[key], supportedType, key, input[key], "isOneOf")) {
                    currentNode.setAttribute("type", input[key]);
                }
                processSchema.appendChild(currentNode, output);
            } else {
                console.log("strays", input, key, value)
            }

        }
        return output;
    }

    static processArr(input, output, key, value) {

        for (var i = 0; i < input.length; i++) {
            if (getEntityType(input[i]) === 'Object') {
                // console.log("found Object in array", input[i],output)

                var currentNode = processSchema.create(key, output, input[i], input[i]);
                //console.log("recived from create",currentNode)
                processSchema.schema2(input[i], currentNode, key, input[i]);

                processSchema.appendChild(currentNode, output);

            } else if (getEntityType(input[i]) === 'Array') {
                //  console.log("found Object in array", input[i])
            } else if (getEntityType(input[i]) === 'String' || getEntityType(input[i]) === 'Function' || getEntityType(input[i]) === 'Boolean') {
                var currentNode = processSchema.create(key, output, input[i], input[i]);
                processSchema.appendChild(currentNode, output);
            } else {
            }
            //            console.log(input[i], getEntityType(input[i]));
            //   processSchema.setAppendEntity(input[i], output, input[i]);


        }


        return output;


    }

    static validate(input, output, key, value, validation) {
        //  console.log("validating", input, output, validation)
        //this condition primarly check for the presence of a keys in any an array, if not present and options [ returns false and update and return position]

        if (validation === 'isOneOf') {
            if (output.indexOf(input) === -1 && typeof input !== null && typeof input !== undefined) {
                return false;
            } else {
                return true;
            }
        }
    }

    static cssToJson(cssRawText) {
        let cssJson = [];

        var cssArray = cssRawText.toString().split('}');

        cssArray.filter((elem) => {
            if (elem.length > 0) {
                return elem
            }
        })
        cssArray.forEach((elem) => {
            elem += "}"

            elem = extractCss(elem)
            for (let i = 0; i < elem[0].length; ++i) {
                // console.log(elem[0][i])
                if (elem[0][i] === ',') {
                    elem[2] = "comma"
                    break;
                }
                if (elem[0][i] === ' ') {
                    elem[2] = "space";
                    break;
                }
            }
            elem[0] = elem[0].split(/[ ,]+/);


            var singleRule = {
                selectors: elem[0],
                style: elem[1],
                separator: elem[2]
            }
            cssJson.push(singleRule)

        })

        return cssJson
    }

    static applyCss(cssJson) {


        cssJson.forEach((singleStyle) => {

            if (singleStyle.separator === "comma") {

                for (let i = 0; i < singleStyle.selectors.length; ++i) {
                    let selector = singleStyle.selectors[i];

                    if (selector[0] === '.') {
                        //class
                        let elements = document.getElementsByClassName(selector[i]);
                        for (let j = 0; j < elements.length; ++j) {
                            elements[j].setAttribute('style', singleStyle.style);
                        }
                    } else if (selector[0] === '#') {
                        //    Id
                        document.getElementById(selector).setAttribute('style', singleStyle.style);
                    } else {
                        //    tag
                        let elements = document.getElementsByTagName(selector);
                        for (let j = 0; j < elements.length; ++i) {
                            elements[j].setAttribute('style', singleStyle.style);
                        }
                    }
                }


            } else {
                let separator = ',';
                if (singleStyle.separator === "space") {
                    separator = ' ';
                }

                let selector = singleStyle.selectors.join(separator);
                if (singleStyle.selectors[0][0] === '.') {
                    //    class
                    let elements = document.getElementsByClassName(selector);
                    for (let i = 0; i < elements.length; ++i) {
                        try {
                            elements[i].setAttribute('style', singleStyle.style);
                        } catch (e) {
                            console.warn(e)
                        }
                    }
                } else {
                    console.warn("oops invalid css you got there")
                }

            }

        })


    }



    static applyCssOnElement = (domElement,
                                selector,
                                type, //class,id,tag
                                cssJson
    ) => {


        const classSelectors = domElement.classList;
        const id = domElement.id;


        let styleString = "";
        cssJson.forEach((singleStyle) => {
            if (classSelectors.some(elem => singleStyle.selectors.contains(elem)) || singleStyle.selectors.contains(id)) {
                styleString += singleStyle.style;
            }
        })
        //
        // if (type === "class") {
        //
        //     let elements = document.getElementsByClassName(selector)
        //     for (let i = 0; i < elements.length; ++i) {
        //         elements[i].setAttribute('style', styleString);
        //     }
        //
        // } else if (type === "id") {
        //     document.getElementById(selector).setAttribute('style', styleString);
        // } else { //tag
        //     let elements = document.getElementsByTagName(selector)
        //     for (let i = 0; i < elements.length; ++i) {
        //         elements[i].setAttribute('style', styleString);
        //     }
        // }

        domElement.setAttribute('style', styleString)

        return domElement;
    }

}

function getEntityType(entity) {
    //  console.log(entity, Object.getPrototypeOf(entity).constructor.name)
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}







function setTranslate(xPos, yPos, el) {
    console.log(el)
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

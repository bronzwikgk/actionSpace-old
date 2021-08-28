window.ShortcutKeyAction = class {
    constructor(__id, shortListIdf) {
        // Math.floor(Math.random * Math.pow(36, 10)).toString(36)
        this.__id = __id;
        this.shortListIdf = shortListIdf;
    }

    static modifiers = { // restrict setter
        "key": ["Control", "Shift", "Alt", "Meta"],
        "keyMap": {
            "ctrlKey": "ctrl",
            "shiftKey": "shift",
            "altKey": "alt",
            "metaKey": "meta" //Meta is Mac specific
        }
    };

    static specialKeyCodesMap = { // restrict setter

        "esc": "27",
        "tab": "9",
        "space": "32",
        "enter": "13",
        "backspace": "8",
        "delete": "46",

        "scroll_lock": "145",
        "caps_lock": "20",
        "num_lock": "144",
        "pause": "19",
        "insert": "45",
        "home": "36",
        "end": "35",
        "page_up": "33",
        "page_down": "34",

        "left": "37",
        "up": "38",
        "right": "39",
        "down": "40",

        "f1": "112",
        "f2": "113",
        "f3": "114",
        "f4": "115",
        "f5": "116",
        "f6": "117",
        "f7": "118",
        "f8": "119",
        "f9": "120",
        "f10": "121",
        "f11": "122",
        "f12": "123",

        // reverse map
        "8": "backspace",
        "9": "tab",
        "13": "enter",
        "19": "pause",
        "20": "caps_lock",
        "27": "esc",
        "32": "space",
        "33": "page_up",
        "34": "page_down",
        "35": "end",
        "36": "home",
        "37": "left",
        "38": "up",
        "39": "right",
        "40": "down",
        "45": "insert",
        "46": "delete",
        "112": "f1",
        "113": "f2",
        "114": "f3",
        "115": "f4",
        "116": "f5",
        "117": "f6",
        "118": "f7",
        "119": "f8",
        "120": "f9",
        "121": "f10",
        "122": "f11",
        "123": "f12",
        "144": "num_lock",
        "145": "scroll_lock"
    };

    registeredShortcuts = {}

    // get registeredShortcuts() {
    //     return list;
    // }

    // set registeredShortcuts(valObj){
    //     var list = "any"
    //     // console.error("can't perform this action");
    //     return list;
    // }

    // commandOnHold = {
    //     "isHolded": false, //boolean
    //     "name": "",
    //     "isCombinedWith": ""
    // };

    // get registerShortcut(){
    //     console.error("you can't view this function's defination");
    //     return undefined;
    // }

    // name = "", funcOrReqModel, description = ""

    registerShortcut(obj = {}) { // restrict getter
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                var value = obj[key];
                this.registeredShortcuts[key] = value;
            }
        }
        return this.registeredShortcuts;
    }

    getShortcut(name) {
        var result;
        if (!operate.isUseless(name) && operate.isString(name)) {
            result = this.registeredShortcuts[name];
        }

        if (!result) {
            console.log('no shortcut defined');
        } else if (operate.isUseless(name) || !operate.isObject(result)) {
            console.error('invalid shortcut value');
            delete this.registeredShortcuts[name];
        }

        return result;
    };

    processKeyEvent(e) {
        e.preventDefault();

        var commandKey = '',
            commandLevel = 0;

        if (!operate.isInsideArray(e['key'], ShortcutKeyAction.modifiers.key)) {
            for (const keyName in ShortcutKeyAction.modifiers.keyMap) {
                let keyStr = ShortcutKeyAction.modifiers.keyMap[keyName];
                // console.log(keyStr)
                if (e[keyName]) {
                    commandKey += keyStr + "+";
                }
            }
        }

        if (commandKey != "") {
            commandLevel = 2;
            if (commandKey == "shift+" && !ShortcutKeyAction.specialKeyCodesMap[e.keyCode]) commandLevel = 0;
        } else {
            commandLevel = 0;
            if (ShortcutKeyAction.specialKeyCodesMap[e.keyCode]) commandLevel = 1;
        }

        if (!operate.isInsideArray(e['key'], ShortcutKeyAction.modifiers.key)) commandKey += e["key"].toLowerCase();

        // if (commandLevel == 0) {
        //     e.defaultPrevented = false;
        // }
        console.log(commandKey, commandLevel);
        this.actionCommand(commandKey);
        // if (commandLevel === 2) {
        //     e.preventDefault();
        //     // console.log("cmd lvl 2 called");
        //     if (this.getShortcut(commandKey))(this.getShortcut(commandKey))();
        //     else console.log("No command defined");
        // } else if (commandLevel === 1) {
        //     console.log("cmd lvl 1 called");
        // } else if (commandLevel === 0) {
        //     console.log("cmd lvl 0 called");
        // } else {
        //     console.log("cmd lvl -1 called, Key:" + e.code)
        // }

    }

    actionCommand(command = "") {
        if(command == "") return;
        var shortcutVal = this.getShortcut(command),
            actionVal;
        if (shortcutVal) {
           actionVal = shortcutVal['action'];
           if(operate.isString(actionVal) || operate.isObject(actionVal)){
               ActionEngine.processRequest(actionVal);
           } else if(operate.isFunction(actionVal)){
               actionVal();
           } else{
               console.error('not a valid action type');
           }
        }
    }
};

(async function () {
    var response, initialShortcutsList = {},
        shortcutObj;
    var resp = await fetch('./form/flow-request-models/shortCutsList.json', {
        method: "GET",
        cache: 'no-cache',
    });
    response = await resp.json();
    response.forEach(obj => {
        shortcutObj = new ShortcutKeyAction(obj["__id"], obj["shortListIdf"]);
        console.log(shortcutObj.registerShortcut(obj["list"]));
        window.addEventListener('keydown', shortcutObj.processKeyEvent);
        // console.log(response, shortcutObj);
    });

})();

// vs code shortcuts
// (function () {
//     const sel = window.getSelection();
//     const range = document.createRange();
//     const textarea = document.querySelector("#textarea");

//     vscodeSort.addShortcut({
//         ctrl_KeyA: () => {

//             range.setStart(textarea.firstChild, 0);
//             range.setEnd(textarea.lastChild, textarea.lastChild.nodeValue.length);
//             sel.removeAllRanges();
//             sel.addRange(range);
//         },
//         ctrl_KeyC: () => {
//             navigator.clipboard.writeText(sel.getRangeAt(0).toString()).then(function () {
//                 // copy success code here
//             }, function (err) {
//                 // copy failed code here
//             });
//         }
//     })
// })();
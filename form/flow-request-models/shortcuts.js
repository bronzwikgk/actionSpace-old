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

    commandOnHold = {
        "isHolded": false, //boolean
        "name": "",
        // "isCombinedWith": ""
    };

    // get registerShortcut(){// restrict getter
    //     console.error("you can't view this function's defination");
    //     return undefined;
    // }

    registerShortcut(obj = {}) {
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
            console.log('no shortcut defined for', name);
        } else if (!operate.isObject(result)) {
            console.error('invalid shortcut value');
            delete this.registeredShortcuts[name];
        }

        return result;
    };

    processKeyEvent(e) {

        var commandKey = '',
            commandLevel = 0;

        if (!operate.isInsideArray(e['key'], ShortcutKeyAction.modifiers.key)) {
            for (const keyName in ShortcutKeyAction.modifiers.keyMap) {
                let keyStr = ShortcutKeyAction.modifiers.keyMap[keyName];

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


        if (commandLevel == 2 && !this.getShortcut(commandKey)) {
            if (this.commandOnHold.isHolded) {
                var cmd = `${commandKey} ${this.commandOnHold.name}`,
                    revcmd = `${this.commandOnHold.name} ${commandKey}`;

                this.commandOnHold.isHolded = false;
                this.commandOnHold.name = '';

                if (this.getShortcut(cmd)) {
                    commandKey = cmd;
                } else if (this.getShortcut(revcmd)) {
                    commandKey = revcmd;
                } else {
                    commandKey = '';
                }
            } else {
                this.commandOnHold.isHolded = true;
                this.commandOnHold.name = commandKey;
                commandKey = '';
            }
        }

        this.actionCommand(commandKey);

    }

    actionCommand(command = "") {
        // console.log(command);
        if (command == "") return;
        var shortcutVal = this.getShortcut(command),
            actionVal;
        if (shortcutVal) {
            actionVal = shortcutVal['action'];
            if (operate.isString(actionVal) || operate.isObject(actionVal)) {
                ActionEngine.processRequest(actionVal);
            } else if (operate.isFunction(actionVal)) {
                actionVal();
            } else {
                console.error('not a valid action type');
            }
        }
    }
};

(function () {

    fetch('./form/flow-request-models/shortCutsList.json', {
        method: "GET",
        cache: 'no-cache',
    }).then(resp => {

        return resp.json();

    }).then(resp => {

        var response,
            shortcutObj;

        [response] = resp;

        shortcutObj = new ShortcutKeyAction(response["__id"], response["shortListIdf"]);
        console.log(shortcutObj.registerShortcut(response["list"]));

        window.addEventListener('keydown', e => {
            e.preventDefault();
        });
        
        window.addEventListener('keyup', e => {
            e.preventDefault();
            shortcutObj.processKeyEvent(e);
        });
    });
    // console.log(response, shortcutObj);
})();
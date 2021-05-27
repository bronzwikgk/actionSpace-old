// KeyDown, KeyUp and KeyPress events
// If you want to respond to a key press then there are three events that you need to be aware of:

// KeyDown
// This event is triggered when a key is pressed.It is triggered for all keys, so it will be trigged when the user presses the shift key.
//     KeyUp
// This event is triggered when a key is depressed.
//     KeyPress
// This event is triggered when a key is sent to the browser.The shift, control and alt keys on their own do not generate a KeyPress event.
// Lets say that the user types a letter into a text box on a web page, then the order in which events are triggered would be: KeyDown, KeyPress, KeyUp.

class ActionEvent {
    constructor(activeListners,entity) {
        
        this._activeListners =[activeListners];
       // console.log(this._activeListners);
        this._elements;
        //  this.on('click', e => this.handleEvent(e));
        this.createListeners(activeListners);
       

    }

    createListeners(entity) {
        // console.log(entity)
        let events = operate.find(entity, 'event', 'keys')
        //  console.log(events)
        events.forEach((evt) => {
            //  console.log(evt.substring(2))
            this.on(evt.substring(2), e => this.handleEvent(e));
            //window[evt] = this.handleEvent
        })
        //  console.clear()
    }
    // kind of a subscriber
    addListener(eventName, fn) {
        this._events[eventName] = this._events[eventName] || [];
        this._events[eventName].push(fn);
        return this;
    }
    
    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }
    //kind of a publish
    emit(eventName, ...args) {
        let fns = this._events[eventName];
        //  console.log("Emitted",eventName)
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }

}

var engine;

window.onload= function () {
    engine = new ActionEngine();
}
window.onclick = async function (e) {
    let thiisCommand = e.target.getAttribute('data-command') || e.target.parentElement.getAttribute('data-command'),
        thiisClass = e.target.className || e.target.parentElement.className,
        action = e.target.getAttribute('data-action') || e.target.parentElement.getAttribute('data-action'),
        valueArg = e.target.getAttribute('data-value') || e.target.parentElement.getAttribute('data-value'),
        value = '';
        if (json_value[valueArg]) value = await json_value[valueArg];
        else value = valueArg;
        anyObj['dropbtn'](e);
        if (thiisCommand === "Format") {
            engine.action(new Format([action, false, value]),false);
        }
        if (thiisCommand == "newDoc") {
            console.log('say hi');
            anyObj['newDoc']();
        }
        if (thiisClass == "collectionLabel") anyObj['collectionLabel'](e)
}

//console.log("app", app)
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
console.log(chrome.history);
var actionEventInstance = new ActionEvent(activeListerners);

console.log("Hello from action Event",actionEventInstance)

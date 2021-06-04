class ActionEvent{
    constructor(){ this.listeners = {}; }
    addListener(domElement, events, func, ...args){
        console.log(this.listeners);
        var x = function(event, ...args){
            func(event, ...args);
        }
        events = events.split(" ");
        //iteration to be handled by the iterator method.
        for (var i = 0; i < events.length; i++) {
            if(events[i] != ''){
                if(!this.listeners[events[i]]){
                    document.addEventListener(events[i] , this.handleEvent.bind(null, this), false);
                }
                this.listeners[events[i]] = this.listeners[events[i]] || {} ;
                this.listeners[events[i]][domElement] = this.listeners[events[i]][domElement] || [] ;
                this.listeners[events[i]][domElement].push({func: x, args: [...args]});
            }
        }
    }
    addRequestListener(domElement, events, engine, req, args = {}){
        if(! operate.isObject(args)){
            console.error("args should be an object of arguments to the request. What's this?", args);
            return;
        }
        addListener(domElement, events, engine.processRequest, req, args);
    }
    handleEvent(obj, e){
        // console.log(e.target);
        if(! obj.listeners[e.type][e.target]) return;
        //iteratoration to be handled by the itertor method.
        for (var i = 0; i < obj.listeners[e.type][e.target].length; i++) {
            var f = obj.listeners[e.type][e.target][i];
            f.func(e, ...f.args);
        }
    }
    //Differance between two,
    removeListener(events){
        for (var i = 0; i < events.length; i++) {
            if(events[i] != ''){
                this.listeners[events[i]] = {} ;
            }
        }
    }
    removeListener(domElement, events){
        for (var i = 0; i < events.length; i++) {
            if(events[i] != ''){
                this.listeners[events[i]][domElement] = [] ;
            }
        }
    }
}

var eventManager = new ActionEvent();


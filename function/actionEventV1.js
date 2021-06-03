class actionEvent{
    constructor(){ this.listeners = {}; }
    addListener(domElement, events, func, ...args){
        console.log(this.listeners);
        var x = function(event, ...args){
            func(event, ...args);
        }
        events = events.split(" ");
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
        if(operate.isString(req)){
            req = window[req];
        }
        if(! operate.isObject(req)){
            console.error('Cannot find Request, ', req);
            return;
        }
        addListener(domElement, events, engine.processRequest, req, args);
    }
    handleEvent(obj, e){
        console.log(e.target);
        if(! obj.listeners[e.type][e.srcElement]) return;
        for (var i = 0; i < obj.listeners[e.type][e.srcElement].length; i++) {
            var f = obj.listeners[e.type][e.srcElement][i];
            f.func(e, ...f.args);
        }
    }
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
    addClassListener(event, selector, doit){
        addListener(document, event, function(e){
            if(e.srcElement.classList.contains(selector)) {
                doit(e);
            }
        });
    }
    addTagListener(event, selector, doit){
        addListener(document, event, function(e){
            // console.log(e.srcElement.tagName);
            if(e.srcElement.tagName.toLowerCase() == selector.toLowerCase()) {
                doit(e);
            }
        });
    };
}

var eventManager = new actionEvent();

eventManager.addListener(document.getElementById('password'), 'click', function(e, args){
    console.log('hello ' + args);
} , 'saras');
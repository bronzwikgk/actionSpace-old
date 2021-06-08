

class ActionEvent{
    constructor(){ this.listeners = {}; }
    addListener(domElement, events, func, ...args){

        events = events.split(" ");
        var obj = this;
        //iteration to be handled by the iterator method.
        Entity.walk(
            {rngstart:0, rngend:events.length}, 
            {
                value: {
                    func: function(i, obj, domElement,events, func, ...args){


                        if(events[i] != ''){
                            if(!obj.listeners[events[i]]){
                                document.addEventListener(events[i] , obj.handleEvent.bind(null, obj), false);
                            }
                            obj.listeners[events[i]] = obj.listeners[events[i]] || {} ;
                            var uid = Entity.uniqueId(domElement);
                            obj.listeners[events[i]][uid] = obj.listeners[events[i]][Entity.uid] || [] ;
                            obj.listeners[events[i]][uid].push({func: func, args: [...args]});
                        }
                    }, 
                    args: [obj, domElement,events, func, ...args]
                }
            }
        );
    }
    addRequestListener(domElement, events, req, args = {}){
        if(! operate.isObject(args)){
            console.error("args should be an object of arguments to the request. What's this?", args);
            return;
        }
        addListener(domElement, events, ActionEngine.processRequest, req, args);
    }
    handleEvent(obj, e){
        var uid = Entity.uniqueId(e.target);
        if(! obj.listeners[e.type][uid]) return;
        //iteratoration to be handled by the itertor method.
        Entity.walk(
            {rngstart:0, rngend:obj.listeners[e.type][uid].length}, 
            {
                value:{
                    func: function(i, obj, e){
                        var f = obj.listeners[e.type][uid][i];
                        f.func(e, ...f.args);
                    },
                    args: [obj, e]
                }
            }
        )
        ;
    }
    removeListener(events){
        events = events.split(" ");
        Entity.walk(
            {rngstart:0, rngend:events.length}, 
            {
                value: {
                    func: function(i, events){
                        if(events[i] != ''){
                            this.listeners[events[i]] = {} ;
                        }
                    },
                    args: [events]
                }
            }
        );
    }
    removeElemListener(domElement, events){
        events = events.split(" ");
        var obj = this;
        Entity.walk(
            {rngstart:0, rngend:events.length}, 
            {
                value: {
                    func:function(i, obj,  events){
                        if(events[i] != ''){
                            obj.listeners[events[i]][Entity.uniqueId(domElement)] = [] ;
                        }
                    },
                    args: [obj, events]
                }
            }
        );
    }
}

var eventManager = new ActionEvent();


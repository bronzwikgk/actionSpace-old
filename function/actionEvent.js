

class ActionEvent{
    constructor(){ this.listeners = {}; }
    addListener(domElement, events, func, ...args){
        console.log(this.listeners);

        events = events.split(" ");
        var obj = this;
        //iteration to be handled by the iterator method.
        Entity.walk(
            {rngstart:0, rngend:events.length}, 
            {
                value: {
                    func: function(i, obj, domElement,events, func, ...args){

                        console.log(func, args);

                        if(events[i] != ''){
                            console.log(domElement);
                            if(!obj.listeners[events[i]]){
                                console.log('binding', events[i]);
                                document.addEventListener(events[i] , obj.handleEvent.bind(null, obj), false);
                            }
                            obj.listeners[events[i]] = obj.listeners[events[i]] || {} ;
                            console.log(domElement);
                            var uid = Entity.uniqueId(domElement);
                            obj.listeners[events[i]][uid] = obj.listeners[events[i]][Entity.uid] || [] ;
                            obj.listeners[events[i]][uid].push({func: func, args: [...args]});
                            console.log(JSON.stringify(obj.listeners));
                            console.log(obj.listeners)
                        }
                    }, 
                    args: [obj, domElement,events, func, ...args]
                }
            }
        );
        // for (var i = 0; i < events.length; i++) {
        //     if(events[i] != ''){
        //         if(!this.listeners[events[i]]){
        //             document.addEventListener(events[i] , this.handleEvent.bind(null, this), false);
        //         }
        //         this.listeners[events[i]] = this.listeners[events[i]] || {} ;
        //         this.listeners[events[i]][domElement] = this.listeners[events[i]][domElement] || [] ;
        //         this.listeners[events[i]][domElement].push({func: x, args: [...args]});
        //     }
        // }
    }
    addRequestListener(domElement, events, engine, req, args = {}){
        if(! operate.isObject(args)){
            console.error("args should be an object of arguments to the request. What's this?", args);
            return;
        }
        addListener(domElement, events, engine.processRequest, req, args);
    }
    handleEvent(obj, e){
        console.log(obj);   
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
        // for (var i = 0; i < obj.listeners[e.type][e.target].length; i++) {
        //     var f = obj.listeners[e.type][e.target][i];
        //     f.func(e, ...f.args);
        // }
    }
    //Differance between two,
    //First one removes "events" listeners on all object
    //second one removes "events" listeners on specified object 
    removeListener(events){
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
        // for (var i = 0; i < events.length; i++) {
        //     if(events[i] != ''){
        //         this.listeners[events[i]] = {} ;
        //     }
        // }
    }
    removeElemListener(domElement, events){
        Entity.walk(
            {rngstart:0, rngend:events.length}, 
            {
                value: {
                    func:function(i, events){
                        if(events[i] != ''){
                            this.listeners[events[i]][domElement] = [] ;
                        }
                    },
                    args: [events]
                }
            }
        );
        // for (var i = 0; i < events.length; i++) {
        //     if(events[i] != ''){
        //         this.listeners[events[i]][domElement] = [] ;
        //     }
        // }
    }
}

var eventManager = new ActionEvent();

window.onload = function(){
    eventManager.addListener(document.getElementById('password'), 'click', function(e, name){
        console.log('hello', name);
    }, "saras");
}

class MultisetUtil{
   constructor(){
      this.pairset = new SortedSet({ allowSetValue:true, comparator : function(a, b){
         if(a.f == b.f) return a.s - b.s;
         return a.f - b.f;
      }});
   }
   insert(v){
      var it = this.pairset.findIterator({f: v, s: 0});
      //so left to v
      if(it.value() == null || it.value().f != v){
         //this elem is not present add it
         this.pairset.insert({f:v, s:1});
      } else {
         var x = it.value();
         x.s++;
         it.setValue(x);
      }
   }
   remove(v){
      var it = this.pairset.findIterator({f: v, s: 0});
      //so left to v
      if(it.value() == null || it.value().f != v){
         //this elem is not present add it
         //do nothing
      } else {
         var x = it.value();
         // this one is the fast one
         // console.log(x);
         if(x.s != 1){
            x.s--;
            it.setValue(x);
         } else {
            this.pairset.remove(x);
         }
      }
   }
   getNearest(v){ // left
      // console.log(v);
      var it = this.pairset.findIterator({f: v, s: 0});
      
      if(it.value() == null){
         if(it.hasPrevious()){
            return it.previous().value().f;
         } 
         else 
            return null; // this can't happen
      } else { // the next 
         // console.log(it.hasPrevious());
         if((it.hasPrevious()) && (v - it.previous().value().f) <= (it.value().f - v))
            return it.previous().value().f;
         else 
            return it.value().f;
      }
   }
   gimmeArray(){
      return this.pairset.map(function(x){ return x.f;});
   }
}

var Multiset = function () {return new MultisetUtil();}
var UtilGetStyle = { // (elem, value)
   objectModel:'$window',
   method:'getComputedStyle',
   arguments:['$l.elem', null],
   response:'pv',
   callback:{
      objectModel:'$l.pv',
      method:'getPropertyValue',
      arguments:'$l.value',
      response:'res'
   },
   return:'$l.res'
}
var CADGetId = [ // (obj, elem)
   {
      condition: '$!l.elem',
      // callback:{
      //    objectModel:'console',
      //    method:'log',
      //    arguments:['$l.obj.idCounter']
      // },
      return:'$ (++ l.obj.idCounter)'
   }, 
   {
      condition: '$l.elem',
      declare:{
         cadid: '$l.elem.id'
      },
      objectModel:'$l.elem.id',
      method:'substr',
      arguments:4,
      response:'cadid2',
      callback:{
         objectModel:'window',
         method:'parseInt',
         arguments:'$l.cadid2',
         response:'cadid2'
      },
      return:'$l.cadid2'
   },
   // {
   //    objectModel:'console',
   //    method:'log',
   //    arguments:['id of' , '$l.elem', '=', '$l.cadid2']
   // }
]
var CADNodeMakeChildOf = { //{obj:CADNode(this), parent:CADNode}
   objectModel: '$l.obj.parent.children',
   method:'indexOf',
   arguments: '$l.obj.id',
   response: 'childrenindex',
   callback:{
      objectModel: '$l.obj.parent.children',
      method: 'splice',
      arguments:['$l.childrenindex', 1],
      callback:{
         declare: {
            'obj.parent':'$l.parent'
         },
         callback:{
            objectModel:'$l.parent.children',
            method:'push',
            arguments:'$l.obj.id'
         }
      }
   }
};

var CADNode = { //(id:number, parent:CADNode)
   
   declare: {
      makeChildOf : 'CADNodeMakeChildOf',
      children:[]
   },
   callback:{
      condition: '$l.parent',
      objectModel:'$l.parent.children',
      method:'push',
      arguments:'$l.id',
      // callback:{
      //    objectModel:'console',
      //    method:'log',
      //    arguments:['Created node  with ', '$l']
      // }
   },
   return: '$l' 
}
var CADIhtml = `
         <select class = "cad-menu">
            <option value = "editable" selected>Draw Rectangle</option>
            <option value = "editable-curve">Draw Line/Curve</option>
            <option value = "editable-ellipse">Draw Ellipse</option>
            <option value = 'editable-freehand'>Draw Freehand</option>
            <option value = "draggable">Drag</option>
         </select>
      `;
var CADLIMIT  = 1e7;
var CAD = { // constructor(elem:HTMLObject, proximityQ:number)
   declare:{

      //properties

      root: '$l.elem',
      pq: '$l.proximityQ',
      snapMode:'elem-edges',
      CADAsNodes:[],
      idCounter:0,
      obj:'$l',
      keysDown:[],

      //functions

      mousedown:'CADMouseDown',
      keydown:'CADKeyDown',
      keyup:'CADKeyUp',
      create:'CADCreate',
      creating:'CADCreating',
      created:'CADCreated',
      drag:'CADDrag',
      dragging:'CADDragging',
      dragged:'CADDragged',
      snap:'CADSnap',
      snapToElemEdges:'CADSnapToElemEdges',
      snapToGridLines:'CADSnapToGridLines',
      getLines:'CADGetLines',
      addLines:'CADAddLines',
      removeLines:'CADRemoveLines',
      drawLines: 'CADDrawLines',           //baad mein
      elemsinTree:'CADElemsinTree',
      resetListeners:'CADResetListeners',

      dragPoint:'CADDragPoint',
      draggingPoint:'CADDraggingPoint',
      draggedPoint:'CADDraggedPoint',

      createCurve:'CADCreateCurve',
      creatingCurve:'CADCreatingCurve',
      createdCurve:'CADCreatedCurve',
      updateCurve:'CADUpdateCurve',

      getAncestorWhichContainsClass:'CADGetAncestorWhichContainsClass',


   },
   callback: [ //properties which require some function call
      {
         declare:{
            'root.id':'cad-0'
         },
         objectModel:'$l.obj.root.classList',
         method:'add',
         arguments:'cad'
      },
      {
         objectModel:'$l.obj.root.classList',
         method:'add',
         arguments:'cad-root'
      },
      {
         objectModel:'$l.obj.root.classList',
         method:'add',
         arguments:'unselectable'
      },
      {
         objectModel:'$l.obj.root',
         method:'setAttribute',
         arguments:['data-tag', 'editable']
      },
      {
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADNode', {id:0}],
         response:'nodething',
         callback:{
            objectModel:'$l.obj.CADAsNodes',
            method:'push',
            arguments: '$l.nodething'
         }
      },
      {
         objectModel:'window',
         method:'Multiset',
         response: 'linesX'
      },
      {
         objectModel:'window',
         method:'Multiset',
         response:'linesY'
      },
      {
         declare:{
            args4:{
               elem : '$l.obj.root',
               obj : '$l.obj'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.addLines', '$l.args4']
      },
      {
         declare:{
            args:{
               obj:'$l.obj'
            }
         },
         callback:[
            {
               objectModel:'eventManager',
               method:'addRequestListener',
               arguments:['$l.obj.root', 'mousedown', '$l.obj.mousedown', '$l.args']
            },
            {
               objectModel:'eventManager',
               method:'addRequestListener',
               arguments:['$window', 'keydown', '$l.obj.keydown', '$l.args']
            },
            {
               objectModel:'eventManager',
               method:'addRequestListener',
               arguments:['$window', 'keyup', '$l.obj.keyup', '$l.args']
            }
         ]
      }
   ],
   return:'$l'
};
var CADKeyDown = {
   objectModel:'$l.obj.keysDown',
   method:'includes',
   arguments:'$l.event.code',
   response:'incl',
   callback:{
      condition:'$! l.incl',
      objectModel:'$l.obj.keysDown',
      method:'push',
      arguments:'$l.event.code'
   }
};
var CADKeyUp = {
   objectModel:'$l.obj.keysDown',
   method:'indexOf',
   arguments:'$l.event.code',
   response:'ind',
   callback:{
      objectModel:'$l.obj.keysDown',
      method:'splice',
      arguments:['$l.ind',1]
   }
};
var CADGetAncestorWhichContainsClass = {
   callback:[//(elem, cl, obj)
      {
         declare:{
            args:{elem: '$l.elem', obj:'$l.obj'}
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADGetId','$l.args'],
         response:'ida',
         callback:{
            declare:{id:'$l.ida[1]'}
         }
      },
      {
         loop:2  ,
         condition:'$(l.elem && (!l.clres))',

         callback:[
            {
               objectModel:'$l.elem.classList',
               method:'contains',
               arguments:'$l.cl',
               response:'clres',
               callback:{
                  objectModel:'console',
                  method:'log',
                  arguments:['$l.elem', '$l.clres', '$l.id']
               }
            },
            {
               condition:'$l.clres',
               exit:true
            },
            {
               declare:{ 
                  id: '$l.obj.CADAsNodes[l.id].parent.id',

               },
               callback:{
                  objectModel:'document', 
                  method:'getElementById',
                  arguments:'$"cad-"+l.id',
                  response:'elem'
               }
            }
         ]
      },
   ],
   return:'$l.elem'
};
var CADMouseDown = { //(event:Event, obj:obj)
   declare :{
      'obj.start':{
         x: '$l.event.pageX',
         y: '$l.event.pageY',
         wpxo: '$window.pageXOffset',
         wpyo: '$window.pageYOffset'
   
      },
      start : '$l.obj.start'
   },
   callback: {
      objectModel:'document',
      method:'elementFromPoint',
      arguments:['$l.start.x - window.pageXOffset', '$l.start.y - window.pageYOffset'],
      response:'eb',
      callback:{
         declare:{
            'obj.elem':'$l.eb' //I WAS WORKING HERE
         },
         // objectModel:'console',
         // method:'log',
         // arguments:'$l.obj.elem',
         callback:{
            objectModel:'$l.obj.elem',
            method:'getBoundingClientRect',
            response:'rect',
            callback:{
               declare:{
                  'obj.rect':{
                     x : '$l.rect.left + window.pageXOffset', 
                     y : '$l.rect.top + window.pageYOffset', 
                     w : '$l.rect.width', 
                     h : '$l.rect.height'
                  }
               },
               objectModel:'$l.eb',
               method:'getAttribute',
               arguments:'data-tag',
               response:'ebga',
               callback:[
                  {
                     condition:'$(l.ebga == "editable")',
                     declare:{
                        args:{
                           obj: '$l.obj'
                        }
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments: ['$l.obj.create', '$l.args'],
                  },
                  {
                     condition:'$(l.ebga == "draggable")',
                     declare:{
                        args44:{
                           obj: '$l.obj'
                        }
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments: ['$l.obj.drag', '$l.args44'],
                  },
                  {
                     condition:'$(l.ebga == "editable-curve")',
                     declare:{
                        args44:{
                           obj: '$l.obj'
                        }
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments: ['$l.obj.createCurve', '$l.args44'],
                  },
                  {
                     condition:'$(l.ebga == "drag-curve-point")',
                     declare:{
                        args44:{
                           obj: '$l.obj'
                        }
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments: ['$l.obj.dragPoint', '$l.args44'],
                  },
                  {
                     condition:'$(l.ebga == "drag-curve")',
                     declare:{args:{elem:'$l.obj.elem', cl:'cad-curve', obj:'$l.obj'}},
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['$l.obj.getAncestorWhichContainsClass', '$l.args'],
                     response:'elem',
                     callback:{
                        declare:{
                           'obj.elem':'$l.elem',
                           args44:{
                              obj: '$l.obj'
                           }
                        },
                        objectModel:'engine',
                        method:'processRequest',
                        arguments: ['$l.obj.drag', '$l.args44'],
                     }
                  },
               ]
            }
         }
      }
   }
}
var CADCreate = [ //(obj)
   {
      declare:{args:{obj:'$l.obj'}}
   },
   {
      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mousemove', '$l.obj.creating', '$l.args']
   },
   {
      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mouseup', '$l.obj.created', '$l.args']
   }
];
var CADCreating = {//(event, obj)
   declare:{
      start:'$l.obj.start',
      end:{
         x:'$l.event.pageX',
         y:'$l.event.pageY',
         wpxo: '$window.pageXOffset',
         wpyo: '$window.pageYOffset'
      }
   },
   callback:[
      // {
      //    objectModel:'console', 
      //    method:'log',
      //    arguments:'$l'
      // },
      {
         condition: '$(!l.obj.telem)',
         objectModel:'document', 
         method:'createElement', 
         arguments:'div',
         response:'telem',
         callback:[
            {
               objectModel:'$l.obj.root',
               method:'appendChild',
               arguments:'$l.telem',   
               declare:{
                  'obj.telem':'$l.telem'
               },
               // callback:{
               //    objectModel:'console',
               //    method:'log',
               //    arguments:'L325 runs'
               // }
            },
            {
               objectModel:'$l.obj.telem.classList',
               method:'add',
               arguments:'cad'
            },
            {
               objectModel:'$l.obj.telem',
               method:'setAttribute',
               arguments:['data-tag', 'editable']
            }, 
            {
               objectModel:'window',
               method:'parseFloat',
               arguments :'$ l.obj.elem.style.zIndex',
               response:'oesz',
               declare:{
                  'obj.telem.style.zIndex': '$ (l.oesz || 0) + 1'
               },
               // callback:{
               //    objectModel:'console',
               //    method:'log',
               //    arguments:["Setting zIndex on ", '$l.obj.telem', " to ", "$ (l.obj.elem.style.zIndex || 0) + 1"]
               // }
            },
            {
               declare:{
                  args:{
                     obj:'$l.obj'
                  }
               },
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'cadid',
               callback:{
                  objectModel:'engine',
                  method:'processRequest',
                  declare:{
                     args1:{
                        elem:'$l.obj.elem',
                        obj:'$l.obj'
                     }
                  },
                  arguments:['CADGetId', '$l.args1'],
                  response:'pcadid',
                  callback:{
                     declare:{
                        args2:{
                           id:'$l.cadid[0]',
                           parent:'$l.obj.CADAsNodes[l.pcadid[1]]'
                        },
                        'obj.telem.id':'$"cad-" + l.cadid[0]'
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['CADNode', '$l.args2'],
                     response:'nodething',
                     callback:{
                        objectModel:'$l.obj.CADAsNodes',
                        method:'push',
                        arguments: '$l.nodething',
                        // callback:{
                        //    objectModel:'console',
                        //    method:'log',
                        //    arguments:["Pushed to cadas nodes" ,'$l.obj.CADAsNodes', "with", "$l.nodething"]
                        // },
                        passStates:false
                     },
                     passStates:false
                  }
               }
            }
         ],
         passStates:false
      },
      {
         callback:[
            {
               objectModel:'Math',
               method:'min',
               arguments:['$l.start.x', '$l.end.x'],
               response:'x'
            },
            {
               objectModel:'Math',
               method:'min',
               arguments:['$l.start.y', '$l.end.y'],
               response:'y'
            },
            {
               objectModel:'Math',
               method:'abs',
               arguments:['$l.start.x-l.end.x'],
               response:'w'
            },
            {
               objectModel:'Math',
               method:'abs',
               arguments:['$l.start.y-l.end.y'],
               response:'h'
            },
         ]
      },
      {
         objectModel:'$l.obj.root',
         method:'getBoundingClientRect',
         response:'rect6',
         callback:{
            declare:{
               'obj.telem.style.top': '$(l.y - l.rect6.top - window.pageYOffset) + "px"',
               'obj.telem.style.left': '$(l.x - l.rect6.left - window.pageXOffset) + "px"',
               'obj.telem.style.width': '$l.w + "px"',
               'obj.telem.style.height': '$l.h + "px"'
            }
         }
      }
   ]
};
var CADCreated = [ //(event, obj)
   {
      condition:'$l.obj.telem',
      declare:{
         'obj.telem.innerHTML':'$CADIhtml',
         args4:{
            elem : '$l.obj.root',
            obj : '$l.obj'
         }
      },
      objectModel:'engine',
      method:'processRequest',
      arguments:['$l.obj.addLines', '$l.args4']
   },
   {
      declare:{
         args1:{
            event:'$l.event', 
            obj: '$l.obj'
         }
      },
      // callback:{
         // objectModel:'console',
         // method:'log',
         // arguments:'$l.args1',
      // }
      callback:{
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.resetListeners', '$l.args1'],
         callback:{
            declare:{
               'obj.telem':null,
               'obj.elem':null
            }
         }
      }
   }
];
var CADCreateCurve = [ //obj
   {
      declare:{args:{obj:'$l.obj'}}
   },
   {

      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mousemove', '$l.obj.creatingCurve', '$l.args'],
   },
   {
      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mouseup', '$l.obj.createdCurve', '$l.args'],
   }
];
var CADCreatingCurve = {//(event, obj)
   declare:{
      start:'$l.obj.start',
      end:{
         x:'$l.event.pageX',
         y:'$l.event.pageY',
         wpxo: '$window.pageXOffset',
         wpyo: '$window.pageYOffset'
      },
   },

   callback:[
      // {
      //    objectModel:'console', 
      //    method:'log',
      //    arguments:'$l.obj.telem'
      // },
      {
         condition: '$(!l.obj.telem)',
         objectModel:'document',
         method:'createElement',
         arguments:'div',
         response:'telem',
         callback:[
            {
               objectModel:'$l.obj.root',
               method:'appendChild',
               arguments:'$l.telem',   
               callback:{
                  declare:{
                     'obj.telem':'$l.telem'
                  }
               }
            }, 
            {
               objectModel:'$l.obj.telem.classList',
               method:'add',
               arguments:'cad'
            }, 
            {
               objectModel:'$l.obj.telem.classList',
               method:'add',
               arguments:'cad-curve'
            },
            {
               objectModel:'$l.obj.telem',
               method:'setAttribute',
               arguments:['data-tag', 'draggable']
            }, 
            {
               objectModel:'window',
               method:'parseFloat',
               arguments :'$ l.obj.elem.style.zIndex',
               response:'oesz',
               declare:{
                  'obj.telem.style.zIndex': '$ (l.oesz || 0) + 1'
               },
               // callback:{
               //    objectModel:'console',
               //    method:'log',
               //    arguments:["Setting zIndex on ", '$l.obj.telem', " to ", "$ (l.obj.elem.style.zIndex || 0) + 1"]
               // }
            },
            {
               declare:{
                  args:{
                     obj:'$l.obj'
                  }
               },
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'cadid',
               callback:{
                  objectModel:'engine',
                  method:'processRequest',
                  declare:{
                     args1:{
                        elem:'$l.obj.elem',
                        obj:'$l.obj'
                     }
                  },
                  arguments:['CADGetId', '$l.args1'],
                  response:'pcadid',
                  callback:{
                     declare:{
                        args2:{
                           id:'$l.cadid[0]',
                           parent:'$l.obj.CADAsNodes[l.pcadid[1]]'
                        },
                        'obj.telem.id':'$"cad-" + l.cadid[0]',
                        curveId:'$l.cadid[0]',
                        'obj.curveId':'$l.curveId',   
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['CADNode', '$l.args2'],
                     response:'nodething',
                     callback:{
                        objectModel:'$l.obj.CADAsNodes',
                        method:'push',
                        arguments: '$l.nodething',
                        callback:{
                           objectModel:'console',
                           method:'log',
                           arguments:["Pushed to cadas nodes" ,'$l.obj.CADAsNodes', "with", "$l.nodething"]
                        },
                     },
                  }
               }
            },
            {
               callback:[
                  {
                     objectModel:'document', 
                     method:'createElement', 
                     //method call
                     arguments:'canvas',
                     response:'can',
                     callback:[
                        {
                           method:'appendChild',
                           objectModel:'$l.obj.root',
                           arguments:'$l.can'
                        }
                     ]
                  },
                  {
                     objectModel:'document', 
                     method:'createElement', 
                     arguments:'div',
                     //method call
                     response:'p1',
                     callback:[
                        {
                           method:'appendChild',
                           objectModel:'$l.obj.root',
                           arguments:'$l.p1'
                        }
                     ]
                  },
                  {
                     objectModel:'document', 
                     method:'createElement', 
                     arguments:'div',
                     //method call
                     response:'p2',
                     callback:[
                        {
                           method:'appendChild',
                           objectModel:'$l.obj.root',
                           arguments:'$l.p2'
                        }
                     ]
                  },
                  {
                     objectModel:'document', 
                     method:'createElement',
                     arguments:'div', 
                     //method call
                     response:'cp1',
                     callback:[
                        {
                           method:'appendChild',
                           objectModel:'$l.obj.root',
                           arguments:'$l.cp1'
                        }
                     ]
                  },
                  {
                     objectModel:'document', 
                     method:'createElement', 
                     arguments:'div',
                     //method call
                     response:'cp2',
                     callback:[
                        {
                           objectModel:'$l.obj.root',
                           method:'appendChild',
                           arguments:'$l.cp2'
                        }
                     ]
                  }
               ]
            },
            {
               callback:[
                  {
                     objectModel:'$l.p1.classList',
                     method:'add',
                     arguments:'cad-point'
                  },
                  {
                     objectModel:'$l.p2.classList',
                     method:'add',
                     arguments:'cad-point'
                  },
                  {
                     objectModel:'$l.cp1.classList',
                     method:'add',
                     arguments:'cad-point'
                  },
                  {
                     objectModel:'$l.cp2.classList',
                     method:'add',
                     arguments:'cad-point'
                  },
                  {
                     objectModel:'$l.can.classList',
                     method:'add',
                     arguments:'cad-canvas'
                  },

               ]
            },
            {
               callback:[
                  {
                     objectModel:'$l.p1.classList',
                     method:'add',
                     arguments:'cad-element'
                  },
                  {
                     objectModel:'$l.p2.classList',
                     method:'add',
                     arguments:'cad-element'
                  },
                  {
                     objectModel:'$l.cp1.classList',
                     method:'add',
                     arguments:'cad-element'
                  },
                  {
                     objectModel:'$l.cp2.classList',
                     method:'add',
                     arguments:'cad-element'
                  },
                  {
                     objectModel:'$l.can.classList',
                     method:'add',
                     arguments:'cad-element'
                  },
               ]
            },
            {
               callback:[
                  {
                     objectModel:'$l.p1',
                     method:'setAttribute',
                     arguments:['data-tag', 'drag-curve-point']
                  },
                  {
                     objectModel:'$l.p2',
                     method:'setAttribute',
                     arguments:['data-tag', 'drag-curve-point']
                  },
                  {
                     objectModel:'$l.cp1',
                     method:'setAttribute',
                     arguments:['data-tag', 'drag-curve-point']
                  },
                  {
                     objectModel:'$l.cp2',
                     method:'setAttribute',
                     arguments:['data-tag', 'drag-curve-point']
                  },
                  {
                     objectModel:'$l.can',
                     method:'setAttribute',
                     arguments:['data-tag', 'drag-curve']
                  },
               ]
            },
            {
               objectModel:'window',
               method:'parseFloat',
               arguments:'$l.obj.telem.style.zIndex',
               response:'otsz',
               callback:{
                  declare:{
                     'obj.p1' : '$l.p1',
                     'obj.p2' : '$l.p2',
                     'obj.cp1' : '$l.cp1',
                     'obj.cp2' : '$l.cp2',
                     'obj.can' : '$l.can',
                     'p1.style.zIndex':'$l.otsz+2',
                     'p2.style.zIndex':'$l.otsz+2',
                     'cp1.style.zIndex':'$l.otsz+2',
                     'cp2.style.zIndex':'$l.otsz+2',
                     'can.style.zIndex':'$l.otsz+1',
                  }
               }
            },
            {
               declare:{
                  curveId:'$l.obj.curveId'
               }
            },
            {
               declare:{args:{obj:'$l.obj'}},
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'tid',
               callback:{
                  declare:{
                     'p1.id':'$"cad-"+l.tid[0]',
                     args:{
                        id:'$l.tid[0]',
                        parent:'$l.obj.CADAsNodes[l.curveId]'
                     }
                  },

                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['CADNode', '$l.args'],
                  response:'xp1'
               }
            },
            {
               declare:{args:{obj:'$l.obj'}},
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'tid',
               callback:{
                  declare:{
                     'p2.id':'$"cad-"+l.tid[0]',
                     args:{
                        id:'$l.tid[0]',
                        parent:'$l.obj.CADAsNodes[l.curveId]'
                     }
                  },

                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['CADNode', '$l.args'],
                  response:'xp2'
               }
            },
            {
               declare:{args:{obj:'$l.obj'}},
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'tid',
               callback:{
                  declare:{
                     'cp1.id':'$"cad-"+l.tid[0]',
                     args:{
                        id:'$l.tid[0]',
                        parent:'$l.obj.CADAsNodes[l.curveId]'
                     }
                  },

                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['CADNode', '$l.args'],
                  response:'xcp1'
               }
            },
            {
               declare:{args:{obj:'$l.obj'}},
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'tid',
               callback:{
                  declare:{
                     'cp2.id':'$"cad-"+l.tid[0]',
                     args:{
                        id:'$l.tid[0]',
                        parent:'$l.obj.CADAsNodes[l.curveId]'
                     }
                  },

                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['CADNode', '$l.args'],
                  response:'xcp2'
               }
            },
            {
               declare:{args:{obj:'$l.obj'}},
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args'],
               response:'tid',
               callback:{
                  declare:{
                     'can.id':'$"cad-"+l.tid[0]',
                     args:{
                        id:'$l.tid[0]',
                        parent:'$l.obj.CADAsNodes[l.curveId]'
                     }
                  },

                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['CADNode', '$l.args'],
                  response:'xcan'
               }
            },
            {
               callback:[
                  {
                     objectModel:'$l.obj.CADAsNodes',
                     method:'push',
                     arguments:'$l.xcan'
                  },
                  {
                     objectModel:'$l.obj.CADAsNodes',
                     method:'push',
                     arguments:'$l.xp1'
                  },
                  {
                     objectModel:'$l.obj.CADAsNodes',
                     method:'push',
                     arguments:'$l.xp2'
                  },
                  {
                     objectModel:'$l.obj.CADAsNodes',
                     method:'push',
                     arguments:'$l.xcp1'
                  },
                  {
                     objectModel:'$l.obj.CADAsNodes',
                     method:'push',
                     arguments:'$l.xcp2'
                  }
               ]
            }
         ],
      },
      {
         declare:{
            p1: '$l.obj.p1',
            p2: '$l.obj.p2',
            cp1: '$l.obj.cp1',
            cp2: '$l.obj.cp2',
            can: '$l.obj.can',
            x: '$Math.min(l.start.x, l.end.x)',
            y: '$Math.min(l.start.y, l.end.y)',
            w: '$Math.abs(l.start.x - l.end.x)',
            h: '$Math.abs(l.start.y - l.end.y)',
            
         },
      },
      {
         objectModel:'$l.obj.root',
         method:'getBoundingClientRect',
         response:'roct',
         callback:{
            declare:{
               'obj.telem.style.top': '$(l.y - l.roct.top - window.pageYOffset) + "px"',
               'obj.telem.style.left': '$(l.x - l.roct.left - window.pageXOffset) + "px"',
               'obj.telem.style.width': '$l.w + "px"',
               'obj.telem.style.height': '$l.h + "px"'
            }
         }
      },
      {
         objectModel:'$l.obj.telem',
         method:'getBoundingClientRect',
         response:'rect',
         callback:[
            {
               declare:{
                  'p1.style.top': '$(l.rect.top - l.roct.top + 10) + "px"',
                  'p1.style.left': '$(l.rect.left - l.roct.left + 10) + "px"',
                  'p2.style.top': '$(l.rect.top - l.roct.top + l.rect.height - 10) + "px"',
                  'p2.style.left': '$(l.rect.left - l.roct.left + l.rect.width - 10) + "px"',
                  'cp1.style.top': '$(l.rect.top - l.roct.top + l.rect.height/2) + "px"',
                  'cp1.style.left': '$(l.rect.left - l.roct.left + 10) + "px"',
                  'cp2.style.top': '$(l.rect.top - l.roct.top + l.rect.height/2) + "px"',
                  'cp2.style.left': '$(l.rect.left - l.roct.left + l.rect.width - 10) + "px"',
               }
            }
         ]
      },
      {
         declare:{args:{curveId:'$l.obj.curveId', obj:'$l.obj'}},
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.updateCurve', '$l.args']
      }
   ]
};
var CADCreatedCurve = [//event,obj
   {
      declare:{args:{elem:'$l.obj.elem', obj:'$l.obj'}},
      objectModel:'engine',
      method:'processRequest',
      arguments:['$l.obj.addLines', '$l.args']
   },
   {
      declare:{args:{event:'$l.obj.event', obj:'$l.obj'}},
      objectModel:'engine',
      method:'processRequest',
      arguments:['$l.obj.resetListeners', '$l.args']
   },
   {
      declare:{'obj.telem':null}
   }
];
var CADUpdateCurve = [ //(curveId, obj, updateType)
   {
      declare:{
         a:[]
      }
   },
   {
      callback:[
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$"cad-"+l.curveId',
            response:'c'
         },
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$("cad-"+(l.curveId+1))',
            response:'p1'
         },
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$"cad-"+(l.curveId+2)',
            response:'p2'
         },
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$"cad-"+(l.curveId+3)',
            response:'cp1'
         },
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$"cad-"+(l.curveId+4)',
            response:'cp2'
         },
         {
            objectModel:'document', 
            method:'getElementById',
            arguments:'$"cad-"+(l.curveId+5)',
            response:'can'
         }
      ]
   },
   {
      objectModel:'$l.c',
      method:'getBoundingClientRect',
      response:'rect',
   },
   {
      objectModel:'$l.obj.root',
      method:'getBoundingClientRect',
      response:'roct'
   },
   {
      callback:[
         {
            declare:{args:{str:'$l.p1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px1'
         },
         {
            declare:{args:{str:'$l.p2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px2'
         },
         {
            declare:{args:{str:'$l.cp1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px3'
         },
         {
            declare:{args:{str:'$l.cp2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px4'
         },
         {
            objectModel:'Math',
            method:'min',
            arguments:['$l.px1', '$l.px2', '$l.px3', '$l.px4'],
            response:'xmin'
         }
      ]
   },
   {
      callback:[
         {
            declare:{args:{str:'$l.p1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px1'
         },
         {
            declare:{args:{str:'$l.p2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px2'
         },
         {
            declare:{args:{str:'$l.cp1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px3'
         },
         {
            declare:{args:{str:'$l.cp2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'px4'
         },
         {
            objectModel:'Math',
            method:'max',
            arguments:['$l.px1', '$l.px2', '$l.px3', '$l.px4'],
            response:'xmax'
         }
      ]
   },
   {
      callback:[
         {
            declare:{args:{str:'$l.p1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py1'
         },
         {
            declare:{args:{str:'$l.p2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py2'
         },
         {
            declare:{args:{str:'$l.cp1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py3'
         },
         {
            declare:{args:{str:'$l.cp2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py4'
         },
         {
            objectModel:'Math',
            method:'min',
            arguments:['$l.py1', '$l.py2', '$l.py3', '$l.py4'],
            response:'ymin'
         }
      ]
   },
   {
      callback:[
         {
            declare:{args:{str:'$l.p1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py1'
         },
         {
            declare:{args:{str:'$l.p2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py2'
         },
         {
            declare:{args:{str:'$l.cp1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py3'
         },
         {
            declare:{args:{str:'$l.cp2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'py4'
         },
         {
            objectModel:'Math',
            method:'max',
            arguments:['$l.py1', '$l.py2', '$l.py3', '$l.py4'],
            response:'ymax'
         }
      ]
   },
   {
      declare:{
         xmax:'$l.xmax + 10',
         ymax:'$l.ymax + 10',
         xmin:'$l.xmin - 10',
         ymin:'$l.ymin - 10',
         w:'$l.xmax - l.xmin',
         h:'$l.ymax - l.ymin',
         'c.style.width':'$l.w + "px"',
         'c.style.height':'$l.h + "px"',
         'c.style.top':'$l.ymin + "px"',
         'c.style.left':'$l.xmin + "px"',
         'can.width':'$l.w',
         'can.height':'$l.h',
         'can.style.top':'$l.ymin + "px"',
         'can.style.left':'$l.xmin + "px"'
      }
   },
   {
      objectModel:'$l.can',
      method:'getContext',
      arguments:'2d',
      response:'ctx'
   },
   {
      declare:{
         'ctx.fillStyle':'transparent'
      }
   },
   {
      objectModel:'$l.ctx',
      method:'fillRect',
      arguments:[0,0,'$l.w', '$l.h']
   },
   {
      callback:[
         {
            declare:{
               'obj.root.style.overflow':'auto'
            }
         },
         {
            declare:{args:{p:'$l.p1', rect:'$l.rect', roct:'$l.roct'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilComputeCoordinates', '$l.args'],
            response:'p1c',
            callback:{
               declare:{
                  'p1c[0]':'$l.p1c[0] + 5',
                  'p1c[1]':'$l.p1c[1] + 5'
               }
            }
         },
         {
            declare:{args:{p:'$l.p2', rect:'$l.rect', roct:'$l.roct'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilComputeCoordinates', '$l.args'],
            response:'p2c',
            callback:{
               declare:{
                  'p2c[0]':'$l.p2c[0] + 5',
                  'p2c[1]':'$l.p2c[1] + 5'
               }
            }
         },
         {
            declare:{args:{p:'$l.cp1', rect:'$l.rect', roct:'$l.roct'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilComputeCoordinates', '$l.args'],
            response:'cp1c',
            callback:{
               declare:{
                  'cp1c[0]':'$l.cp1c[0] + 5',
                  'cp1c[1]':'$l.cp1c[1] + 5'
               }
            }
         },
         {
            declare:{args:{p:'$l.cp2', rect:'$l.rect', roct:'$l.roct'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilComputeCoordinates', '$l.args'],
            response:'cp2c',
            callback:{
               declare:{
                  'cp2c[0]':'$l.cp2c[0] + 5',
                  'cp2c[1]':'$l.cp2c[1] + 5'
               }
            }
         },
      ]
   },
   {
      condition:'$l.updateType === "whole-root"',
      callback:[
         {
            declare:{
               'obj.root.style.overflow':'hidden',
            }
         },
         {
            callback:[
               {
                  declare:{
                     args:{elem:'$l.obj.root', value:"width"}
                  },
                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['UtilGetStyle', '$l.args'],
                  response:'tmp',
                  callback:{
                     declare:{args:{str:'$l.tmp'}},
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['UtilGetPx', '$l.args'],
                     response:'tmpw'
                  }
               },
               {
                  declare:{
                     args:{elem:'$l.obj.root', value:"height"}
                  },
                  objectModel:'engine',
                  method:'processRequest',
                  arguments:['UtilGetStyle', '$l.args'],
                  response:'tmp',
                  callback:{
                     declare:{args:{str:'$l.tmp'}},
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['UtilGetPx', '$l.args'],
                     response:'tmph'
                  }
               }
            ]
         },
         {
            declare:{
               w:'$l.tmpw',
               h:'$l.tmph',
               'can.width':'$l.w',
               'can.height':'$l.h',
               'can.style.top':'0px',
               'can.style.left':'0px'
            }
         },
         {
            declare:{args:{str:'$l.p1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'p1c[0]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.p1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'p1c[1]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.p2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'p2c[0]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.p2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'p2c[1]':'$l.tmp + 3'
               }
            }
         },{
            declare:{args:{str:'$l.cp1.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'cp1c[0]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.cp1.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'cp1c[1]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.cp2.style.left'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'cp2c[0]':'$l.tmp + 3'
               }
            }
         },
         {
            declare:{args:{str:'$l.cp2.style.top'}},
            objectModel:'engine',
            method:'processRequest',
            arguments:['UtilGetPx', '$l.args'],
            response:'tmp',
            callback:{
               declare:{
                  'cp2c[1]':'$l.tmp + 3'
               }
            }
         },
      ]
   },
   {
      objectModel:'$l.ctx',
      method:'beginPath'
   },
   {
      declare:{'ctx.strokeStyle':'#000'}
   },
   {
      objectModel:'$l.ctx',
      method:'moveTo',
      arguments:['$l.p1c[0]', '$l.p1c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'bezierCurveTo',
      arguments:['$l.cp1c[0]', '$l.cp1c[1]', '$l.cp2c[0]', '$l.cp2c[1]', '$l.p2c[0]', '$l.p2c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'stroke'
   },
   {
      objectModel:'$l.ctx',
      method:'beginPath'
   },
   {
      declare:{'ctx.strokeStyle':'#aaa'}
   },
   {
      objectModel:'$l.ctx',
      method:'moveTo',
      arguments:['$l.p1c[0]', '$l.p1c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'lineTo',
      arguments:['$l.cp1c[0]', '$l.cp1c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'moveTo',
      arguments:['$l.cp2c[0]', '$l.cp2c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'lineTo',
      arguments:['$l.p2c[0]', '$l.p2c[1]']
   },
   {
      objectModel:'$l.ctx',
      method:'stroke'
   },

];
var CADDragPoint = {
   callback:[ //obj
      {
         declare:{
            'obj.subtreeElems':[],
            'obj.subtreeRects':[]
         },
         
      },
      {
         declare:{
            args:{elem:'$l.obj.elem', cl:'cad-curve', obj:'$l.obj'}
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.getAncestorWhichContainsClass', '$l.args'],
         response:'curve'
      },
      {
         declare:{
            args:{elem:'$l.curve', obj:'$l.obj'}
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.removeLines', '$l.args']
      },
      {
         declare:{
            args7:{
               obj:'$l.obj',
               elem:'$l.obj.elem'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADGetId','$l.args7'],
         response:'cadidp',
         callback:{
            declare:{
               args8:{
                  nodeId: '$l.cadidp[1]',
                  response: '$l.obj.subtreeElems',
                  rect: '$l.obj.subtreeRects',
                  ref: '$l.curve',
                  obj:'$l.obj'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.elemsinTree', '$l.args8'],
            // callback:{
            //    objectModel:'console',
            //    method:'log',
            //    arguments:['$l.obj.subtreeElems']
            // }
         }
      },
      {
         declare:{
            i:-1
         },
         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
               'melem.style.zIndex':'$CADLIMIT + l.obj.subtreeRects[l.i].d'
            }
         }
      },
      {
         declare:{
            args:{
               elem:'$l.curve',
               obj:'$l.obj'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADGetId', '$l.args'],
         response:'curveiid',
         callback:{
            declare:{'obj.curveId':'$l.curveiid[1]'}
         }
      },
      {
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments:['$l.obj.root', 'mousemove', '$l.obj.draggingPoint', '$l.obj']
      },
      {
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments:['$l.obj.root', 'mouseup', '$l.obj.draggedPoint', '$l.obj']
      }
   ]
};
var CADDraggingPoint = { //(event, obj)

   declare:{
      start:'$l.obj.start',
      end:{
         x:'$l.event.pageX',
         y:'$l.event.pageY',
         wpxo: '$window.pageXOffset',
         wpyo: '$window.pageYOffset'
      },
      delta:{
         x:'$l.end.x - l.start.x',
         y:'$l.end.y - l.start.y',
         wpxo: '$l.end.wpxo - l.start.wpxo',
         wpyo: '$l.end.wpyo - l.start.wpyo'
      },
      i : -1
   },
   // objectModel:'console',
   // method:'log',
   // arguments:'we are here!',  
   callback:[
      {
         objectModel:'$l.obj.root',
         method:'getBoundingClientRect',
         response:'recta'
      },
      // {
      //    objectModel:'console',
      //    method:'log',
      //    arguments:['$l.recta']
      // },
      {
         loop:'$l.obj.subtreeElems.length',
         declare:{
            i : '$l.i + 1',
            melem:'$l.obj.subtreeElems[l.i]',
            'melem.style.top' : '$(l.obj.subtreeRects[l.i].y + l.delta.y - l.recta.top - window.pageYOffset) + "px"',
            'melem.style.left': '$(l.obj.subtreeRects[l.i].x + l.delta.x - l.recta.left - window.pageXOffset) + "px"',
         }
      },
      {
         declare:{
            args77:{
               curveId:'$l.obj.curveId',
               obj:'$l.obj',
               updateType:'whole-root'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.updateCurve', '$l.args77']
      }
   ]
};
var CADDraggedPoint = {//(event, obj)
   callback:[
      {
         declare:{
            args77:{
               curveId:'$l.obj.curveId',
               obj:'$l.obj',
               updateType:'only-inside'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.updateCurve', '$l.args77']
      },
      {
         objectModel:'document', 
         method:'getElementById',
         arguments:'$"cad-"+l.obj.curveId',
         response:'eb',
         callback:{
            declare:{
               args:{elem:'$l.eb', obj:'$l.obj'}
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.addLines', '$l.args']
         }
      },
      {
         declare:{
            args98:{
               event:'$l.event',
               obj:'$l.obj'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.resetListeners', '$l.args98']
      },
      {
         declare:{
            'obj.elem':null,
            i:-1
         },
         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
            },
            objectModel:'window',
            method:'parseFloat',
            arguments:'$l.eb.style.zIndex',
            response:'esz',
            callback:{
               declare:{
                  'melem.style.zIndex':'$(l.esz || 0) + 1',
               }
            }
         }
      }
   ]
};
var CADResetListeners = [ //(event, obj)
   {
      objectModel:'eventManager',
      method:'removeElemListener',
      arguments:['$l.obj.root', 'mousemove'],
   },
   {
      objectModel:'eventManager',
      method:'removeElemListener',
      arguments:['$l.obj.root', 'mouseup'],
   }
];
var CADDrag = {
   callback:[ //obj
      {
         declare:{
            'obj.subtreeElems':[],
            'obj.subtreeRects':[]
         },
         
      },
      {
         declare:{
            args7:{
               obj:'$l.obj',
               elem:'$l.obj.elem'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADGetId','$l.args7'],
         response:'cadidp',
         callback:{
            declare:{
               args8:{
                  nodeId: '$l.cadidp[1]',
                  response: '$l.obj.subtreeElems',
                  rect: '$l.obj.subtreeRects',
                  obj:'$l.obj'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.elemsinTree', '$l.args8'],
            callback:{
               objectModel:'console',
               method:'log',
               arguments:['$l.obj.subtreeElems']
            }
         }
      },
      {
         declare:{
            i:-1
         },
         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
               'melem.style.zIndex':'$CADLIMIT',
               args:{
                  elem:'$l.melem',
                  obj:'$l.obj'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.removeLines', '$l.args']
         }
      },
      {
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments:['$l.obj.root', 'mousemove', '$l.obj.dragging', '$l.obj']
      },
      {
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments:['$l.obj.root', 'mouseup', '$l.obj.dragged', '$l.obj']
      }
   ]
};
var CADDragging = { //(event, obj)

   declare:{
      start:'$l.obj.start',
      end:{
         x:'$l.event.pageX',
         y:'$l.event.pageY',
         wpxo: '$window.pageXOffset',
         wpyo: '$window.pageYOffset'
      },
      delta:{
         x:'$l.end.x - l.start.x',
         y:'$l.end.y - l.start.y',
         wpxo: '$l.end.wpxo - l.start.wpxo',
         wpyo: '$l.end.wpyo - l.start.wpyo'
      },
      i : -1,
      pos:{
         x : '$l.obj.rect.x + l.delta.x', 
         y : '$l.obj.rect.y + l.delta.y',
         w : '$l.obj.rect.w',
         h : '$l.obj.rect.h'
      }
   },
   // objectModel:'console',
   // method:'log',
   // arguments:'we are here!',  
   callback:[
      {
         objectModel:'$l.obj.root',
         method:'getBoundingClientRect',
         response:'recta'
      },
      // {
      //    objectModel:'console',
      //    method:'log',
      //    arguments:['$l.recta']
      // },
      {
         loop:'$l.obj.subtreeElems.length',
         declare:{
            i : '$l.i + 1',
            melem:'$l.obj.subtreeElems[l.i]',
            'melem.style.top' : '$(l.obj.subtreeRects[l.i].y + l.delta.y - l.recta.top - window.pageYOffset) + "px"',
            'melem.style.left': '$(l.obj.subtreeRects[l.i].x + l.delta.x - l.recta.left - window.pageXOffset) + "px"',
         }
      },
      {
         callback:[

            {
               objectModel:'$l.obj.keysDown',
               method:'includes',
               arguments:'ShiftLeft',
               response:'sl'
            },
            {
               objectModel:'$l.obj.keysDown',
               method:'includes',
               arguments:'ShiftRight',
               response:'sr'
            },
            {
               objectModel:'console',
               method:'log',
               arguments:'$l.obj.keysDown'
            },
            {
               condition:'$! (l.sl || l.sr)',
               exit:'true'
            },
            {
               declare:{
                  args77:{
                     pos:'$l.pos',
                     obj:'$l.obj'
                  }
               },
               objectModel:'engine',
               method:'processRequest',
               arguments:['$l.obj.snap', '$l.args77']
            }
         ]
      }
   ]
}
var CADSnap = [//(pos, obj)
   {
      condition:'$l.obj.snapMode == "elem-edges"',
      declare:{
         args:{
            elem: '$l.obj.elem',
            obj:'$l.obj'
         }
      },
      objectModel:'engine',
      method:'processRequest',
      arguments: ['$l.obj.snapToElemEdges', '$l.args']
   },
   {
      condition:'$l.obj.snapMode == "grid-lines"',
      declare:{
         args:{
            elem: '$l.obj.elem',
            obj:'$l.obj'
         }
      },
      objectModel:'engine',
      method:'processRequest',
      arguments: ['$l.obj.snapToGridLines', '$l.args']
   }
];
var CADSnapToElemEdges = [ // (elem, obj)
   {
      declare:{
         args:{
            elem:'$l.elem'
         }
      },
      objectModel:'engine',
      method:'processRequest',
      arguments:['$l.obj.getLines', '$l.args'],
      response:'eLines',
   },
   {
      declare:{
         distance:[],
         nearest:[],
         i:-1
      },
      callback:{
         loop:3,
         declare:{
            i:'$l.i+1'
         },
         callback:[
            {
               objectModel:'$l.obj.linesX',
               method:'getNearest',
               arguments:'$l.eLines[l.i]',
               response:'tmpVar',
               callback:{
                  objectModel: 'Entity',
                  method:'setObjKeyVal',
                  arguments:['$l.nearest', '$l.i', '$l.tmpVar']
               }
            },
            {
               objectModel:'Math',
               method:'abs',
               arguments:'$l.eLines[l.i] - l.nearest[l.i]',
               response:'tmpVar',
               callback:{
                  objectModel: 'Entity',
                  method:'setObjKeyVal',
                  arguments:['$l.distance', '$l.i', '$l.tmpVar']
               }
            },
         ]
      }
   },
   {
      declare:{
         i:2
      },
      callback:{
         loop:3,
         declare:{
            i:'$l.i+1'
         },
         callback:[
            {
               objectModel:'$l.obj.linesY',
               method:'getNearest',
               arguments:'$l.eLines[l.i]',
               response:'tmpVar',
               callback:{
                  objectModel: 'Entity',
                  method:'setObjKeyVal',
                  arguments:['$l.nearest', '$l.i', '$l.tmpVar']
               }
            },
            {
               objectModel:'Math',
               method:'abs',
               arguments:'$l.eLines[l.i] - l.nearest[l.i]',
               response:'tmpVar',
               callback:{
                  objectModel: 'Entity',
                  method:'setObjKeyVal',
                  arguments:['$l.distance', '$l.i', '$l.tmpVar']
               }
            },
         ]
      }
   },
   {
      declare:{
         mindistance:'$CADLIMIT',
         minline: 0,
         i:-1,
         delta:{}
      },

      callback:[
         {
            loop:3,
            declare:{
               i : '$l.i+1',
               
            },
            callback:{
               condition:'$l.distance[l.i] < l.mindistance',
               declare:{
                  mindistance:'$l.distance[l.i]',
                  minline:'$l.i'
               },
               // objectModel:'console',
               // method:'log',
               // arguments:['True', '$l.distance[l.i]', '$l.mindistance']
            }
         },
         {
            // objectModel:'console',
            // method:'log',
            // arguments:['minmax', '$l.mindistance', '$l.obj.pq']
         },
         {
            callback:{
               condition:'$l.mindistance <= l.obj.pq',
               callback:[
                  {
                     condition:'$l.minline==0',
                     declare:{
                        'delta.y' : '$l.nearest[l.minline]',
                     }
                  },
                  {
                     condition:'$l.minline==1',
                     declare:{
                        'delta.y' : '$l.nearest[l.minline] - l.obj.subtreeRects[0].h',
                     }
                  },
                  {
                     condition:'$l.minline==2',
                     declare:{
                        'delta.y' : '$l.nearest[l.minline] - l.obj.subtreeRects[0].h/2',
                     }
                  }
               ]
            }
         }
      ]
   },
   {
      declare:{
         mindistance:'$CADLIMIT',
         minline: 3,
         i:2
      },
      callback:[
         {
            loop:3,
            declare:{
               i : '$l.i+1',
               
            },
            callback:{
               condition:'$l.distance[l.i] < l.mindistance',
               declare:{
                  mindistance:'$l.distance[l.i]',
                  minline:'$l.i'
               },
               // objectModel:'console',
               // method:'log',
               // arguments:['True', '$l.distance[l.i]', '$l.mindistance']
            }
         },
         // {
         //    objectModel:'console',
         //    method:'log',
         //    arguments:['minmax', '$l.mindistance', '$l.minline']
         // },
         {
            callback:{
               condition:'$l.mindistance <= l.obj.pq',
               callback:[
                  {
                     condition:'$l.minline==3',
                     declare:{
                        'delta.x' : '$l.nearest[l.minline]',
                     }
                  },
                  {
                     condition:'$l.minline==4',
                     declare:{
                        'delta.x' : '$l.nearest[l.minline] - l.obj.subtreeRects[0].w',
                     }
                  },
                  {
                     condition:'$l.minline==5',
                     declare:{
                        'delta.x' : '$l.nearest[l.minline] - l.obj.subtreeRects[0].w/2',
                     }
                  }
               ]
            }
         }
      ]
   },
   {
      objectModel:'$l.obj.elem',
      method:'getBoundingClientRect',
      response:'rect',
      callback:{
         declare:{
            'delta.y':'$l.delta.y - (l.rect.top + window.pageYOffset)',
            'delta.x':'$l.delta.x - (l.rect.left + window.pageXOffset)'
         }
      }
   },
   {
      declare:{
         i:-1
      },
      callback:{
         loop:'$l.obj.subtreeElems.length',
         declare:{
            i : '$l.i + 1',
            sy: '$l.obj.subtreeElems[l.i].style.top',
            sx: '$l.obj.subtreeElems[l.i].style.left'
         },
         callback:[
            {
               objectModel:'$l.sy',
               method:'substr',
               arguments:[0, '$l.sy.length-2'],
               response:'sy',
               callback:{
                  objectModel:'window',
                  method:'parseFloat',
                  arguments:'$l.sy',
                  response:'sy'
               }
            },
            {
               objectModel:'$l.sx',
               method:'substr',
               arguments:[0, '$l.sx.length-2'],
               response:'sx',
               callback:{
                  objectModel:'window',
                  method:'parseFloat',
                  arguments:'$l.sx',
                  response:'sx'
               }
            },
            {
               declare:{
                  melem:'$l.obj.subtreeElems[l.i]',
                  'melem.style.top':'$(l.sy + l.delta.y) + "px"',
                  'melem.style.left':'$(l.sx + l.delta.x) + "px"'
               }
            }
         ]
      },
   }
];

var CADDragged = {//(event, obj)
   callback:[
      {
         objectModel:'$l.obj.elem',
         method:"getBoundingClientRect",
         response:'recta'
      },
      {
         declare:{
            i:-1
         },

         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
               'melem.style.visibility':'hidden'
            }
         }
      },
      {
         objectModel:'document',
         method:'elementFromPoint',
         arguments:['$l.event.clientX', '$l.event.clientY'],
         response:'eb',
      },
      {
         declare:{
            i:-1
         },

         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
               'melem.style.visibility':'visible'
            }
         }
      },
      {
         declare:{
            args90:{
               elem:'$l.eb',
               obj:'$l.obj'
            },
            args91:{
               elem:'$l.obj.elem',
               obj:'$l.obj'
            }
         },
         callback:[
            {
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args90'],
               response:'ebid'
            },
            {
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADGetId', '$l.args91'],
               response:'elid'
            },
            {
               declare:{
                  args:{
                     obj:'$l.obj.CADAsNodes[l.elid[1]]',
                     parent:'$l.obj.CADAsNodes[l.ebid[1]]'
                  }
               },
               objectModel:'engine',
               method:'processRequest',
               arguments:['CADNodeMakeChildOf', '$l.args'],
               callback:{
                  objectModel:'console',
                  method:'log',
                  arguments:["CADAsNodes" ,'$l.obj.CADAsNodes', "with", "$l.nodething"]
               },
            },
         ]
      },
      {
         declare:{
            i:-1
         },
         callback:{
            loop:'$l.obj.subtreeElems.length',
            declare:{
               i:'$l.i+1',
               melem:'$l.obj.subtreeElems[l.i]',
               args:{
                  elem:'$l.melem',
                  obj:'$l.obj'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.addLines', '$l.args'],
            callback:{
               objectModel:'window',
               method:'parseFloat',
               arguments:'$l.eb.style.zIndex',
               response:'esz',
               callback:{
                  declare:{
                     'melem.style.zIndex':'$(l.esz || 0) + 1 + l.obj.subtreeRects[l.i].d',
                  }
               }
            }
         }
      },
      {
         declare:{
            'obj.elem':null,
            args98:{
               event:'$l.event',
               obj:'$l.obj'
            }
         },
         objectModel:'engine',
         method:'processRequest',
         arguments:['$l.obj.resetListeners', '$l.args98']
      }
   ]
};
var CADGetLines = { // (elem)
   objectModel:'$l.elem',
   method:'getBoundingClientRect',
   response:'rect',
   callback:{
      declare:{
         ret:[
            '$l.rect.top + window.pageYOffset',
            '$l.rect.top + window.pageYOffset + l.rect.height',
            '$l.rect.top + window.pageYOffset + l.rect.height/2',
            '$l.rect.left + window.pageXOffset',
            '$l.rect.left + window.pageXOffset + l.rect.width',
            '$l.rect.left + window.pageXOffset + l.rect.width/2'
         ]
      }
   },
   return:'$l.ret'
}
var CADAddLines = { // (elem, obj)
   objectModel:'$l.elem.classList',
   method:'contains',
   arguments:'cad',
   response:'clres',
   callback:{
      condition:'$l.clres',
      objectModel:'$l.elem',
      method:'getBoundingClientRect',
      response:'rect',
      callback:{
         declare:{
            ret:[
               '$l.rect.top + window.pageYOffset',
               '$l.rect.top + window.pageYOffset + l.rect.height',
               '$l.rect.top + window.pageYOffset + l.rect.height/2',
               '$l.rect.left + window.pageXOffset',
               '$l.rect.left + window.pageXOffset + l.rect.width',
               '$l.rect.left + window.pageXOffset + l.rect.width/2'
            ],
            i:-1,
         },
         callback:[
            {
               loop:3,
               declare:{i:'$l.i+1'},
               objectModel:'$l.obj.linesX',
               method:'insert',
               arguments:['$l.ret[l.i]']
            },
            {
               loop:3,
               declare:{i:'$l.i+1'},
               objectModel:'$l.obj.linesY',
               method:'insert',
               arguments:['$l.ret[l.i]']
            }
         ]
      }
   }
}
var CADRemoveLines = { // (elem, obj)
   objectModel:'$l.elem.classList',
   method:'contains',
   arguments:'cad',
   response:'clres',
   callback:{
      condition:'$l.clres',
      objectModel:'$l.elem',
      method:'getBoundingClientRect',
      response:'rect',
      callback:{
         declare:{
            ret:[
               '$l.rect.top + window.pageYOffset',
               '$l.rect.top + window.pageYOffset + l.rect.height',
               '$l.rect.top + window.pageYOffset + l.rect.height/2',
               '$l.rect.left + window.pageXOffset',
               '$l.rect.left + window.pageXOffset + l.rect.width',
               '$l.rect.left + window.pageXOffset + l.rect.width/2'
            ],
            i:-1,
         },
         callback:[
            {
               loop:3,
               declare:{i:'$l.i+1'},
               objectModel:'$l.obj.linesX',
               method:'remove',
               arguments:['$l.ret[l.i]']
            },
            {
               loop:3,
               declare:{i:'$l.i+1'},
               objectModel:'$l.obj.linesY',
               method:'remove',
               arguments:['$l.ret[l.i]']
            }
         ]
      }
   }
}
var CADElemsinTree = { //(nodeId, response, rect, obj, ref)
   objectModel:'document', 
   method:'getElementById',
   arguments:['$"cad-"+l.nodeId'],
   response:'el',
   callback:[
      {
         declare:{
            ref : '$(l.ref || l.el)'
         }
      },
      {
         objectModel:'$l.el',
         method:'getBoundingClientRect',
         response:'re'
      },
      {
         callback:[
            {
               objectModel:'window',
               method:'parseFloat',
               arguments:'$l.el.style.zIndex',
               response:'elsz'
            },
            {
               objectModel:'window',
               method:'parseFloat',
               arguments:'$l.ref.style.zIndex',
               response:'refsz'
            },
            {
               declare:{
                  rec:{
                     x: '$l.re.left + window.pageXOffset',
                     y: '$l.re.top + window.pageYOffset',
                     w: '$l.re.width',
                     h: '$l.re.height',
                     d: '$l.elsz - l.refsz'
                  }
               },
            }
         ]
      },
      {
         callback:[
            {
               objectModel:'$l.response',
               method:'push',
               arguments:'$l.el'
            },
            {
               objectModel:'$l.rect',
               method:'push',
               arguments:'$l.rec'
            }
         ]
      },
      {
         condition:'$l.obj.CADAsNodes[l.nodeId].children',
         declare:{
            i : -1,
         },
         callback:{
            loop:'$l.obj.CADAsNodes[l.nodeId].children.length',
            declare:{
               i:'$l.i+1',
               args76:{
                  nodeId:'$l.obj.CADAsNodes[l.nodeId].children[l.i]', 
                  response: '$l.response',
                  rect: '$l.rect',
                  obj:'$l.obj',
                  ref:'$l.ref'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.elemsinTree', '$l.args76']
         }
      },
      {
         callback:{
            objectModel:'console',
            method:'log',
            arguments:["HEREE", '$l.rect']
         }
      }
   ]
}
var UtilGetPx = {//(str)
   objectModel:'$l.str',
   method:'substr',
   arguments:[0, '$l.str.length - 2'],
   response:'result',
   callback:{
      objectModel:'window',
      method:'parseFloat',
      arguments:'$l.result',
      response:'result'
   },
   return:'$l.result'
};
var UtilComputeCoordinates = {//(p, rect, roct)
   callback:[
      {
         declare:{
            'def': '{left:0, top:0}',
            'rect':'$l.rect || l.def',
            'roct':'$l.roct || l.def'
         }
      },
      {
         declare:{args:{str:"$l.p.style.left"}},
         objectModel:'engine',
         method:'processRequest',
         arguments:['UtilGetPx', "$l.args"],
         response:'px'
      }, 
      {
         declare:{args:{str:"$l.p.style.top"}},
         objectModel:'engine',
         method:'processRequest',
         arguments:['UtilGetPx', "$l.args"],
         response:'py'
      },
      {
         declare:{
            px : '$l.px - (l.rect.left - l.roct.left)',
            py : '$l.py - (l.rect.top - l.roct.top)',
            result: ['$l.px', '$l.py']
         }

      }
   ],
   return:'$l.result' 
}

doThisOnce();



function addClassListener(event, selector, doit){
   document.addEventListener(event, function(e){
      if(e.srcElement.classList.contains(selector)) {
         doit(e);
      }
   })
}
function addTagListener(event, selector, doit){
   document.addEventListener(event, function(e){
      // console.log(e.srcElement.tagName);
      if(e.srcElement.tagName.toLowerCase() == selector.toLowerCase()) {
         doit(e);
      }
   })
};

function doThisOnce(){
   addClassListener('change', 'cad-menu', function(e){
      e = e.srcElement;
      e.parentNode.setAttribute('data-tag', e.value);
   });
   addTagListener('change', 'select', function(e){
      var selectElem = e.srcElement;
      var arr = selectElem.getElementsByTagName("option");
      for (var i = arr.length - 1; i >= 0; i--) {
         var sel = arr[i];
         // console.log(sel);
         if(sel.hasAttribute('selected')){
            sel.removeAttribute('selected');
         } 
         if(sel.value == selectElem.value){
            sel.setAttribute('selected', 'selected');
         }
      }
      // console.log('we are here');
   });
}

function doThisOnce(){
   addClassListener('change', 'cad-menu', function(e){
      e = e.srcElement;
      e.parentNode.setAttribute('data-tag', e.value);
   });
   addTagListener('change', 'select', function(e){
      var selectElem = e.srcElement;
      var arr = selectElem.getElementsByTagName("option");
      for (var i = arr.length - 1; i >= 0; i--) {
         var sel = arr[i];
         // console.log(sel);
         if(sel.hasAttribute('selected')){
            sel.removeAttribute('selected');
         } 
         if(sel.value == selectElem.value){
            sel.setAttribute('selected', 'selected');
         }
      }
      // console.log('we are here');
   });
}
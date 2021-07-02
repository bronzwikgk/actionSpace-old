
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

var elemById = {objectModel:'document', method:'getElementById'};
var elemByPoint = {objectModel:'document', method:'elementFromPoint'};
var createElem = {
   objectModel:'document',
   method:'createElement',
   arguments:'div',
   response:'__elem',
   callback:[
      {
         
         objectModel:'document',
         method:'appendChild',

         
      }
      //do Everything else here
   ]
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
      return:'$l.cadid2'
   }
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
            <option value = "editable" selected>Editable</option>
            <option value = "draggable">Draggable</option>
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

      //functions

      mousedown:'CADMouseDown',
      create:'CADCreate',
      creating:'CADCreating',
      created:'CADCreated',
      drag:'CADDrag',
      dragging:'CADDragging',
      dragged:'CADDragged',
      snap:'CADSnap',
      snapToElemEdges:'CADSnapToElemEdges',
      getLines:'CADGetLines',
      addLines:'CADAddLines',
      removeLines:'CADRemoveLines',
      drawLines: 'CADDrawLines',           //baad mein
      elemsinTree:'CADElemsinTree',
      resetListeners:'CADResetListeners'
   },
   callback: [ //properties which require some function call
      {
         declare:{
            'root.id':'cad-0'
         },
         objectModel:'$l.root.classList',
         method:'add',
         arguments:'cad'
      },
      {
         objectModel:'$l.root',
         method:'setAttribute',
         arguments:['data-tag', 'editable']
      },
      {
         objectModel:'engine',
         method:'processRequest',
         arguments:['CADNode', {id:0}, true],
         response:'nodething',
         callback:{
            objectModel:'$l.CADAsNodes',
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
         arguments:['$l.obj.addLines', '$l.args4', true]
      },
      {
         declare:{
            args:{
               obj:'$l.obj'
            }
         },
         objectModel:'eventManager',
         method:'addRequestListener',
         arguments:['$l.obj.root', 'mousedown', '$l.obj.mousedown', '$l.args']
      }
   ],
   return:'$l'
}
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
      extends:'elemByPoint',
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
                     arguments: ['$l.obj.create', '$l.args', true],
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
                     arguments: ['$l.obj.drag', '$l.args44', true],
                  }
               ]
            }
         }
      }
   }
}
var CADCreate = [ //(obj)
   {
      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mousemove', '$l.obj.creating', '$l.obj']
   },
   {
      objectModel:'eventManager',
      method:'addRequestListener',
      arguments:['$l.obj.root', 'mouseup', '$l.obj.created', '$l.obj']
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
         extends:'createElem',
         response:'telem',
         callback:[
            {
               objectModel:'$l.root',
               //appending element here
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
               declare:{
                  'obj.telem.style.zIndex': '$ (l.obj.elem.style.zIndex || 0) + 1'
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
               arguments:['CADGetId', '$l.args', true],
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
                  arguments:['CADGetId', '$l.args1', true],
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
                     arguments:['CADNode', '$l.args2', true],
                     response:'nodething',
                     callback:{
                        objectModel:'$l.CADAsNodes',
                        method:'push',
                        arguments: '$l.nodething',
                        // callback:{
                        //    objectModel:'console',
                        //    method:'log',
                        //    arguments:["Pushed to cadas nodes" ,'$l.CADAsNodes', "with", "$l.nodething"]
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
         declare:{
            x: '$Math.min(l.start.x, l.end.x)',
            y: '$Math.min(l.start.y, l.end.y)',
            w: '$Math.abs(l.start.x - l.end.x)',
            h: '$Math.abs(l.start.y - l.end.y)',
            
         },
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
      arguments:['$l.obj.addLines', '$l.args4', true]
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
         arguments:['$l.obj.resetListeners', '$l.args1', true],
         callback:{
            declare:{
               'obj.telem':null,
               'obj.elem':null
            }
         }
      }
   }
];
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
]
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
         arguments:['CADGetId','$l.args7', true],
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
            arguments:['$l.obj.elemsinTree', '$l.args8', true],
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
               objectModel:'console',
               method:'log',
               arguments:['True', '$l.distance[l.i]', '$l.mindistance']
            }
         },
         {
            objectModel:'console',
            method:'log',
            arguments:['minmax', '$l.mindistance', '$l.obj.pq']
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
                  },
                  {

                     objectModel:'console',
                     method:'log',
                     arguments:['op', '$l.minline']
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
               objectModel:'console',
               method:'log',
               arguments:['True', '$l.distance[l.i]', '$l.mindistance']
            }
         },
         {
            objectModel:'console',
            method:'log',
            arguments:['minmax', '$l.mindistance', '$l.minline']
         },
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
                  },
                  {

                     objectModel:'console',
                     method:'log',
                     arguments:['op', '$l.minline']
                  }
               ]
            }
         }
      ]
   },
   {
         objectModel:'console',
         method:'log',
         arguments:['Wanna see this working', '$l.delta']
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
               },
               callback:{
                  objectModel:'console',
                  method:'log',
                  arguments:['HERER~! ', '$l.sx', '$l.sy', '$l.delta.x', '$l.delta.y']
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
      // {
      //    objectModel:'$l.obj.root',
      //    method:"getBoundingClientRect",
      //    response:'roct'
      // },
      {
         declare:{
            'obj.elem.style.visibility':'hidden'
         },
         extends:'elemByPoint',
         arguments:['$l.event.clientX', '$l.event.clientY'],
         response:'eb',

         callback:[
            {
               declare:{
                  'obj.elem.style.visibility':'visible'

               },
               // callback:{
               //    objectModel:'console',
               //    method:'log',
               //    arguments:'$l.eb'
               // }
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
                     arguments:['CADGetId', '$l.args90', true],
                     response:'ebid'
                  },
                  {
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['CADGetId', '$l.args91', true],
                     response:'elid'
                  },
                  // {
                  //    objectModel:'console',
                  //    method:'log',
                  //    arguments:['$l.elid', '$l.ebid']
                  // },
                  {
                     declare:{
                        args:{
                           obj:'$l.CADAsNodes[l.elid[1]]',
                           parent:'$l.CADAsNodes[l.ebid[1]]'
                        }
                     },
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['CADNodeMakeChildOf', '$l.args'],
                     callback:{
                        objectModel:'console',
                        method:'log',
                        arguments:["CADAsNodes" ,'$l.CADAsNodes', "with", "$l.nodething"]
                     },
                  },
                  {
                     objectModel:'engine',
                     method:'processRequest',
                     arguments:['$l.obj.addLines', '$l.args91', true]
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
                     arguments:['$l.obj.resetListeners', '$l.args98', true]
                  },
                  {
                     declare:{
                        'obj.elem.style.zIndex':'$(l.eb.style.zIndex || 0) + 1',
                        'obj.elem':null
                     }
                  }
               ]
            }
         ]
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
var CADAddLines = { // (elem)
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
var CADRemoveLines = { // (elem)
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
var CADElemsinTree = { //(nodeId, response, rect, obj)
   extends:'elemById',
   arguments:['$"cad-"+l.nodeId'],
   response:'elem',
   callback:[
      // {
      //    objectModel:'console',
      //    method:'log',
      //    arguments:["NODE IS", '$l.nodeId']
      // },
      {
         objectModel:'$l.elem',
         method:'getBoundingClientRect',
         response:'re'
      },
      {
         declare:{
            rec:{
               x: '$l.re.left + window.pageXOffset',
               y: '$l.re.top + window.pageYOffset',
               w: '$l.re.width',
               h: '$l.re.height'
            }
         },
         extends:'elemById',
         arguments:['$"cad-"+l.nodeId'],
         response:'elem2',
         callback:[
            {
               objectModel:'$l.response',
               method:'push',
               arguments:'$l.elem2'
            },
            {
               objectModel:'$l.rect',
               method:'push',
               arguments:'$l.rec'
            }
         ]
      },
      {
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
                  obj:'$l.obj'
               }
            },
            objectModel:'engine',
            method:'processRequest',
            arguments:['$l.obj.elemsinTree', '$l.args76']
         }
      },
      {
         // callback:{
         //    objectModel:'console',
         //    method:'log',
         //    arguments:['$l.rect']
         // }
      }
   ]
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

window.onload = function(){
	doThisOnce();
	var makeit = new CAD(document.getElementsByClassName('fc')[0], 15);

}
class Multiset{
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
class CADNode{
	constructor(id, parent){
		if(id != 0){
			this.parent = parent;
			this.id = id;
			this.children = [];

			this.parent.children.push(id);
		} else {
			this.id = id;
			this.children = [];
		}
	}
	makeChildOf(parent){
		this.parent.children.splice(this.parent.children.indexOf(this.id), 1);
		this.parent = parent;
		parent.children.push(this.id);
	}
}
class CAD{
	static LIMIT = 1e7;
	static className = 'cad';
	static iHTML = `
			<select class = "cad-menu">
				<option value = "editable" selected>Editable</option>
				<option value = "draggable">Draggable</option>
			</select>
		`;
	static borderWidth = 1;

	constructor(elem, proximityQ){
		this.root = elem; // this will be the root, only edit mode

		this.root.classList.add('cad');
		this.root.setAttribute('data-tag', 'editable');
		this.root.id = 'cad-0';

		this.pq = proximityQ; //proximity quotient
		this.snapMode = 'elem-edges'; // current snap-mode

		this.listeners = []; //holding all current listeners
		
		this.CADAsNodes = [new CADNode(0)]; // holding all cad elements in order

		//horizontal lines
		this.linesX = new Multiset();
		//vertical lines
		this.linesY = new Multiset();
		
		// The Boundaries

		this.idCounter = 0;

		var obj =  this;

		this.addLines(this.root, obj);

		this.addListener(obj.root, 'mousedown', obj.mousedown, obj);
	}
	mousedown(event, obj){
		
		// console.log(obj.elem);

		obj.start = {
			x: event.pageX, 
			y: event.pageY,
			wpxo: window.pageXOffset, 
			wpyo: window.pageYOffset
		};
		var start = obj.start;
		
		var eb = document.elementFromPoint(start.x - window.pageXOffset, start.y - window.pageYOffset);
		obj.elem = eb;

		var rect = obj.elem.getBoundingClientRect();
		obj.rect = {
			x : rect.left + window.pageXOffset, 
			y : rect.top + window.pageYOffset, 
			w : rect.width, 
			h : rect.height
		};
		if(eb.getAttribute('data-tag') == 'editable'){
			obj.create(obj);
		} 
		else if(eb.getAttribute('data-tag') == 'draggable'){
			obj.drag(obj);
		}
		// console.log(obj);
	}
	create(obj){
		obj.addListener(obj.root, 'mousemove', obj.creating, obj);
		obj.addListener(obj.root, 'mouseup', obj.created, obj);
	}
	creating(event, obj){
		
		var start = obj.start;
		var end = {
			x : event.pageX, 
			y : event.pageY,
			wpxo : window.pageXOffset,
			wpyo : window.pageYOffset
		};

		if(!obj.telem){
			obj.telem = document.createElement('div');
			obj.telem.classList.add('cad');
			obj.telem.setAttribute('data-tag', 'editable');
			obj.root.appendChild(obj.telem);
			obj.telem.style.zIndex =  (window.getComputedStyle(obj.elem, null).getPropertyValue("zIndex") || 0) + 1;
			
			obj.telem.id = 'cad-'+ (++obj.idCounter);
			var telemid = obj.idCounter;
			var parentid = parseInt(obj.elem.id.substr(4)); // 4 to last

			obj.CADAsNodes.push(new CADNode(telemid, obj.CADAsNodes[parentid]));
		}
		var x = Math.min(start.x, end.x);
		var y = Math.min(start.y, end.y);
		var w = Math.abs(start.x - end.x);
		var h = Math.abs(start.y - end.y);

		obj.telem.style.top = (y - obj.root.getBoundingClientRect().top) + "px";
		obj.telem.style.left = (x - obj.root.getBoundingClientRect().left) + "px";
		obj.telem.style.width = w + "px";
		obj.telem.style.height = h + "px";
	}
	created(event, obj){
		if(obj.telem){
			obj.telem.innerHTML = CAD.iHTML;
			obj.addLines(obj.telem, obj);
		}
		obj.resetListeners(event, obj);
		console.log(obj.CADAsNodes);


		obj.telem = null;
		obj.elem = null;
	}

	drag(obj){		// remove them all
		obj.removeLines(obj.elem, obj);
		//we will hide every element in it's subtree
		obj.subtreeElems = [], obj.subtreeRects = [];

		obj.elemsinTree(parseInt(obj.elem.id.substr(4)), obj.subtreeElems, obj.subtreeRects);

		obj.addListener(obj.root, 'mousemove', obj.dragging, obj);
		// obj.addListener(window, 'scroll', obj.dragging, obj);
		obj.addListener(obj.root, 'mouseup', obj.dragged, obj);

	}
	dragging(event, obj){
		var start = obj.start;
		var end = (event.type == 'scroll') ? {
			x : event.pageX, 
			y : event.pageY,
			wpxo : window.pageXOffset,
			wpyo : window.pageYOffset
		} : {
			x : event.pageX, 
			y : event.pageY,
			wpxo : window.pageXOffset,
			wpyo : window.pageYOffset
		};

		var delta = {
			x:end.x - start.x, 
			y:end.y - start.y, 
			wpxo: end.wpxo - start.wpxo, 
			wpyo: end.wpyo - start.wpyo
		};
		for (var i = 0; i < obj.subtreeElems.length; i++) {
			obj.subtreeElems[i].style.top = (obj.subtreeRects[i].y + delta.y - obj.root.getBoundingClientRect().top) + 'px';// + delta.wpxo);
			obj.subtreeElems[i].style.left = (obj.subtreeRects[i].x + delta.x - obj.root.getBoundingClientRect().left) + 'px';// + delta.wpyo);
		}
		
		var pos = {
			x : obj.rect.x + delta.x, 
			y : obj.rect.y + delta.y,
			w : obj.rect.w,
			h : obj.rect.h
		};

		obj.snap(pos, obj);
	}
	snap(pos, obj){
		if(obj.snapMode == 'elem-edges'){
			obj.snapToElemEdges(obj.elem, obj);

		} else if(obj.snapMode == 'grid-lines'){

		} else if(obj.snapMode == 'grid-points'){

		}
	}
	snapToElemEdges(elem, obj){ //just telem, elem
		var eLines = obj.getLines(elem); // (top, bottom, left, right)
		
		var distance = new Array(4);
		var nearest = new Array(4);
		for(var i = 0; i < 3; i++){
			nearest[i] = obj.linesX.getNearest(eLines[i]);
			distance[i] = Math.abs(eLines[i] - nearest[i]);
		}
		
		for(var i = 3; i < 6; i++){
			nearest[i] = obj.linesY.getNearest(eLines[i]);
			distance[i] = Math.abs(eLines[i] - nearest[i]);
		}
		
		var mindistance = CAD.LIMIT, minline = 0;
		for (var i = 2; i >= 0; i--) {
			if(distance[i] < mindistance){
				mindistance = distance[i];
				minline = i;
			}
		}
		var delta = {};
		if(mindistance <= obj.pq){
			if(minline == 0){
				delta.y = (nearest[minline] - CAD.borderWidth) ;
			} else if(minline == 1){
				delta.y = (nearest[minline] - elem.getBoundingClientRect().height - CAD.borderWidth);
			} else {
				delta.y = (nearest[minline] - elem.getBoundingClientRect().height/2 - CAD.borderWidth);
			}
		}
		mindistance = CAD.LIMIT, minline = 2;
		for (var i = 5; i >= 3; i--) {
			if(distance[i] < mindistance){
				mindistance = distance[i];
				minline = i;
			}
		}
		if(mindistance <= obj.pq){
			if(minline == 3){
				delta.x = (nearest[minline] - CAD.borderWidth);
			} else if(minline == 4){
				delta.x = (nearest[minline] - elem.getBoundingClientRect().width  - CAD.borderWidth);
			} else {
				delta.x = (nearest[minline] - elem.getBoundingClientRect().width/2  - CAD.borderWidth);
			}
		}
		delta.y -= (elem.getBoundingClientRect().top + window.pageYOffset);
		delta.x -= (elem.getBoundingClientRect().left+ window.pageXOffset);
		for (var i = 0; i < obj.subtreeElems.length; i++) {
			obj.subtreeElems[i].style.top = (obj.subtreeElems[i].getBoundingClientRect().top + window.pageYOffset + delta.y  - obj.root.getBoundingClientRect().top) + 'px';// + delta.wpxo);
			obj.subtreeElems[i].style.left = (obj.subtreeElems[i].getBoundingClientRect().left + window.pageXOffset + delta.x - obj.root.getBoundingClientRect().left) + 'px';// + delta.wpyo);
		}
		// console.log(distance, obj.pq, mindistance);
	}
	dragged(event, obj){
		obj.elem.style.visibility = "hidden";
		var eb = document.elementFromPoint(event.clientX, event.clientY);
		obj.elem.style.visibility = "visible";

		var ebid = parseInt(eb.id.substr(4));
		var elid = parseInt(obj.elem.id.substr(4));

		obj.CADAsNodes[elid].makeChildOf(obj.CADAsNodes[ebid]);

		obj.addLines(obj.elem, obj);
		obj.resetListeners(event, obj);
		console.log(obj.CADAsNodes);

		obj.elem = null;
	}

	getLines(elem){
		var rect = elem.getBoundingClientRect();
		return [
			rect.top + window.pageYOffset,
			rect.top + window.pageYOffset + rect.height,
			rect.top + window.pageYOffset + rect.height/2,
			rect.left + window.pageXOffset,
			rect.left + window.pageXOffset + rect.width,
			rect.left + window.pageXOffset + rect.width/2
		];
	}
	addLines(elem, obj){
		var rect = elem.getBoundingClientRect();
		obj.linesX.insert(rect.top + window.pageYOffset);
		obj.linesX.insert(rect.top + window.pageYOffset + rect.height);
		obj.linesX.insert(rect.top + window.pageYOffset + rect.height/2);
		obj.linesY.insert(rect.left + window.pageXOffset);
		obj.linesY.insert(rect.left + window.pageXOffset + rect.width);
		obj.linesY.insert(rect.left + window.pageXOffset + rect.width/2);
		obj.drawLines(obj);
	}
	removeLines(elem, obj){
		var rect = elem.getBoundingClientRect();
		obj.linesX.remove(rect.top + window.pageYOffset);
		obj.linesX.remove(rect.top + window.pageYOffset + rect.height);
		obj.linesX.remove(rect.top + window.pageYOffset + rect.height/2);
		obj.linesY.remove(rect.left + window.pageXOffset);
		obj.linesY.remove(rect.left + window.pageXOffset + rect.width);
		obj.linesY.remove(rect.left + window.pageXOffset + rect.width/2);
		obj.drawLines(obj);
	}
	drawLines(obj){
		var canvas = document.getElementById('drawlines');
		var ctx = canvas.getContext('2d');
		canvas.width = document.getElementsByClassName("fc")[0].getBoundingClientRect().width ;//+ 'px';
		canvas.height = document.getElementsByClassName("fc")[0].getBoundingClientRect().height ;//+ 'px';
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var linesX = this.linesX.gimmeArray();
		var linesY = this.linesY.gimmeArray();

		for (var i = linesX.length - 1; i >= 0; i--) {
			ctx.moveTo(0, linesX[i]-obj.root.getBoundingClientRect().top);
			ctx.lineTo(canvas.width, linesX[i]-obj.root.getBoundingClientRect().top);
		}
		for (var i = linesY.length - 1; i >= 0; i--) {
			ctx.moveTo(linesY[i]-obj.root.getBoundingClientRect().left, 0);
			ctx.lineTo(linesY[i]-obj.root.getBoundingClientRect().left, canvas.height);
		}
		ctx.stroke();
	}
	resetListeners(event, obj){
		obj.removeAllListeners(obj);
		obj.addListener(obj.root, 'mousedown', obj.mousedown, obj);
	}
	addListener(domElement, events, func, obj){
		var x = function(event){
			func(event, obj);
		}
		obj.listeners.push({domElement: domElement, events: events, func: x});
		domElement.addEventListener(events, x);
	}
	removeAllListeners(obj){
		// console.log(obj);
		for (var i = obj.listeners.length - 1; i >= 0; i--) {
			obj.listeners[i].domElement.removeEventListener(obj.listeners[i].events, obj.listeners[i].func);
		}
		obj.listeners = [];
	}

	elemsinTree(nodeId, response = [], rect = []){
		var re = document.getElementById('cad-'+nodeId).getBoundingClientRect();
		var rec = {
			x : re.left + window.pageXOffset, 
			y : re.top + window.pageYOffset, 
			w : re.width, 
			h : re.height
		};
		
		response.push(document.getElementById('cad-'+nodeId)); //nodeId is basically a CADNode id
		rect.push(rec);

		for (var i = 0; i < this.CADAsNodes[nodeId].children.length; i++) {
			this.elemsinTree(this.CADAsNodes[nodeId].children[i], response, rect);
		}
	}
}

//utility functions
function relativePosition(elem, start){ // with respect to parent
	
	return {x: start.x - elem.getBoundingClientRect().left - window.scrollX, y: start.y - elem.getBoundingClientRect().top - window.scrollY};
}

function getNearestPoint(point, unit){
	var r = point;
	if(point.x - unit * parseInt(point.x / unit) > unit/2){
		r.x = parseInt(point.x / unit);
	} else {
		r.x = parseInt(point.x / unit) + unit;
	}
	if(point.y - unit * parseInt(point.y / unit) > unit/2){
		r.y = parseInt(point.y / unit);
	} else {
		r.y = parseInt(point.y / unit) + unit;
	}
}

function HYPOT(x, y){
	return Math.sqrt(x*x + y*y);
}

function distanceBoxParticle2D( x,  y,  x_min,  y_min,
         x_max,  y_max)
{
    if (x < x_min) {
        if (y <  y_min) return HYPOT(x_min-x, y_min-y);
        if (y <= y_max) return x_min - x;
                        return HYPOT(x_min-x, y_max-y);
    } else if (x <= x_max) {
        if (y <  y_min) return y_min - y;
        if (y <= y_max) return 0;
                        return y - y_max;
    } else {
        if (y <  y_min) return HYPOT(x_max-x, y_min-y);
        if (y <= y_max) return x - x_max;
                        return HYPOT(x_max-x, y_max-y);
    }
}

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
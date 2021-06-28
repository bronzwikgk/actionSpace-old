
var minimumSnappingDistance = 25;

var start, end, cad, eb, ghost, levent, srel, ebP, snappedTo;

document.addEventListener('mousedown', CAD_CREATE_OnDown);
document.addEventListener('mouseup', CAD_CREATE_OnUp);

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
	console.log('we are here');
})
function cadElementInnerHTML(cadid = ""){
	var str = `
	<select class = "cad-menu">
		<option value = "editable" selected>Editable</option>
		<option value = "draggable">Draggable</option>
	</select>
`;
	return str; 

}

function CAD_CREATE_OnDown(event){

	start = {x: event.pageX, y: event.pageY};
	eb = document.elementFromPoint(start.x - window.pageXOffset, start.y - window.pageYOffset);
	
	console.log(eb);
	if(eb.getAttribute('data-tag') == 'draggable'){
		srel = relativePosition(eb, start);
		ebP = eb.getBoundingClientRect();
		document.addEventListener('mousemove', CAD_OnDrag);
	} else if(eb.getAttribute('data-tag') == 'editable') {
		start = relativePosition(eb, start);
		document.addEventListener('mousemove', CAD_CREATE_OnDrag);
	}
	
}
function CAD_OnDrag(event){ // create ghost

	levent = event;
	var delta = {x : event.pageX - start.x, y : event.pageY- start.y};
	if(!ghost){
		eb.style.display = "none";
		ghost = eb.cloneNode(true);
		document.body.appendChild(ghost);
		ghost.style.display = "block";
		ghost.classList.add("ghost");
		// ghost.getElementsByTagName('select')[0].value="draggable";
		ghost.style.left = (window.scrollX + ebP.left + delta.x) + 'px';
		ghost.style.top = (window.scrollY + ebP.top + delta.y) + 'px';
	}
	ghost.style.left = (window.scrollX + ebP.left + delta.x) + 'px';
	ghost.style.top = (window.scrollY + ebP.top + delta.y) + 'px';
	
	CAD_SnapToNearest(event);

}
function CAD_SnapToNearest(event){
	if(snappedTo){
		snappedTo.classList.remove('snapped-to');
		snappedTo = null;
	}
	var mpoint = {x : event.pageX, y : event.pageY};
	ghost.style.visibility = "hidden";
	var elembelow = document.elementFromPoint(mpoint.x - window.pageXOffset, mpoint.y - window.pageYOffset);
	while(! elembelow.classList.contains("cad-element")){
		elembelow = elembelow.parentNode;
	}
	ghost.style.visibility = "visible";
	var arr = elembelow.getElementsByClassName("cad-element");
	var mind = 10000000;
	var mele = elembelow;
	for (var i = arr.length - 1; i >= 0; i--) {
		var ex = arr[i].getBoundingClientRect().left + window.pageXOffset;
		var ey = arr[i].getBoundingClientRect().top + window.pageYOffset;
		var ew = arr[i].getBoundingClientRect().width;
		var eh = arr[i].getBoundingClientRect().height;
		var ed = distanceBoxParticle2D(mpoint.x, mpoint.y, ex, ey, ex + ew, ey + eh);
		if(mind > ed){
			mind = ed;
			mele = arr[i];
		}
	}
	if(mind < minimumSnappingDistance){
		mele.classList.add('snapped-to');
		snappedTo = mele;
	} else {
		elembelow.classList.add('snapped-to');
		snappedTo = elembelow;
	}
}
function CAD_CREATE_OnDrag(event){

	end = relativePosition(eb, {x: event.pageX, y: event.pageY});

	if(!cad){
		cad = document.createElement('div');
		cad.classList.add('cad-element');
		cad.setAttribute('data-tag', "editable");
		eb.appendChild(cad);
		cad.style.zIndex = (window.getComputedStyle(eb, null).getPropertyValue("zIndex") || 0) + 1;
	}	
	var x = Math.min(start.x, end.x);
	var y = Math.min(start.y, end.y);
	var w = Math.abs(start.x - end.x);
	var h = Math.abs(start.y - end.y);

	cad.style.top = y + "px";
	cad.style.left = x + "px";
	cad.style.width = w + "px";
	cad.style.height = h + "px";
}

function CAD_CREATE_OnUp(){
	document.removeEventListener('mousemove', CAD_CREATE_OnDrag);
	document.removeEventListener('mousemove', CAD_OnDrag);
	if(ghost){
		ghost.parentNode.removeChild(ghost);
		var elem = document.elementFromPoint(levent.pageX - window.pageXOffset, levent.pageY - window.pageYOffset);
		
		if(snappedTo.isSameNode(elem)){
			var newchild = eb.cloneNode(true);
			elem.appendChild(newchild);
			
			newchild.style.display = "block";
			newchild.style.left = (levent.pageX - srel.x - (elem.getBoundingClientRect().left + window.scrollX) ) + 'px' ;
			newchild.style.top = (levent.pageY - srel.y - (elem.getBoundingClientRect().top + window.scrollY) ) + 'px';
			newchild.style.zIndex = (window.getComputedStyle(eb, null).getPropertyValue("zIndex") || 0) + 1;
			snappedTo.classList.remove('snapped-to');
		} 
		else if(snappedTo){
			elem = snappedTo;
			var newchild = eb.cloneNode(true);
			elem.appendChild(newchild);
			
			newchild.style.display = "block";
			newchild.style.left = '20px' ;
			newchild.style.top = '20px';
			newchild.style.zIndex = (window.getComputedStyle(eb, null).getPropertyValue("zIndex") || 0) + 1;
			snappedTo.classList.remove('snapped-to');
		}
		else if(elem){
			var newchild = eb.cloneNode(true);
			elem.appendChild(newchild);
			
			newchild.style.display = "block";
			newchild.style.left = (levent.pageX - srel.x - (elem.getBoundingClientRect().left + window.scrollX) ) + 'px' ;
			newchild.style.top = (levent.pageY - srel.y - (elem.getBoundingClientRect().top + window.scrollY) ) + 'px';
			newchild.style.zIndex = (window.getComputedStyle(eb, null).getPropertyValue("zIndex") || 0) + 1;
		}
		eb.parentNode.removeChild(eb);
	} else if(cad){

		cad.innerHTML = cadElementInnerHTML();
	}
	cad = null;
	eb = null;
	ghost = null;
	snappedTo = null;
}

function relativePosition(elem, start){ // with respect to parent
	
	return {x: start.x - elem.getBoundingClientRect().left - window.scrollX, y: start.y - elem.getBoundingClientRect().top - window.scrollY};
}

// aligning to grid basically
// so what we need is a grid, 
// approximation of points to locate the nearest grid point out there
// so, we will create the things as it is , and have fun with it
// there are 4 points surrounding a point and we need the closest one.

// Ok, so when it is inside it's parent, follow the grid, else 
// follow the borders
// Ok, so what we need is an N*M grid
// and sticking it to the least / 

// stick to the grid damn
// O(1) 
// relative postion than, if (decimalMod(posx, unit) > unit/2) return unit
// ok, so snap the ghost to the grid, not the actual element being dragged

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
		console.log(e.srcElement.tagName);
		if(e.srcElement.tagName.toLowerCase() == selector.toLowerCase()) {
			doit(e);
		}
	})
}
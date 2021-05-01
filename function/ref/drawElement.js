
//This file create a click and Drag element.
//https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

//Getting the Mouse Down Event for further processing.
var md = document.addEventListener("mousedown",onmousedown);

var eDepth = 1
var eID = 0;

//Triggered by MouseDown
function onmousedown(md){
    var pageX = md.pageX;
    var pageY = md.pageY;
   // console.log(pageX,pageY);
    var parent = document.elementFromPoint(pageX, pageY)
   // console.log("Clicked on",parent,"mouse position", pageX, pageY)
    console.log("target Element",md.target.tagName);
    createElement(md,pageX,pageY,parent);
}

//Creates an element and passes to Append
function createElement(e,pageX,pageY,parent){
    const newElement = document.createElement('newElement');
    newElement.id = 'newElement' + eID; eID++;
   // console.log("newelementId",newElement.id);
    appendElement(e,newElement,parent);  
    
}
function appendElement(e,newElement,parent){
    //console.log(parent); 
    var contentDiv = document.getElementById(parent.id);
   // console.log("got parent",contentDiv);
    contentDiv.appendChild(newElement);
    const parentBox = parent.getBoundingClientRect();
    const newElementBox = newElement.getBoundingClientRect();
   
    startX = e.clientX;
    startY = e.clientY;
   
    //console.log ("newElement Position", newElementBox.left, newElementBox.top);
    newElement.style.left = startX - parentBox.left + "px";
    newElement.style.top =  startY - parentBox.top + "px";
    resize(newElement,startX,startY);
}
function resize(newElement,startX,startY){
   // console.log("new element recived", newElement);
    var mm = window.addEventListener("mousemove", onmouseMove);
       function onmouseMove(mm){
        var mouseOn = mm.target.tagName;
        console.log("mouseon", mouseOn)
        var mouseX = mm.pageX;
        var mouseY = mm.pageY;
        newElement.style.width = mouseX - startX + "px";
        newElement.style.height =  mouseY - startY + "px";
      
       window.addEventListener("mouseup", onMouseup);

        function onMouseup() {
            window.removeEventListener("mousemove", onmouseMove);
            console.log("listeners removed")
            window.removeEventListener("mouseup", onMouseup);
          }            
    }

  
}

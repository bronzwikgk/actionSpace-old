function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("actionSpace").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("actionSpace").style.marginLeft = "0";
}
var userDashboardInstace = activeViewModelV1;
console.log("I Am Loaded", activeViewModelV1)
var newEntity = new Entity(activeViewModelV1, window['actionSpace']);
console.log("here", newEntity.entity, window['actionSpace']);

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
});
window.onload = (event) => {
    console.log('page is fully loaded');
};
//var actionSpaceEditorInstance = new ActionSpaceEditor(window['actionSpace'], newEntity.entity.firstChild);
window.onclick = (event => {
    var editTarget;
 
    if (event.target.hasAttribute('mode')) {
      //  console.log("clicked on", event.target.hasAttribute('mode'), event.target.parentElement)
        editTarget = event.target;
      
    } else if (event.target.parentElement.hasAttribute('mode')) {
        editTarget = event.target.parentElement;
       // console.log("editable Parent element", event.target)
    }
    console.log("editable element", editTarget)
    if (editTarget) {
        editTarget.contentEditable = 'true';
        console.log(editTarget, "content")
    }
})
window.onmouseover = (event => {
    var editTarget;
 //   console.log(event.target.id, event.target.hasAttribute('edit'))
  //  console.log("parent", event.target.parentElement.id, event.target.parentElement.hasAttribute('edit'))
   
    
})

document.onmouseenter = (event => {
   // console.log("mouseEnterdOn", event.target)
})
document.onmouseleave = (event => {
   // console.log("mouseLeftFrom", event.target)
})
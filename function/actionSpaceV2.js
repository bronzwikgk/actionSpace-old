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
//var actionSpaceEditorInstance = new ActionSpaceEditor(window['actionSpace'], newEntity.entity.firstChild);


var userDashboardInstace = activeViewModelV1;
console.log("I Am Loaded", activeViewModelV1)
var newEntity = new Entity(activeViewModelV1, window['actionSpace']);
console.log(">>>>",document.getElementsByTagName('body')[0])
var newSideBAr = new Entity(leftSideNavBar, document.createElement('div'));
var currentSideBar = document.getElementById('mySidenav');
currentSideBar.replaceWith(newSideBAr.entity);
//console.log("here", newEntity.entity, newSideBAr.entity);

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
});
window.onload = (event) => {
    console.log('page is fully loaded');
};
//var actionSpaceEditorInstance = new ActionSpaceEditor(window['actionSpace'], newEntity.entity.firstChild);
window.onhashchange = (event => {
    console.log("hashChange")
   function  onRouteChange(e) {
        //  console.log("event occoured",e.type);
        var routeKeyword;
        if (document.location.hash) {
            // console.log("it's a hash Change", document.location.hash.substring(1));
            routeKeyword = document.location.hash.substring(1);
        } else if (document.location.search) {
            //  console.log("it's a search Change", document.location.search.substring(1));
            routeKeyword = document.location.search.substring(1);
        } else {
            // console.log("no idea");
        }

        //  const hashLocation = window.location.hash.substring(1);

        if (routeKeyword) {
            // console.log(hashLocation);
            var routeModel = operate.findMatchingInArrayOfObject(actionSpaceViewModel, 'keyword', routeKeyword, 'values');
            // console.log(routeModel[0].model, this.view._actionView)
            //console.log(routeModel)
            if (routeModel.length != 0) {
                this.view.replaceChild([routeModel[0].model, this.view._actionView.entity]);
            } else {
                console.log('no route found');
            }
        }
    }
})
window.onclick = (event => {
    console.log('clicked On ', event.target)
    var editTarget;
 
    if (event.target.hasAttribute('mode')) {
        console.log("clicked on", event.target.hasAttribute('mode'), event.target.parentElement)
        editTarget = event.target;
      
    } else if (event.target.parentElement.hasAttribute('mode')) {
        editTarget = event.target.parentElement;
       console.log("editable Parent element", event.target)
    }

    if (editTarget) {
        editTarget.contentEditable = 'true';
        console.log("editable element", editTarget)
    }

    if (event.target.hasAttribute('toolBar')) {
        console.log("clicked on toolBar", event.target.hasAttribute('mode'), event.target.parentElement)
        toolBarTarget = event.target;

    } else if (event.target.parentElement.hasAttribute('toolbar')) {
        toolBarTarget = event.target.parentElement;
        console.log("toolBar Parent element", event.target)
    }
    toolbar = document.getElementById('viewToolBar')
    

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
document.onkeypress = (event => {
    
    if (event.target.id === 'searchInput') {
        console.log("onkeypress", event.target, event.key)
        
    }
})


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("actionSpace").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("actionSpace").style.marginLeft = "0";
}


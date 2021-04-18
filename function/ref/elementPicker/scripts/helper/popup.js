


function onSelectorClicked() {

    var message = document.querySelector('#message');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "selectionMode"}, function(response) {});

        if (document.getElementById('getSelector').innerText==="Enable Selector")
        document.getElementById('getSelector').innerText="Disable Selector";
        else
            document.getElementById('getSelector').innerText="Enable Selector"

    });

}

// window.onload = onWindowLoad;
document.getElementById('getSelector').addEventListener('click',onSelectorClicked)
document.getElementById('editing').addEventListener('click',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "editing"}, function(response) {});

        if (document.getElementById('editing').innerText==="Enable Editing")
            document.getElementById('editing').innerText="Disable Editing";
        else
            document.getElementById('editing').innerText="Enable Editing"

    });
})

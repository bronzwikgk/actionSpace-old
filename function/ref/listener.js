// KeyDown, KeyUp and KeyPress events
// If you want to respond to a key press then there are three events that you need to be aware of:

// KeyDown
// This event is triggered when a key is pressed.It is triggered for all keys, so it will be trigged when the user presses the shift key.
//     KeyUp
// This event is triggered when a key is depressed.
//     KeyPress
// This event is triggered when a key is sent to the browser.The shift, control and alt keys on their own do not generate a KeyPress event.
// Lets say that the user types a letter into a text box on a web page, then the order in which events are triggered would be: KeyDown, KeyPress, KeyUp.
console.log("Listener is up")


function createListeners(entity) {
    // console.log(entity);
    var events = find(entity, 'on');
    // console.log("events Found",events);
    var a = events.forEach(create);
    // console.log(a);
    save(events, this.constructor.name + "listeners");

    console.log("listernes created & Saved to local storagea at ", new Date().toLocaleString().replace(',', ''), this.constructor.name);

}






function KeyPressHappened(e) {
    if (!e) e = window.event;
    var code;
    if ((e.charCode) && (e.keyCode == 0)) {

        code = e.charCode

    } else {
        code = e.keyCode;
    }
    console.log(code)

}

document.onkeypress = KeyPressHappened;

// function listener(details) {
//     let filter = browser.webRequest.filterResponseData(details.requestId);
//     let decoder = new TextDecoder("utf-8");
//     let encoder = new TextEncoder();

//     filter.ondata = event => {
//         let str = decoder.decode(event.data, { stream: true });
//         // Just change any instance of Example in the HTTP response
//         // to WebExtension Example.
//         str = str.replace(/Example/g, 'WebExtension Example');
//         filter.write(encoder.encode(str));
//         filter.disconnect();
//     }

//     return {};
// }

// browser.webRequest.onBeforeRequest.addListener(
//     listener,
//     { urls: ["https://example.com/*"], types: ["main_frame"] },
//     ["blocking"]
// );
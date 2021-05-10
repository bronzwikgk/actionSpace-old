console.log("I am loaded")
const SCRIPT_TYPE = (() => {
    if (chrome && chrome.extension && chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() === window) {
        return 'BACKGROUND';
    } else if (chrome && chrome.extension && chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() !== window) {
        return 'POPUP';
    } else if (!chrome || !chrome.runtime || !chrome.runtime.onMessage) {
        return 'WEB';
    } else {
        return 'CONTENT';
    }
})();


chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
 //   chrome.alarms.create('refresh', { periodInMinutes: 3 });
});

// chrome.alarms.onAlarm.addListener((alarm) => {
//     console.log(alarm.name); // refresh
//     helloWorld();
// });

// function helloWorld() {
//     console.log("Hello, world!");
// }
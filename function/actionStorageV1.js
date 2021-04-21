
class StorageHelper {
    constructor() {
        //  this.entity = getEntityFromStorage()
        window.addEventListener('storage', (e) => {
            // When local storage changes, dump the list to
            // the console.
            console.log("storageChange",e, e.type);
        })
      //  console.log("here", arguments[0], arguments[1][arguments[0]],arguments)
        this.set(arguments);    //Can we store Objects
        this.entity = this.getStorage();
       // console.log("Storage >>>>>", this.entity );
    }
    getStorage() {
        return window.localStorage;
    }
    //Save2Storage takes 2 arguments
    //1 key: key Name
    //2. Value: any value
    static set() {
      //  console.log("I was called", arguments[0][0], arguments[0][1][arguments[0][0]])
        // data=JSON.stringify(data)
        //  console.log(actionStorageInstance);
         localStorage.setItem(arguments[0][0], JSON.stringify(arguments[0][1][arguments[0][0]]));
    }

    static get(key) {
        let data = localStorage.getItem(key)
        return JSON.parse(data);
    }
    static clearStorage() {
        localStorage.clear()
    }
    getMemoryUse(name, callback) {
        chrome.storage.local.getBytesInUse(name, callback);
    };
    static export(fileName, json) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], {
            type: "application/json"
        }));
        a.setAttribute("download", `${fileName}.json`);
        document.body.appendChild(a);
        a.click();
    }
}
//var storageHelperInstance = new StorageHelper();
//console.log("Iam loaded, and my name is storage helper")


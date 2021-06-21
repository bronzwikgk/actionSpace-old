(function () {


    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
    }; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    // check browser support for indexedDB
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
})();



class indexDB {
    static promisifyRequest(request) {
        return new Promise((resolve, reject) => {
            // @ts-ignore - file size hacks
            request.oncomplete = request.onsuccess = () => resolve(request.result);

            // @ts-ignore - file size hacks
            request.onabort = request.onerror = () => reject(request.error);
        });
    }
    static createDB(dbName, callback) {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = callback;
        const dbp = indexDB.promisifyRequest(request);
        return dbp;
    }



    static defaultGetStore() {
        if (!defaultGetStoreFunc) {
            defaultGetStoreFunc = indexDB.createStore('ActionSpaceEditor', function (event) {
                var db = event.target.result;

                var objStore = db.createObjectStore('Store');
            });
        }
        return defaultGetStoreFunc;
    }
    /**
     * Get a value by its key.
     *
     * @param key
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static get(key, customStore = indexDB.defaultGetStore()) {
        //        var response = customStore('readonly', get(key));
        var response = customStore('readonly', (store) => ActionEngine.promisifyRequest(store.get(key)))
        //var output = response.resolve();

        // console.log("get indexdb",response)
        return response;
    }
    /**
     * Set a value with a key.
     *
     * @param key
     * @param value
     * @param customStore Method to get a custom store. Use with caution (see the docs). Store: Object Data base to store in
     */
    static set(key, value, customStore = indexDB.defaultGetStore()) {
        return customStore('readwrite', (store) => {
            store.put(value, key);
            return ActionEngine.promisifyRequest(store.transaction);
        });
    }




}
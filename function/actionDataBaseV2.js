
class indexDB{
    static promisifyRequest(request) {
        return new Promise((resolve, reject) => {
            // @ts-ignore - file size hacks
            request.oncomplete = request.onsuccess = () => resolve(request.result);
         
            // @ts-ignore - file size hacks
            request.onabort = request.onerror = () => reject(request.error);
        });
    }
    static createStore(dbName, storeName) {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        const dbp = indexDB.promisifyRequest(request);
        return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
    }
    
    static defaultGetStore() {
        if (!defaultGetStoreFunc) {
            defaultGetStoreFunc = indexDB.createStore('ActionSpaceEditor', 'Store');
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

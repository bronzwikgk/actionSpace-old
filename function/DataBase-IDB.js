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

window.IndexedDataBase = class {
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
        const dbp = this.promisifyRequest(request);
        return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
    }

    static defaultGetStore() {
        if (!defaultGetStoreFunc) {
            defaultGetStoreFunc = this.createStore('ActionSpaceDefaultDB', 'defaultStore');
        }
        return defaultGetStoreFunc;
    }
    /**
     * Get a value by its key.
     *
     * @param key
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static get(key, customStore = this.defaultGetStore()) {
        return customStore('readonly', (store) => this.promisifyRequest(store.get(key)));
    }
    /**
     * Set a value with a key.
     *
     * @param key
     * @param value
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static set(key, value, customStore = this.defaultGetStore()) {
        return customStore('readwrite', (store) => {
            store.put(value, key);
            return this.promisifyRequest(store.transaction);
        });
    }
    /**
     * Set multiple values at once. This is faster than calling set() multiple times.
     * It's also atomic – if one of the pairs can't be added, none will be added.
     *
     * @param entries Array of entries, where each entry is an array of `[key, value]`.
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static setMany(entries, customStore = this.defaultGetStore()) {
        return customStore('readwrite', (store) => {
            entries.forEach((entry) => store.put(entry[1], entry[0]));
            return this.promisifyRequest(store.transaction);
        });
    }
    /**
     * Get multiple values by their keys
     *
     * @param keys
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static getMany(keys, customStore = this.defaultGetStore()) {
        return customStore('readonly', (store) => Promise.all(keys.map((key) => this.promisifyRequest(store.get(key)))));
    }
    /**
     * Update a value. This lets you see the old value and update it as an atomic operation.
     *
     * @param key
     * @param updater A callback that takes the old value and returns a new value.
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static update(key, updater, customStore = this.defaultGetStore()) {
        return customStore('readwrite', (store) =>
            // Need to create the promise manually.
            // If I try to chain promises, the transaction closes in browsers
            // that use a promise polyfill (IE10/11).
            new Promise((resolve, reject) => {
                store.get(key).onsuccess = function () {
                    try {
                        store.put(updater(this.result), key);
                        resolve(this.promisifyRequest(store.transaction));
                    } catch (err) {
                        reject(err);
                    }
                };
            }));
    }
    /**
     * Delete a particular key from the store.
     *
     * @param key
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static del(key, customStore = this.defaultGetStore()) {
        return customStore('readwrite', (store) => {
            store.delete(key);
            return this.promisifyRequest(store.transaction);
        });
    }
    /**
     * Clear all values in the store.
     *
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static clear(customStore = this.defaultGetStore()) {
        return customStore('readwrite', (store) => {
            store.clear();
            return this.promisifyRequest(store.transaction);
        });
    }

    static eachCursor(customStore, callback) {
        return customStore('readonly', (store) => {
            // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
            // And openKeyCursor isn't supported by Safari.
            store.openCursor().onsuccess = function () {
                if (!this.result)
                    return;
                callback(this.result);
                this.result.continue();
            };
            return this.promisifyRequest(store.transaction);
        });
    }
    /**
     * Get all keys in the store.
     *
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static keys(customStore = this.defaultGetStore()) {
        const items = [];
        return eachCursor(customStore, (cursor) => items.push(cursor.key)).then(() => items);
    }
    /**
     * Get all values in the store.
     *
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static values(customStore = this.defaultGetStore()) {
        const items = [];
        return eachCursor(customStore, (cursor) => items.push(cursor.value)).then(() => items);
    }
    /**
     * Get all entries in the store. Each entry is an array of `[key, value]`.
     *
     * @param customStore Method to get a custom store. Use with caution (see the docs).
     */
    static entries(customStore = this.defaultGetStore()) {
        const items = [];
        return eachCursor(customStore, (cursor) => items.push([cursor.key, cursor.value])).then(() => items);
    }
}

//export { clear, createStore, del, entries, get, getMany, keys, promisifyRequest, set, setMany, update, values };
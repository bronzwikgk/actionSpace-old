/**
 * It gets value at a `key` from Indexed DataBase (`IDB`).
 ** Initial Variables :- 
        ** `'DBName'`: Name of the DataBase,
        ** `'storeName'`: Name of the Store,
        ** `'key'`: key
 ** Return :- value present for the given `key` (if not present, `undefined`)
 */
var getFromIDB = {
    objectModel: 'IndexedDataBase',
    method: 'createStore',
    arguments: ['$l.DBName', '$l.storeName'],
    response: 'storeFunc',
    return: '$l.result',
    callback: {
        objectModel: 'IndexedDataBase',
        method: 'get',
        arguments: ['$l.key', '$l.storeFunc'],
        response: 'result',
        return: '$l.result'
    }
}

/**
 * It sets value at a `key` in Indexed DataBase (`IDB`).
 ** Initial Variables :- 
        ** `'DBName'`: Name of the DataBase,
        ** `'storeName'`: Name of the Store,
        ** `'key'`: key
        ** `'value'`: value
 */
var setToIDB = {
    objectModel: 'IndexedDataBase',
    method: 'createStore',
    arguments: ['$l.DBName', '$l.storeName'],
    response: 'storeFunc',
    callback: {
        objectModel: 'IndexedDataBase',
        method: 'set',
        arguments: ['$l.key', '$l.value', '$l.storeFunc'],
        response: 'result'
    }
}

/**
 * It sets handle (`FileSystemFileHandle`/`FileSystemDirectoryHandle`) at a `key ('uid')` in Indexed DataBase (`IDB`) and returns the stored handle.
 * It first generates a `uid` and then stors the handle.
 * It stores at Database `ActionSpaceDefaultDB`, and Store `fileOrDirHandles`.
 ** Initial Variables :- 
        ** `'handle'`: file/directory handle
 ** Return :- An array with first element as `key('uid')` (at which the handle is stored), and second element as `value('handle')`
 */
var storeHandleToIDB = {
    return: "$[l.uid, l.handle]",
    callback: [{
        condition: "$!l.uid",
        objectModel: 'CreateEntity',
        method: 'uniqueId',
        arguments: 20,
        response: 'uid',
    }, {
        condition: "$l.handle",
        declare: {
            'IDBSetReqArgs': {
                'DBName': 'ActionSpaceDefaultDB',
                'storeName': 'fileOrDirHandles',
                'key': '$l.uid',
                'value': '$l.handle'
            }
        },
        objectModel: 'ActionEngine',
        method: 'processRequest',
        arguments: ['setToIDB', '$l.IDBSetReqArgs'],
        callback: {
            declare: {
                'IDBGetReqArgs': {
                    'DBName': 'ActionSpaceDefaultDB',
                    'storeName': 'fileOrDirHandles',
                    'key': '$l.uid',
                }
            },
            objectModel: 'ActionEngine',
            method: 'processRequest',
            arguments: ['getFromIDB', '$l.IDBGetReqArgs'],
            response: 'handle',
        }
    }]
}

/**
 * It gets value (`FileSystemFileHandle`/`FileSystemDirectoryHandle`) at a `key ('uid')` in Indexed DataBase (`IDB`) and returns the `value('handle')`.
 * It gets from Database `ActionSpaceDefaultDB`, and Store `fileOrDirHandles`.
 ** Initial Variables :- 
        ** `'uid'`: `key('uid')` of file/directory handle in IDB
 ** Return :- returns the `value('handle')` at the given key.
 */
var getHandleFromIDB = {
    declare: {
        'IDBGetReqArgs': {
            'DBName': 'ActionSpaceDefaultDB',
            'storeName': 'fileOrDirHandles',
            'key': '$l.uid',
        }
    },
    objectModel: 'ActionEngine',
    method: 'processRequest',
    arguments: ['getFromIDB', '$l.IDBGetReqArgs'],
    response: 'handle',
    return: "$l.handle"
}
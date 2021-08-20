/*
{
    'DBName': <Name of the DataBase>,
    'storeName': <Name of the Store>,
    'key': <key>
}
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

/*
{
    'DBName': <Name of the DataBase>,
    'storeName': <Name of the Store>,
    'key': <key>,
    'value': <value>
}
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

/*
{
    'handle': <file/directory handle>
}
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

/*
{
    'uid': <uid for file/directory handle>
}
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
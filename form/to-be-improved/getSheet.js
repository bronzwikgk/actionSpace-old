
// var console = {
//     objectModel: 'console',
//     method: 'log'
// }

var getClientCredentials = {
    objectModel: 'window',
    method: 'showOpenFilePicker',
    arguments: {
        types: [{
            accept: {
                'application/json': ['.json']
            }
        }]
    },
    response: 'fileHandle',
    callback: {
        objectModel: '$l.fileHandle[0]',
        method: 'getFile',
        response: 'file',
        callback: {
            objectModel: '$l.file',
            method: 'text',
            response: 'result',
            callback: {
                objectModel: 'JSON',
                method: 'parse',
                arguments: '$l.result',
                response: 'credentials',
                callback: {
                    
                }
            }
        }
    }
}

// https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&client_id=340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/spreadsheets&redirect_uri=http://localhost:8000

var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    scope = 'https://www.googleapis.com/auth/spreadsheets',
    redirect_uri = 'http://localhost:8000';

var generateAuthCode = {
    objectModel: 'HttpReq',
    method: 'createReq',
    arguments: {
        type: 'GET',
        url: `https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`,
        asy: true
    },
    response: 'xhttp',
    callback: [{
            objectModel: 'HttpReq',
            method: 'setHandler',
            arguments: ['$l.xhttp', {
                res: (resp) => {
                    console.log(JSON.parse(resp.responseText));
                },
                rej: (err) => {
                    console.error(err);
                }
            }]
        },
        {
            objectModel: 'HttpReq',
            method: 'execReq'
        }
    ]
}

var sheetID = '1tbW8kQDAiUxTro7QkbnZ-3CJQuob3ZFigiRhsIkHalY',
    range = 'Sheet1',
    access_token = 'ya29.a0AfH6SMDcc7v-CPwkuVwcXSbblK-CHTB3iy6jmGdRh1kk3XvW7zwLAYX9n_s0kPVapLRmzMz7kCklBA4PUNXdsokDjnAgYjRBBGAK8dA7CN69HJ8suRXw94IJYAQ2PQlU9g6sicZA-tTvNrRUPZSCMc_UkMh_Ig';

var getDataWithAccessToken = {
    objectModel: 'HttpReq',
    method: 'createReq',
    arguments: {
        type: 'GET',
        url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}`,
        asy: true
    },
    response: 'xhttp',
    callback: [{
            objectModel: 'HttpReq',
            method: 'setHandler',
            arguments: ['$l.xhttp', {
                res: (resp) => {
                    console.log(resp.responseText);
                },
                rej: (err) => {
                    console.error(err);
                }
            }]
        },
        {
            objectModel: 'HttpReq',
            method: 'setHeaders',
            arguments: [{
                    Authorization: `Bearer ${access_token}`
                },
                '$l.xhttp'
            ],
            callback: {
                objectModel: 'HttpReq',
                method: 'execReq',
                arguments: '$l.xhttp'
            }
        }
    ]
}

var data = "grant_type=refresh_token&refresh_token=1//0gQqGzAE5tdqMCgYIARAAGBASNwF-L9Ir8OHcX7TJl6RgVpHDtbuMJ25-yuztjZYHcyPoGcMfXTF7uN0fLgOgwFMUlX9HiCSl1iI&client_id=340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com&client_secret=qFxEEvsHxlIXHDDcjKEnd-r_";

var generateAccessToken = {
    objectModel: 'HttpReq',
    method: 'createReq',
    arguments: {
        type: 'POST',
        url: `https://accounts.google.com/o/oauth2/token`,
        asy: true
    },
    response: 'xhttp',
    callback: [{
            objectModel: 'HttpReq',
            method: 'setHandler',
            arguments: ['$l.xhttp', {
                res: (resp) => {
                    console.log(JSON.parse(resp.responseText));
                },
                rej: (err) => {
                    console.error(err);
                }
            }]
        },
        {
            objectModel: 'HttpReq',
            method: 'setHeaders',
            arguments: [{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                '$l.xhttp'
            ],
            callback: {
                objectModel: 'HttpReq',
                method: 'execReq',
                arguments: [
                    '$l.xhttp',
                    data
                ]
            }
        }
    ]
}

// document.getElementById('clickBtn').onclick = function () {
//     ActionEngine.processRequest(getClientCredentials);
// }
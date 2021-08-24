var sheets_auth_scopes = ['https://www.googleapis.com/auth/spreadsheets'],
    sheetID = '1tbW8kQDAiUxTro7QkbnZ-3CJQuob3ZFigiRhsIkHalY',
    range = 'Sheet1';
// https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}
// var data = "grant_type=refresh_token&refresh_token=1//0gQqGzAE5tdqMCgYIARAAGBASNwF-L9Ir8OHcX7TJl6RgVpHDtbuMJ25-yuztjZYHcyPoGcMfXTF7uN0fLgOgwFMUlX9HiCSl1iI&client_id=340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com&client_secret=qFxEEvsHxlIXHDDcjKEnd-r_";

var getSheetData = {
    return: "$l.sheetsRespObj",
    callback: [{
        // condition: "$l.fromRedirect",
        // objectModel: "localStorage",
        // method: "removeItem",
        // arguments: "fromRedirect"
    }, {
        // condition: "$(!l.fromRedirect) || l.fromRedirect == 'true'", //login needs to be initiated
        declare: {
            "args": {
                "auth_scopes": "$sheets_auth_scopes.join(' ')"
            }
        },
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: ["generateAccessToken", "$l.args"],
    }, {
        objectModel: "localStorage",
        method: "getItem",
        arguments: "access_granted",
        response: "access_granted",
    }, {
        condition: "$!l.access_granted",
        // objectModel: "localStorage",
        // method: "getItem",
        // arguments: "login_data",
        // response: "accessData",
    }, {
        condition: "$l.access_granted == 'false'", // login unsuccessful
        objectModel: "console",
        method: "error",
        arguments: "Login Error",
        exit: true
    }, {
        condition: "$l.access_granted == 'true'", // login successful
        objectModel: "localStorage",
        method: "getItem",
        arguments: "access_data",
        response: "accessData",
        callback: [{
            condition: "$!l.accessData",
            objectModel: "localStorage",
            method: "removeItem",
            arguments: "access_granted",
            callback: {
                objectModel: "window",
                method: "alert",
                arguments: "Some error occured! Please try again."
            }
        }, {
            condition: "$l.accessData",
            objectModel: "JSON",
            method: "parse",
            arguments: "$l.accessData",
            response: "accessDataObj",
            callback: {
                condition: "$!operate.isUseless(l.accessDataObj)",
                declare: {
                    "data": "$l.accessDataObj"
                },
                callback: {
                    declare: {
                        "headers": {
                            "Authorization": "$l.data.token_type + ' ' + l.data.access_token"
                        }
                    },
                    objectModel: 'HttpService',
                    method: 'requestBuilder',
                    arguments: ["GET", "$l.headers"],
                    response: 'req',
                    callback: {
                        declare: {
                            "url": "$'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/' + range",
                        },
                        objectModel: 'HttpService',
                        method: 'fetchRequest',
                        arguments: ['$l.url', '$l.req'],
                        response: 'sheetsRespObj',
                        callback: [{ // Handle errors
                            condition: "$l.sheetsRespObj && l.sheetsRespObj.error",
                            declare: {
                                "err_code": "$l.sheetsRespObj.error.code",
                                "err_status": "$l.sheetsRespObj.error.status",
                                "err_msg": "$l.sheetsRespObj.error.message",
                                // "sheetsRespObj": "$undefined"
                            },
                            callback: [{
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "access_data"
                            }, {
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "access_granted"
                            }, {
                                objectModel: "console",
                                method: "error",
                                arguments: ["$'code: ' + l.err_code", "$'\\nstatus: ' + l.err_status", "$'\\nmessage: ' + l.err_msg"]
                            }, {
                                objectModel: "window",
                                method: "alert",
                                arguments: "Some error occured! Please try again.",
                                // condition: "$l.err_code == 401 && l.err_status == 'UNAUTHENTICATED'",
                                // objectModel: "ActionEngine",
                                // method: "processRequest",
                                // arguments: "generateAccessToken"
                            }]
                        }, { // Handle result
                            condition: "$l.sheetsRespObj",
                            objectModel: 'console',
                            method: 'log',
                            arguments: ['$l.sheetsRespObj']
                        }]
                    }
                }
            }
        }]
    }]
}
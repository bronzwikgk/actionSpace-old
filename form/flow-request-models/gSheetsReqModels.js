const sheets_auth_scopes = ['https://www.googleapis.com/auth/spreadsheets'];
var sheet_id = '<YOUR SHEET_ID HERE>',
    sheet_range = '<YOUR SHEET_RANGE HERE>';

/**
 * It gets data from the given sheet.
 ** Return :- data from sheet in 2d array's form.
 */
var getSheetData = {
    declare: {
        "args": {
            "authScopes": "$sheets_auth_scopes",
            "authType": "sheets",
            "dataKey": "sheets_access_data",
            "accessGrantIndKey": "sheets_access_granted",
            "url": "$'https://sheets.googleapis.com/v4/spreadsheets/' + sheet_id + '/values/' + sheet_range"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getData", "$l.args"],
    response: "response",
    return: "$l.response",
    callback: {
        condition: "$l.response",
        objectModel: "console",
        method: "log",
        arguments: "$l.response"
    }
}

/**
 * It sets data in the given sheet.
 ** Initial Variables :- 
 ** `'data'` : data which is to be set to sheet (in 2d array's form)
 */
var setData = {
    return: "$l.respObj",
    callback: [{
            objectModel: "localStorage",
            method: "getItem",
            arguments: "from_redirect",
            response: "fromRedirect",
        }, {
            objectModel: "localStorage",
            method: "getItem",
            arguments: "auth_type",
            response: "currAuthType"
        }, {
            //authorization needs to be initiated
            condition: "$(!l.fromRedirect) || (l.fromRedirect == 'true' && l.currAuthType == l.authType)",
            objectModel: "localStorage",
            method: "setItem",
            arguments: ["auth_type", "$l.authType"],
            callback: {
                declare: {
                    "args": {
                        "authScopes": "$operate.isArray(l.authScopes) ? l.authScopes.join(' ') : l.authScopes",
                        "dataKey": "$l.dataKey",
                        "accessGrantIndKey": "$l.accessGrantIndKey"
                    }
                },
                objectModel: "ActionEngine",
                method: "processRequest",
                arguments: ["generateAccessToken", "$l.args"],
            }
        }, {
            condition: "$l.fromRedirect && (!l.currAuthType || l.currAuthType == l.authType)",
            objectModel: "localStorage",
            method: "removeItem",
            arguments: "from_redirect"
        }, {
            condition: "$l.currAuthType == l.authType",
            objectModel: "localStorage",
            method: "removeItem",
            arguments: "auth_type"
        }, {
            objectModel: "localStorage",
            method: "getItem",
            arguments: "$l.accessGrantIndKey",
            response: "accessGranted",
        }, {
            condition: "$!l.accessGranted",
            // objectModel: "window",
            // method: "alert",
            // arguments: "Some error occured!! Please try again",
            // callback: [{
            //     objectModel: "localStorage",
            //     method: "removeItem",
            //     arguments: "auth",
            // }, {
            //     objectModel: "localStorage",
            //     method: "removeItem",
            //     arguments: "access_data",
            // }, {
            //     objectModel: "localStorage",
            //     method: "removeItem",
            //     arguments: "access_granted",
            // }, {
            //     objectModel: "localStorage",
            //     method: "removeItem",
            //     arguments: "from_redirect",
            // }]
        },
        {
            condition: "$l.accessGranted == 'false'", // login unsuccessful
            objectModel: "console",
            method: "error",
            arguments: "Login Error ! Please Try again",
            callback: {
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "$l.accessGrantIndKey"
            },
            exit: true
        },
        {
            condition: "$l.accessGranted == 'true'", // login successful
            objectModel: "localStorage",
            method: "getItem",
            arguments: "$l.dataKey",
            response: "accessTokenStr",
            callback: [{
                condition: "$!l.accessTokenStr",
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "$l.accessGrantIndKey",
                callback: {
                    objectModel: "window",
                    method: "alert",
                    arguments: "Some error occured! Please try again."
                }
            }, {
                condition: "$l.accessTokenStr",
                objectModel: "JSON",
                method: "parse",
                arguments: "$l.accessTokenStr",
                response: "accessTokenObj",
                callback: {
                    condition: "$!operate.isUseless(l.accessTokenObj)",
                    declare: {
                        "headers": "$l.addtnlHeaders ? l.addtnlHeaders : {}",
                        "headers.Authorization": "$l.accessTokenObj.token_type + ' ' + l.accessTokenObj.access_token"
                    },
                    objectModel: 'HttpService',
                    method: 'requestBuilder',
                    arguments: ["PUT", "$l.headers", "$l.body"],
                    response: 'req',
                    callback: {
                        declare: {
                            "url": "$l.url",
                        },
                        objectModel: 'HttpService',
                        method: 'fetchRequest',
                        arguments: ['$l.url', '$l.req'],
                        response: 'respObj',
                        callback: [{ // Handle errors
                            condition: "$l.respObj && l.respObj.error",
                            declare: {
                                "err_code": "$l.respObj.error.code",
                                "err_status": "$l.respObj.error.status",
                                "err_msg": "$l.respObj.error.message"
                            },
                            callback: [{
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "$l.dataKey"
                            }, {
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "$l.accessGrantIndKey"
                            }, {
                                objectModel: "console",
                                method: "error",
                                arguments: ["$'code: ' + l.err_code", "$'\\nstatus: ' + l.err_status", "$'\\nmessage: ' + l.err_msg"]
                            }, {
                                objectModel: "window",
                                method: "alert",
                                arguments: "Some error occured! Please try again.",
                            }]
                        }, { // Handle result
                            condition: "$l.respObj",
                            // objectModel: 'console',
                            // method: 'log',
                            // arguments: ['$l.respObj']
                        }]
                    }
                }
            }]
        }
    ]
}

var setSheetData = {
    declare: {
        "args": {
            "authScopes": "$sheets_auth_scopes",
            "authType": "sheets",
            "dataKey": "sheets_access_data",
            "accessGrantIndKey": "sheets_access_granted",
            "url": "$'https://sheets.googleapis.com/v4/spreadsheets/' + sheet_id + '/values/' + sheet_range",
            "body": "$valueObj"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["setData", "$l.args"]
}
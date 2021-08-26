var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    client_secret = 'qFxEEvsHxlIXHDDcjKEnd-r_',
    redirect_uri = 'http://127.0.0.1:5500/v3/redirect.html',
    login_auth_scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

/**
 * It generates Authorization code by redirecting page to google login page.
 ** Initial Variables :-
        ** `'auth_scopes'` : <scopes for which authrization code needs to be generated (in string)>
 */
var generateAuthCode = {
    declare: {
        "url": "$'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id='+ client_id + '&scope=' + l.auth_scopes + '&redirect_uri=' + redirect_uri"
    },
    objectModel: "location",
    method: "assign",
    arguments: "$l.url"
};

/**
 * It generates Access token by sending (fetch) POST request to google uri.
 ** Initial Variables :-
        ** `'authScopes'` : <scopes for which authrization code needs to be generated (in string)>
        ** `'dataKey'` : <name of key, in which object containing access token is to be stored in localStorage>
        ** `'accessGrantIndKey'` : <name of key, indicating grant of access (true/false) is to be stored in localStorage>
 */
var generateAccessToken = [{
        objectModel: "localStorage",
        method: "getItem",
        arguments: "auth",
        response: "auth",
        callback: [{
            condition: "$!l.auth",
            declare: {
                "args": {
                    "auth_scopes": "$l.authScopes"
                }
            },
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: ["generateAuthCode", "$l.args"],
        }, {
            condition: "$l.auth",
            objectModel: "JSON",
            method: "parse",
            arguments: "$l.auth",
            response: "authObj",
            callback: {
                declare: {
                    "args": {
                        "grant_type": "authorization_code",
                        "code": "$l.authObj.code",
                        "client_id": "$client_id",
                        "client_secret": "$client_secret",
                        "redirect_uri": "$redirect_uri"
                    }
                },
                objectModel: 'HttpService',
                method: "buildEncodedUri",
                arguments: "$l.args",
                response: "paramsUri",
                callback: [{
                    declare: {
                        "headers": {
                            "Content-type": "application/x-www-form-urlencoded"
                        }
                    },
                    objectModel: 'HttpService',
                    method: 'requestBuilder',
                    arguments: ["POST", "$l.headers", "$l.paramsUri"],
                    response: 'req',
                    callback: {
                        declare: {
                            "url": "https://accounts.google.com/o/oauth2/token",
                        },
                        objectModel: 'HttpService',
                        method: 'fetchRequest',
                        arguments: ['$l.url', '$l.req'],
                        response: 'accessGrantResp',
                        callback: [{
                            objectModel: "localStorage",
                            method: "removeItem",
                            arguments: "auth"
                        }, { // Handle errors
                            condition: "$l.accessGrantResp && l.accessGrantResp.error",
                            declare: {
                                "err_type": "$l.accessGrantResp.error",
                                "err_msg": "$l.accessGrantResp.error_description"
                            },
                            callback: [{
                                objectModel: "localStorage",
                                method: "setItem",
                                arguments: ["$l.accessGrantIndKey", "false"]
                            }, {
                                objectModel: "console",
                                method: "error",
                                arguments: ["$'error: ' + l.err_type", "$'\\nmessage: ' + l.err_msg"]
                            }, {
                                objectModel: "window",
                                method: "alert",
                                arguments: "$l.err_type + ' : ' + l.err_msg",
                                // objectModel: "ActionEngine",    // this could result in infinite looping
                                // method: "processRequest",
                                // arguments: "generateAuthCode",
                                // exit: true,
                            }]
                        }, { // Handle result
                            condition: "$l.accessGrantResp && l.accessGrantResp.access_token",
                            objectModel: "JSON",
                            method: "stringify",
                            arguments: "$l.accessGrantResp",
                            response: "accessGrantRespStr",
                            callback: [{
                                objectModel: "localStorage",
                                method: "setItem",
                                arguments: ["$l.accessGrantIndKey", "true"]
                            }, {
                                objectModel: 'localStorage',
                                method: 'setItem',
                                arguments: ["$l.dataKey", '$l.accessGrantRespStr'],
                            }]
                        }]
                    }
                }]
            }
        }]
    },

]

/**
 * It gets data form the url provided.
 ** Return :- object containing above info with some other info.
 ** Initial Variables :-
        ** `'authScopes'` : <scopes for which authrization code needs to be generated (in array/string)>
        ** `'authType'` : <purpose/type of fetch Request like 'login', 'sheets', etc. >
        ** `'dataKey'` : <name of key, in which object containing access token is to be stored in localStorage>
        ** `'accessGrantIndKey'` : <name of key, indicating grant of access (true/false) is to be stored in localStorage>
        ** `'url'` : <url from where data is to be fetched, after successful authorization>
 */
var getData = {
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
                        "headers": {
                            "Authorization": "$l.accessTokenObj.token_type + ' ' + l.accessTokenObj.access_token"
                        }
                    },
                    objectModel: 'HttpService',
                    method: 'requestBuilder',
                    arguments: ["GET", "$l.headers"],
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


var getUserLoginInfo = {
    declare: {
        "args": {
            "authScopes": "$login_auth_scopes",
            "authType": "login",
            "dataKey": "login_access_data",
            "accessGrantIndKey": "login_access_granted",
            "url": "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getData", "$l.args"],
    response: "response",
    return: "$l.response"
}

var setUserInfo = [{
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getUserLoginInfo",
    response: "userInfoObj"
}, {
    condition: "$l.userInfoObj && !l.userInfoObj.error",
    callback: [{
        objectModel: "document",
        method: "getElementById",
        arguments: "userInfo",
        response: "userInfoElem"
    }, {
        condition: "$l.userInfoElem",
        declare: {
            "linkElem": "$l.userInfoElem.children[1].children[0]",
            "linkElem.innerText": "Profile",
            "props": {
                "data-action-value": "dashBoardView"
            }
        },
        objectModel: "CreateEntity",
        method: "setProps",
        arguments: ["$l.linkElem", "$l.props"]
    }, {
        condition: "$l.userInfoElem",
        declare: {
            "imgElem": "$l.userInfoElem.children[0]",
            "imgElem.title": "$l.userInfoObj.name + '\\n' + l.userInfoObj.email",
            "url": "$l.userInfoObj.picture"
        },
        objectModel: 'HttpService',
        method: 'fetchRequest',
        arguments: ['$l.url', '$undefined', 'blob'],
        response: 'imgBlob',
        callback: {
            objectModel: "URL",
            method: "createObjectURL",
            arguments: "$l.imgBlob",
            response: "imgObjUrl",
            callback: {
                declare: {
                    "imgElem.src": "$l.imgObjUrl"
                }
            }
        }
    }]
}]
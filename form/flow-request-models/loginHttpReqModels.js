var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    client_secret = 'qFxEEvsHxlIXHDDcjKEnd-r_',
    redirect_uri = 'https://bronzwikgk.github.io/actionSpace/redirect.html',
    login_auth_scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

var generateAuthCode = {
    declare: {
        "url": "$'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id='+ client_id + '&scope=' + l.auth_scopes + '&redirect_uri=' + redirect_uri"
    },
    objectModel: "location",
    method: "assign",
    arguments: "$l.url"
};

var generateAccessToken = [{
        objectModel: "localStorage",
        method: "getItem",
        arguments: "auth",
        response: "auth",
        callback: [{
            condition: "$!l.auth",
            declare: {
                "args": {
                    "auth_scopes": "$l.auth_scopes"
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
                                arguments: ["access_granted", "false"]
                            }, {
                                objectModel: "console",
                                method: "error",
                                arguments: ["$'error: ' + l.err_type", "$'\\nmessage: ' + l.err_msg"]
                            }, {
                                objectModel: "window",
                                method: "alert",
                                arguments: "$l.err_type + ' : ' + l.err_msg",
                                // objectModel: "ActionEngine",
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
                                arguments: ["access_granted", "true"]
                            }, {
                                objectModel: 'localStorage',
                                method: 'setItem',
                                arguments: ["access_data", '$l.accessGrantRespStr'],
                            }]
                        }]
                    }
                }]
            }
        }]
    },

]

var getUserLoginInfo = {
    objectModel: "localStorage",
    method: "getItem",
    arguments: "from_redirect",
    response: "fromRedirect",
    return: "$l.userInfoObj",
    callback: [{
            condition: "$l.fromRedirect",
            objectModel: "localStorage",
            method: "removeItem",
            arguments: "from_redirect"
        }, {
            condition: "$(!l.fromRedirect) || l.fromRedirect == 'true'", //login needs to be initiated
            declare: {
                "args": {
                    "auth_scopes": "$login_auth_scopes.join(' ')"
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
            objectModel: "window",
            method: "alert",
            arguments: "Some error occured!!\tPlease try again",
            callback: [{
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "auth",
            }, {
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "access_data",
            }, {
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "access_granted",
            }, {
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "from_redirect",
            }]
        },
        {
            condition: "$l.access_granted == 'false'", // login unsuccessful
            objectModel: "console",
            method: "error",
            arguments: "Login Error",
            exit: true
        },
        {
            condition: "$l.access_granted == 'true'", // login successful
            objectModel: "localStorage",
            method: "getItem",
            arguments: "access_data",
            response: "loginData",
            callback: [{
                condition: "$!l.loginData",
                objectModel: "localStorage",
                method: "removeItem",
                arguments: "access_granted",
                callback: {
                    objectModel: "window",
                    method: "alert",
                    arguments: "Some error occured! Please try again."
                }
            }, {
                condition: "$l.loginData",
                objectModel: "JSON",
                method: "parse",
                arguments: "$l.loginData",
                response: "loginDataObj",
                callback: {
                    condition: "$!operate.isUseless(l.loginDataObj)",
                    declare: {
                        "data": "$l.loginDataObj"
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
                                "url": "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                            },
                            objectModel: 'HttpService',
                            method: 'fetchRequest',
                            arguments: ['$l.url', '$l.req'],
                            response: 'userInfoObj',
                            callback: [{ // Handle errors
                                condition: "$l.userInfoObj && l.userInfoObj.error",
                                declare: {
                                    "err_code": "$l.userInfoObj.error.code",
                                    "err_status": "$l.userInfoObj.error.status",
                                    "err_msg": "$l.userInfoObj.error.message"
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
                                }]
                            }, { // Handle result
                                condition: "$l.userInfoObj",
                                // objectModel: 'console',
                                // method: 'log',
                                // arguments: ['$l.userInfoObj']
                            }]
                        }
                    }
                }
            }]
        }
    ]
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
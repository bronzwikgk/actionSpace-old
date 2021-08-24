var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    client_secret = 'qFxEEvsHxlIXHDDcjKEnd-r_',
    redirect_uri = 'https://bronzwikgk.github.io/actionSpace/redirect.html',
    login_auth_scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

var generateAuthCode = {
    declare: {
        "url": "$'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id='+ client_id + '&scope=' + login_auth_scopes.join(' ') + '&redirect_uri=' + redirect_uri"
    },
    objectModel: "location",
    method: "assign",
    arguments: "$l.url"
};

var generateAccessToken = [{
        objectModel: "localStorage",
        method: "getItem",
        arguments: "login_auth",
        response: "auth",
        callback: [{
            condition: "$!l.auth",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "generateAuthCode",
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
                        response: 'signinResp',
                        callback: [{
                            objectModel: "localStorage",
                            method: "removeItem",
                            arguments: "login_auth"
                        }, { // Handle errors
                            condition: "$l.signinResp && l.signinResp.error",
                            declare: {
                                "err_type": "$l.signinResp.error",
                                "err_msg": "$l.signinResp.error_description"
                            },
                            callback: [{
                                objectModel: "localStorage",
                                method: "setItem",
                                arguments: ["loggedIn", "false"]
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
                            condition: "$l.signinResp && l.signinResp.access_token",
                            objectModel: "JSON",
                            method: "stringify",
                            arguments: "$l.signinResp",
                            response: "loginDataStr",
                            callback: [{
                                objectModel: "localStorage",
                                method: "setItem",
                                arguments: ["loggedIn", "true"]
                            }, {
                                objectModel: 'localStorage',
                                method: 'setItem',
                                arguments: ["login_data", '$l.loginDataStr'],
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
    arguments: "fromRedirect",
    response: "fromRedirect",
    return: "$l.userInfoObj",
    callback: [{
        condition: "$l.fromRedirect",
        objectModel: "localStorage",
        method: "removeItem",
        arguments: "fromRedirect"
    }, {
        condition: "$(!l.fromRedirect) || l.fromRedirect == 'true'", //login needs to be initiated
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: "generateAccessToken",
    }, {
        objectModel: "localStorage",
        method: "getItem",
        arguments: "loggedIn",
        response: "loggedIn",
    }, {
        condition: "$!l.loggedIn",
        // objectModel: "localStorage",
        // method: "getItem",
        // arguments: "login_data",
        // response: "loginData",
    }, {
        condition: "$l.loggedIn == 'false'", // login unsuccessful
        objectModel: "console",
        method: "error",
        arguments: "Login Error",
        exit: true
    }, {
        condition: "$l.loggedIn == 'true'", // login successful
        objectModel: "localStorage",
        method: "getItem",
        arguments: "login_data",
        response: "loginData",
        callback: [{
            condition: "$!l.loginData",
            objectModel: "localStorage",
            method: "removeItem",
            arguments: "loggedIn",
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
                                "err_msg": "$l.userInfoObj.error.message",
                                // "userInfoObj": "$undefined"
                            },
                            callback: [{
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "login_data"
                            }, {
                                objectModel: "localStorage",
                                method: "removeItem",
                                arguments: "loggedIn"
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
                            condition: "$l.userInfoObj",
                            // objectModel: 'console',
                            // method: 'log',
                            // arguments: ['$l.userInfoObj']
                        }]
                    }
                }
            }
        }]
    }]
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
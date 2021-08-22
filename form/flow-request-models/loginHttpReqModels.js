var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    client_secret = 'qFxEEvsHxlIXHDDcjKEnd-r_',
    redirect_uri = 'http://127.0.0.1:5500/v3/redirect.html',
    auth_scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

var generateAuthCode = {
    declare: {
        "url": "$'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id='+ client_id + '&scope=' + auth_scopes.join(' ') + '&redirect_uri=' + redirect_uri"
    },
    objectModel: "window.location",
    method: "assign",
    arguments: "$l.url"
};

var generateAccessToken = [{
    objectModel: "$window.localStorage",
    method: "getItem",
    arguments: "login_auth",
    response: "auth",
    callback: [{
        condition: "$!l.auth",
        objectModel: "ActionEngine",
        method: "processRequest",
        arguments: "generateAuthCode",
        exit: true,
    }, {
        condition: "$l.auth",
        objectModel: "$window.JSON",
        method: "parse",
        arguments: "$l.auth",
        response: "authObj"
    }]
}, {
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
            callback: [{ // Handle errors
                condition: "$l.signinResp && l.signinResp.error",
                declare: {
                    "err_type": "$l.signinResp.error",
                    "err_msg": "$l.signinResp.error_description"
                },
                callback: [{
                    objectModel: "console",
                    method: "error",
                    arguments: ["$'error: ' + l.err_type", "$'\\nmessage: ' + l.err_msg"]
                }, {
                    condition: "$l.err_type == 'invalid_grant'",
                    objectModel: "ActionEngine",
                    method: "processRequest",
                    arguments: "generateAuthCode",
                    exit: true,
                }]
            }, { // Handle result
                condition: "$l.signinResp && l.signinResp.access_token",
                declare: {
                    "loginStats": {
                        "loggedIn": "$true",
                        "loggedData": "$l.signinResp"
                    }
                },
                objectModel: '$window.localStorage',
                method: 'setItem',
                arguments: ["login_stats", '$JSON.stringify(l.loginStats)']
            }, {
                // condition: "$!(l.signinResp && l.signinResp.ok)",
                // objectModel: 'window',
                // method: 'alert',
                // arguments: "$!l.signinResp || !l.signinResp.ok",
                // exit: true
            }]
        }
    }]
}]

var getUserLoginInfo = {
    return: "$l.signinResp",
    callback: [{
        objectModel: "$window.localStorage",
        method: "getItem",
        arguments: "login_stats",
        response: "loginStats",
        callback: [{
            condition: "$!l.loginStats",
            objectModel: "ActionEngine",
            method: "processRequest",
            arguments: "generateAccessToken",
        }, {
            condition: "$l.loginStats",
            objectModel: "$window.JSON",
            method: "parse",
            arguments: "$l.loginStats",
            response: "loginStatsObj"
        }]
    }, {
        condition: "$l.loginStats && l.loginStatsObj.loggedIn",
        declare: {
            "data": "$l.loginStatsObj.loggedData"
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
                response: 'signinResp',
                callback: [{ // Handle errors
                    condition: "$l.signinResp && l.signinResp.error",
                    declare: {
                        "err_code": "$l.signinResp.error.code",
                        "err_status": "$l.signinResp.error.status",
                        "err_msg": "$l.signinResp.error.message"
                    },
                    callback: [{
                        objectModel: "console",
                        method: "error",
                        arguments: ["$'code: ' + l.err_code", "$'\\nstatus: ' + l.err_status", "$'\\nmessage: ' + l.err_msg"]
                    }, {
                        condition: "$l.err_code == 401 && l.err_status == 'UNAUTHENTICATED'",
                        objectModel: "ActionEngine",
                        method: "processRequest",
                        arguments: "generateAccessToken"
                    }]
                }, { // Handle result
                    condition: "$l.signinResp",
                    objectModel: 'console',
                    method: 'log',
                    arguments: ['$l.signinResp']
                }]
            }
        }
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
    },{
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
        declare: {
            "imgElem": "$l.userInfoElem.children[0]",
            "imgElem.title": "$l.userInfoObj.name",
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
/**
 * It gets user login info
 ** Return :- object with user name, user email(google), etc.
 */
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

/**
 * It sets the user's info to top right user's icon
 */
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
                },
                // objectModel: "URL",
                // method: "revokeObjectURL",
                // arguments: "$l.imgObjUrl"
            }
        }
    }]
}]
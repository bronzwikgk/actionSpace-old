/**
 * It creates and sets a card with user info (from google login)
 */
var setCardInfo = [{
    objectModel: "localStorage",
    method: "setItem",
    arguments: ["from_redirect", "false"],
}, {
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: "getUserLoginInfo",
    response: "userInfoObj"
}, {
    condition: "$l.userInfoObj && !l.userInfoObj.error",
    callback: [{
        objectModel: "document",
        method: "querySelector",
        arguments: ".card",
        response: "cardElem"
    }, {
        declare: {
            "nameElem": "$l.cardElem.children[1]",
            "eIdElem": "$l.cardElem.children[2]",
            "idElem": "$l.cardElem.children[3]",
            "contactElem": "$l.cardElem.lastElementChild",
            "nameElem.innerText": "$l.userInfoObj.name",
            "eIdElem.innerText": "$l.userInfoObj.email",
            "idElem.innerText": "$l.userInfoObj.id",
            "contactElem.href": "$'mailto:'+l.userInfoObj.email"
        }
    }, {
        declare: {
            "imgElem": "$l.cardElem.children[0]",
            "imgElem.title": "$l.userInfoObj.name",
            "imgElem.alt": "$l.userInfoObj.name",
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
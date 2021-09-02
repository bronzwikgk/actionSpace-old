const drive_auth_scopes = ["https://www.googleapis.com/auth/drive.file"];
var queryStr = "";

/**
 * It gets data from the gdrive from the given `'queryStr'`.
 */
var getDriveData = {
    declare: {
        "args": {
            "authScopes": "$drive_auth_scopes",
            "authType": "drive",
            "dataKey": "drive_access_data",
            "accessGrantIndKey": "drive_access_granted",
            "url": "$'https://www.googleapis.com/drive/v3/files?q=' + queryStr",
            "addtnlHeaders": {
                "Accept": "application/json"
            }
        }
    },
    objectModel: "ActionEngine",
    method: "processRequest",
    arguments: ["getData", "$l.args"],
    response: "response",
    callback: {
        condition: "$l.response",
        objectModel: "console",
        method: "log",
        arguments: "$l.response"
    }
}
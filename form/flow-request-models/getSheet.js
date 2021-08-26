var sheets_auth_scopes = ['https://www.googleapis.com/auth/spreadsheets'],
    sheetID = '1tbW8kQDAiUxTro7QkbnZ-3CJQuob3ZFigiRhsIkHalY',
    range = 'Sheet1';
// `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}`

var getSheetData = {
    declare: {
        "args": {
            "authScopes": "$sheets_auth_scopes",
            "authType": "sheets",
            "dataKey": "sheets_access_data",
            "accessGrantIndKey": "sheets_access_granted",
            "url": "$'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/' + range"
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
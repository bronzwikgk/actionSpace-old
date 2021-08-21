 var httpService = {
     urlBuilder: HttpService.urlBuilder,
     requestBuilder: HttpService.requestBuilder,
     fetchRequest: HttpService.fetchRequest,
 };
 var ActionControllerObject = {
     onChangeRoute: ActionController.onChangeRoute,
     createScripts: ActionController.createScripts
 };
 var ActionViewObject = {
     addInnerHTML: ActionView.addInnerHTML,
     addInnerText: ActionView.addInnerText,
     newEntity: ActionView.newEntity,
     closeModal: ActionView.closeModal,
     GDriveFileSupportedInEditor: ActionView.GDriveFileSupportedInEditor,
     viewForm: ActionView.viewForm
 };
 var EntityV1Object = {
     toJSON: EntityV1.toJSON
 };
 var mutateObject = {
     Obj2: mutate.Obj2,
     TWODARRAY: mutate.TWODARRAY
 };
 var indexDBObject = {
     set: indexDB.set,
     get: indexDB.get
 };
 var operateObject = {
     isInsideArray: operate.isInsideArray,
     add: operate.add,
     isNotEmpty: operate.isNotEmpty
 };
 var AuthorizationObject = {
     authToken: Authorization.authToken
 };
 var SignUpRequest = [{
         response: 'GetUsername',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["username"],
     },
     {
         response: 'GetPassword',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["password"],
     },
     {
         declare: {
             'paramsJSON': {
                 'Username': '$l.GetUsername.value',
                 'Password': '$l.GetPassword.value'
             }
         }
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["POST", undefined, '$l.paramsJSON']
     },
     {
         response: 'SignUpResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$scriptURL', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.SignUpResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't send request to the server . Try Again !"],
         exit: true
     },
     {
         response: 'AlertUserAboutResponse',
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.SignUpResponse.output']
     },
     {
         condition: "$l.SignUpResponse.result !== 'Success'",
         response: 'ResetForm',
         objectModel: 'document',
         method: "getElementById",
         arguments: ['regForm'],
         callback: {
             objectModel: '$l.ResetForm',
             method: 'reset'
         }
     },
     {
         condition: "$l.SignUpResponse.result == 'Success'",
         response: 'SetLoggedIn',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['LoggedIn', true],
     },
     {
         condition: "$l.SignUpResponse.result == 'Success'",
         response: 'RedirectingToActionSpaceEditor',
         objectModel: 'ActionControllerObject',
         method: 'onChangeRoute',
         arguments: ["action"],
     }
 ];
 var loginRequest = [{
         response: 'GetUsername',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["username"],
     },
     {
         response: 'GetPassword',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["password"],
     },
     {
         response: 'ParametersForLoginRequest',
         declare: {
             'paramsJSON': {
                 'Username': '$l.GetUsername.value',
                 'Password': '$l.GetPassword.value'
             }
         }
     },
     {
         response: 'URLBuilder',
         objectModel: 'httpService',
         method: 'urlBuilder',
         arguments: ['$scriptURL', '$l.paramsJSON']
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["GET"]
     },
     {
         response: 'LoginResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLBuilder', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.LoginResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't send request to the server . Try Again !"],
         exit: true
     },
     {
         response: 'AlertUserAboutResponse',
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.LoginResponse.output']
     },
     {
         condition: "$l.LoginResponse.result !== 'Success'",
         response: 'ResetForm',
         objectModel: 'document',
         method: "getElementById",
         arguments: ['regForm'],
         callback: {
             objectModel: '$l.ResetForm',
             method: 'reset'
         }
     },
     {
         condition: "$l.LoginResponse.result == 'Success'",
         response: 'SetLoggedIn',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['LoggedIn', true],
     },
     {
         condition: "$l.LoginResponse.result == 'Success'",
         response: 'RedirectingToActionSpaceEditor',
         objectModel: 'ActionControllerObject',
         method: 'onChangeRoute',
         arguments: ["action"],
     }
 ];
 var exportToSheetRequest = [{
         response: 'GetSpreadsheetId',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["spreadsheetID"],
     },
     {
         response: 'GetSheetName',
         objectModel: 'document',
         method: "getElementById",
         arguments: ['sheetName'],
     },
     {
         response: 'EditorElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ['inlineContent'],
     },
     {
         response: 'HtmlJson',
         objectModel: 'EntityV1Object',
         method: 'toJSON',
         arguments: ['$l.EditorElement', '$copy2HTMLModel'],
         callback: {
             declare: {
                 inputJSON: {
                     'editor': '$l.HtmlJson'
                 }
             },
         }
     },
     {
         response: 'Array',
         objectModel: 'mutateObject',
         method: 'Obj2',
         arguments: ['$l.inputJSON', []],
         callback: {
             response: 'Exact2dArray',
             objectModel: 'mutateObject',
             method: 'TWODARRAY',
             arguments: ['$l.Array']
         }
     },
     {
         response: 'ParametersForExportToSheet',
         declare: {
             'paramsJSON': {
                 'SpreadsheetId': '$l.GetSpreadsheetId.value',
                 'SheetName': '$l.GetSheetName.value',
                 'array': '$l.Exact2dArray',
             }
         }
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["POST", undefined, '$l.paramsJSON']
     },
     {
         response: 'ResponseExportToSheet',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$scriptURL', '$l.RequestBuilder']
     },
     {
         response: 'AlertUser',
         condition: "$l.SignUpResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.ResponseExportToSheet.output']
     },
     {
         response: 'closeModal',
         objectModel: 'ActionViewObject',
         method: 'closeModal'
     },
 ];
 var importFromSheetRequest = [{
         response: 'FormElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["viewForm"],
     },
     {
         response: 'EditorElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
     },
     {
         response: 'GetSpreadsheetId',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["spreadsheetID"],
     },
     {
         response: 'GetNamedRange',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["NamedRange"],
     },
     {
         response: 'SetParameters',
         declare: {
             paramJSON: {
                 'SpreadsheetId': '$l.GetSpreadsheetId.value',
                 'NamedRange': '$l.GetNamedRange.value'
             }
         }
     },
     {
         response: 'URLBuilder',
         objectModel: 'httpService',
         method: 'urlBuilder',
         arguments: ['$scriptURL', '$l.paramJSON']
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["GET"]
     },
     {
         response: 'ImportFromSheetResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLBuilder', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.ImportFromSheetResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't get data from server . Try Again !"],
     },
     // {
     //     response:'AlertUserAboutResponse',
     //     condition:"$l.ImportFromSheetResponse.result !== 'Success'",
     //     objectModel:'window',
     //     method:'alert',
     //     arguments:['$l.ImportFromSheetResponse.output']
     // },
     {
         response: "RemoveImportFromSheetForm",
         objectModel: 'ActionViewObject',
         method: 'addInnerHTML',
         arguments: ['', '$l.FormElement']
     },
     {
         response: 'SetSampleStory2',
         condition: "$l.ImportFromSheetResponse == undefined",
         objectModel: 'ActionViewObject',
         method: 'addInnerHTML',
         arguments: ['$sampleIntroStory', '$l.EditorElement'],
         exit: true
     },
     {
         response: 'GotJSONData',
         condition: "$l.ImportFromSheetResponse.result == 'Success'",
         objectModel: 'processFSInstance',
         method: 'jsonForTableView',
         arguments: ['$l.ImportFromSheetResponse.output'],
         callback: {
             response: 'SetDataFromSheet',
             objectModel: 'ActionViewObject',
             method: 'newEntity',
             arguments: ['$l.GotJSONData', '$l.EditorElement']
         },
         exit: true,
     },
     {
         response: 'SetSampleStory1',
         objectModel: 'ActionViewObject',
         method: 'addInnerHTML',
         arguments: ['$sampleIntroStory', '$l.EditorElement']
     }
 ]
 var getActionStoriesRequest = [{
         response: 'GetSpreadsheetId',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["SpreadsheetId"],
     },
     {
         response: 'GetNamedRange',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["NamedRange"],
     },
     {
         response: 'SetParameters',
         declare: {
             paramJSON: {
                 'SpreadsheetId': '$l.GetSpreadsheetId.value',
                 'NamedRange': '$l.GetNamedRange.value'
             }
         }
     },
     {
         response: 'URLBuilder',
         objectModel: 'httpService',
         method: 'urlBuilder',
         arguments: ['$scriptURL', '$l.paramJSON']
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["GET"]
     },
     {
         response: 'ActionStoriesResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLBuilder', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.ActionStoriesResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't get Action Stories . Try Again !"],
         exit: true
     },
     {
         response: 'AlertUserAboutResponse',
         condition: "$l.ActionStoriesResponse.result !== 'Success'",
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.ActionStoriesResponse.output'],
         exit: true
     },
     {
         response: 'EditorElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
         callback: {
             objectModel: '$l.EditorElement',
             method: 'setAttribute',
             arguments: ['fileid', 'cardView']
         }
     },
     {
         response: 'JSONForCards',
         objectModel: 'processFSInstance',
         method: 'ActionStories',
         arguments: ['$l.ActionStoriesResponse.output']
     },
     {
         response: 'AutoSync',
         objectModel: 'processFSInstance',
         method: 'AutoSync'
     }
 ];
 var getGoogleDriveFolderRequest = [{
         response: 'EditorElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
     },
     {
         response: 'FormElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["viewForm"],
     },
     {
         response: 'GetfolderName',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["folderName"],
     },
     {
         response: 'SetParameters',
         declare: {
             paramJSON: {
                 'SearchFolderName': '$l.GetfolderName.value'
             }
         }
     },
     {
         response: 'URLBuilder',
         objectModel: 'httpService',
         method: 'urlBuilder',
         arguments: ['$scriptURL', '$l.paramJSON']
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["GET"]
     },
     {
         response: 'GDriveFolderResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLBuilder', '$l.RequestBuilder']
     },
     {
         response: "RemoveGoogleDriveForm",
         objectModel: 'ActionViewObject',
         method: 'addInnerHTML',
         arguments: ['', '$l.FormElement']
     },
     {
         response: 'SetSampleStory',
         objectModel: 'ActionViewObject',
         method: 'addInnerHTML',
         arguments: ['$sampleIntroStory', '$l.EditorElement'],
     },
     {
         response: 'RequestNotSent',
         condition: "$l.GDriveFolderResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't get Google Drive Folder . Try Again !"],
         exit: true
     },
     {
         response: 'AlertUserAboutResponse',
         condition: "$l.GDriveFolderResponse.result !== 'Success'",
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.GDriveFolderResponse.output'],
         exit: true
     },
     {
         response: 'HTML_JSON',
         objectModel: 'processFSInstance',
         method: 'jsonForGDriveFolder',
         arguments: ['$l.GDriveFolderResponse.output', JSON.parse(JSON.stringify({}))]
     },
     {
         response: 'CollectionElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["myCollection"],
     },
     {
         response: 'NewEntity',
         objectModel: 'ActionViewObject',
         method: 'newEntity',
         arguments: ['$l.HTML_JSON', '$l.CollectionElement'],
     },
     {
         response: 'SetUsermyCollection',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['UsermyCollection', '$l.CollectionElement.innerHTML']
     }
 ];
 var newFileRequest = [{
         response: 'SaveContent',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveFileRequest']
     },
     {
         response: 'MakeAnEntryInRecentFiles',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$recentFilesRequest']
     },
     {
         response: "EditorElement",
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
     },
     {
         response: 'UID',
         objectModel: 'window',
         method: 'uid'
     },
     {
         response: 'SetAttribute1',
         objectModel: '$l.EditorElement',
         method: 'setAttribute',
         arguments: ['fileid', '$l.UID'],
         callback: {
             response: 'SetAttribute2',
             objectModel: '$l.EditorElement',
             method: 'setAttribute',
             arguments: ['from', 'LocalStorage'],
             callback: {
                 response: 'SetAttribute3',
                 objectModel: '$l.EditorElement',
                 method: 'setAttribute',
                 arguments: ['nameoffile', '$l.UID']
             }
         }
     },
     {
         response: "NewActionStory",
         objectModel: 'ActionViewObject',
         method: "addInnerHTML",
         arguments: ['$ehhIntro', '$l.EditorElement']
     }
 ];
 var saveLocalStorageFileRequest = [{
         response: 'NameOfTheFile',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['nameOfFile']
     },
     {
         condition: '$l.NameOfTheFile == l.FileID',
         response: 'ActionStoryName',
         objectModel: 'window',
         method: 'prompt',
         arguments: ['Enter the Name for Action Story !'],
         callback: {
             objectModel: '$l.EditorElement',
             method: 'setAttribute',
             arguments: ['nameOfFile', '$l.ActionStoryName'],
         }
     },
     {
         declare: {
             localStorageJSON: {
                 'Name': '$l.NameOfTheFile',
                 'Data': '$l.EditorElement.innerText',
             }
         },
         callback: {
             response: 'StringifyJSON',
             objectModel: 'JSON',
             method: 'stringify',
             arguments: ['$l.localStorageJSON']
         }
     },
     {
         response: 'Store',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['$l.FileID', '$l.StringifyJSON']
     }
 ];
 var saveFSFileRequest = [{
         response: "FileHandleFromIndexDB",
         objectModel: 'indexDBObject',
         method: 'get',
         arguments: ["$l.FileID"],
     },
     {
         response: 'Writable',
         objectModel: "$l.FileHandleFromIndexDB",
         method: "createWritable",
         callback: {
             response: 'SaveFileData',
             objectModel: '$l.Writable',
             method: 'write',
             arguments: ['$l.EditorElement.innerText'],
             callback: {
                 response: "closeWritable",
                 objectModel: '$l.Writable',
                 method: 'close'
             }
         }
     }
 ];
 var saveGDriveFileRequest = [{
         declare: {
             bodyJSON: {
                 'FileId': '$l.FileID',
                 'content': '$l.EditorElement.innerText'
             }
         },
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["POST", undefined, '$l.bodyJSON']
     },
     {
         response: 'SaveFileContentResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$scriptURL', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.SaveFileContentResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Couldn't update File in Google Drive !Try Again :-)"],
         exit: true
     },
     {
         response: 'AlertUserAboutResponse',
         condition: "$l.SaveFileContentResponse.result !== 'Success'",
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.SaveFileContentResponse.output'],
     }
 ];
 var saveFileRequest = [{
         response: "EditorElement",
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
     },
     {
         response: 'ID',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['fileid']
     },
     {
         response: 'DeclaringAVariable',
         declare: {
             parameterJSON: {
                 "EditorElement": '$l.EditorElement',
                 'FileID': '$l.ID'
             }
         }
     },
     {
         response: 'FileIsFrom',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['from']
     },
     {
         response: 'LocalStorageFile',
         condition: "$l.FileIsFrom == 'LocalStorage'",
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveLocalStorageFileRequest', '$l.parameterJSON'],
         exit: true
     },
     {
         response: 'FileFromFileSystem',
         condition: "$l.FileIsFrom == 'FS'",
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveFSFileRequest', '$l.parameterJSON'],
         exit: true
     },
     {
         response: 'FileFromGDrive',
         condition: "$l.FileIsFrom == 'GDrive'",
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveGDriveFileRequest', '$l.parameterJSON'],
     }
 ];
 var recentFilesRequest = [{
         response: "EditorElement",
         objectModel: 'document',
         method: "getElementById",
         arguments: ["inlineContent"],
     },
     {
         response: 'FileID',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['fileid']
     },
     {
         response: "If FileID doesn't exist",
         condition: '$l.FileID.length == 0',
         objectModel: 'console',
         method: 'log',
         arguments: ["File ID is empty"],
         exit: true
     },
     {
         response: 'FileIsFrom',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['from'],
     },
     {
         response: 'NameOfFile',
         objectModel: '$l.EditorElement',
         method: 'getAttribute',
         arguments: ['nameOfFile'],
     },
     {
         response: 'RecentFilesArray',
         objectModel: 'indexDBObject',
         method: 'get',
         arguments: ['RecentFiles'],
     },
     {
         condition: '$l.RecentFilesArray == undefined',
         response: 'ArrayValue',
         objectModel: 'console',
         method: 'log',
         arguments: ['$l.RecentFilesArray'],
         callback: {
             declare: {
                 '$l.RecentFilesArray': []
             }
         }
     },
     {
         response: 'RecentFilesElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ["RecentFiles"],
     },
     {
         response: 'CheckWhetherFileIDExist',
         objectModel: 'operateObject',
         method: 'isInsideArray',
         arguments: ["$l.FileID", "$l.RecentFilesArray"]
     },
     {
         condition: "$l.CheckWhetherFileIDExist == true",
         objectModel: 'console',
         method: 'log',
         arguments: ["Mentioned File ID already exist's in Recent Files"],
         exit: true
     },
     {
         response: 'IncludeFileIDInRecentFiles',
         condition: "$l.CheckWhetherFileIDExist == false",
         objectModel: '$l.RecentFilesArray',
         method: 'unshift',
         arguments: ['$l.FileID'],
     },
     {
         response: 'RemoveAnItem',
         condition: '$l.RecentFilesArray.length == 11',
         objectModel: '$l.RecentFilesArray',
         method: 'shift',
     },
     {
         response: 'RemovingChildNodes',
         condition: '$l.RecentFilesElement.childNodes.length == 10',
         objectModel: '$l.RecentFilesElement',
         method: 'removeChild',
         arguments: ['$l.RecentFilesElement.childNodes[0]']
     },
     {
         declare: {
             fileJSON: {
                 "id": '$l.FileID',
                 "textContent": '$l.NameOfFile',
                 'from': '$l.FileIsFrom',
                 "class": "item row",
                 "name": "li",
                 "data-command": `[{"command":"file"}]`,
             }
         },
         callback: {
             declare: {
                 input: {
                     '$l.FileID': '$l.fileJSON'
                 }
             },
             response: 'NewEntity',
             objectModel: 'ActionViewObject',
             method: 'newEntity',
             arguments: ['$l.input', '$l.RecentFilesElement']
         }

     },
     {
         response: 'SetRecentFilesInLocalStorage',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['UserRecentFiles', "$l.RecentFilesElement.innerHTML"]
     },
     {
         response: 'setRecentFilesInIndexDB',
         objectModel: 'indexDBObject',
         method: 'set',
         arguments: ['RecentFiles', '$l.RecentFilesArray']
     }
 ];
 var OpenAFileRequest = [{
         response: 'SaveContent',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveFileRequest']
     },
     {
         response: 'MakeAnEntryInRecentFiles',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$recentFilesRequest']
     },
     {
         response: 'GetAFile',
         objectModel: 'window',
         method: 'showOpenFilePicker',
     },
     {
         response: 'UID',
         objectModel: 'window',
         method: 'uid',
         callback: {
             response: 'SetFileHandleToFileID',
             objectModel: 'indexDBObject',
             method: 'set',
             arguments: ["$l.UID", "$l.GetAFile[0]"]
         }
     },
     {
         response: 'file',
         objectModel: "$l.GetAFile[0]",
         method: 'getFile'
     },
     {
         response: "myFilesElement",
         objectModel: 'document',
         method: 'getElementById',
         arguments: ['myFiles']
     },
     {
         declare: {
             fileJSON: {
                 "class": "item row",
                 "name": "li",
                 "data-command": `[{"command":"file"}]`,
                 "id": '$l.UID',
                 "textContent": '$l.file.name',
                 'from': 'FS',
             }
         },
         callback: {
             declare: {
                 inputJSON: {
                     '$l.UID': '$l.fileJSON'
                 }
             },
             response: 'NewEntity',
             objectModel: 'ActionViewObject',
             method: 'newEntity',
             arguments: ['$l.inputJSON', "$l.myFilesElement"]
         }
     },
     {
         reqName: 'SetUsermyFilesLocalStorage',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['UsermyFiles', "$l.myFilesElement.innerHTML"]
     },
     {
         response: 'OpeningFileInEditor',
         objectModel: 'processFSInstance',
         method: 'OpenFileInEditor',
         arguments: ['$l.UID']
     }
 ];
 var GDriveFileContentRequest = [{
         response: 'CheckFileTypeSupport',
         objectModel: 'ActionViewObject',
         method: 'GDriveFileSupportedInEditor',
         arguments: ['$l.EVENT.target.innerText']
     },
     {
         reqName: 'Alert User',
         condition: "$l.CheckFileTypeSupport == false",
         objectModel: 'window',
         method: 'alert',
         arguments: ['Work In Progress !'],
         exit: true
     },
     {
         declare: {
             paramJSON: {
                 'FileId': '$l.EVENT.target.id'
             }
         },
         response: 'URLBuilder',
         objectModel: 'httpService',
         method: 'urlBuilder',
         arguments: ['$scriptURL', '$l.paramJSON']
     },
     {
         response: 'RequestBuilder',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ["GET"]
     },
     {
         response: 'GDriveFileContentResponse',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLBuilder', '$l.RequestBuilder']
     },
     {
         response: 'RequestNotSent',
         condition: "$l.GDriveFileContentResponse == undefined",
         objectModel: 'window',
         method: 'alert',
         arguments: ["Clouldn't send request to the server . Try Again !"],
         exit: true
     },
     {
         condition: "$l.GDriveFileContentResponse.result !== 'Success'",
         response: 'AlertUserAboutResponse',
         objectModel: 'window',
         method: 'alert',
         arguments: ['$l.GDriveFileContentResponse.message'],
         exit: true
     },
     {
         response: 'EditorElement',
         objectModel: 'document',
         method: 'getElementById',
         arguments: ['inlineContent']
     },
     {
         response: 'SetFILEID',
         objectModel: '$l.EditorElement',
         method: 'setAttribute',
         arguments: ['fileid', '$l.EVENT.target.id']
     },
     {
         response: 'SetFileFrom',
         objectModel: '$l.EditorElement',
         method: 'setAttribute',
         arguments: ['from', 'GDrive'],
     },
     {
         response: 'SetNameOfFile',
         objectModel: '$l.EditorElement',
         method: 'setAttribute',
         arguments: ['nameoffile', '$l.EVENT.target.innerText'],
     },
     {
         response: 'ContentOfFileInEditor',
         objectModel: 'ActionViewObject',
         method: 'addInnerText',
         arguments: ['$l.GDriveFileContentResponse.content', '$l.EditorElement']
     }

 ];
 var AddACollectionRequest = [{
         response: 'parentHandle',
         objectModel: 'window',
         method: 'showDirectoryPicker',
     },
     {
         response: "TakeUserPermission",
         objectModel: 'processFSInstance',
         method: 'verifyPermission',
         arguments: ['$l.parentHandle', true],
     },
     {
         condition: "$l.TakeUserPermission == 'false'",
         objectModel: 'console',
         method: 'log',
         arguments: ["User didn't allow permission"],
         exit: true
     },
     {
         response: 'UID',
         objectModel: 'window',
         method: 'uid'
     },
     {
         response: 'SetFileHandleTOUID',
         objectModel: 'indexDBObject',
         method: 'set',
         arguments: ['$l.UID', '$l.parentHandle']
     },
     {
         declare: {
             directoryJSON: {
                 'li': {
                     'name': 'li',
                     'span': {
                         'name': 'span',
                         'class': 'parent',
                         "textContent": '$l.parentHandle.name', //inner Text will be included
                     },
                     'list': {
                         'name': 'ul',
                         'class': 'nested',
                         'id': '$l.UID' //id - Unique ID with which directory handle of this folder can ke retrieved from indexDB
                     }
                 }
             }
         },
     },
     {
         respons: "jsonForDirectory",
         objectModel: 'processFSInstance',
         method: 'jsonForDirectory',
         arguments: ['$l.directoryJSON.li.list', '$l.parentHandle']
     },
     {
         response: 'CollectionElement',
         objectModel: 'document',
         method: 'getElementById',
         arguments: ['myCollection']
     },
     {
         response: 'newEntity',
         objectModel: 'ActionViewObject',
         method: 'newEntity',
         arguments: ['$l.directoryJSON', '$l.CollectionElement']
     },
     {
         response: 'SetUsermyCollection',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['UsermyCollection', '$l.CollectionElement.innerHTML']
     }
 ];
 var EachFileRequest = [{
         response: 'SaveContent',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveFileRequest']
     },
     {
         response: 'MakeAnEntryInRecentFiles',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$recentFilesRequest']
     },
     {
         condition: "$l.from !== 'GDrive'",
         reqName: "OpenInEditor",
         objectModel: 'processFSInstance',
         method: 'OpenFileInEditor',
         arguments: ['$l.event.target.id'],
         exit: true
     },
     {
         declare: {
             params: {
                 'EVENT': '$l.event',
             }
         },
         response: 'OpenGDriveFileInEditor',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$GDriveFileContentRequest', '$l.params']
     }
 ];
 var viewFormRequest = [{
         response: 'SaveContent',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$saveFileRequest']
     },
     {
         response: 'MakeAnEntryInRecentFiles',
         objectModel: 'actionengine',
         method: 'processRequest',
         arguments: ['$recentFilesRequest']
     },
     {
         response: 'EditorElement',
         objectModel: 'document',
         method: "getElementById",
         arguments: ['inlineContent'],
         callback: {
             response: 'RemoveFileID',
             objectModel: '$l.EditorElement',
             method: 'setAttribute',
             arguments: ['fileid', ''],
             callback: {
                 response: 'RemoveNameOfFile',
                 objectModel: '$l.EditorElement',
                 method: 'setAttribute',
                 arguments: ['nameoffile', ''],
                 callback: {
                     response: 'RemoveFrom',
                     objectModel: '$l.EditorElement',
                     method: 'setAttribute',
                     arguments: ['from', '']
                 }
             }
         }
     },
     {
         response: 'FORM',
         objectModel: 'ActionViewObject',
         method: 'viewForm',
         arguments: ['$l.event', '$l.entity']
     }
 ];
 var publishAppsScriptProject = [{
         response: 'AuthorizationToken',
         objectModel: 'AuthorizationObject',
         method: 'authToken',
         callback: {
             declare: {
                 headerJSON: {
                     'Accept': 'application/json',
                     'Authorization': '$l.AuthorizationToken'
                 },
                 ExtraParameters1: {
                     withCredentials: true,
                     credentials: 'include'
                 },
                 ExtraParameters2: {
                     withCredentials: true,
                 }
             },
             response: 'RenderActionSpace',
             objectModel: 'ActionControllerObject',
             method: 'onChangeRoute',
             arguments: ['action']
         }
     },
     {
         response: 'RequestToCopySheets',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ['POST', '$l.headerJSON', undefined, '$l.ExtraParameters1']
     },
     {
         response: 'ResponseToCopySheets',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['https://www.googleapis.com/drive/v2/files/1qTU9AIyukBXFNrgITRlPoDQEjhkWz_E_bUm5uqmLu4g/copy', '$l.RequestToCopySheets']
     },
     {
         condition: '$l.ResponseToCopySheets.id.length > 0',
         declare: {
             BodyToCreateProject: {
                 "title": "ActionSpaceEditor",
                 "parentId": 'ResponseToCopySheets.id'
             }
         },
         response: 'RequestToCreateProject',
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ['POST', '$l.headerJSON', '$l.BodyToCreateProject', '$l.ExtraParameters2'],
         exit: true
     },
     {
         response: 'ResponseToCreateProject',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ["https://script.googleapis.com/v1/projects/", '$l.RequestToCreateProject']
     },
     {
         condition: '$l.ResponseToCreateProject.scriptId.length > 0',
         response: 'URLToCreateScripts',
         objectModel: 'operateObject',
         method: 'add',
         arguments: ['https://script.googleapis.com/v1/projects/', '$l.ResponseToCreateProject.scriptId', '/content'],
         exit: true
     },
     {
         response: 'obj',
         objectModel: 'ActionControllerObject',
         method: 'createScripts',
         callback: {
             response: 'RequestToCreateScripts',
             objectModel: 'httpService',
             method: 'requestBuilder',
             arguments: ["PUT", '$l.headerJSON', "$l.obj", '$l.ExtraParameters2']
         }
     },
     {
         response: 'ResponseToCreateScripts',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLToCreateScripts', '$l.RequestToCreateScripts']
     },
     {
         response: 'CheckResponseToCreateScripts',
         objectModel: 'operateObject',
         method: 'isNotEmpty',
         arguments: ['$l.ResponseToCreateScripts']
     },
     {
         condition: '$l.CheckResponseToCreateScripts == true',
         reqName: 'URLToCreateVersion',
         objectModel: 'operateObject',
         method: 'add',
         arguments: ["https://script.googleapis.com/v1/projects/", '$l.ResponseToCreateProject.scriptId', "/versions"],
         exit: true
     },
     {
         response: 'RequestToCreateVersion',
         declare: {
             BodyCreateVersion: {
                 versionNumber: 1,
                 description: "ActionSpaceScriptsV1"
             }
         },
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ['POST', '$l.headerJSON', '$l.BodyCreateVersion', '$l.ExtraParameters2']
     },
     {
         response: 'ResponseToCreateVersion',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLToCreateVersion', '$l.RequestToCreateVersion']
     },
     {
         response: 'CheckResponseToCreateVersion',
         objectModel: 'operateObject',
         method: 'isNotEmpty',
         arguments: ['$l.ResponseToCreateVersion']
     },
     {
         condition: '$l.CheckResponseToCreateVersion == true',
         reqName: 'URLToDeployProject',
         objectModel: 'operateObject',
         method: 'add',
         arguments: ["https://script.googleapis.com/v1/projects/", '$l.ResponseToCreateProject.scriptId', "/deployments"],
         exit: true
     },
     {
         reqName: 'RequestToDeployProject',
         declare: {
             BodyDeployProject: {
                 versionNumber: 1,
                 manifestFileName: "appsscript",
                 description: "ActionSpaceScriptsV1"
             }
         },
         objectModel: 'httpService',
         method: 'requestBuilder',
         arguments: ['POST', '$l.headerJSON', '$l.BodyDeployProject', '$l.ExtraParameters2']
     },
     {
         response: 'ResponseToDeployProject',
         objectModel: 'httpService',
         method: 'fetchRequest',
         arguments: ['$l.URLToDeployProject', '$l.RequestToDeployProject']
     },
     {
         condition: '$l.ResponseToDeployProject.deploymentId.length > 0',
         response: 'DeployedURL',
         objectModel: 'operateObject',
         method: 'add',
         arguments: ['https://script.google.com/macros/s/', '$l.ResponseToDeployProject.deploymentId', '/exec'],
         exit: true
     },
     {
         response: 'SetClientNodeURL',
         objectModel: 'localStorage',
         method: 'setItem',
         arguments: ['ClientNodeURL', '$l.DeployedURL']
     },
     {
         response: 'InformUserAboutStatus',
         objectModel: 'window',
         method: 'alert',
         arguments: ['Your Appscript project has been deployed. :-)']
     }
 ];
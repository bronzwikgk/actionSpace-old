# A quick guide for location of different resources

## constants & variables

| Name                     | Type  | Proto    | Line No. | File                                                                    | Comment              |
| ------------------------ | ----- | -------- | -------- | ----------------------------------------------------------------------- | -------------------- |
| init                     | var   | Function | 63       | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | initiation           |
| getPage                  | var   | Function | 27       | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | --                   |
| pageReqModels            | var   | Object   | 9        | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | pageUI-route mapping |
| useHash                  | const | Boolean  | 1        | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | --                   |
| routes                   | const | Array    | 3        | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | possible page routes |
| pageAssocReq             | var   | Object   | 1        | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | --                   |
| checkLogin               | var   | Object   | 12       | [RoutingService-SPA.js](./function/RoutingService-SPA.js)               | --                   |
| generalUi                | var   | Object   | 31       | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getEditorElementSet      | var   | Object   | 58       | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| newTabLink               | var   | Object   | 94       | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| switchToTab              | var   | Object   | 126      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| openTab                  | var   | Object   | 164      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| newEntityReqFlow         | var   | Object   | 200      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | create new Entity    |
| openFileInEditor         | var   | Object   | 312      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getUserInputFile         | var   | Object   | 377      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| closeTab                 | var   | Object   | 426      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getUserInputDir          | var   | Object   | 462      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| setUserInputDir          | var   | Object   | 497      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| itrDirItems              | var   | Object   | 569      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| enumContents             | var   | Object   | 600      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| addFileToFilesNavigation | var   | Object   | 674      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| addDirToFilesNavigation  | var   | Object   | 708      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| initFS                   | var   | Object   | 734      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| makePath                 | var   | Object   | 836      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getHandleFromDirHandle   | var   | Object   | 865      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getFileContent           | var   | Object   | 913      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| saveFileReqFlow          | var   | Object   | 970      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| exportFile               | var   | Object   | 734      | [flowRequestModels.js](./form/flow-request-models/flowRequestModels.js) | --                   |
| getTrueTarget            | var   | Object   | 8        | [eventReqModels.js](./form/flow-request-models/eventReqModels.js)       | --                   |
| handleClickEvent         | var   | Object   | 38       | [eventReqModels.js](./form/flow-request-models/eventReqModels.js)       | --                   |
| client_id                | const | String   | 1        | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| client_secret            | const | String   | 2        | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| redirect_uri             | const | String   | 3        | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| login_auth_scopes        | const | Array    | 4        | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| generateAuthCode         | var   | Object   | 14       | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| generateAccessToken      | var   | Object   | 30       | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| getData                  | var   | Object   | 145      | [gAuthReqModels.js](./form/flow-request-models/gAuthReqModels.js)       | --                   |
| drive_auth_scopes        | const | String   | 1        | [gDriveReqModels.js](./form/flow-request-models/gDriveReqModels.js)     | --                   |
| queryStr                 | var   | String   | 2        | [gDriveReqModels.js](./form/flow-request-models/gDriveReqModels.js)     | --                   |
| getDriveData             | var   | Object   | 7        | [gDriveReqModels.js](./form/flow-request-models/gDriveReqModels.js)     | --                   |
| getUserLoginInfo         | var   | Object   | 5        | [gLoginReqModels.js](./form/flow-request-models/gLoginReqModels.js)     | --                   |
| setUserInfo              | var   | Object   | 25       | [gLoginReqModels.js](./form/flow-request-models/gLoginReqModels.js)     | --                   |
| sheets_auth_scopes       | const | String   | 1        | [gSheetsReqModels.js](./form/flow-request-models/gSheetsReqModels.js)   | --                   |
| sheet_id                 | var   | String   | 2        | [gSheetsReqModels.js](./form/flow-request-models/gSheetsReqModels.js)   | --                   |
| sheet_range              | var   | String   | 3        | [gSheetsReqModels.js](./form/flow-request-models/gSheetsReqModels.js)   | --                   |
| getSheetData             | var   | Object   | 9        | [gSheetsReqModels.js](./form/flow-request-models/gSheetsReqModels.js)   | --                   |
| setSheetData             | var   | Object   | 37       | [gSheetsReqModels.js](./form/flow-request-models/gSheetsReqModels.js)   | --                   |
| getFromIDB               | var   | Object   | 9        | [idbReqModels.js](./form/flow-request-models/idbReqModels.js)           | --                   |
| setToIDB                 | var   | Object   | 32       | [idbReqModels.js](./form/flow-request-models/idbReqModels.js)           | --                   |
| storeHandleToIDB         | var   | Object   | 53       | [idbReqModels.js](./form/flow-request-models/idbReqModels.js)           | --                   |
| getHandleFromIDB         | var   | Object   | 97       | [idbReqModels.js](./form/flow-request-models/idbReqModels.js)           | --                   |
| switchLogInOrSignup      | var   | Object   | 4        | [login_addtnl.js](./form/flow-request-models/login_addtnl.js)           | --                   |
| initWorkflowUI           | var   | Object   | 4        | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| addNewWorkflowItem       | var   | Object   | 53       | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| itrWorkflowNodeChildren  | var   | Object   | 94       | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| setWorkflowItems         | var   | Object   | 120      | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| getHeapNode              | var   | Object   | 173      | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| switchWorkflowDoc        | var   | Object   | 201      | [workflow_addtnl.js](./form/flow-request-models/workflow_addtnl.js)     | --                   |
| setCardInfo              | var   | Object   | 4        | [dashboard_addtnl.js](./form/flow-request-models/dashboard_addtnl.js)   | --                   |

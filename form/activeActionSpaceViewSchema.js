
var activeActionSpaceViewModel = [
    {
        keyword: 'welcome',
        name: 'homePage',
        id: 'ehhhomePage',
        actorRole: 'all',
        model: basicWebLayoutVisitorV1,  
    },
    {
        keyword: 'action',
        name: 'actionWorkSpace',
        id: 'actionWorkSpace',
        actorRole: 'user',
        model: actionLayoutUserV3,
    },
    {
        keyword: 'people',
        name: 'peopleSpace',
        id: 'peopleSpace',
        actorRole: 'user',
        model: peopleLayoutUserV3,
    },
    {
        keyword: 'setting',
        name: 'settingSpace',
        id: 'settingSpace',
        actorRole: 'user',
        model: settingLayoutUserV3,
    },
    {
        keyword: 'login',
        name: 'loginSpace',
        id: 'loginSpace',
        actorRole: 'user',
        //model: basicWebLayoutVisitorV1,
        model: basicLoginLayoutVisitorV1,
    },
    {
        keyword: 'signup',
        name: 'signupSpace',
        id: 'signupSpace',
        actorRole: 'visitor',
        model: basicsignUpLayoutVisitorV1,
    },
]
//console.log(actionSpaceViewModel)
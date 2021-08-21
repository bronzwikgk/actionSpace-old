var client_id = '340849040042-3oe5g1cnjtp2fvvqu7nk1lsabmkfo3dn.apps.googleusercontent.com',
    scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    redirect_uri = 'http://127.0.0.1:5500/v3/index.html';

/* var generateAuthCode = {
    objectModel: 'HttpReq',
    method: 'createReq',
    arguments: {
        type: 'GET',
        url: `https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`,
        asy: true
    },
    response: 'xhttp',
    callback: [{
            objectModel: 'HttpReq',
            method: 'setHandler',
            arguments: ['$l.xhttp', {
                res: (resp) => {
                    console.log(JSON.parse(resp.responseText));
                },
                rej: (err) => {
                    console.error(err);
                }
            }]
        },
        {
            objectModel: 'HttpReq',
            method: 'execReq'
        }
    ]
}

{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }*/

var generateAuthCode = [{
    objectModel: 'HttpService',
    method: 'requestBuilder',
    arguments: ["GET"],
    response: 'req',
}, {
    declare: {
        "url": "$'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&response_type=code&client_id='+ client_id + '&scope=' + scope + '&redirect_uri=' + redirect_uri",
    },
    objectModel: 'httpService',
    method: 'fetchRequest',
    arguments: ['$l.url', '$l.req'],
    response: 'signinResp'
}, {
    condition: "$l.signinResp == undefined",
    objectModel: 'window',
    method: 'alert',
    arguments: "Couldn't send request to the server . Try Again !",
    exit: true
}, {
    objectModel: 'window',
    method: 'alert',
    arguments: '$l.signinResp.output'
},
// {
//     condition: "$l.signinResp.result == 'Success'",
//     objectModel: 'localStorage',
//     method: 'setItem',
//     arguments: ['LoggedIn', true],
//     response: ''
// },
// {
//     condition: "$l.signinResp.result == 'Success'",
//     response: 'RedirectingToActionSpaceEditor',
//     objectModel: 'ActionControllerObject',
//     method: 'onChangeRoute',
//     arguments: ["action"],
// }
]
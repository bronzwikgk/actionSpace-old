const useHash = true;
var apiUrl = 'https://bronzwikgk.github.io/actionSpace';
var routes = ['editorView', 'cardView', 'listView', 'dashBoardView', 'outputView', 'signInView'];
// const rootElem = document.getElementById("root");

// Temporary solution

var pageReqModels = {
  '': 'editorUI',
  'editorView': 'editorUI',
  'signInView': 'loginUI',
  'dashBoardView': 'dashBoardUI'
};

/*
{
    'page': <name of page view (should be any one out of 'routes' array items)>
}
*/

/* var getPage = [{
  objectModel: 'document',
  method: 'getElementById',
  arguments: 'root',
  response: 'rootElem',
}, {
  declare: {
    'rootElem.innerHTML': '',
    'args': {
      'pageReqModel': '$pageReqModels[l.page]'
    }
  },
  objectModel: 'ActionEngine',
  method: 'processRequest',
  arguments: ['generalUi', '$l.args'],
}, {
  declare: {
    'data': {
      'content': '$l.rootElem.innerHTML',
      'title': '$l.page'
    },
    'title': '$l.page + " | EHH"',
    'url': '$useHash ? "#" + l.page : l.page'
  },
  objectModel: 'window.history',
  method: 'pushState',
  arguments: ['$l.data', '$l.title', '$l.url']
}] */

// Solution after Integration of backend

// var getPage = {
//     declare: {
//         'url': '$apiUrl + "/" + l.page',
//         'reqParams': {
//             method: 'GET',
//             cache: 'no-cache',
//         }
//     },
//     objectModel: 'HttpService',
//     method: 'fetchRequest',
//     arguments: ['$l.url', '$l.reqParams'],
//     response: 'resp',
//     callback: {
//         declare: {
//             'data': {
//                 'content': '$l.resp.content',
//                 'title': '$l.resp.title + " | EHH"'
//             },
//             'pageUrl': '$useHash ? "#" + l.page : l.page',
//         },
//         objectModel: 'window.history',
//         method: 'pushState',
//         arguments: ['$l.data', '$l.data.title', '$l.url']
//     }
// }

/* var processPage = [{
  declare: {
    "separator": "$useHash ? '#' : '/'"
  },
  objectModel: "$window.location.hash",
  method: "split",
  arguments: "$l.separator",
  response: "pageArr",
  callback: {
    objectModel: "$l.pageArr",
    method: "pop",
    response: "pageName"
  }
}, {
  condition: "$operate.isInsideArray(l.pageName, routes)",
  declare: {
    "args": {
      "page": "$l.pageName"
    }
  },
  objectModel: "ActionEngine",
  method: "processRequest",
  arguments: ["getPage", "$l.args"]
}] */

var handlePopStateEvent = [{
  objectModel: "document",
  method: "getElementById",
  arguments: "root",
  response: "rootElem"
}, {
  declare: {
    "state": "$l.event.state",
    "rootElem.innerHTML": "$l.state.content"
  }
}]

var evtPopState = {
  objectModel: 'eventManager',
  method: 'addRequestListener',
  arguments: ['$window', 'popstate', 'handlePopStateEvent']
}

/* var loadUi = [{
  condition: "$document.readyState != 'loading'",
  objectModel: "ActionEngine",
  method: "processRequest",
  arguments: "processPage"
}, {
  condition: "$document.readyState == 'loading'",
  objectModel: 'eventManager',
  method: 'addRequestListener',
  arguments: ['$window', 'DOMContentLoaded', 'processPage']
}] */

var getPage = function (page) {

  var separator = useHash ? "#" : "/";

  if (page[0] == separator) page = page.slice(1);

  page = page.split('?');

  if (routes.indexOf(page[0]) < 0) {
    console.error('Page Not Found: ', page[0]);
    return;
  }

  const rootElem = document.getElementById('root'),
    title = `${page[0]} | EHH`;
  rootElem.innerHTML = '';

  ActionEngine.processRequest('generalUi', {
    'pageReqModel': pageReqModels[page[0]]
  });

  window.history.pushState({
    'content': rootElem.innerHTML,
    'title': title
  }, title, separator + page[0]);

  // ActionEngine.processRequest('getUserLoginInfo');
};

(function (fn = function () {

  var separator = useHash ? "#" : "/",
    page = window.location.hash.split(separator).pop().split('?');

  if (routes.indexOf(page[0]) < 0) page[0] = routes[0];

  page = page.join('?');

  window.getPage(page);
}) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})();
 
/* (function(fn = function() {
    const page = useHash ?
      window.location.hash.split('#').pop() :
      window.location.href.split('/').pop();
      ActionEngine.processRequest('getPage', {
          'page': page
      })
    // get(routes.indexOf(page) >= 0 ? page : routes[0]);
  }) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  })(); */

// //////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

const useHash = true;
const apiUrl = 'https://lucasreta.com/stack-overflow/spa-vanilla-js/api';
const routes = ['section-1', 'section-2'];
const content_box = document.getElementById("content_box");

function get(page) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(xhr.responseText);
      content_box.innerHTML = data.content;
      const title = `${data.title} | App Manual`;
      window.history.pushState(
        { 'content': data.content, 'title': title},
        title,
        useHash ?
          `#${page}` :
          page
      );
    }
  };
  xhr.open('GET', `${apiUrl}/${page}`, true);
  xhr.send();
}

window.addEventListener("popstate", function(e) {
  const state = e.state;
  content_box.innerHTML = state.content;
});

const links = document.getElementsByClassName('link');
for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(event) {
    event.preventDefault();
    get(links[i].href.split('/').pop());
  }, false);
}

(function(fn = function() {
  const page = useHash ?
    window.location.hash.split('#').pop() :
    window.location.href.split('/').pop();
  get(routes.indexOf(page) >= 0 ? page : routes[0]);
}) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})();


*/
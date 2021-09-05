const messageChannel = new MessageChannel();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').then(function (reg) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', reg.scope);

      navigator.serviceWorker.controller.postMessage({
        type: 'INIT_PORT',
      }, [messageChannel.port2]);

      messageChannel.port1.onmessage = (event) => {
        let list = event.data.list;

        if (event.data.type == 'ACTION_REQ_MODEL') {
          console.log(list);
          ActionEngine.processRequest(list);
        }

      };

      // navigator.serviceWorker.controller.postMessage({
      //   type: "POST_MSG",
      //   action: "START_TIMER",
      //   list: ['saveFileReqFlow']
      // });

      // navigator.serviceWorker.controller.postMessage({
      //   type: "POST_MSG",
      //   action: "STOP_TIMER"
      // });
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
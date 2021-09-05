self.addEventListener('install', (event) => {});

self.addEventListener('activate', (event) => {});

var getVersionPort, i = 0,
    timerHandle, timerRunning = false,
    currList = [];
self.addEventListener('message', (event) => {
    if (event && event.data) {
        var data = event.data;

        if (data.type === 'INIT_PORT') {
            getVersionPort = event.ports[0];
            i = 0;
        }
        if (data.type == 'POST_MSG') {
            if (data.action == 'START_TIMER') {
                event.waitUntil(self.registration.showNotification("Test App", {
                    body: data.list.join(',')
                }).then(() => {

                    currList = [...data.list];
                    if (timerRunning) {
                        clearInterval(timerHandle);
                        timerRunning = false;
                    };

                    timerHandle = setInterval(() => {
                        getVersionPort.postMessage({
                            type: "ACTION_REQ_MODEL",
                            list: currList
                        });
                    }, 1000 * 10);

                    timerRunning = true;

                    return Promise.resolve();
                }));
            } else if (data.action == 'MODIFY_ACTION') {

                // if(timerRunning) clearInterval(timerHandle);

                currList = [...data.list];

                // timerHandle = setInterval(()=>{
                //     getVersionPort.postMessage({
                //         type: "ACTION_REQ_MODEL",
                //         list: [...data.list]
                //     });
                // }, 1000 * 10);

                timerRunning = true;
            } else if (data.action == 'STOP_TIMER') {
                if (timerHandle) clearInterval(timerHandle);
            }

        }
    }
})
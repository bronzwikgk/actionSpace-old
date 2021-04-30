function doGet(request) {
    return HtmlService.createTemplateFromFile('Index')
        .evaluate();
  }
  
  // Function will include the CSS and JS file in the HTML file
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
  }


// Config for Get user media
    let constraintObj = {
        audio: true,
        video: {
            facingMode: "user",
            width: {
                min: 640,
                ideal: 1280,
                max: 1920
            },
            height: {
                min: 480,
                ideal: 720,
                max: 1080
            }
        }
    };
// width: 1280, height: 720  -- preference only
// facingMode: {exact: "user"}
// facingMode: "environment"

//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
} else {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device => {
                console.log(device.kind.toUpperCase(), device.label);
            })
        })
        .catch(err => {
            console.log(err.name, err.message);
        })
}


// Get user media 
navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(mediaStreamObj) {
        //connect the media stream to the first video element
        let video = document.getElementById('cam');
        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
        } else {
            //old version
            video.src = window.URL.createObjectURL(mediaStreamObj);
        }
// start video after load the element
        video.onloadedmetadata = function(ev) {
            //show in the video element what is being captured by the webcam
            video.play();
        };


    })
    .catch(function(err) {
        console.log(err.name, err.message);
    });

// define variables for HTMl elements like start,stop,video,canvas and camera
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.getElementById("video");
const canvas_button = document.getElementById("canvas-buttons");
const canvas_grid = document.getElementById("can");
let recorder, stream;
//navigator.mediaDevices.getUserMedia({
//    audio: true,
////    video: { 
////                facingMode: "user", 
////                width: { min: 640, ideal: 1280, max: 1920 },
////                height: { min: 480, ideal: 720, max: 1080 } 
////            } 
//})

// this will start screen recording 
async function startRecording() {

// define object for media 
    stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: "screen"
        },
        audio: true
    });
    // define object for video format
    var options = {
        mimeType: 'video/webm; codecs=vp8'
    };
    
    // create object for Media recorder with Media and video format arguments 
    recorder = new MediaRecorder(stream, options);

    const chunks = [];
    // get data when every resource is avaiable 
    recorder.ondataavailable = e => chunks.push(e.data);

// When click on stop button this will run
    recorder.onstop = e => {
        console.log(chunks[0].type)
        // Convert data into Blob object
        const completeBlob = new Blob(chunks, {
            type: chunks[0].type
        });
        // Put that Blob object into the video tag to run the Recorded video
        video.src = URL.createObjectURL(completeBlob);
    };

    recorder.start();
}

// This will run when click on start button to disable start button and active stop button
start.addEventListener("click", () => {
    start.setAttribute("disabled", true);
    stop.removeAttribute("disabled");

    startRecording();
});

// This will run when click on stop button to disable stop button and active stop button and put video on video tag
stop.addEventListener("click", () => {
    stop.setAttribute("disabled", true);
    start.removeAttribute("disabled");
    video.removeAttribute("hidden");
    canvas_button.hidden = true;
    canvas_grid.hidden = true;
    recorder.stop();
    stream.getVideoTracks()[0].stop();
});

// define canvas variable to draw a canvas
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
// Initialize canvas with black colour
var x = "black",
    y = 2;

// initialize canvas to draw anything 
function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
}

// Colour buttons for canvas 
function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

// this will run to draw anything on canvas using mouse
function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

// this will erase canvas 
function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

// this will save canvas image
function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

// this function will detect the location and draw canvas 
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
} 
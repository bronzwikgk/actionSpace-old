var newFileParams = { // pseudo FileSystemFileHandle
    "kind": "file",
    "name": "Untitled.txt",
    "content": "This is Sample VIP Story"
}

var defaultDir = {
    "name": "Action Space Default",
    "child": [{ // pseudo FileSystemFileHandle
        "kind": "file",
        "name": "DefaultFile.txt",
        "content": "Hello! this is sample"
    }]
}

var sampleActionStory = `Honour the past
Be honest about the present
Be hopeful about the future

The best teams in the world all have one thing in common – they live and breathe their purpose and brand promise, inside and out. This is their ‘brand culture’. Much more than just a great company culture, a true brand culture connects your employee experience with your customer experience, and ensures that it’s all pointing towards your purpose as a north star – to accelerate growth, or drive change.

Shunya.ek
Stop.go.think

Free spirit responsible human being.`;

var sampleActionStoryV2 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

/* var mimeMap = {
    ".txt": "text/plain"
} */

/* var editorMap = {
    "text": ["", ".txt"],
    "html": [".html"],
    "code": [".css", ".js", ".json", ".c", ".cpp"],
    "sheet": []
} */

var extMap = {
    ".txt": {
        "mimeType": "text/plain",
        "editorType": "text"
    },
    ".html": {
        "mimeType": "text/html",
        "editorType": "html"
    }
}
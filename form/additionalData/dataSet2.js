var newFileParams = {
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
        "mimeType": "html/plain",
        "editorType": "html"
    }
}
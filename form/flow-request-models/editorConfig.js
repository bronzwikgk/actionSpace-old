var editorDefaultProps = {
    
};

var editorDataSet = {
    "fsSync": true,
    "fileContents": {},
    "recentFileIds": []
}

var newFileParams = {
    "name": "Untitled",
    "type": "text"
}

var newDirectoryParams = {
    "name": "new folder",
}

var defaultDir = {
    "name": "Action Space Default",
    "child": [{ // pseudo FileSystemFileHandle
        "kind": "file",
        "name": "DefaultFile.txt",
        "content": "Hello! this is sample"
    }]
}

var extEntityTypeMap = {
    ".txt": "text",
    ".html": "html",
    ".wf": "workflow"
}

var entityTypeMap = {
    "text": {
        "mimeType": "text/plain",
        "ext": ".txt"
    },
    "html": {
        "mimeType": "text/html",
        "ext": ".html"
    },
    "workflow": {
        "mimeType": "text/html",
        "ext": ".wf",
        "entityReqModels": "initWorkflowUI"
    }
}
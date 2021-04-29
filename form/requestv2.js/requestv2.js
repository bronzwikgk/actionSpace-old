/**
 * @type {HTMLJSONEntityModel4Html}
 */
var entityModel4Html = {
    tagName: "tagName",
    attributes: { class: "class", style: "style", src: "src", alt: "alt" },
    children: ["all"],
};


//New File Flow - 1.get Editor element 2.get a uid 3.Assign it to editor's fileid,4.Change the content of editor
var newFileFlowRequest = {
    flowRequest:[
   {
       reqName: "Editor",
       objectModel: document,
       method: "getElementById",
       arguments: ["inlineContent"],
   },{
       reqName:'UID',
       objectModel:window,
       method:'uid'
   },{
       reqName:"fileID_File",//2
       objectModel:'Editor',
       method:'setAttribute',
       arguments:['fileid','UID']
   },{
       reqName: "NewActionStory",
       objectModel: ActionView,
       method: "addInnerHTML",
       arguments: [ehhIntro,"Editor"],
   }
   ]
}

//save file Flow -  1.get Editor element 2.get FileID from editor attribute 3.getInnerText of editor 4.get file handle from indexDB
//5. check whether result of (4.) length greater than 0 and stores it in localStorage(new actionStory) 6.create writable 7.update innerText of file using FS8.close writable
var saveFileFlowRequest = {
    flowRequest:[
    {

        reqName:'Editor',//1
        objectModel: document,
        method: "getElementById",
        arguments: ["inlineContent"],
    },
    {
        reqName:"fileID_File",//2
        objectModel:'Editor',
        method:'getAttribute',
        arguments:['fileid']
    },
    {
        validate:{
            objectModel:operate,
            method:'isEqual',
            arguments:['fileID_File.length',0],
            output:false,
        },
        reqName:"FileHandleFromIndexDB",//4
        objectModel:indexDB,
        method:'get',
        arguments:["fileID_File"],
        exitBeforeExecutingRequest:true
    },
    {
        reqName:"getInnerText",//3
        objectModel:document,
        method: "getElementById",
        arguments: ["inlineContent"],
        andThen:['innerText']
    },
    {
        validate:{
            objectModel:operate,
            method:'isNotEmpty',
            arguments:['FileHandleFromIndexDB'],
            output:false
        },
        reqName:'LocalStorage',//5
        objectModel:localStorage,
        method:'setItem',
        arguments:['fileID_File','getInnerText'],
        exitAfterExecutingRequest:true
    },
    {
        reqName:"Writable",//6
        objectModel:"FileHandleFromIndexDB",
        method:"createWritable",
    },
    {
        reqName:"writeinFile",//7
        objectModel:"Writable",
        method:'write',
        arguments:['getInnerText']
    },
    {
        reqName:"closeWritable",//8
        objectModel:"Writable",
        method:'close'
    },
    ]
}
//Open a File Flow -1.Show file Picker 2.Generate a uid 3.Set that uid to fileHandle 4. make a file entry in myFiles 5.,open in the editor
var OpenAFileFlowRequest ={
    flowRequest:[
        {
            reqName:'GetAFile',
            objectModel:window,
            method:'showOpenFilePicker',
            andThen:["0"]
        },
        {
            reqName:'UID',
            objectModel:window,
            method:'uid'
        },
        {
            reqName:'FileHandleToFileID',
            objectModel:indexDB,
            method:'set',
            arguments:["UID","GetAFile"]
        },
        {
            reqName:'GetFileHandleToFileID',
            objectModel:indexDB,
            method:'get',
            arguments:["UID"]
        },
        {
            reqName:'SetUIDToFileJSON',
            objectModel:engine,
            method:'set',
            arguments:[fileJSON,"UID","id",]
        },
        {
           reqName:"SetNameToLocalStorageFile",
            validate:{
                objectModel:operate,
                method:'isNotEmpty',
                arguments:["GetAFile"],
                output:false
            },
            objectModel:engine,
            method:'set',
            arguments:[fileJSON,"UID","textContent"]
        },
        {
            reqName:'file',
            validate:{
                objectModel:operate,
                method:'isNotEmpty',
                arguments:["GetAFile"],
                output:true
            },
            objectModel:"GetAFile",
            method:'getFile'
        },
        {
            reqName:'SetNameToFSFile',
            validate:{
                objectModel:operate,
                method:'isNotEmpty',
                arguments:["GetAFile"],
                output:true
            },
            objectModel:engine,
            method:'set',
            arguments:[fileJSON,"file.name","textContent"]
        },
        {
            reqName:"StringifyJSON",
            objectModel:JSON,
            method:'stringify',
            arguments:[{}]
        },
        {
            reqName:"ParseJSON",
            objectModel:JSON,
            method:'parse',
            arguments:["StringifyJSON"]
        },
        {
            reqName:'input',
            objectModel:engine,
            method:'set',
            arguments:["ParseJSON",fileJSON,"UID"]
        },
        {
            reqName:"myFilesElement",
            objectModel:document,
            method:'getElementById',
            arguments:['myFiles']
        },
        {
            reqName:"newEntity",
            objectModel:ActionView,
            method:'newEntity',
            arguments:['input',"myFilesElement"]
        },
        {
            reqName:'SetUsermyFilesLocalStorage',
            objectModel:localStorage,
            method:'setItem',
            arguments:['UsermyFiles',"myFilesElement.innerHTML"]
        },
        {
            reqName:'Editor',
            objectModel:document,
            method:'getElementById',
            arguments:['inlineContent'],
            callBack:{  method:'setAttribute',arguments:['fileid','UID']}
        },
        {
            reqName:"FileInEditor",
            objectModel:processFSInstance,
            method:'OpenFileInEditor',
            arguments:['UID']
        },
    ]
}

var newActionStoryRequest = {
    flowRequest:[
        {
            reqName:"Save",
            objectModel:engine,
            method:'processReq',
            arguments:[saveFileFlowRequest]
        },
        {
            reqName:'RecentFiles',
            objectModel:engine,
            method:'processReq',
            arguments:[recentFilesFlowRequest]
        },
        {
            reqName:"New",
            objectModel:engine,
            method:'processReq',
            arguments:[newFileFlowRequest]
        }
    ]
}

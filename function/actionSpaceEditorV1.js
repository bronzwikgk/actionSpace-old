
var actionSpaceEditorModel = {
    editor:{
        name:'div',
        class:'full-width height-full',
        //id:'actionSpaceEditor' + uid();
        config:{
            
            contentEditable :  true,
            previewElement : actionSpaceEditor['output_preview'], 
            blocks:[

            ]
        }

    },
    output_preview:{

    }
    
}
/**
 * This  class converts a normal HTML element
 */
class ActionSpaceEditor{
    constructor(element,elementContent,storageResources,config){
        this._editor = element,
        this._editor.contentEditable = 'true';
//console.log(this._editor),
        this._editorContentInjson = elementContent,
        this._storageResources = storageResources,
        this._config = config

    }
    //This method returns the Node/Element in which caret is placed.
    getCaretNode(){

    }
    //this method get the current caret position
    getCaretIndexPosition(){
    }
    getCaretXyPosition(){
        let x = 0,
        y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(true);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return { x, y };
    }
    getTextBeforeCaret (){

    }
    getTextAfterCaret(){

    }
    moveCaret(win, charCount) {
        var sel, range;
        if (win.getSelection) {
            // IE9+ and other browsers
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var textNode = sel.focusNode;
                var newOffset = sel.focusOffset + charCount;
                sel.collapse(textNode, Math.min(textNode.length, newOffset));
            }
        } else if ((sel = win.document.selection)) {
            // IE <= 8
            if (sel.type != "Control") {
                range = sel.createRange();
                range.move("character", charCount);
                range.select();
            }
        }

    }
    onKeyPress(entity) {//used for typing
        var match = {};
        var currentSelection = window.getSelection();
        var currentCaret = currentSelection.anchorOffset;
        //console.log("key pressed",entity.target,)
     //  console.log(entity.code + ":::: key pressed");
     
        
        if (entity.key) {
        
           // console.log(this.bufferRange, entity.code);
        
           // this.bufferRange = this.bufferRange + entity.code;
        
            //console.log(this.bufferRange, entity.code);
        
            match['byCode'] = operate.find(replaceKeyPress, entity.code, 'keys');
            match['byKey'] = operate.find(replaceKeyPress, entity.key, 'keys');
          
            
            if (match['byCode'].length == 0 && match['byKey'].length == 0) {
               //console.log("No match", match, match.length, entity.code)
                entity.preventDefault(entity);
                var appendingBuffer = entity.key;
               // console.log("appending ", entity.key)
               
            } else {
                if (match['byCode'].length > 0) {
                    entity.preventDefault(entity);
                    var replaceContent = replaceKeyPress[entity.code]['content'];

                } else if (match['byKey'].length > 0) {
                    entity.preventDefault(entity);
                    var replaceContent = replaceKeyPress[entity.key]['content'];
                }
                
                
            console.log(replaceContent)

                var appendingBuffer = replaceContent;
              
            }
            console.log("appending ", appendingBuffer, appendingBuffer.length, currentSelection,entity.target)
            var response = currentSelection.anchorNode.data.substr(0, currentSelection.anchorOffset) + appendingBuffer + currentSelection.anchorNode.data.substr(currentSelection.anchorOffset);
            currentSelection.anchorNode.data = response;
            //console.log(response);
            Caret.moveCaret(window, currentCaret + 1);
          
            
        }
        
    }
    onKeyDown(entity) { //other stuff
        var match;
        //console.log("key pressed",entity.target,)
        // console.log(entity.key + ":::: key pressed");
       // entity.preventDefault(entity);
        // if (entity.key) {

        //     //  console.log("bufferRange", this.bufferRange);
        //     var autoSuggestWindow = window['autoSuggest'];
        //     if (entity.keyCode == 32) {
        //        //   console.log('space bar found',this.bufferRange);
        //         if (this.bufferRange.length > 0) {
        //             this.bufferRange = '';
        //         }
        //         if (autoSuggestWindow.style.display == 'block') {
        //             autoSuggestWindow.style.display = 'none';

        //         }
        //     } else {
        //         this.bufferRange = this.bufferRange + entity.key;
        //         match = operate.find(hotKeyList, this.bufferRange, 'keys');
        //         //   console.log("match Found", this.bufferRange, match);

        //         if (autoSuggestWindow.style.display == 'block') {
        //             autoSuggestWindow.style.display = 'none';
        //         }
        //     }
        //     if (entity.keyCode == 9) {


        //         // console.log("tab pressed", this.bufferRange);
        //     }

        //     //  console.log(match)

        //     if (operate.isUseless(match) === false && match.length > 0) {


        //         var autoSuggestWindow = window['autoSuggest'];
        //         var caretViewCordinates = Caret.getCaretCoordinates();
        //         // console.log(autoSuggestWindow, caretViewCordinates['y']);
        //         autoSuggestWindow.style.left = caretViewCordinates['x'] + 'px';
        //         autoSuggestWindow.style.top = caretViewCordinates['y'] + 20 + 'px';
        //         autoSuggestWindow.style.display = 'block';
        //     }
        //     // console.log("key pressed", Caret.getCaretCoordinates(), Object.keys(hotKeyList));


        // }

    }
    onKeyUp(entity) {
       // console.log("key was up")
    }
    onClick(event) {
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
        console.log("Clicked" + event.target.classList);
     //   event.preventDefault();
        if (event.target.hasAttribute("data-command")) {
  
            var dataCommand = event.target.getAttribute('data-command');
//          console.log(dataCommandT);
            var commandJson = JSON.parse(dataCommand);
            console.log("Command " + commandJson[0].command);
            switch (commandJson[0].command) {
                
                case 'modal':
                    ActionView.modalForm(event,commandJson[0].entity);break;
                case 'closeModal':
                    ActionView.closeModal(event);break;
                case 'NewItem':
                    this.NewItem(event);break;
                case 'RemoveItem':
                    this.RemoveItem(event);break;
                case 'SubmitInvoice':
                    this.SubmitInvoice(event);break;
                case 'importFromSheet':
                        this.importFromSheet(event);break;
                case 'exportToSheet':
                        this.exportToSheet(event);break;
                //signup,login
                case 'Signup':
                    this.SignUp(event);break;
                case 'Login':
                    this.LogIn(event);break;
                case "new":
                    console.log("new")
                    this.new1(event); break;
                case 'google':
                    Authorization.oAuth(event, 'json'); break;
                //sheet
                
                //File System
                case 'OpenFile':
                    processFS.OpenAFile(event);break;
                case 'OpenDirectory':
                    processFS.OpenDirectory(event);break;
                case 'file':
                    processFS.OpenFileInEditor(event,event.target.id);break;
                // case 'FSNew':
                //     processFS.NewFile(event); break;
                // case 'FSOpen':
                //     processFS.readFile(event); break;
                // case 'FS_Save':
                //     processFS.saveFile(event); break;
                // case 'FS_SaveAs':
                //     processFS.saveAsFile(event); break;
                // case 'file':
                //     this.file(event);break;
                // case 'caret':
                //     this.caret(event);break;
                // local storage
             
                case 'save':
                    this.save(event); break;
                case 'cloud':
                    this.load(event); break;
                case 'download':
                    this.download(event); break;
                case 'delete':
                    this.delete(event); break;
                case 'logout':
                    this.logout(event); break;
                case 'keyup':
                    this.onKeyUp(event); break;
                case 'mouseover':
                    this.onMouseOver(event); break;
                case 'storage':
                    console.log("storage", event.type, event.target)
                    console.log(Object.keys(actionStorageInstance.entity))
                    break;
                default:
                // console.log("I don't know such values",event.type);
            }
        }
        if (event.target.classList.contains('editable')) {
            // console.log("clickedOn", entity.target.id, entity.target.classList.contains('editable')) // TO check if it's content
            event.target.setAttribute('contentEditable', 'true');
            //entity.target.setAttribute('State', "contentEditable");
        }
        if(event.target.classList.contains('parent')){
            console.log("yo")
            event.target.parentElement.querySelector(".nested").classList.toggle("active");
            event.target.classList.toggle("parent-down");
        }
        if(event.target.id == 'MainHeaderHamburger1'){
            document.getElementById('navigationSection').classList.toggle('hide')
            document.getElementById('navigationSection').classList.toggle('active')  
        }

    }
    onMouseEnter(event){
       // console.log('onMouseEnter',event.target,event.type)
        if (event.target.id) {
            event.target.setAttribute('State', event.type);
           // console.log('onMouseEnter',event.target,event.type)

        }
    }
    onMouseLeave(event){
      //  console.log('onMouseLeave',event.target,event.type)
        if (event.target.id) {
          //  console.log('onMouseLeave',event.target.id,event.type)
            event.target.setAttribute('State', event.type);
            //console.log('onMouseLeave',event.target.id,event.type)

        }
    }
    onMouseOver(event) {
        //console.log('onMouseOver',event.target.id,event.type)
        if (event.target.id) {
           // console.log('onMouseOver',event.target.classList,event.type)
           // event.target.setAttribute('State', event.type);
           // event.target.classList.add('event.type');
        }
        if (event.target.classList.contains('inlineContent')) {
            //event.target.classList.add(event.type);
            event.target.setAttribute('State', event.type);
          //  console.log('onMouseOver',event.target.classList,event.type)
        }
        if (event.target.classList.contains('editable')) {

           // event.target.previousElementSibling.style = 'visibility:visible'

          //  console.log(event.target.previousElementSibling.innerHTML)
            //event.target.previousElementSibling('visibility',true)

            //console.log("yo")
        }
    }

  

}

var actionSpaceEditorInstance = new ActionSpaceEditor(window['actionSpaceEditor']);
console.log(actionSpaceEditorInstance);

function registerServiceWorker(){
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("function/sw_CachedSite.js")
        .then(reg =>{
           console.log("Service Worker Registration :-"+reg);
        })
        .catch(err=>{
            console.log("Service Worker Registration Failed due to "+ err);
        })
    }
})



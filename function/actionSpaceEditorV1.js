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



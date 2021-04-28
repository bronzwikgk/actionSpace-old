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
    

  

}

var actionSpaceEditorInstance = new ActionSpaceEditor(window['actionSpaceEditor']);
console.log(actionSpaceEditorInstance);

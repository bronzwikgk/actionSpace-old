class ActionSpaceEditor{
    constructor(entity) {
       
      
        this.entityCollection = JSON.parse(localStorage.getItem('entityCollection')) || new WeakSet();
  
     //   this._entity.push(entity);
        console.log('Action Space Editor')
        //        this._entity[entity]['caret'] = new Caret(window.Selection());
        document.addEventListener('onKeyPress',e => this.onKeyPress(e));
        
    }
    onKeyPress(entity) {//used for typing
        console.log(entity);
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
            console.log("appending ", appendingBuffer, appendingBuffer.length, currentSelection, entity.target)
            var response = currentSelection.anchorNode.data.substr(0, currentSelection.anchorOffset) + appendingBuffer + currentSelection.anchorNode.data.substr(currentSelection.anchorOffset);
            currentSelection.anchorNode.data = response;
            //console.log(response);
            Caret.moveCaret(window, currentCaret + 1);


        }

    }

    getCaretPostion() {
        
    }


}



/**
 * @file get/set caret position and insert text
 * @author islishude
 * @license MIT
 */
class Caret extends ActionSpaceEditor {
    /**
     * get/set caret position
     * @param {HTMLColletion} target
     */
    constructor(target) {
        this.isContentEditable = target && target.contentEditable
        this.target = target
        //console.log("CaretCreated ",target.tagName);
    }


    static moveCaret(win, charCount) {
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

    static getCaretCoordinates() {
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
    getCaretCharacterOffsetWithin(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }
    pasteHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }
}
console.log("I Am Loaded")
var newEntity = new Entity(actionSpaceModel);
console.log(newEntity);
var actionSpaceEditorInstance = new ActionSpaceEditor(window[ActionSpaceEditor]);
console.log(window[ActionSpaceEditor],actionSpaceEditorInstance);
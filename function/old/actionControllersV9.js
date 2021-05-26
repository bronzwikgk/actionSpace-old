//Clean up the eListers. From a registerd Array. Store in LocalStorage.
const scriptURL = 'https://script.google.com/macros/s/AKfycbyksfkMoE9H3AKbDcSKeyHT3Pyc2HBmId3ftF0hoH4BY4-7Bs9HjsWNIwV523Oz32v-fA/exec';
class ActionController {
    constructor(view, model, actionEvents) {
        this.model = model
        this.view = view
        this.actionEvents = actionEvents;
        this.bufferRange = '';
    }
  
    // handleEvent(e) {
    //   console.log("event Caught",e.type,e.target);
        
    //     switch (e.type) {
    //         case 'load':
    //              // console.log(e.type)

    //             this.onRouteChange(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'beforeunload':
    //            // console.log(e.type)

    //             this.onRouteChange(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'readystatechange':
    //          //   console.log(e.type)
    //             this.onRouteChange(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'DOMContentLoaded':
    //            // console.log(e.type)
    //             this.onRouteChange(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'hashchange':
    //             this.onRouteChange(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'click':
               
    //             this.onClick(e);
    //             //  console.log("click", e.type, e.target)
    //             break;
    //         case 'submit':
    //             this.onSubmit(e);
    //         case 'selectstart':
    //             //console.log("selectstart", e.type, e.target)
    //             break;
    //         case 'keydown':
              
    //             this.onKeyDown(e)
    //           // console.log("keydown", e.type,e.key, e.target)
    //             break;
    //         case 'keypress':
    //             // this.emit('keypress', e)
    //             this.onKeyPress(e)
    //            // console.log("keypress", e.type,e.key ,e.target)
    //             break;
    //         case 'keyup':
    //             this.onKeyUp(e)
    //             //  console.log("message", e.type, e.target)
    //             break;
    //         case 'mouseover':
    //             this.onMouseOver(e);
    //             //console.log("mouseover", e.type, e.target)
    //             break;
    //         case 'mouseenter':
    //             this.onMouseEnter(e);
    //             //console.log("mouseover", e.type, e.target)
    //             break;
    //         case 'mouseleave':
    //             this.onMouseLeave(e);
    //             //console.log("mouseover", e.type, e.target)
    //             break;
    //         case 'mouseout':
    //             this.onMouseLeave(e);
    //             //console.log("mouseover", e.type, e.target)
    //             break;
    //         case 'storage':
    //             console.log("storage", e.type, e.target)
    //             console.log(Object.keys(actionStorageInstance.entity))

    //             break;
    //         default:
    //         // console.log("I don't know such values",e.type);
    //     }
    //     // console.log("handler", e.type, e.target.getAttribute('name'))
    //     //  window.postMessage()

    //     //filter the registerd es paired with Target

    // }
    onRouteChange(e) {
      //  console.log("e occoured",e.type);
        var routeKeyword;
        if (document.location.hash) {
           // console.log("it's a hash Change", document.location.hash.substring(1));
            routeKeyword = document.location.hash.substring(1);
        } else if (document.location.search) {
          //  console.log("it's a search Change", document.location.search.substring(1));
            routeKeyword = document.location.search.substring(1);
        } else {
           // console.log("no idea");
        }

      //  const hashLocation = window.location.hash.substring(1);
      
        if (routeKeyword) {
           // console.log(hashLocation);
            var routeModel = operate.findMatchingInArrayOfObject(actionSpaceViewModel, 'keyword', routeKeyword, 'values');
           // console.log(routeModel[0].model, this.view._actionView)
            //console.log(routeModel)
            if (routeModel.length !=0) {
                this.view.load([routeModel[0].model, this.view._actionView.entity]);
            } else {
                console.log('no route found');
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
                entity.preDefault(entity);
                var appendingBuffer = entity.key;
               // console.log("appending ", entity.key)
               
            } else {
                if (match['byCode'].length > 0) {
                    entity.preDefault(entity);
                    var replaceContent = replaceKeyPress[entity.code]['content'];

                } else if (match['byKey'].length > 0) {
                    entity.preDefault(entity);
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
       // entity.preDefault(entity);
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
    onClick(e) {
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
        console.log("Clicked" + e.target.classList);
     //   e.preDefault();
        if (e.target.hasAttribute("data-command")) {
  
            var dataCommand = e.target.getAttribute('data-command');
//          console.log(dataCommandT);
            var commandJson = JSON.parse(dataCommand);
            console.log("Command " + commandJson[0].command);
            switch (commandJson[0].command) {
                
                case 'modal':
                    ActionView.modalForm(e,commandJson[0].entity);break;
                case 'closeModal':
                    ActionView.closeModal(e);break;
                case 'NewItem':
                    this.NewItem(e);break;
                case 'RemoveItem':
                    this.RemoveItem(e);break;
                case 'SubmitInvoice':
                    this.SubmitInvoice(e);break;
                case 'importFromSheet':
                        this.importFromSheet(e);break;
                case 'exportToSheet':
                        this.exportToSheet(e);break;
                //signup,login
                case 'Signup':
                    this.SignUp(e);break;
                case 'Login':
                    this.LogIn(e);break;
                case "new":
                    console.log("new")
                    this.new1(e); break;
                case 'google':
                    Authorization.oAuth(e, 'json'); break;
                //sheet
                
                //File System
                case 'FSOpenDirectory':
                    processFS.OpenDirectory(e); break;
                case 'FSNew':
                    processFS.NewFile(e); break;
                case 'FSOpen':
                    processFS.readFile(e); break;
                case 'FS_Save':
                    processFS.saveFile(e); break;
                case 'FS_SaveAs':
                    processFS.saveAsFile(e); break;
                // case 'file':
                //     this.file(e);break;
                // case 'caret':
                //     this.caret(e);break;
                // local storage
             
                case 'save':
                    this.save(e); break;
                case 'cloud':
                    this.load(e); break;
                case 'download':
                    this.download(e); break;
                case 'delete':
                    this.delete(e); break;
                case 'logout':
                    this.logout(e); break;
                case 'keyup':
                    this.onKeyUp(e); break;
                case 'mouseover':
                    this.onMouseOver(e); break;
                case 'storage':
                    console.log("storage", e.type, e.target)
                    console.log(Object.keys(actionStorageInstance.entity))
                    break;
                default:
                // console.log("I don't know such values",e.type);
            }
        }
        if (e.target.classList.contains('editable')) {
            // console.log("clickedOn", entity.target.id, entity.target.classList.contains('editable')) // TO check if it's content
            e.target.setAttribute('contentEditable', 'true');
            //entity.target.setAttribute('State', "contentEditable");
        }
        if(e.target.classList.contains('parent')){
            console.log("yo")
            e.target.parentElement.querySelector(".nested").classList.toggle("active");
            e.target.classList.toggle("parent-down");
        }
        if(e.target.id == 'MainHeaderHamburger1'){
            document.getElementById('navigationSection').classList.toggle('hide')
            document.getElementById('navigationSection').classList.toggle('active')  
        }

    }
    onMouseEnter(e){
       // console.log('onMouseEnter',e.target,e.type)
        if (e.target.id) {
            e.target.setAttribute('State', e.type);
           // console.log('onMouseEnter',e.target,e.type)

        }
    }
    onMouseLeave(e){
      //  console.log('onMouseLeave',e.target,e.type)
        if (e.target.id) {
          //  console.log('onMouseLeave',e.target.id,e.type)
            e.target.setAttribute('State', e.type);
            //console.log('onMouseLeave',e.target.id,e.type)

        }
    }
    onMouseOver(e) {
        //console.log('onMouseOver',e.target.id,e.type)
        if (e.target.id) {
           // console.log('onMouseOver',e.target.classList,e.type)
           // e.target.setAttribute('State', e.type);
           // e.target.classList.add('e.type');
        }
        if (e.target.classList.contains('inlineContent')) {
            //e.target.classList.add(e.type);
            e.target.setAttribute('State', e.type);
          //  console.log('onMouseOver',e.target.classList,e.type)
        }
        if (e.target.classList.contains('editable')) {

           // e.target.previousElementSibling.style = 'visibility:visible'

          //  console.log(e.target.previousElementSibling.innerHTML)
            //e.target.previousElementSibling('visibility',true)

            //console.log("yo")
        }
    }
    async SignUp(e){
        e.preDefault();
        var json = {
            'Username':document.getElementById('username').value,
            'Password':document.getElementById('password').value,
        };
        var response = await HttpService.fetchRequest(scriptURL,HttpService.requestBuilder("POST",undefined,JSON.stringify(json)));
        alert(response.output);
        if(response.result == 'Success'){
            localStorage.setItem('LoggedIn',true);
            window.location.href = '#action';
        }
    }
    async LogIn(e){
        e.preDefault();
        var params = {
            'Username':document.getElementById('username').value,
            'Password':document.getElementById('password').value
        };
        var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params),HttpService.requestBuilder("GET"));
        alert(response.output);
        if(response.result == 'Success'){
            localStorage.setItem('LoggedIn',true);
            window.location.href = '#action';
        }
    }
    async importFromSheet(e){
        try{
            e.preDefault();
            var params = {'SpreadsheetId':document.getElementById('spreadsheetID').value,'NamedRange':document.getElementById('NamedRange').value}
            ActionView.closeModal(e);
            var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params),HttpService.requestBuilder("GET"));
            //console.log(response.output);
        }catch(err){
            console.log(err);
        }
    }
    async exportToSheet(e){
        try{
            e.preDefault();
            var json = {'SpreadsheetId':document.getElementById('spreadsheetID').value,'SheetName':document.getElementById('sheetName').value,'array':[[1,2,3],[1,2,3]]};
            ActionView.closeModal(e);
            var response = await HttpService.fetchRequest(scriptURL,HttpService.requestBuilder("POST",undefined,JSON.stringify(json)));
            alert(response.output);
        }catch(err){
            console.log(err);
        }
    }
    async SubmitInvoice(e){
        try{
            e.preDefault();
            var children = document.getElementById('tbody').childNodes;
            var InvoiceItems = [];
            var DocNumber = document.getElementById('DocNumber').textContent;
            for(var i = 0;i < children.length ; i++){
                var item = [DocNumber,document.getElementsByClassName('Description')[i].textContent,document.getElementsByClassName('Amount')[i].textContent,
                            document.getElementsByClassName('DetailType')[i].textContent,document.getElementsByClassName('Ref')[i].textContent,
                            document.getElementsByClassName('Account')[i].textContent,document.getElementsByClassName('LineStatus')[i].textContent,];
                InvoiceItems.push(item);
            }
            var json = {'array':InvoiceItems};
            ActionView.closeModal(e);
            var response = await HttpService.fetchRequest(scriptURL,HttpService.requestBuilder("POST",undefined,JSON.stringify(json)));
            alert(response.output);
            
        }catch(err){
            console.log(err);  
        }
    }
    RemoveItem(e){
            e.preDefault();
            var Id = 'tr' + e.target.getAttribute('id');console.log(Id);
            var element = document.getElementById(Id);
            if(element !== null)
                element.parentNode.removeChild(element);
    }
    NewItem(e){
        e.preDefault();
        var ItemId = uid();
        newItemJSON['td1']['a']['id'] = ItemId;newItemJSON['id'] = 'tr'+ ItemId;
        var json = {};json[ItemId] = newItemJSON;
        var newItem = new Entity(json,document.getElementById('tbody'));
    }
    new1(e) {
        console.log("New One");
       
    }
    save(e) {
        var entityName = ActionView.getTitle();
        console.log(entityName);
        var entityValue = ActionView.getText();
        StorageHelper.saveToStorage(entityName, entityValue);
    }
    load(e) {
        const entityName = window.prompt('Enter name of the Action Story you want to load', '');
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::" + entitytValue);
        if (entitytValue !== null) {
            ActionView.updateTitle(entityName);
            ActionView.updateText(entitytValue);
            //   this.view.updateText(entitytValue);
            console.log("Loaded successfully");
        } else {
            alert(entityName + " doesn't exist");
        }
    }
    delete(e) {
        const entityName = window.prompt('Enter name of the Action Story you want to delete', '');
        console.log("entityName:- " + entityName);
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::" + entitytValue);
        if (entitytValue !== null) {
            StorageHelper.removeFromStorage(entityName);
            console.log("Deleted successfully");
        } else {
            alert(entityName + " doesn't exist");
        }
    }
    download(e) {
        const entityName = window.prompt('Enter name of the Action Story you want to download', '');
        console.log("entityName:- " + entityName);
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::" + entitytValue);
        if (entitytValue !== null) {
            StorageHelper.export(entityName, entitytValue);
            console.log("Downloaded successfully");
        } else {
            alert(entityName + " doesn't exist");
        }
    }
    async logout(e) {
        console.log("Logout");
        e.preDefault();
        if (localStorage.getItem('LoginEhh' + localStorage.getItem('emailID')) === 'true') {
            localStorage.removeItem('LoginEhh' + localStorage.getItem('emailID'));
            alert('Logged out through ehh');
        } else if (localStorage.getItem('LoginEhhGoogle' + localStorage.getItem('emailID')) === 'true') {
            localStorage.removeItem('LoginEhhGoogle' + localStorage.getItem('emailID'));
            var response = await Credentials.actions(e, "LOGOUT");
            if (!response.error) {
                console.log("You have been logged out successfully");
            }
            alert('Logged out through ehh Google');
        }
        localStorage.removeItem('emailID');
        window.location.href = '../';
    }
}

var reqest1 = {
    reqName : 'format',
    objectModel: 'document',
    method: 'execCommand',
    args:['args']
}
console.log(window['reqest1']);

const Format = function (args) {
    this.reqName = "Format";
    this.scope = 'document';
    this.method = 'execCommand';
    this.args = args;
}

const json_value = {
    'href': function () {
        let href = document.getElementById('link_addr');
        href.hidden = false;
        return new Promise((res, rej) => {
            if (href.value !== "") res(href.value);
            else {
                href.focus();
                href.onkeydown = (e) => {
                    if (e.keyCode == 13) {
                        res(href.value);
                    };
                }
            }
        })
    },
    'color': function () {
        let colorPicker = document.getElementById('colorPicker'),
            colorVal = '';
        return new Promise((res, rej) => {
            colorPicker.click();
            colorPicker.onchange = () => {
                colorVal = colorPicker.value;
                //if(colorVal[0]!=='#' && colorVal) colorVal = json_helperFunctions['toHex'](colorVal);
                res(colorVal);
            }
        })
    },
    "image": async function () {
        let input = document.getElementById('filePicker');
        input.click();
        return new Promise((res,rej)=>{
            input.onchange = ()=>{
                var fileReader = new FileReader();
                fileReader.readAsDataURL(input.files[0])
                fileReader.onload = (e)=>{
                   res(e.target.result); 
                }
                
            }
        });
    }
}

let anyObj = {
    'dropbtn':function (e) {
    document.querySelectorAll('.dropdown').forEach((item)=>{
        item.classList.remove('active');
    })
    let targetItem;
    for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].classList && e.path[i].classList.contains('dropdown')) {
            targetItem = e.path[i];
            break;
        }
        else if (e.path[i].id =='leftNavBar') {
            targetItem = document.querySelector('.leftSideNav');
        }
    }
    if (targetItem) targetItem.classList.toggle("active");
 },
 'newDoc':()=>{
    let newDoc = new Doc(currentPath);
    activeDocs[newDoc.meta._id] = newDoc.contents;
    rootColl.contents.push(newDoc.meta);
    anyObj['updateNavigator'](rootColl.contents).forEach((item)=>{
        document.querySelector('.rightSide>.navigator').appendChild(item);
        document.getElementById('editor').setAttribute('data-currFileId', item.getAttribute('data-_id'))
    })
    
},
'uniqueId': function (length) {
    let randy = Math.floor(Math.random()*Math.pow(10,4)),
        timmy = Date.now();
        length = Math.min(12,length);
    return (timmy.toString(36).slice(-8)+randy.toString(36)).slice(- length);;
},
'updateNavigator':(coll)=>{
    let resultObj = coll;
    let output= [];
    for (const key in resultObj) {
        output[key] = document.createElement('span');
        output[key].setAttribute('data-_id',resultObj[key]['_id']);
        if (resultObj[key]['type']=== 'coll') {
            output[key].classList.value = "collection accordion";
            output[key].innerHTML = `<label class="collectionLabel"><i class="arrow gt fas fa-angle-right"></i>${resultObj[key]['name']}</label>`;
            anyObj['updateNavigator'](resultObj[key]['contents']).forEach((item)=>{
                output[key].appendChild(item);
            }) 
        }
        else if (resultObj[key]['type']=== 'doc') {
            output[key].classList.value = "panel";
            output[key].innerHTML = `${resultObj[key]['name']}.${resultObj[key]['ext']}`
            output[key].addEventListener('click',function(){
                console.log(this.getAttribute('data-_id'));
            })
        }
    }
    return output;
},
'collectionLabel':(e)=>{
    e.target.parentElement.classList.toggle("active");
}
} 

function Doc (path){
    this.meta = {
        _id:anyObj['uniqueId'](12, 'fs'),
        type:'doc',
        name : 'Untitled',
        ext:'dse',
        dateCreated:Date.now(),
        lastModified:Date.now(),
        fullPath:path
    };
    this.contents = {};
    return this;
}
function Collection (path, nameColl = 'New Collection'){
    this.meta = {
        _id:anyObj['uniqueId'](12, 'fs'),
        type:'coll',
        name : nameColl,
        dateCreated:Date.now(),
        lastModified:Date.now(),
        fullPath:path
    }
    this.contents = [];
    return this;
}

const currentPath = ['root'];
let rootColl = new Collection(['root'], 'Root')
let activeDocs = {};

// function updatePath(newPath){
//     for(let i=0; i < currPath.length; i++)
//         currentPath[i] = newPath[i]; 
//     return currPath;
// }

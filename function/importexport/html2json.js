
var HTMLSchema3 = {
  "~$condition-(wholeText)?'text##'+__INDEX:((data)?'comment##'+__INDEX : 'element##'+__INDEX)":{
    name:'tagName',
    attributes:'attributes.$all.$into-parent.$only-object.$follow-HTMLAttributeSchema',
    items:'childNodes.$all.$into-parent.$only-object.$follow-HTMLSchema3',
    text:'$condition-(wholeText)?wholeText:((data)?data:text)',
  }
}
var HTMLAttributeSchema = {
   '~name':'nodeValue'
}
function html2json(elem, model){
   if(!model) model = HTMLSchema3;
   var x = copyAs(elem, model);
   return x;
}

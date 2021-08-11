
var HTMLSchema = {
  name:'tagName',
  type:"$condition-(wholeText && tagName != 'SCRIPT')?'text':((data)?'comment' : 'element')",
  attributes:'attributes.$all.$into-parent.$only-object.$follow-HTMLAttributeSchema',
  items:'childNodes.$all.$only-object.$follow-HTMLSchema',
  text:"$condition-(wholeText)?wholeText:((data)?data:text)",
}
var HTMLAttributeSchema = {
   '~name':'nodeValue'
}
function html2json(elem, model){
   if(!model) model = HTMLSchema;
   var x = copyAs(elem, model);
   return x;
}

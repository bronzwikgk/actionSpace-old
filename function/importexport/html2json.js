var HTMLSchema = {
   name:'tagName',
   attributes:'attributes.$all-into-parent.$only-object.$follow-HTMLAttributeSchema',
   items:'childNodes.$all.$only-object.$follow-HTMLSchema',
   'text':'wholeText',

}
var HTMLAttributeSchema = {
   '~name':'nodeValue'
}
function html2json(elem, model){
   if(!model) model = HTMLSchema;
   return copyAs(elem, model);
}
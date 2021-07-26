var CSSStyleSheetSchema = {
   rules: "cssRules.$all.$only-object.$follow-CSSRuleSchema",
   title: "title",
   type: "type",
   disabled:'disabled',
   href:'href',
   ownerRule:'ownerRule'
}
var CSSRuleSchema = {
   "cssText":'cssText',
   
   "selectorText" : 'selectorText',
   "style": 'style.$all-with-keys.$non-empty.$only-string',
   
   "conditionText": 'conditionText',
   "rules":'cssRules.$all.$only-object.$follow-CSSRuleSchema',

   "name": 'name',
   "keyText": 'keyText',

   "namespaceURI":'namespaceURI',
   "prefix":'prefix',

}
function css2json(stylesheet, model){
   if(!model) model = CSSStyleSheetSchema;
   return copyAs(stylesheet, model);
}
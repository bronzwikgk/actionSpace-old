var StyleSheetSchema = {
   rules: "cssRules.$all.$only-object.$follow-CSSRuleSchema",
   title: "title",
   type: "type"
}
var CSSRuleSchema = {
   
   //CSSStyleRule
   "selectorText" : 'selectorText',
   "style": 'style',
   
   //CSSMediaRule
   "conditionText": 'conditionText',
   "rules":'cssRules.$all.$only-object.$follow-CSSRuleSchema',

}

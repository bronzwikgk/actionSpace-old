function json2css(cssjson){
   var c = new CSSStyleSheet();
   for(var i=0;i<cssjson.rules.length;i++){
      c.insertRule(cssjson.rules[i].cssText, c.rules.length);
   }
   return c;
}
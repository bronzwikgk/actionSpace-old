function json2css(input, tabs = ''){
   var css = '';
   for(var key in input){
      css += tabs;
      css += key;
      css += "{\n";
      tabs += '\t';
      var first = true;
      for(var k in input[key]){
         var mcss = '';
         if(operate.isObject(input[key][k])){
            if(first) mcss = json2css(input[key], tabs);
            first = false; 
         } else 
            mcss = tabs + k + ":" + input[key][k] + ";\n";
         css += mcss;
      }
      tabs = tabs.substr(0, tabs.length-1);
      css += tabs;
      css += "}\n";
   }
   return css;
}
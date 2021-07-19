function css2json(input, query) {
  var css = input;
  var open;
  var close;

  while((open = css.indexOf("/*")) !== -1 &&
      (close = css.indexOf("*/")) !== -1) {
    css = css.substring(0, open) + css.substring(close + 2);
  }

  var json = {};

  while(css.length > 0) {
    var lbracket = css.indexOf('{');

    var bracketCount = 0;

    var maxBracketCount = bracketCount;
    var rbracket = lbracket;

    while (rbracket < css.length) {
      if (css[rbracket] === '{') {
        bracketCount = bracketCount + 1;
        maxBracketCount = Math.max(bracketCount, maxBracketCount);
      }

      if (css[rbracket] === '}') {
        bracketCount = bracketCount - 1;
        if (bracketCount === 0) {
          break;
        }
      }

      rbracket = rbracket + 1
    }

    var selectors = css.substring(0, lbracket)
      .split(",")
      .map(function(selector){
        return selector.trim();
      });

    selectors.forEach(function(selector) {

      if (!json[selector]) json[selector] = {};

      var declarations = maxBracketCount > 1 ?
        css2json(css.slice(lbracket + 1, rbracket)) :
        getDeclarations(css, lbracket, rbracket);      

        Object.keys(declarations).forEach(function(key) {
        json[selector][key] = declarations[key];
      });
    });

    css = css.slice(rbracket + 1).trim()
  }

   function toObject(array){
     var ret = {};
     array.forEach(function(elm) {
       var index = elm.indexOf(":");
       var property = elm.substring(0, index).trim();
       var value = elm.substring(index + 1).trim();
       ret[property] = value;
     });
     return ret;
   }


   function getDeclarations(css, lbracket, rbracket) {
     var declarationList = css.substring(lbracket + 1, rbracket)
       .split(";")
       .map(function (declaration) {
         return declaration.trim();
       })
       .filter(function (declaration) {
         return declaration.length > 0;
       }); 


     var declarations = toObject(declarationList);
     return declarations;
   }
   function resolveQuery(parent, path){
      var result = [];
      var paths;
      if(operate.isString(path)){
         paths = [path];
      }

      for(var i=0;i<paths.length;i++){
         var path = paths[i];
         var keys = [];
         var key = '';
         var quoteopen = false, quotetype;

         for(var i=0;i<path.length;i++){

            var c = path.charAt(i);
            if((!quoteopen) && c == '>'){
                  keys.push(key);
                  key = '';
            }
            else if(c == '\"' || c == '\''){ 
               
               if(quoteopen && quotetype != c){
                 throw Error('Invalid Path.', path);
               }
               quoteopen = (!quoteopen);
               quotetype = path[i];
            } else if((!quoteopen) && c == ' '){
               continue;
            } else
               key += c;
         }
         if(key)keys.push(key);

         result.push(Entity.get(keys, parent));
      }
      if(operate.isString(path)){
         return result[0];
      }
      return result;
   }
   
   if(!query){
      return json;
   }
  return {json:json, result:resolveQuery(json, query)};
}


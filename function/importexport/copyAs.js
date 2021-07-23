
async function copyAs(input, model){

   if(!(input instanceof Object && (!operate.isFunction(input)))){
      console.error("Invalid input", input);
      return;
   }
   if(! operate.isObject(model)){
      console.error("Invalid model", model);
      return;
   }
   
   model = JSON.parse(JSON.stringify(model));

   var pass = {
      func: function(){
         return true;
      },
      args:[]
   };

   await Entity.walk(model,
   {
      array:pass,
      object:pass,
      value:{
         func:async function(obj, key, input){
            var nk = key;
            if(nk.charAt(0) == '~'){
               nk = nk.substr(1);
               nk = await matchObject(input, nk);
            }
            var x = await matchObject(input, obj[key]);
            delete obj[key];
            if(x !== undefined)
            if(x!==undefined){
               obj[nk] = x;
               // console.log("inside", obj[key], x, x[0]);
               // console.log(obj[nk][0]);
            }
         },
         args:[input],
         wait:true
      }
   });
   // if(model.items)
   // console.log(JSON.parse(JSON.stringify(model.items))) ;
   return model;
}
async function matchObject(obj, path, result, specific, pkey){
   if(!result) result = {"length":0};
   if(!specific) specific = {"specific":true};

   // console.log(path);

   var keys;
   if(operate.isString(path)){
      keys = Entity.stringToPath(path);
      keys = keys.reverse();
   } else {
      keys = path;
   }
   // console.log(keys);

   if(keys.length == 0){
      // console.log(obj);
      result[result.length++] = (obj);
      return;
   }

   var key = keys.pop();

   if(key.charAt(0) == '$'){
      specific.specific = false;
      if(key == '$empty-keys'){
         await matchObject(obj[''], [...keys], result, specific, pkey);
      }
      else if(key == '$non-empty-keys'){
         for(var key in obj){
            if(key != ''){
               await matchObject(obj[key], [...keys], result, specific, pkey);
            }
         }
      } 
      else if(key == '$all'){
         for(var key in obj){

            await matchObject(obj[key], [...keys], result, specific, pkey);
         }
      }
      else if(key == '$all-into-parent'){
         // console.log(obj);
         for(var key in obj){

            var x = await matchObject(obj[key], [...keys], result, specific, true);
            
         }
      }
      else if(key == '$only-object'){
         // console.log("here", obj);
         if(obj instanceof Object && (!operate.isFunction(obj))){
            // console.log(obj, key);
            await matchObject(obj, [...keys], result, specific, pkey);
         }
      }
      else if(key == '$only-array'){
         if(operate.isArray(obj)){
            await matchObject(obj, [...keys], result, specific, pkey);
         }
      }
      else if(key == '$only-string'){
         if(operate.isString(obj)){
            await matchObject(obj, [...keys], result, specific, pkey);
         }
      } 
      else if(key == '$only-html'){
         if(operate.isHTML(obj)){
            await matchObject(obj, [...keys], result, specific, pkey);
         }
      }
      else if(key.substr(0, "$follow-".length) == '$follow-'){
         var x = await copyAs(obj, window[key.substr("$follow-".length)]);

         if(pkey === undefined) result[result.length++] = (x);
         else {
            await Entity.updateProps(x, result);
            delete result['length'];
            
         }
            // console.log("pkeycheck", pkey, x, result, result[0]);
      }
   } else {
      await matchObject(obj[key], [...keys], result, specific, pkey);
   }
   if(specific.specific === true){
      
      return result[0];
   } 
   if(result.length === 0){
      return undefined;
   }
   return result;
}
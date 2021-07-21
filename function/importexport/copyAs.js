
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
            
            var x = await matchObject(input, obj[key]);
            // console.log(obj[key]);
            if(x) obj[key] = x;
            else delete obj[key];
         },
         args:[input],
         wait:true
      }
   });
   return model;
}
async function matchObject(obj, path, result, specific){
   if(!obj) return;
   if(!result) result = [];
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
      result.push(obj);
      return;
   }

   var key = keys.pop();

   if(key.charAt(0) == '$'){
      specific.specific = false;
      if(key == '$empty-keys'){
         await matchObject(obj[''], [...keys], result, specific);
      }
      else if(key == '$non-empty-keys'){
         for(var key in obj){
            if(key != ''){
               await matchObject(obj[key], [...keys], result, specific);
            }
         }
      } 
      else if(key == '$all'){
         for(var key in obj){

            await matchObject(obj[key], [...keys], result, specific);
         }
      }
      else if(key == '$only-object'){

         if(obj instanceof Object && (!operate.isFunction(obj))){
            // console.log(obj, key);
            await matchObject(obj, [...keys], result, specific);
         }
      }
      else if(key == '$only-array'){
         if(operate.isArray(obj)){
            await matchObject(obj, [...keys], result, specific);
         }
      }
      else if(key == '$only-string'){
         if(operate.isString(obj)){
            await matchObject(obj, [...keys], result, specific);
         }
      } 
      else if(key.substr(0, "$follow-".length) == '$follow-'){
         var x = await copyAs(obj, window[key.substr("$follow-".length)]);
         if(!obj){
            return;
         }
         result.push(x);
      }
   } else {
      await matchObject(obj[key], [...keys], result, specific);
   }
   if(specific.specific === true){
      
      return result[0];
   } 
   return result;
}
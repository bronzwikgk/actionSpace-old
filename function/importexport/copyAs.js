/**
 * Wrapper function for copyAsUtil. 
 * Copies the input as per the schema model model contains keys and values as a path query.
 * @param {*} input 
 * @param {*} model 
 * @returns 
 */


/**
 * Examples : 
 * var HTMLSchema = {
 *                name:'tagName',
 *             type:"$condition-(wholeText && tagName != 'SCRIPT')?'text':((data)?'comment' : 'element')",
 *             attributes:'attributes.$all.$into-parent.$only-object.$follow-HTMLAttributeSchema',
 *             items:'childNodes.$all.$only-object.$follow-HTMLSchema',
 *             text:"$condition-(wholeText)?wholeText:((data)?data:text)",
 *                }
 * var HTMLAttributeSchema = {
 *       '~name':'nodeValue'
 *                }
 * 
 */
async function copyAs(input, model){
  input = await copyAsUtil(input, model);
  // var index = 0;
  // var cb = {};
  // //okay, so there are no arrays
  // var pass = {
  //    func: async function(obj, key, cb, index){
  //      var nk = key;
  //
  //      if(operate.isString(key)){
  //        nk = key.replaceAll("\"__INDEX\"", index);
  //      }
  //      obj[nk] = obj[key];
  //      if(nk!=key) delete obj[key];
  //      await Entity.walk(obj[nk], cb);
  //      return false;
  //    },
  //    args:[cb, index],
  //    wait:true
  // };
  // cb.object = pass;
  // cb.array = pass;
  // cb.value = {
  //   func:function(obj, key, index){
  //     var nk = key;
  //
  //     obj[nk] = obj[key];
  //     if(nk!=key)delete obj[key];
  //   },
  //   args:[index],
  //   wait:true
  // };
  // await Entity.walk(input, cb);
  return input;
}
/**
 * Fills the actual values in the model instead of the path queries with the help of matchObject.
 * @param {*} input 
 * @param {*} model 
 * @returns 
 */
async function copyAsUtil(input, model){

   if(!(input instanceof Object && (!operate.isFunction(input)))){
      console.error("Invalid input", input);
      return;
   }
   if(! operate.isObject(model)){
      console.error("Invalid model", model);
      return;
   }

   model = JSON.parse(JSON.stringify(model));
   // console.log(model);
   var cb = {};
   var pass = {
      func: async function(obj, key, input, cb){
        var nk = key;
        // console.log(obj, key);
        if(nk.charAt(0) == '~'){
           nk = nk.substr(1);
           nk = await matchObject(input, nk);
           // console.log(nk);
        }
        obj[nk] = obj[key];
        if(nk!=key) delete obj[key];

        await Entity.walk(obj[nk], cb);
        return false;
      },
      args:[input, cb],
      wait:true
   };
   cb.array = pass;
   cb.object = pass;
   cb.value = {
     func:async function(obj, key, input){
        var nk = key;
        // console.log(obj, key);
        if(nk.charAt(0) == '~'){
           nk = nk.substr(1);
           nk = await matchObject(input, nk);
        }
        var x = await matchObject(input, obj[key]);
        // if(x) console.log(input, obj, key, nk, x);
        delete obj[key];
        if(x!==undefined){

           obj[nk] = x;
           // if(operate.hasOwnProperty('length')){
           //   for(var xk in x){
           //     obj[key+"#"+xk] = x[xk];
           //   }
           //   delete obj[key];
           // }
        }

     },
     args:[input],
     wait:true
   };

   await Entity.walk(model, cb);
   // if(model.items)
   // console.log(JSON.parse(JSON.stringify(model.items))) ;
   return model;
}/**
 *  Fetches a result to a single path query on Obj.

 * @param {*} obj 
 * @param {*} path 
 * @param {*} result 
 * @param {*} specific 
 * @param {*} pkey 
 * @param {*} lkey 
 * @returns 
 */
async function matchObject(obj, path, result, specific, pkey, lkey){
   if(!result) result = {"length":0};
   if(!specific) specific = {"specific":true};
   // console.log(path);

   var keys;
   if(operate.isString(path)){
      keys = await Entity.stringToPath(path);
      keys = await keys.reverse();
   } else {
      keys = path;
   }
   // console.log(keys);

   if(keys.length == 0){
      if(pkey !== undefined){
        await Entity.updateProps(obj, result);
        delete result['length'];
      }
      else if(lkey !== undefined) {
        result[lkey] = obj;
        delete result['length'];
      }
      else result[result.length++] = (obj);
      return result;
   }

   var key = keys.pop();

   if(key.charAt(0) == '$'){
      specific.specific2 = false;
      if(key == '$empty'){

         if((operate.isArray(obj) && obj.length == 0) || (obj instanceof Object && (!operate.isFunction(obj)) && Object.keys(obj).length === 0) || obj === '')
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
      }
      else if(key == '$non-empty'){
         if(!((operate.isArray(obj) && obj.length == 0) || (obj instanceof Object && (!operate.isFunction(obj)) && Object.keys(obj).length === 0) || obj === '')){
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
            // console.log(obj);
         }

      }
      else if(key == '$all'){
         for(var key in obj){
            // console.log("waiting for ", obj[key], [...keys]);
            var x = await matchObject(obj[key], [...keys], result, specific, pkey, lkey);
            // console.log("completed ", obj[key], keys, JSON.parse(JSON.stringify(result)));
         }
      }
      else if(key == '$all-with-keys'){
         // console.log(obj);
         for(var key in obj){
            var x = await matchObject(obj[key], [...keys], result, specific, pkey, key);
         }
      }
      else if(key == '$into-parent'){
         // console.log("here", obj);
         // for(var key in obj){

        var x = await matchObject(obj, [...keys], result, specific, true, lkey);

         // }
      }
      else if(key == '$only-object'){
         // console.log("here", obj);
         if(obj instanceof Object && (!operate.isFunction(obj))){
            // console.log(obj, key);
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
         }
      }
      else if(key == '$only-array'){
         if(operate.isArray(obj)){
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
         }
      }
      else if(key == '$only-string'){
            // console.log('here', obj)
         if(operate.isString(obj)){
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
         }
      }
      else if(key == '$only-html'){
         if(operate.isHTML(obj)){
            await matchObject(obj, [...keys], result, specific, pkey, lkey);
         }
      }
      else if(key.substr(0, "$follow-".length) == '$follow-'){
         //provides index property

         var x = await copyAsUtil(obj, window[key.substr("$follow-".length)]);
         // var delta  = 0;
         // if(result.hasOwnProperty("length")) del1ta = -1;
         // var index = Object.keys(result).length+delta;
         // var cb = {};
         // var pass = {
         //    func: async function(obj, key, cb, index){
         //      var nk = key;
         //
         //      if(operate.isString(key))
         //        nk = key.replaceAll("\"__INDEX\"", index);
         //
         //      obj[nk] = obj[key];
         //      if(nk!=key) delete obj[key];
         //      await Entity.walk(obj[nk], cb);
         //      return false;
         //    },
         //    args:[cb, index],
         //    wait:true
         // };
         // cb.object = pass;
         // cb.array = pass;
         // cb.value = {
         //   func:function(obj, key, index){
         //     var nk = key;
         //     if(operate.isString(obj[key])){
         //       obj[key] = obj[key].replaceAll("\"__INDEX\"", index);
         //
         //     }
         //     if(operate.isString(key)){
         //       nk = key.replaceAll("\"__INDEX\"", index);
         //     }
         //     obj[nk] = obj[key];
         //     if(nk!=key)delete obj[key];
         //   },
         //   args:[index],
         //   wait:true
         // };

         // await Entity.walk(x , cb);

         if(lkey !== undefined) {
            result[lkey] = x;
            delete result['length'];
         }
         else if(pkey === undefined) result[result.length++] = (x);
         else {
            await Entity.updateProps(x, result);
            delete result['length'];

         }
            // console.log("pkeycheck", pkey, x, result, result[0]);
      }
      else if(key.substr(0, "$condition-".length) == '$condition-'){
        specific.specific2 = true;
        var condition = key.substr("$condition-".length);
        var val = "";
        var exp = "";
        var insidestring = false;
        for(var i=0;i<condition.length;i++){
          var x = condition.charAt(i);
          if(x === '\'' || x === '\"'){
            insidestring = (!insidestring);
            val += x;
            if(val.length > 1){
              exp += val;
              val = '';
            }
          } else if(insidestring || x === '_' || operate.isAlphaNumeric(x)){
            val += x;
          } else {
            if(val != ''){
              if(val === '__INDEX'){

                exp += "\""+operate.escapeString("\"__INDEX\"")+"\"";
              } else if(val.charAt(0) === '\'' || val.charAt(0) === '\"'){
                exp += val;
              } else {
                var res = (await matchObject(obj, val));
                if(!operate.isString(res)) {
                  exp += res;
                } else {
                  res = operate.escapeString(res);
                  exp += "\"" + res + "\"" ;
                }
              }
              val = '';
            }
            exp += x;
          }
        }
        // console.log(obj, exp);
        // console.log(exp);
        exp = await Entity.getValue("$"+exp);
        await matchObject(exp, [...keys], result, specific, pkey, lkey);
      }
      else {
        //the heck

      }
      if(specific.specific2 === false || specific.specific === false)
        specific.specific = false;

   } else {
      await matchObject(obj[key], [...keys], result, specific, pkey, lkey);
   }


   if(specific.specific === true){

      return result[0];
   }
   if(result.length === 0){
      return undefined;
   }
   return result;
}

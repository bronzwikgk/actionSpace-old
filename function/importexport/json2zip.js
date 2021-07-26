async function json2zip(json, options){
  var zip = new JSZip();
  async function makeZIP(zipFolder, json){
    for(var key in json){
      if(operate.isObject(json[key])){
        await makeZIP(zipFolder.folder(key), json[key]);
      } else {
        await zipFolder.file(key, json[key]);
      }
    }
  }
  await makeZIP(zip, json);
  zip = await zip.generateAsync(options || {type:'string'});
  return zip;
}

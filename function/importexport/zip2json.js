async function zip2json(zip, json){
  var json;
  async function makeJSON(zipFolder, json){
    var rpaths = {};
    var array = await zipFolder.filter(function(relativePath, file){
      rpaths[file.name] = relativePath;
      return true;
    });
    await Entity.walk(
      array,
      {
        value:{
          func: async function(object, key, rpaths){
            var file = object[key];
            var relativePath = rpaths[file.name];
            if(relativePath.indexOf("/") >= 0) {
              var folderName = relativePath.substr(0, relativePath.indexOf('/'));
              if(!json[folderName]) json[folderName] = await makeJSON(zipFolder.folder(folderName), {});
            } else {
              var data = await zipFolder.file(relativePath).async("string");
              var fileExt = file.name.substr(file.name.lastIndexOf("."));
              json[relativePath] = data;
            }
          },
          args:[rpaths],
          wait:true
        }
      });
    return json;
  }

  zip = await JSZip.loadAsync(zip);
  json = await makeJSON(zip, {});
  return json;
}

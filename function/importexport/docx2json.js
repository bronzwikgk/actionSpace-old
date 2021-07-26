function txt2xml(txt){
  if (window.DOMParser)
  {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(txt, "text/xml");
  }
  else // Internet Explorer
  {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(txt);
  }
  return xmlDoc;
}

document.getElementById('docxfile').addEventListener('change', async function(e){
  var x = await zip2json(this.files[0]);
  console.log(x);
  var y = await json2zip(x);
  console.log(y);
  var z = await zip2json(y);
  console.log(z);
})

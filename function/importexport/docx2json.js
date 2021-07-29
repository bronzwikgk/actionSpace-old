
async function docx2json(arrayBuffer, options = {}){
  var result = await mammoth.convertToHtml({arrayBuffer:arrayBuffer});
  console.log(result.value);
  var parser = new DOMParser();
  result.value = await parser.parseFromString("<div>"+ result.value + "</div>", "text/xml");
  if(result.messages) console.log(result.messages);
  return await html2json(result.value);
}
document.getElementById('docxfile').addEventListener('change', async function(e){
  console.log(this.files[0]);
  var output = ""; //placeholder for text output
  var reader = new FileReader();
  if(this.files[0]) {
      reader.onload = async function (e) {
          output = e.target.result;
          console.log(output);
          var json = await docx2json(output);
          console.log(json);
          var v = document.getElementById('viewer');
          if(v.children[0])v.removeChild(v.children[0]);
          v.appendChild(await json2html(json));
      };
      await reader.readAsArrayBuffer(this.files[0]);
      console.log("HI");
  }
});

async function docx2html(docx){
  var html = await json2html(await docx2renderableJson(docx));
  return html;
}
async function docx2renderableJson(docx){
  //parses the xml, converts the xml again into json
  console.log(docx);
  var zip = await zip2json(docx);
  var parser = new DOMParser();
  var promises = [];

  async function parseXML(zip){
    async function helpme(zip, k, fileExt){

      zip[k] = await html2json(zip[k]);
      if(! zip[k].name){
        zip[k] = zip[k].items[0];
      }
      if(fileExt === 'rels'){
        var json = {};
        for(var one in zip[k]){
          json[one.attributes['Id']] = one.attributes;
        }
        zip[k] = json;
      }
    }
    for(var k in zip){
      var key = k;
      k = key;
      if(operate.isObject(zip[k])){
        await parseXML(zip[k]);
        continue;
      }
      var fileExt = k.substr(k.lastIndexOf(".") + 1);
      if(fileExt === 'xml' || fileExt === 'rels'){   /// should be replaced by something like if(isXML(zip[k]))
        zip[k] = await parser.parseFromString(zip[k], 'application/xml');
        var pr = helpme(zip, k, fileExt);
        promises.push(pr);
      }
    }
  }

  await parseXML(zip);
  await Promise.all(promises);
  console.log(zip);

  return (await docxJson2renderableJson(zip));
}
function docxJson2renderableJson(docx, options){
  /*
    docx
      /document.xml
      /_rels/rels.xml
      |


  */
  /*
    document.xml
      w:document
      w:body
      w:p
  */
  function convert2renderable(relem, allNodes = [], pendingTextFrameParagraphs = []){
    var identified = true;
    if(!(operate.isObject(relem))){
      console.error("What is this I m omitting!?", relem)
      return;
    }
    // While parsing back, If an element does not have a data-ms-tag-name, omit it
    // Let's hold maths for now
    /*
      w:document
        w:background
        w:body
          w:altChunk r:id
            w:altChunkPr
          // commentRangeEnd (Comment Anchor Range End)	§17.13.4.3
          // commentRangeStart (Comment Anchor Range Start)	§17.13.4.4
          // customXml (Block-Level Custom XML Element)	§17.5.1.6
          // customXmlDelRangeEnd (Custom XML Markup Deletion End)	§17.13.5.4
          // customXmlDelRangeStart (Custom XML Markup Deletion Start)	§17.13.5.5
          // customXmlInsRangeEnd (Custom XML Markup Insertion End)	§17.13.5.6
          // customXmlInsRangeStart (Custom XML Markup Insertion Start)	§17.13.5.7
          // customXmlMoveFromRangeEnd (Custom XML Markup Move Source End)	§17.13.5.8
          // customXmlMoveFromRangeStart (Custom XML Markup Move Source Start)	§17.13.5.9
          // customXmlMoveToRangeEnd (Custom XML Markup Move Destination Location End)	§17.13.5.10
          // customXmlMoveToRangeStart (Custom XML Markup Move Destination Location Start) §17.13.5.11
          w:del
            // m:acc
              // m:accPr
                // m:chr
                // m:ctrlPr
              // m:e
                // m:r
            w:bdo
              // w:dir
              w:ins
              // moveFrom (Move Source Run Content)	§17.13.5.22
              // moveFromRangeEnd (Move Source Location Container - End)	§17.13.5.23
              // moveFromRangeStart (Move Source Location Container - Start)	§17.13.5.24
              // moveTo (Move Destination Run Content)	§17.13.5.25
              // moveToRangeEnd (Move Destination Location Container - End)	§17.13.5.27
              // moveToRangeStart (Move Destination Location Container - Start)	§17.13.5.28
              // oMath (Office Math)	§22.1.2.77
              // oMathPara (Office Math Paragraph)	§22.1.2.78
              // permEnd (Range Permission End)	§17.13.7.1
              // permStart (Range Permission Start)	§17.13.7.2
              // proofErr (Proofing Error Anchor)	§17.13.8.1

          w:p
            w:pPr
              w:rPr             -----exception
            w:r
              w:rPr
                w:i
                w:b
              w:t xml:space
          w:tbl
            w:tblPr
            w:tblGrid
            w:tr
              w:trPr
              w:tc
                w:tcPr
                 w:tcW
      wps:txbx
        wps:txbxContent
          ....

    */
    relem.attributes = relem.attributes || {};
    relem.items = relem.items || [];

    //quick copy

    var result = {};
    result.name = relem.name;
    result.attributes = {...relem.attributes};
    result.parelem = relem.parelem;
    result.parent = relem.parent;
    result.index = allNodes.length;

    allNodes.push(result);

    for(var k in result.attributes){

      result.attributes["data-ms-" + k] = result.attributes[k];
      delete result.attributes[k];
    }
    result.attributes.style = result.attributes.style || "";

    var xn = result.name;
    result.attributes['data-ms-tagName'] = xn;



    var emp = function(){}
    var xelemToresult =
    {
      'w:document':function(){
        result.name = 'div';
      },
      'w:body':function(){
        result.name = 'div';
      },
      // 'w:altChunk':function(){
      //   result.name = "div";
      //   //the actual file
      //   var content = Entity.get( docx['_rels']['.rels'][result.attributes['data-ms-r:id']], docx);
      //   if(! "content looks like html"){
      //     console.error("altChunk doesn't look like html, omitting that");
      //     return;
      //   }
      //   var div = document.createElement('div');
      //
      //   console.log(content);
      //
      //   div.innerHTML = content;
      //
      //   result.items.push(await html2json(div));
      // },
      //
      // 'w:del':function(){
      //   result.name = 'span',
      //   result.attributes.style += "background:#fcc;";
      // },
      // 'w:dir':function(){
      //   result.name = 'span';
      // }
      // 'm:acc':function(){
      //   //accented
      //   result.name = 'div';
      //   result.attributes.style += "display:inline-block";
      // },
      // 'm:accPr':function(){
      //   result.name = 'span';
      // },
      // 'm:chr':function(){
      //   result.name = 'span';
      //   result.items.push(await html2json(document.createTextNode(result.attributes['m:val'])))
      // }
      // 'm:e':function(){
      //   result.name = 'span';
      //
      // }
      'w:background':function(){
        if(relem.items.length > 0){
          //parse DrawingML Object
          identified = false;
          return;
        }
        if(result.attributes['data-ms-w:color'])
          result.parent.style.attributes += "background:" + result.attributes['data-ms-w:color'] + ";";
      },
      'w:bdo':function(){
        result.name = 'bdo';
        result.attributes.dir = relem.attributes['w:val'];
      },
      'w:ins':function(){
        result.name = 'ins';

      }
      'w:p':function(){
        result.name = 'p';
      },
      'w:pPr':function(){
        result.name = 'span';
        var found = false;
        for(var i=0;i < relem.items.length; i++){
          if(relem.items[i].name === 'framePr'){
            //again text frame paragraph
            found = true;
          }
        }
        if(!found){
          //push pendingTextFrameParagraphs in here
          for(var i = 0;i< pendingTextFrameParagraphs.length ; i++){
            pendingTextFrameParagraphs[i].parent = result;
            pendingTextFrameParagraphs[i].parelem = relem;
          }
        }
      },
      'w:ind':function(){
        result.name = 'span';
        if(relem.attributes.left || relem.attributes.start){
          result.parent.parent.attributes.style += "margin-left:"+(relem.attributes.left || relem.attributes.start)+"px;";
        }
        if(relem.attributes.right || relem.attributes.end){
          result.parent.parent.attributes.style += "margin-left:"+(relem.attributes.right || relem.attributes.end)+"px;";
        }
        //relem.attributes.hanging not supported
      },
      'w:jc':function(){
        result.name = 'span';
        switch(relem.attributes['w:val']){
          case 'left':
          case 'start':
            result.parent.parent.attributes.style += 'text-align:left;';
            break;
          case 'right':
          case 'end':
            result.parent.parent.attributes.style += 'text-align:right;';
          case 'center':
            result.parent.parent.attributes.style += 'text-align:center;';
          //case 'both': not supported
          case 'distribute':
            result.parent.parent.attributes.style += 'text-align:justify;';
        }
      },
      //'w:keepLines': not supported http://officeopenxml.com/WPparagraphProperties.php
      // w:numPr to be supported once we are on the numbering part http://officeopenxml.com/WPparagraphProperties.php
      // w:outlineLvl not supported http://officeopenxml.com/WPparagraphProperties.php
      'w:pBdr':function(){
        //border-style: none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit;
        var bstyles = {
          'none':'node',
          'dotted':'dotted',
          'dashed':'dashed',
          'double':'double',
          'inset':'inset',
          'outset':'solid'
        }
        result.name = 'span';
        for(var x in relem.items){
          if(x.name === 'w:between'){
            // not supported

          } else { // one of top, bottom, left, right
            result.parent.parent.attributes.style += "border-"+x.name+":"+x.sz+"px "+(bstyles[x.val] || 'solid')+" #"+x.color;
          }
        }
      },
      'w:framePr':function(){
        result.name = 'span';
        result.parelem = result.parent = null;
        for(var k in result.attributes){
          ///////lateer
        }
        result.style.attributes += ""
        if(result.parent.parent.attributes['data-ms-tagName'] === 'w:p'){
          pendingTextFrameParagraphs.push({p: result.parent.parent, framePr: result});
        }
      },
      //if w:pPr does not have a framePr
      'w:r':function(){
        result.name = 'span';
      }
    }
    if(xelemToresult[xn]){
      xelemToresult[xn]();
    }
    else {
      identified = false;
      // console.log("Omitting ", xn, "inside", relem.parent);
    }

    if(!identified){
      result.name = "span";
      result.attributes.style += "display:hidden";
    }


    for(var i=0;i<relem.items.length;i++){
      relem.items[i].parelem = relem;
      relem.items[i].parent = result;
      convert2renderable(relem.items[i], allNodes, pendingTextFrameParagraphs);
    }


    return result;
  }
  return convert2renderable(docx['word']['document.xml']);
}

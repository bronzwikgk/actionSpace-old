function json2html(query, parent){
   if(!query) return undefined;

   if((! operate.isArray(query)) && query.length === undefined){
      var waselem = true;
      query = [query];
   }
   for(var i = 0;i<query.length;i++){

      if(query[i].text !== undefined){
         parent.innerHTML += query[i].text;
         continue;
      }
      var el = document.createElement(query[i].name || 'div');
      for(var key in query[i].attributes){
         el.setAttribute(key, query[i].attributes[key])
      }
      if(query[i].items)
         json2html(query[i].items, el);

      if(parent) parent.appendChild(el);
      query[i] = el;
   }
   if(waselem) return query[0];
   return query;
}

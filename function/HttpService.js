const boundary = '-------314159265358979323846';
const delimiter = "\r\n--" + boundary + "\r\n";
const close_delim = "\r\n--" + boundary + "--";
class HttpService{    
    static urlBuilder(url,params){
        var service = url +"?" +HttpService.buildEncodedUri(params);
        return service;
    }
    static requestBuilder(method,headers,body){
        var request = {
            method:method,
            cache: 'no-cache',
        }
        if(headers !== undefined)
            request['headers'] = headers;
        if(body !== undefined)
            request['body'] = body;                       
        return request;
    }
    static async FileUpload(file) {
        return new Promise((resolve, reject) => {
         var contentType = file.type || 'application/octet-stream';
         var metadata = {
                'title':file.name,
                'name':file.name,
                'mimeType':contentType,
            }
          const reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = () => {
            var base64Data = btoa(reader.result);
            var multipartRequestBody =
                 delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) +
                 delimiter + 'Content-Type: ' + contentType + '\r\n' +
                 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
        
            resolve(multipartRequestBody);
        };
          reader.onerror = error => reject(error);
        });
    }
    static async fetchRequest(url,request){
    var res;
    console.log("URL :-" + url);
    console.log("Request method :" + request['method'] + "headers:" + request['headers'] + "body: " + request['body']);
    await fetch(url,request)
           .then(response=>{console.log(response);return response.json()})
           .then(data=>{
                 console.log(data);
                 if(!data.errors){
                     res = data;
                }else{
                    console.log(data.errors);
                }
            })
            .catch(err=>{
                console.log("Failed to make a request due to " + err);
            })
    return res;
    }
    static buildEncodedUri(request) {
        const response = [];
        for (let d in request){
            response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
        }
        return response.join('&');
    }
    static unbuildEndodedUri(request) { 
        var urifragment = request.split("&"), data = {}, i, parts;
        //process each par
        for (i = 0; i < urifragment.length; i++) {
            parts = urifragment[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        } 
        console.log(data);
        return data;    
    }    
}
/* 

var reqTypes = ['GET', 'PUT', 'POST', 'PATCH', 'VIEW', 'HEAD', 'COPY', 'DELETE'];

var reqParamsSchema = {
    type : String,
    url : URL || String,
    asy : Boolean,
    uname : String,
    pass : String
}

*/
//Please copy https://github.com/KGayatri15/Integration/blob/main/js/HttpService.js and just add methods you want to!



class HttpReq{
    static defaultReqParams = {
        type : 'GET',
        url : '/',
        asy : true
    }
    static createReq(params = this.defaultReqParams){
        var xhttp = new XMLHttpRequest();

        try {
            if (typeof params === 'object' && params.constructor.name.includes('Object')) {
                var {type, url, asy, uname, pass} = params;
                xhttp.open(type, url, asy, uname, pass);
            }
            else if (typeof params === 'object' && Array.isArray(params)) {
                xhttp.open(...params);
            }
            else throw new Error('given params are not suited');
        } catch (error) {
            return `Error : ${error}`;
        }

        return xhttp;
    }
    static setHeaders(obj, request){
        if (!request) {
            request = this.createReq();
        }
        for (let key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                let headerVal = obj[key];
                request.setRequestHeader(key, headerVal);
            }
        }
        return request;
    }
    static setHandler(request, {res, rej}){
        request.onreadystatechange = function(){
            try {
                if (this.readyState == 4 && this.status == 200) res(this);
                else throw new Error(`Error : \nreadyState :${this.readyState} \n statusCode :${this.status}`);
            } catch (error) {
                rej(error);
            }
        }
    }
    static execReq(request, params){
        if (typeof params === 'object' && params.constructor.name.includes('Object')) {
            request.send(params);
        }
        else request.send();
    }
}
/* 
View class/ View Renderer/ View processor
only class to directly interact with view(ui)
will accept requests from actionEngine only.
*/
class ActionView{
    constructor(){

    }
    static getDOM(scope, method, value){
        return scope[method](value);
    }
    static renderDOM(parent, element, method){
        if (Array.isArray(element) ) {
            for (let i = 0; i < element.length; i++) {
                parent[method](element[i]);
            }
        }
        else parent[method](element);
        
    }
    static removeDOM(element){
        element.remove();
    }
}
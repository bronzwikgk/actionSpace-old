var VIPNodeList = [];
var idCounter = 0;
class VIPNode{
   constructor(ref, parent){
      ref = (ref === undefined)?null:ref;
      parent = (parent === undefined)?null:parent;

      VIPNodeList.push(this);
      
      this.id = idCounter++;
      this.ref = ref;
      this.children = [];


      if(parent) parent.addChild(this.id);
   }
   getAncestor(dist){
      var ref = this;
      while((dist --) !== 0){
         ref = ref.parent;
      }
      return ref;
   }
   getParent(){
      return getAncestor(1);
   }
   addChild(nodeId){
      this.children.push(nodeId);
      VIPNodeList[nodeId].parent = this;
   }
   removeChild(nodeId){
      this.children.splice(this.children.indexOf(nodeId), 1);
      VIPNodeList[nodeId].parent = null;
   }
   detach(){
      this.parent.removeChild(this.id);
   }
   attachTo(parent){
      if(this.parent) this.detach();
      parent.addChild(this.id);
   }
}
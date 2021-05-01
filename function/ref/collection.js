class entityCollection {

    constructor() {
        this.entityCollection = JSON.parse(localStorage.getItem('entityCollection')) || new WeakSet();
    }

    addItem(entity, value) {
        if (this.hasItem(entity)) {
            throw new Error(
                `The entity can only contain one instance of item ${entity}`
            );
        }
        // console.log(JSON.stringify(this));
        this.entityCollection.add(entity);
        //  console.log()
        window.localStorage.setItem(entity, value);
    }

    removeItem(entity) {
        return this.entityCollection.delete(entity);
    }
    hasItem(entity) {
        return this.entityCollection.has(entity);
    }
    getItem(entity) {
        return this.entityCollection.get(entity);
    }
    clearItem(entity) {
        return
    }
}
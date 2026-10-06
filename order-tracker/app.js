class OrderHistoryStack {
    constructor() {
        this.items = [];
    }

    add(order) {
        this.items.push(order);
    }

    remove() {
        return this.items.pop();
    }

    preview() {
        const index = this.items.length - 1;
        console.log('index', index);
        return this.items[index];
        // return this.items[this.items.length - 1]
    }
}

class OrderQueue {

}
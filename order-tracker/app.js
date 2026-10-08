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

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class OrderQueue {
    constructor(capacity) {
       //precondition: capacity must be a positive integer
        if (capacity <= 0 || !Number.isInteger(capacity)) {
           throw new Error('Capacity must be a positive integer');
       }

       //postcondition: capacity is set and items array is initialized
      this.capacity = capacity;
      this.items = new Array(capacity);
      this.head = 0;
      this.tail = 0;
      this.count = 0;
    }

    add(order) {
        //precondition: queue must not be full
        if (this.isFull()) {
            throw new Error('Queue is full');
        }

        //postcondition: order is added to the queue
        this.items[this.tail] = order;
        //update tail and count
        const nextTail = (this.tail + 1) % this.capacity;
        console.log('nextTail', nextTail);
        this.tail = nextTail;
        this.count++;
    }


    remove() {
        //precondition: queue must not be empty
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }

        //postcondition: order is removed from the queue
        const order = this.items[this.head];
        this.items[this.head] = undefined; // optional: clear the slot
        const nextHead = (this.head + 1) % this.capacity;
        console.log('nextHead', nextHead);
        this.head = nextHead;
        this.count--;
        return order;
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.count === 0;
    }

    isFull() {
        return this.count === this.capacity;
    }
}

const orderHistory = new OrderHistoryStack();
console.log('orderHistory', orderHistory);
console.log('orderHistory size', orderHistory.size());
console.log('orderHistory is empty', orderHistory.isEmpty());
console.log('orderHistory preview', orderHistory.preview());


const orderQueue = new OrderQueue(3);
console.log('orderQueue', orderQueue);
console.log('orderQueue size', orderQueue.size());
console.log('orderQueue is empty', orderQueue.isEmpty());
console.log('orderQueue is full', orderQueue.isFull());
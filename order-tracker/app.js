class OrderHistoryStack {
    constructor() {
        this.items = [];
    }

    push(order) {
        this.items.push(order);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
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
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    enqueue(order) {
        if (this.isFull()) {
            throw new Error("Queue is full.");
        }
        this.items[this.tail] = order;
        this.tail = (this.tail + 1) % this.capacity;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const order = this.items[this.head];
        this.items[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.count--;
        return order;
    }

    front() {
        return this.isEmpty() ? undefined : this.items[this.head];
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

const order1 = { orderNumber: 1001, customer: "Jordan", item: "Keyboard" };
const order2 = { orderNumber: 1002, customer: "Avery", item: "Mouse" };
const order3 = { orderNumber: 1003, customer: "Taylor", item: "Monitor" };
const order4 = { orderNumber: 1004, customer: "Morgan", item: "USB Cable" };

const queue = new OrderQueue(3);
const history = new OrderHistoryStack();

queue.enqueue(order1);
queue.enqueue(order2);
queue.enqueue(order3);
console.log("Queue full?", queue.isFull());
console.log("Next order to process:", queue.front());

// Process one order, then add another to show the tail wrapping around.
history.push(queue.dequeue());
queue.enqueue(order4);

while (!queue.isEmpty()) {
    const order = queue.dequeue();
    console.log(`Packed order #${order.orderNumber} for ${order.customer} (${order.item})`);
    history.push(order);
}

console.log("Packed orders in history:", history.size());
console.log("Most recently packed:", history.peek());
console.log("Undo last pack:", history.pop());
console.log("History size after undo:", history.size());

module.exports = { OrderHistoryStack, OrderQueue };

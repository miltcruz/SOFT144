const { performance } = require("node:perf_hooks");

class HashTable {
    constructor(bucketCount = 8) {
        if (!Number.isInteger(bucketCount) || bucketCount <= 0) {
            throw new Error("Bucket count must be a positive integer.");
        }

        this.buckets = [];
        for (let index = 0; index < bucketCount; index++) {
            // Each bucket is its own array so keys that collide can share it.
            this.buckets.push([]);
        }
        this.numberOfEntries = 0;
    }

    // The load factor tells us how full the table is on average.
    get loadFactor() {
        return this.numberOfEntries / this.buckets.length;
    }

    hash(key) {
        const keyString = String(key);
        let hashValue = 0;

        // Mix in each character; modulo keeps the result a valid bucket index.
        for (let index = 0; index < keyString.length; index++) {
            const characterCode = keyString.charCodeAt(index);
            hashValue = (hashValue * 31 + characterCode) % this.buckets.length;
        }

        return hashValue;
    }

    set(key, value) {
        const bucket = this.buckets[this.hash(key)];

        // Search this bucket first: the key may already be stored here.
        for (const entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value;
                return this;
            }
        }

        // Store key-value pairs in the bucket; multiple keys can land together.
        bucket.push([key, value]);
        this.numberOfEntries++;

        // A crowded table has longer buckets, so make more room when needed.
        if (this.loadFactor > 0.75) {
            this.resize();
        }

        return this;
    }

    // Look only in the bucket selected by the key's hash.
    get(key) {
        const bucket = this.buckets[this.hash(key)];

        for (const entry of bucket) {
            if (entry[0] === key) {
                return entry[1];
            }
        }

        return null;
    }

    // Unlike get(), this reports whether the key exists, not its value.
    has(key) {
        const bucket = this.buckets[this.hash(key)];

        for (const entry of bucket) {
            if (entry[0] === key) {
                return true;
            }
        }

        return false;
    }

    // Remove the matching pair and update the number of stored entries.
    delete(key) {
        const bucket = this.buckets[this.hash(key)];

        for (let index = 0; index < bucket.length; index++) {
            if (bucket[index][0] === key) {
                bucket.splice(index, 1);
                this.numberOfEntries--;
                return true;
            }
        }

        return false;
    }

    resize() {
        const oldBucketCount = this.buckets.length;
        const oldBuckets = this.buckets;

        // Make twice as many empty buckets. The entries must be moved because
        // their bucket indexes change when the table gets larger.
        this.buckets = [];
        for (let index = 0; index < oldBucketCount * 2; index++) {
            this.buckets.push([]);
        }
        this.numberOfEntries = 0;

        for (const bucket of oldBuckets) {
            for (const entry of bucket) {
                const key = entry[0];
                const value = entry[1];
                const newBucket = this.buckets[this.hash(key)];
                newBucket.push([key, value]);
                this.numberOfEntries++;
            }
        }

        console.log(`Hash table resized from ${oldBucketCount} buckets to ${this.buckets.length} buckets.`);
    }
}

function printMemoryUsage(label) {
    const megabytes = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`${label}: ${megabytes.toFixed(2)} MB heap used`);
}

const inventory = new HashTable();
const mouse = { name: "Wireless Mouse", price: 24.99, quantity: 15 };
const keyboard = { name: "Mechanical Keyboard", price: 69.99, quantity: 8 };
const monitor = { name: "HD Monitor", price: 189.99, quantity: 12 };
const headset = { name: "USB Headset", price: 39.99, quantity: 20 };
const webcam = { name: "HD Webcam", price: 54.99, quantity: 6 };

inventory.set("product-1", mouse);
inventory.set("product-2", keyboard);
inventory.set("product-3", monitor);
inventory.set("product-4", headset);
inventory.set("product-9", webcam);

// These checks demonstrate adding, finding, and checking for products.
console.assert(inventory.get("product-1") === mouse, "A product can be added and found by ID.");
console.assert(inventory.has("product-1"), "has() returns true for an existing product.");
console.assert(!inventory.has("missing-product"), "has() returns false for a missing product.");

const updatedMouse = { ...mouse, quantity: 10 };
inventory.set("product-1", updatedMouse);
console.assert(inventory.get("product-1") === updatedMouse, "An existing product can be updated.");
console.assert(inventory.numberOfEntries === 5, "Updating a product does not increase the entry count.");

// Different keys can have the same hash. This is called a collision.
console.assert(
    inventory.hash("product-1") === inventory.hash("product-9"),
    "The collision test products share a bucket."
);
const collisionBucket = inventory.buckets[inventory.hash("product-1")];
console.assert(collisionBucket.length === 2, "Both colliding products are stored in the same bucket.");
console.log("Collision bucket:", collisionBucket);

console.assert(inventory.delete("product-4"), "delete() returns true when a product is removed.");
console.assert(!inventory.delete("product-4"), "delete() returns false when a product is not found.");
console.assert(inventory.get("product-4") === null, "get() returns null for a missing product.");

// Start with only two buckets to demonstrate that adding entries triggers resize.
const resizeTest = new HashTable(2);
resizeTest.set("resize-1", { name: "First resize test item" });
resizeTest.set("resize-2", { name: "Second resize test item" });
console.assert(resizeTest.buckets.length === 4, "The table resizes when its load factor exceeds 0.75.");
console.assert(resizeTest.get("resize-1") !== null, "Resizing preserves existing entries.");
console.assert(resizeTest.get("resize-2") !== null, "Resizing preserves all entries.");
console.log("HashTable functionality tests passed.");

// Create sample data to compare the custom table with JavaScript's built-in Map.
const numberOfOperations = 100000;
const sequentialKeyCount = Math.floor(numberOfOperations / 2);
printMemoryUsage("Before creating benchmark test data");

const benchmarkEntries = Array.from({ length: numberOfOperations }, (_, index) => {
    const key = index < sequentialKeyCount
        ? `product-${index + 1}`
        : `random-${Math.random().toString(36).slice(2)}-${index}`;
    return [key, { name: `Benchmark product ${index + 1}`, price: 1, quantity: 1 }];
});

// Time how long it takes to add and look up all the sample entries.
const benchmarkHashTable = new HashTable();
console.time("HashTable set");
let start = performance.now();
for (const [key, value] of benchmarkEntries) {
    benchmarkHashTable.set(key, value);
}
let end = performance.now();
console.timeEnd("HashTable set");
let seconds = (end - start) / 1000;
console.log(`HashTable set operations per second: ${Math.round(numberOfOperations / seconds)}`);
printMemoryUsage("After filling the custom HashTable");

console.time("HashTable get");
start = performance.now();
for (const [key] of benchmarkEntries) {
    benchmarkHashTable.get(key);
}
end = performance.now();
console.timeEnd("HashTable get");
seconds = (end - start) / 1000;
console.log(`HashTable get operations per second: ${Math.round(numberOfOperations / seconds)}`);

const inventoryMap = new Map();
console.time("Map set");
start = performance.now();
for (const [key, value] of benchmarkEntries) {
    inventoryMap.set(key, value);
}
end = performance.now();
console.timeEnd("Map set");
seconds = (end - start) / 1000;
console.log(`Map set operations per second: ${Math.round(numberOfOperations / seconds)}`);
printMemoryUsage("After filling the Map");

console.time("Map get");
start = performance.now();
for (const [key] of benchmarkEntries) {
    inventoryMap.get(key);
}
end = performance.now();
console.timeEnd("Map get");
seconds = (end - start) / 1000;
console.log(`Map get operations per second: ${Math.round(numberOfOperations / seconds)}`);
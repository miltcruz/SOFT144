const packages = [
    { trackingNumber: "PKG1005", customer: "Jordan Lee", address: "120 Pine Street", priority: 2 },
    { trackingNumber: "PKG1002", customer: "Taylor Smith", address: "45 Oak Avenue", priority: 1 },
    { trackingNumber: "PKG1008", customer: "Morgan Davis", address: "800 River Road", priority: 3 },
    { trackingNumber: "PKG1001", customer: "Casey Brown", address: "12 Maple Drive", priority: 1 },
    { trackingNumber: "PKG1007", customer: "Riley Johnson", address: "300 Cedar Lane", priority: 2 },
    { trackingNumber: "PKG1003", customer: "Avery Wilson", address: "77 Elm Court", priority: 3 },
    { trackingNumber: "PKG1006", customer: "Quinn Martinez", address: "510 Birch Boulevard", priority: 1 },
    { trackingNumber: "PKG1004", customer: "Dana Clark", address: "909 Willow Way", priority: 2 }
];

// Checks each item one by one until it finds a match (or reaches the end).
function linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].trackingNumber === target) {
            return array[i];
        }
    }
    return null; // Return null if the target is not found
}

// Repeatedly checks the middle item and cuts the search area in half.
// The array must already be sorted for this to work correctly.
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid].trackingNumber === target) {
            return array[mid];
        } else if (array[mid].trackingNumber < target) {
            left = mid + 1; // Search the right half
        } else {
            right = mid - 1; // Search the left half
        }
    }
    return null; // Return null if the target is not found
}

// Linear search on the original (unsorted) array
console.log("--- Linear Search ---");
console.log(linearSearch(packages, "PKG1002"));
console.log(linearSearch(packages, "PKG9999"));

// Sort a copy so the original order is unchanged
const sortedPackages = [...packages].sort((a, b) =>
    a.trackingNumber.localeCompare(b.trackingNumber)
);
console.log("\nSorted tracking numbers:");
console.log(sortedPackages.map(p => p.trackingNumber).join(", "));

// Binary search on the sorted copy
console.log("\n--- Binary Search ---");
console.log(binarySearch(sortedPackages, "PKG1002"));
console.log(binarySearch(sortedPackages, "PKG9999"));

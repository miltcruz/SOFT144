const orders = [
    { orderNumber: 1005, customer: "Jordan Lee", total: 84.99, priority: 2 },
    { orderNumber: 1002, customer: "Taylor Smith", total: 149.50, priority: 1 },
    { orderNumber: 1008, customer: "Morgan Davis", total: 42.75, priority: 3 },
    { orderNumber: 1001, customer: "Riley Chen", total: 215.00, priority: 1 },
    { orderNumber: 1007, customer: "Casey Patel", total: 67.25, priority: 2 },
    { orderNumber: 1004, customer: "Jamie Rivera", total: 128.40, priority: 3 },
    { orderNumber: 1003, customer: "Avery Brooks", total: 35.99, priority: 1 },
    { orderNumber: 1006, customer: "Quinn Murphy", total: 96.10, priority: 2 }
];

function bubbleSortByTotal(inputOrders) {
    const sortedOrders = [...inputOrders];
    let comparisons = 0;
    let swaps = 0;

    for (let end = sortedOrders.length - 1; end > 0; end--) {
        let swapped = false;

        for (let i = 0; i < end; i++) {
            comparisons++;
            if (sortedOrders[i].total > sortedOrders[i + 1].total) {
                [sortedOrders[i], sortedOrders[i + 1]] =
                    [sortedOrders[i + 1], sortedOrders[i]];
                swaps++;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return { sortedOrders, comparisons, swaps };
}

function selectionSortByTotal(inputOrders) {
    const sortedOrders = [...inputOrders];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < sortedOrders.length - 1; i++) {
        let lowestIndex = i;

        for (let j = i + 1; j < sortedOrders.length; j++) {
            comparisons++;
            if (sortedOrders[j].total < sortedOrders[lowestIndex].total) {
                lowestIndex = j;
            }
        }

        if (lowestIndex !== i) {
            [sortedOrders[i], sortedOrders[lowestIndex]] =
                [sortedOrders[lowestIndex], sortedOrders[i]];
            swaps++;
        }
    }

    return { sortedOrders, comparisons, swaps };
}

function insertionSortByTotal(inputOrders) {
    const sortedOrders = [...inputOrders];
    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < sortedOrders.length; i++) {
        const currentOrder = sortedOrders[i];
        let position = i;

        while (position > 0) {
            comparisons++;
            if (sortedOrders[position - 1].total <= currentOrder.total) {
                break;
            }
            sortedOrders[position] = sortedOrders[position - 1];
            position--;
            moves++;
        }

        if (position !== i) {
            sortedOrders[position] = currentOrder;
            moves++;
        }
    }

    return { sortedOrders, comparisons, moves };
}

function bubbleSortNumbers(numbers) {
    const sortedNumbers = [...numbers];
    let comparisons = 0;
    let swaps = 0;

    for (let end = sortedNumbers.length - 1; end > 0; end--) {
        let swapped = false;

        for (let i = 0; i < end; i++) {
            comparisons++;
            if (sortedNumbers[i] > sortedNumbers[i + 1]) {
                [sortedNumbers[i], sortedNumbers[i + 1]] =
                    [sortedNumbers[i + 1], sortedNumbers[i]];
                swaps++;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return { sortedNumbers, comparisons, swaps };
}

function selectionSortNumbers(numbers) {
    const sortedNumbers = [...numbers];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < sortedNumbers.length - 1; i++) {
        let lowestIndex = i;

        for (let j = i + 1; j < sortedNumbers.length; j++) {
            comparisons++;
            if (sortedNumbers[j] < sortedNumbers[lowestIndex]) {
                lowestIndex = j;
            }
        }

        if (lowestIndex !== i) {
            [sortedNumbers[i], sortedNumbers[lowestIndex]] =
                [sortedNumbers[lowestIndex], sortedNumbers[i]];
            swaps++;
        }
    }

    return { sortedNumbers, comparisons, swaps };
}

function insertionSortNumbers(numbers) {
    const sortedNumbers = [...numbers];
    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < sortedNumbers.length; i++) {
        const currentNumber = sortedNumbers[i];
        let position = i;

        while (position > 0) {
            comparisons++;
            if (sortedNumbers[position - 1] <= currentNumber) {
                break;
            }
            sortedNumbers[position] = sortedNumbers[position - 1];
            position--;
            moves++;
        }

        if (position !== i) {
            sortedNumbers[position] = currentNumber;
            moves++;
        }
    }

    return { sortedNumbers, comparisons, moves };
}

function printOrders(label, sortedOrders) {
    console.log(`\n${label} Results:`);
    for (const order of sortedOrders) {
        console.log(order.orderNumber, order.customer, order.total);
    }
}

function assertSortedOrders(sortedOrders, label) {
    console.assert(sortedOrders.length === orders.length, `${label} should retain every order`);
    console.assert(
        sortedOrders[0].total === Math.min(...orders.map(order => order.total)),
        `${label} should put the lowest total first`
    );
    console.assert(
        sortedOrders[sortedOrders.length - 1].total === Math.max(...orders.map(order => order.total)),
        `${label} should put the highest total last`
    );

    for (let i = 1; i < sortedOrders.length; i++) {
        console.assert(
            sortedOrders[i - 1].total <= sortedOrders[i].total,
            `${label} should sort totals in ascending order`
        );
    }
}

const originalOrders = JSON.stringify(orders);
const bubbleResult = bubbleSortByTotal(orders);
const selectionResult = selectionSortByTotal(orders);
const insertionResult = insertionSortByTotal(orders);

printOrders("Bubble Sort", bubbleResult.sortedOrders);
printOrders("Selection Sort", selectionResult.sortedOrders);
printOrders("Insertion Sort", insertionResult.sortedOrders);

for (const [label, result] of [
    ["Bubble Sort", bubbleResult],
    ["Selection Sort", selectionResult],
    ["Insertion Sort", insertionResult]
]) {
    assertSortedOrders(result.sortedOrders, label);
}

const expectedOrderNumbers = bubbleResult.sortedOrders.map(order => order.orderNumber);
console.assert(
    JSON.stringify(selectionResult.sortedOrders.map(order => order.orderNumber)) ===
        JSON.stringify(expectedOrderNumbers),
    "Selection Sort should produce the same sorted order as Bubble Sort"
);
console.assert(
    JSON.stringify(insertionResult.sortedOrders.map(order => order.orderNumber)) ===
        JSON.stringify(expectedOrderNumbers),
    "Insertion Sort should produce the same sorted order as Bubble Sort"
);
console.assert(JSON.stringify(orders) === originalOrders, "Sorting should not change the original orders");

for (const sortOrders of [bubbleSortByTotal, selectionSortByTotal, insertionSortByTotal]) {
    console.assert(sortOrders([]).sortedOrders.length === 0, "An empty array should sort without an error");
    const oneOrder = [orders[0]];
    const oneOrderResult = sortOrders(oneOrder);
    console.assert(oneOrderResult.sortedOrders.length === 1, "A one-order array should retain its order");
    console.assert(oneOrder[0] === orders[0], "Sorting should not change the one-order input");

    const equalTotalOrders = [
        { orderNumber: 2001, customer: "Sam", total: 25 },
        { orderNumber: 2002, customer: "Alex", total: 25 },
        { orderNumber: 2003, customer: "Drew", total: 10 }
    ];
    const equalTotalResult = sortOrders(equalTotalOrders).sortedOrders;
    console.assert(equalTotalResult.length === equalTotalOrders.length, "Equal totals should not lose orders");
    console.assert(
        new Set(equalTotalResult.map(order => order.orderNumber)).size === equalTotalOrders.length,
        "Equal totals should preserve every order number"
    );
    console.assert(
        equalTotalResult.every((order, index, list) =>
            index === 0 || list[index - 1].total <= order.total
        ),
        "Orders with equal totals should remain in ascending total order"
    );
}

console.log("\nAlgorithm counts:");
console.log("Bubble Sort:", bubbleResult.comparisons, "comparisons,", bubbleResult.swaps, "swaps");
console.log("Selection Sort:", selectionResult.comparisons, "comparisons,", selectionResult.swaps, "swaps");
console.log("Insertion Sort:", insertionResult.comparisons, "comparisons,", insertionResult.moves, "moves");

const ordersByTotalDescending = [...orders].sort((a, b) => b.total - a.total);
const ordersByNumber = [...orders].sort((a, b) => a.orderNumber - b.orderNumber);
const ordersByPriority = [...orders].sort((a, b) => a.priority - b.priority);

printOrders("Highest to Lowest Total", ordersByTotalDescending);
printOrders("Order Number", ordersByNumber);
console.log("\nDelivery Priority Results (1 = Express, 2 = Standard, 3 = Economy):");
for (const order of ordersByPriority) {
    console.log(order.orderNumber, order.customer, order.total, "Priority:", order.priority);
}

const testInputs = [
    { type: "Already sorted", values: [10, 20, 30, 40, 50, 60, 70, 80] },
    { type: "Reverse sorted", values: [80, 70, 60, 50, 40, 30, 20, 10] },
    { type: "Random order", values: [40, 10, 70, 30, 80, 20, 60, 50] }
];
const numberSorts = [
    { name: "Bubble Sort", sort: bubbleSortNumbers, countName: "swaps" },
    { name: "Selection Sort", sort: selectionSortNumbers, countName: "swaps" },
    { name: "Insertion Sort", sort: insertionSortNumbers, countName: "moves" }
];

console.log("\nSmall Input Order Experiments:");
for (const test of testInputs) {
    for (const algorithm of numberSorts) {
        const result = algorithm.sort(test.values);
        console.log(
            `${algorithm.name} | ${test.type} | ${result.comparisons} comparisons | ` +
            `${result[algorithm.countName]} ${algorithm.countName}`
        );
    }
}

const numbers = [];
for (let i = 0; i < 5000; i++) {
    numbers.push(Math.floor(Math.random() * 100000));
}

const bubbleNumbers = [...numbers];
const selectionNumbers = [...numbers];
const insertionNumbers = [...numbers];
const builtInNumbers = [...numbers];

console.log("\nPerformance Test (5,000 random numbers):");
console.time("Bubble Sort");
bubbleSortNumbers(bubbleNumbers);
console.timeEnd("Bubble Sort");

console.time("Selection Sort");
selectionSortNumbers(selectionNumbers);
console.timeEnd("Selection Sort");

console.time("Insertion Sort");
insertionSortNumbers(insertionNumbers);
console.timeEnd("Insertion Sort");

console.time("Built-in Sort");
builtInNumbers.sort((a, b) => a - b);
console.timeEnd("Built-in Sort");

module.exports = {
    bubbleSortByTotal,
    selectionSortByTotal,
    insertionSortByTotal
};

// Part 2: Node class
// Each node represents one product ID stored in the warehouse system.
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Part 3: Binary Search Tree class
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Adds a product ID to the correct location in the tree.
    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) {
                return this; // No duplicate product IDs
            }
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Returns true if the product ID exists, otherwise false.
    contains(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    // Removes a product ID from the tree while keeping BST ordering intact.
    remove(value) {
        this.root = this.#removeNode(this.root, value);
        return this;
    }

    #removeNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.#removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.#removeNode(node.right, value);
            return node;
        } else {
            // Node found.

            // Case 1: Leaf node (no children).
            if (node.left === null && node.right === null) {
                return null;
            }

            // Case 2: One child.
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            // Case 3: Two children.
            // Replace the value with the smallest value from the right subtree
            // (the in-order successor), then remove that successor node.
            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.value = successor.value;
            node.right = this.#removeNode(node.right, successor.value);
            return node;
        }
    }

    // Returns the product IDs from smallest to largest.
    inOrderTraversal() {
        const results = [];

        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            results.push(node.value);
            traverse(node.right);
        }

        traverse(this.root);
        return results;
    }

    // Visits the current node before visiting its children.
    preOrderTraversal() {
        const results = [];

        function traverse(node) {
            if (node === null) return;
            results.push(node.value);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
        return results;
    }

    // Visits the children before visiting the current node.
    postOrderTraversal() {
        const results = [];

        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            results.push(node.value);
        }

        traverse(this.root);
        return results;
    }

    // Returns the height of the tree (number of edges on the longest path
    // from the root to a leaf). An empty tree has a height of -1.
    height() {
        function treeHeight(node) {
            if (node === null) return -1;
            return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
        }

        return treeHeight(this.root);
    }

    // Part 9: Searches for a product ID while counting how many nodes are checked.
    searchWithCount(value) {
        let current = this.root;
        let steps = 0;

        while (current !== null) {
            steps++;
            if (value === current.value) {
                return { found: true, steps };
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return { found: false, steps };
    }
}

// Part 4: Add Warehouse Product IDs
const productTree = new BinarySearchTree();
const productIds = [50, 30, 70, 20, 40, 60, 80];
productIds.forEach(id => productTree.insert(id));

console.log("--- Part 4: Insert Product IDs ---");
console.log("In-order traversal:", productTree.inOrderTraversal().join(", "));

// Part 5: Test Searching
console.log("\n--- Part 5: Test Searching ---");

// Product ID stored near the root
console.assert(
    productTree.contains(50) === true,
    "Product 50 should be in the tree"
);

// Product ID stored near the bottom of the tree
console.assert(
    productTree.contains(60) === true,
    "Product 60 should be in the tree"
);

// Product ID that does not exist
console.assert(
    productTree.contains(99) === false,
    "Product 99 should not be in the tree"
);

console.log("Search tests complete (see console for any failed assertions).");

// Part 6: Test Removing Products
console.log("\n--- Part 6: Test Removing Products ---");

// 1. Remove a leaf node (20 has no children).
productTree.remove(20);
console.assert(
    productTree.contains(20) === false,
    "Product 20 should have been removed (leaf node)"
);
console.log("After removing leaf node 20:", productTree.inOrderTraversal().join(", "));

// 2. Remove a node with one child (30 now only has a right child, 40).
productTree.remove(30);
console.assert(
    productTree.contains(30) === false,
    "Product 30 should have been removed (one child)"
);
console.log("After removing one-child node 30:", productTree.inOrderTraversal().join(", "));

// 3. Remove a node with two children (70 has children 60 and 80).
productTree.remove(70);
console.assert(
    productTree.contains(70) === false,
    "Product 70 should have been removed (two children)"
);
console.log("After removing two-child node 70:", productTree.inOrderTraversal().join(", "));

// Part 7: Display the Tree Traversals
console.log("\n--- Part 7: Tree Traversals ---");
console.log("In-order:", productTree.inOrderTraversal());
console.log("Pre-order:", productTree.preOrderTraversal());
console.log("Post-order:", productTree.postOrderTraversal());

// Part 8: Compare Insertion Order
console.log("\n--- Part 8: Compare Insertion Order ---");

// Tree A: Sorted Insertion
const sortedTree = new BinarySearchTree();
[10, 20, 30, 40, 50, 60, 70, 80, 90].forEach(id => sortedTree.insert(id));

// Tree B: Mixed Insertion
const mixedTree = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80, 10, 90].forEach(id => mixedTree.insert(id));

console.log("Sorted tree height:", sortedTree.height());
console.log("Mixed tree height:", mixedTree.height());

// Part 9: Compare Search Steps
console.log("\n--- Part 9: Compare Search Steps ---");

function compareSearch(targetId) {
    const sortedResult = sortedTree.searchWithCount(targetId);
    const mixedResult = mixedTree.searchWithCount(targetId);

    console.log(`\nSearching for product ID: ${targetId}`);
    console.log(`Sorted tree nodes checked: ${sortedResult.steps}`);
    console.log(`Mixed tree nodes checked: ${mixedResult.steps}`);

    if (sortedResult.steps < mixedResult.steps) {
        console.log("Fewer steps: Sorted tree");
    } else if (mixedResult.steps < sortedResult.steps) {
        console.log("Fewer steps: Mixed tree");
    } else {
        console.log("Fewer steps: Both trees required the same number of steps");
    }
}

// Existing product ID
compareSearch(90);

// Product ID that does not exist
compareSearch(100);

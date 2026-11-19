// Delivery Route Planner
// A graph-based model of a delivery network using an adjacency list.

class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Part 3: Add Locations
  addLocation(location) {
    if (this.adjacencyList.has(location)) {
      return false;
    }
    this.adjacencyList.set(location, []);
    return true;
  }

  // Part 4: Add Roads
  addRoad(locationA, locationB) {
    if (!this.adjacencyList.has(locationA) || !this.adjacencyList.has(locationB)) {
      return false;
    }

    if (this.hasRoad(locationA, locationB)) {
      return false;
    }

    this.adjacencyList.get(locationA).push(locationB);
    this.adjacencyList.get(locationB).push(locationA);
    return true;
  }

  // Part 6: Check for Locations and Roads
  hasLocation(location) {
    return this.adjacencyList.has(location);
  }

  hasRoad(locationA, locationB) {
    if (!this.adjacencyList.has(locationA) || !this.adjacencyList.has(locationB)) {
      return false;
    }
    return this.adjacencyList.get(locationA).includes(locationB);
  }

  getConnections(location) {
    if (!this.adjacencyList.has(location)) {
      return [];
    }
    return [...this.adjacencyList.get(location)];
  }

  // Part 7: Remove a Road
  removeRoad(locationA, locationB) {
    if (!this.hasRoad(locationA, locationB)) {
      return false;
    }

    const connectionsA = this.adjacencyList.get(locationA);
    const connectionsB = this.adjacencyList.get(locationB);

    this.adjacencyList.set(locationA, connectionsA.filter((location) => location !== locationB));
    this.adjacencyList.set(locationB, connectionsB.filter((location) => location !== locationA));
    return true;
  }

  // Part 8: Remove a Location
  removeLocation(location) {
    if (!this.adjacencyList.has(location)) {
      return false;
    }

    const connections = this.adjacencyList.get(location);
    for (const neighbor of connections) {
      const neighborConnections = this.adjacencyList.get(neighbor);
      this.adjacencyList.set(
        neighbor,
        neighborConnections.filter((connectedLocation) => connectedLocation !== location)
      );
    }

    this.adjacencyList.delete(location);
    return true;
  }

  // Part 9: Breadth-First Search
  breadthFirstSearch(startLocation) {
    if (!this.adjacencyList.has(startLocation)) {
      return [];
    }

    const visited = new Set([startLocation]);
    const queue = [startLocation];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);

      for (const neighbor of this.adjacencyList.get(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // Part 10: Depth-First Search
  depthFirstSearch(startLocation) {
    if (!this.adjacencyList.has(startLocation)) {
      return [];
    }

    const visited = new Set();
    const result = [];

    const visit = (location) => {
      visited.add(location);
      result.push(location);

      for (const neighbor of this.adjacencyList.get(location)) {
        if (!visited.has(neighbor)) {
          visit(neighbor);
        }
      }
    };

    visit(startLocation);
    return result;
  }

  // Part 11: Find a Delivery Route
  findRoute(startLocation, destination) {
    if (!this.adjacencyList.has(startLocation) || !this.adjacencyList.has(destination)) {
      return null;
    }

    if (startLocation === destination) {
      return [startLocation];
    }

    const visited = new Set([startLocation]);
    const queue = [startLocation];
    const previous = new Map();

    while (queue.length > 0) {
      const current = queue.shift();

      if (current === destination) {
        const route = [];
        let step = destination;
        while (step !== undefined) {
          route.unshift(step);
          step = previous.get(step);
        }
        return route;
      }

      for (const neighbor of this.adjacencyList.get(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          previous.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return null;
  }

  // Part 14: Count Locations and Roads
  locationCount() {
    return this.adjacencyList.size;
  }

  roadCount() {
    let totalConnections = 0;
    for (const connections of this.adjacencyList.values()) {
      totalConnections += connections.length;
    }
    // Each road is stored once in each location's connection list (twice total).
    return totalConnections / 2;
  }

  printAdjacencyList() {
    for (const [location, connections] of this.adjacencyList) {
      console.log(`${location}: ${connections.join(", ")}`);
    }
  }
}

// Part 5: Create the Delivery Network
const deliveryGraph = new Graph();

deliveryGraph.addLocation("Warehouse");
deliveryGraph.addLocation("Downtown");
deliveryGraph.addLocation("Airport");
deliveryGraph.addLocation("North Station");
deliveryGraph.addLocation("Shopping Center");
deliveryGraph.addLocation("University");
deliveryGraph.addLocation("Hospital");

deliveryGraph.addRoad("Warehouse", "Downtown");
deliveryGraph.addRoad("Warehouse", "Airport");
deliveryGraph.addRoad("Downtown", "Shopping Center");
deliveryGraph.addRoad("Downtown", "University");
deliveryGraph.addRoad("Airport", "North Station");
deliveryGraph.addRoad("North Station", "Hospital");
deliveryGraph.addRoad("Shopping Center", "Hospital");
deliveryGraph.addRoad("University", "Hospital");

console.log("Delivery Network Adjacency List:");
deliveryGraph.printAdjacencyList();

const bfsResult = deliveryGraph.breadthFirstSearch("Warehouse");
console.log("\nBFS:", bfsResult);

const dfsResult = deliveryGraph.depthFirstSearch("Warehouse");
console.log("DFS:", dfsResult);

const route = deliveryGraph.findRoute("Warehouse", "Hospital");
console.log("Delivery route:", route ? route.join(" -> ") : null);

// Part 12: Test the Graph
console.log("\nRunning graph tests...");

console.assert(
  deliveryGraph.addLocation("Train Depot") === true,
  "A new location should be added"
);

console.assert(
  deliveryGraph.addLocation("Warehouse") === false,
  "A duplicate location should not be added"
);

console.assert(
  deliveryGraph.addRoad("Train Depot", "Downtown") === true,
  "A road should be added between two existing locations"
);

console.assert(
  deliveryGraph.getConnections("Downtown").includes("Train Depot") &&
    deliveryGraph.getConnections("Train Depot").includes("Downtown"),
  "A road should be stored in both directions"
);

console.assert(
  deliveryGraph.addRoad("Train Depot", "Downtown") === false,
  "A duplicate road should not be added"
);

console.assert(
  deliveryGraph.addRoad("Train Depot", "Nowhere") === false,
  "A road cannot be added when a location is missing"
);

console.assert(
  deliveryGraph.hasLocation("Warehouse") === true,
  "The Warehouse should exist"
);

console.assert(
  deliveryGraph.hasRoad("Warehouse", "Airport") === true,
  "The Warehouse should have a road to the Airport"
);

console.assert(
  bfsResult.length === deliveryGraph.locationCount() - 1,
  "BFS from the Warehouse should visit every other connected location"
);

console.assert(
  new Set(bfsResult).size === bfsResult.length,
  "No location should appear twice in the BFS traversal"
);

console.assert(
  dfsResult.length === deliveryGraph.locationCount() - 1,
  "DFS from the Warehouse should visit every other connected location"
);

console.assert(
  new Set(dfsResult).size === dfsResult.length,
  "No location should appear twice in the DFS traversal"
);

console.assert(
  route !== null && route[0] === "Warehouse" && route[route.length - 1] === "Hospital",
  "A route from the Warehouse to the Hospital should exist"
);

console.assert(
  deliveryGraph.findRoute("Warehouse", "Nowhere") === null,
  "A missing route should return null"
);

console.assert(
  deliveryGraph.removeRoad("Train Depot", "Downtown") === true,
  "An existing road should be removed"
);

console.assert(
  deliveryGraph.hasRoad("Train Depot", "Downtown") === false,
  "The removed road should no longer exist"
);

console.assert(
  deliveryGraph.removeLocation("Train Depot") === true,
  "An existing location should be removed"
);

console.assert(
  deliveryGraph.hasLocation("Train Depot") === false,
  "The removed location should no longer exist"
);

console.assert(
  !deliveryGraph.getConnections("Downtown").includes("Train Depot"),
  "A removed location should not remain in another location's connections"
);

// Part 13: Test an Unreachable Location
deliveryGraph.addLocation("Remote Office");

console.assert(
  deliveryGraph.hasLocation("Remote Office") === true,
  "The Remote Office should exist in the graph"
);

const bfsFromWarehouse = deliveryGraph.breadthFirstSearch("Warehouse");
console.assert(
  !bfsFromWarehouse.includes("Remote Office"),
  "BFS from the Warehouse should not visit the unconnected Remote Office"
);

const dfsFromWarehouse = deliveryGraph.depthFirstSearch("Warehouse");
console.assert(
  !dfsFromWarehouse.includes("Remote Office"),
  "DFS from the Warehouse should not visit the unconnected Remote Office"
);

console.assert(
  deliveryGraph.findRoute("Warehouse", "Remote Office") === null,
  "There should be no route to the unconnected Remote Office"
);

console.log("Graph tests complete.");

// Part 14: Count Locations and Roads
console.log("\nLocation count:", deliveryGraph.locationCount());
console.log("Road count:", deliveryGraph.roadCount());

// Part 15: Run a Larger Test
console.log("\nBuilding larger test graph...");

const largeGraph = new Graph();
const LOCATION_COUNT = 1000;

for (let i = 1; i <= LOCATION_COUNT; i++) {
  largeGraph.addLocation(`Location-${i}`);
}

// Chain each location to the next one.
for (let i = 1; i < LOCATION_COUNT; i++) {
  largeGraph.addRoad(`Location-${i}`, `Location-${i + 1}`);
}

// Add extra roads to create multiple route choices.
for (let i = 1; i <= LOCATION_COUNT - 10; i += 10) {
  largeGraph.addRoad(`Location-${i}`, `Location-${i + 10}`);
}

console.log(`Large graph created with ${largeGraph.locationCount()} locations and ${largeGraph.roadCount()} roads.`);

console.time("BFS");
largeGraph.breadthFirstSearch("Location-1");
console.timeEnd("BFS");

console.time("DFS");
largeGraph.depthFirstSearch("Location-1");
console.timeEnd("DFS");

console.time("findRoute");
largeGraph.findRoute("Location-1", `Location-${LOCATION_COUNT}`);
console.timeEnd("findRoute");

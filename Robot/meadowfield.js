const roads = [
	"Alice's House-Bob's House",
	"Alice's House-Cabin",
	"Alice's House-Post Office",
	"Bob's House-Town Hall",
	"Daria's House-Ernie's House",
	"Daria's House-Town Hall",
	"Ernie's House-Grete's House",
	"Grete's House-Farm",
	"Grete's House-Shop",
	'Marketplace-Farm',
	'Marketplace-Post Office',
	'Marketplace-Shop',
	'Marketplace-Town Hall',
	'Shop-Town Hall',
];

//! buildGraph creates a map object that, for each node, stores an array of connected nodes.
//! It uses the split method to go from the road strings—which have the form "Start-End")—to two-element arrays containing the start and end as separate strings.

function buildGraph(edges) {
	// let graph = Object.create(null);
	let graph = {};
	function addEdge(from, to) {
		if (from in graph) {
			graph[from].push(to);
		} else {
			graph[from] = [to];
		}
	}
	for (let [from, to] of edges.map((r) => r.split('-'))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}

const roadGraph = buildGraph(roads);
// console.log("roadGraph: ", roadGraph)

class VillageState {
	constructor(place, parcels) {
		this.place = place;
		this.parcels = parcels;
	}

	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let parcels = this.parcels
				.map((p) => {
					if (p.place != this.place) return p;
					return { place: destination, address: p.address };
				})
				.filter((p) => p.place != p.address);
			return new VillageState(destination, parcels);
		}
	}
}

let first = new VillageState('Post Office', [
	{ place: 'Post Office', address: "Alice's House" },
]);
let next = first.move("Alice's House");

//! console.log(next.place);
// // → Alice's House
//! console.log(next.parcels);
// // → []
//! console.log(first.place);
// // → Post Office

function runRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}

function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}

function randomRobot(state) {
	return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		let address = randomPick(Object.keys(roadGraph));
		let place;
		do {
			place = randomPick(Object.keys(roadGraph));
		} while (place == address);
		parcels.push({ place, address });
	}
	return new VillageState('Post Office', parcels);
};

// runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns

const mailRoute = [
	"Alice's House",
	'Cabin',
	"Alice's House",
	"Bob's House",
	'Town Hall',
	"Daria's House",
	"Ernie's House",
	"Grete's House",
	'Shop',
	"Grete's House",
	'Farm',
	'Marketplace',
	'Post Office',
];

function routeRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;
	}
	return { direction: memory[0], memory: memory.slice(1) };
}

// Looking for the shortest route before looking at longer ones. When searching for a route from A to B, we are interested only in the ones that start at A. We also don’t care about routes that visit the same place twice—those are definitely not the most efficient route anywhere. So that cuts down on the number of routes that the route finder has to consider.
function findRoute(graph, from, to) {
	let work = [{ at: from, route: [] }];
	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i];
		for (let place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some((w) => w.at == place)) {
				work.push({ at: place, route: route.concat(place) });
			}
		}
	}
}

function goalOrientedRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return { direction: route[0], memory: route.slice(1) };
}

//! runRobot(VillageState.random(), goalOrientedRobot, []);

/* Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let both of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.

You’ll have to write a variant of the runRobot function that, instead of logging the events to the console, returns the number of steps the robot took to complete the task.

Your measurement function can then, in a loop, generate new states and count the steps each of the robots takes. When it has generated enough measurements, it can use console.log to output the average for each robot, which is the total number of steps taken divided by the number of measurements.
*/

function countSteps(state, robot, memory) {
	for (let steps = 0; ; steps++) {
		if (state.parcels.length == 0) return steps;
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
	}
}

function compareRobots(robot1, memory1, robot2, memory2) {
	// Your code here
	let total1 = 0,
		total2 = 0;
	for (let i = 0; i < 100; i++) {
		let state = VillageState.random();
		total1 += countSteps(state, robot1, memory1);
		total2 += countSteps(state, robot2, memory2);
	}
	console.log(`Robot 1 needed ${total1 / 100} steps per task`);
	console.log(`Robot 2 needed ${total2 / 100}`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);


// The standard JavaScript environment provides another data structure called Set. Like an instance of Map, a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect.

// Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

// Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

// Give the class a static from method that takes an iterable object as its argument and creates a group that contains all the values produced by iterating over it.

class Group {
	// Your code here.
	#members = [];

	add(num) {
		if (!this.has(num)) {
			this.#members.push(num);
		}
	}
	delete(num) {
		this.#members = this.#members.filter((v) => v !== num);
	}
	has(num) {
		return this.#members.includes(num);
	}

	static from(collection) {
		let group = new Group();
		for (let num of collection) {
			group.add(num);
			// console.log(num);
		}
		return group;
	}
	[Symbol.iterator]() {
		return new GroupIterator(this.#members);
	}
}

class GroupIterator {
	#members;
	#position;

	constructor(members) {
		this.#members = members;
		this.#position = 0;
	}
	next() {
		if (this.#position >= this.#members.length) {
			return { done: true };
		} else {
			let result = { value: this.#members[this.#position], done: false };
			this.#position += 1;
			return result;
		}
	}
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

// Iterable groups
// Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

// If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

// It is okay if your iterator behaves strangely when the group is modified during iteration.

// It is probably worthwhile to define a new class GroupIterator. Iterator instances should have a property that tracks the current position in the group. Every time next is called, it checks whether it is done and, if not, moves past the current value and returns it.

// The Group class itself gets a method named by Symbol.iterator that, when called, returns a new instance of the iterator class for that group.

// Your code here (and the code from the previous exercise)

for (let value of Group.from(['a', 'b', 'c'])) {
	console.log(value);
}
// → a
// → b
// → c

const names = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

 function dayName(number) {
	return names[number];
}
 function dayNumber(name) {
	return names.indexOf(name);
}

// import { dayName } from './dayname.js';
let now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
// → Today is Monday

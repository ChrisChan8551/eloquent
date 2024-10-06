const { times } = require('async');

function* powers(n) {
	for (let current = n; ; current *= n) {
		yield current;
	}
}

for (let power of powers(3)) {
	if (power > 50) break;
	console.log(power);
}
// → 3
// → 9
// → 27

// Quiet Times
// There’s a security camera near Carla’s lab that’s activated by a motion sensor. It is connected to the network and starts sending out a video stream when it is active. Because she’d rather not be discovered, Carla has set up a system that notices this kind of wireless network traffic and turns on a light in her lair whenever there is activity outside, so she knows when to keep quiet.

// She’s also been logging the times at which the camera is tripped for a while and wants to use this information to visualize which times, in an average week, tend to be quiet and which tend to be busy. The log is stored in files holding one time stamp number (as returned by Date.now()) per line.

// 1695709940692
// 1695701068331
// 1695701189163

// The "camera_logs.txt" file holds a list of logfiles.
// Write an asynchronous function activityTable(day) that for a given day of the week
// returns an array of 24 numbers,
// - one for each hour of the day,
// - that hold the number of camera network traffic observations seen in that hour of the day.
// - Days are identified by number using the system used by Date.getDay, where Sunday is 0 and Saturday is 6.

// The activityGraph function, provided by the sandbox, summarizes such a table into a string.

// To read the files, use the textFile function defined earlier—given a filename, it returns a promise that resolves to the file’s content.
// Remember that new Date(timestamp) creates a Date object for that time, which has getDay and getHours methods returning the day of the week and the hour of the day.

// Both types of files—the list of logfiles and the logfiles themselves—have each piece of data on its own line, separated by newline ("\n") characters.

// You will need to convert the content of these files to an array.
// The easiest way to do that is to use the split method on the string produced by textFile.
// Note that for the logfiles, that will still give you an array of strings, which you have to convert to numbers before passing them to new Date.
// Summarizing all the time points into a table of hours can be done by creating a table (array) that holds a number for each hour in the day.
// You can then loop over all the timestamps (over the logfiles and the numbers in every logfile) and for each one, if it happened on the correct day, take the hour it occurred in, and add one to the corresponding number in the table.

// Make sure you use await on the result of asynchronous functions before doing anything with it, or you’ll end up with a Promise where you expected a string.

async function activityTable(day) {
	let table = [];
	for (let i = 0; i < 24; i++) {
		table[i] = 0;
	}
	let logFileList = await textFile('camera_logs.txt');
	for (let filename of logFileList.split('\n')) {
		let log = await textFile(filename);
		for (let timestamp of log.split('\n')) {
			let date = new Date(Number(timestamp));
			if (date.getDate() == day) {
				table[date.getHours()]++;
			}
		}
		return table;
	}
}

activityTable(1).then((table) => console.log(activityGraph(table)));

// Real Promises
// Rewrite the function from the previous exercise without async/await, using plain Promise methods.
// In this style, using Promise.all will be more convenient than trying to model a loop over the logfiles. In the async function, just using await in a loop is simpler. If reading a file takes some time, which of these two approaches will take the least time to run?

// If one of the files listed in the file list has a typo, and reading it fails, how does that failure end up in the Promise object that your function returns?

// The most straightforward approach to writing this function is to use a chain of then calls. The first promise is produced by reading the list of logfiles. The first callback can split this list and map textFile over it to get an array of promises to pass to Promise.all. It can return the object returned by Promise.all, so that whatever that returns becomes the result of the return value of this first then.

function activityTable(day) {
	// Your code here
	let table = [];
	for (let i = 0; i < 24; i++) table[i] = 0;

	return textFile('camera_logs.txt')
		.then((files) => {
			return Promise.all(
				files.split('\n').map((name) => {
					return textFile(name).then((log) => {
						for (let timestamp of log.split('\n')) {
							let date = new Date(Number(timestamp));
							if (date.getDay() == day) {
								table[date.getHours()]++;
							}
						}
					});
				})
			);
		})
		.then(() => table);
}

activityTable(6).then((table) => console.log(activityGraph(table)));

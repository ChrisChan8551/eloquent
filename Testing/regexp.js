// let nonBinary = /[^01]/;
// console.log(nonBinary.test("1100100010100110"));
// // → false
// console.log(nonBinary.test("0111010112101001"));
// // → true

// let quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));
// // → ["'hello'", "hello"]

// console.log(/bad(ly)?/.exec('bad'));
// // → ["bad", undefined]
// console.log(/(\d)+/.exec('123'));
// // → ["123", "3"]

// console.log(/(?:na)+/.exec("banana"));
// // → ["nana"]

// console.log(new Date());
// // → Fri Feb 02 2024 18:03:06 GMT+0100 (CET)

// console.log(new Date(2013, 11, 19).getTime());
// // → 1387407600000
// console.log(new Date(1387407600000));
// // → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

// function getDate(string) {
// 	let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
// 	return new Date(Number(year), Number(month) - 1, Number(day)).toString();
// }
// console.log(getDate('1-30-2003'));
// // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

// console.log(/a(?=e)/.exec("braeburn"));
// // → ["a"]
// console.log(/a(?! )/.exec("a b"));
// // → null

// let match = /a(?=e)/.exec("braeburn");
// if (match) {
//     console.log([match[0]]);
// } else {
//     console.log(null);
// }

// let animalCount = /\d+ (pig|cow|chicken)s?/;
// console.log(animalCount.test("15 pigs"));
// // → true
// console.log(animalCount.test("15 pugs"));
// // → false

// console.log("papa".replace("p", "m"));

// console.log(
//     "Liskov, Barbara\nMcCarthy, John\nMilner, Robin"
//       .replace(/(\p{L}+), (\p{L}+)/gu, "$2 $1"));
//   // → Barbara Liskov
//   //   John McCarthy
//   //   Robin Milner

//   It is possible to pass a function—rather than a string—as the second argument to replace. For each replacement, the function will be called with the matched groups (as well as the whole match) as arguments, and its return value will be inserted into the new string.
// let stock = '1 lemon, 2 cabbages, and 101 eggs';
// function minusOne(match, amount, unit) {
// 	amount = Number(amount) - 1;
// 	if (amount == 1) {
// 		// only one left, remove the 's'
// 		unit = unit.slice(0, unit.length - 1);
// 	} else if (amount == 0) {
// 		amount = 'no';
// 	}
// 	return amount + ' ' + unit;
// }
// console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne));
// // → no lemon, 1 cabbage, and 100 eggs

// 1. car and cat

// 2. pop and prop

// 3. ferret, ferry, and ferrari

// 4. Any word ending in ious

// 5. A whitespace character followed by a period, comma, colon, or semicolon

// 6. A word longer than six letters

// 7. A word without the letter e (or E)

// 8. Fill in the regular expressions

verify(/ca[rt]/, ['my car', 'bad cats'], ['camper', 'high art']);

verify(/pr?op/, ['pop culture', 'mad props'], ['plop', 'prrrop']);

verify(
	/ferr(et|y|ari)/,
	['ferret', 'ferry', 'ferrari'],
	['ferrum', 'transfer A']
);

verify(
	/ious($|\P{L})/u,
	['how delicious', 'spacious room'],
	['ruinous', 'consciousness']
);

verify(/\s[.,:;]/, ['bad punctuation .'], ['escape the dot']);

verify(
	/\p{L}{7}/u,
	['Siebentausenddreihundertzweiundzwanzig'],
	['no', 'three small words']
);

verify(
	/(^|\P{L})[^\P{L}e]+($|\P{L})/iu,
	['red platypus', 'wobbling nest'],
	['earth bed', 'bedrøvet abe', 'BEET']
);

function verify(regexp, yes, no) {
	// Ignore unfinished exercises
	if (regexp.source == '...') return;

	console.log(`Testing regular expression: ${regexp}`);

	for (let str of yes) {
		if (regexp.test(str)) {
			console.log(`Matched '${str}' as expected.`);
		} else {
			console.log(`Failure to match '${str}'`);
		}
	}

	for (let str of no) {
		if (regexp.test(str)) {
			console.log(`Unexpected match for '${str}'`);
		} else {
			console.log(`Correctly did not match '${str}'`);
		}
	}
	console.log('');
}

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\P{L})'|'(\P{L}|$)/gu, '$1"$2'));
// → "I'm the cook," he said, "it's my job."

// Numbers again
// Write an expression that matches only JavaScript-style numbers. It must support an optional minus or plus sign in front of the number, the decimal dot, and exponent notation—5e-3 or 1E10—again with an optional sign in front of the exponent. Also note that it is not necessary for there to be digits in front of or after the dot, but the number cannot be a dot alone. That is, .5 and 5. are valid JavaScript numbers, but a lone dot isn’t.

// Fill in this regular expression.
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// Tests:
for (let str of [
	'1',
	'-1',
	'+15',
	'1.55',
	'.5',
	'5.',
	'1.3e2',
	'1E-4',
	'1e+12',
]) {
	if (!number.test(str)) {
		console.log(`Failed to match '${str}'`);
	}
}
for (let str of ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']) {
	if (number.test(str)) {
		console.log(`Incorrectly accepted '${str}'`);
	}
}

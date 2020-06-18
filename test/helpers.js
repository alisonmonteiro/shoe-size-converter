import test from 'ava';
import {inchesStringToNumber, inchesNumberToString} from '../helpers.js'; // eslint-disable-line import/extensions

const inchesNumberStringPairs = [
	[3, '3'],
	[3.125, '3 1/8'],
	[3.25, '3 1/4'],
	[3.375, '3 3/8'],
	[3.5, '3 1/2'],
	[3.4321, '3.4321']
];

function inchesStringToNumberMacro(t, input, expected) {
	t.is(inchesStringToNumber(input), expected);
}

for (const [number, string] of inchesNumberStringPairs) {
	test(`inchesStringToNumber: Properly convert ${string} => ${number}`, inchesStringToNumberMacro, string, number);
}

function inchesNumberToStringMacro(t, input, expected) {
	t.is(inchesNumberToString(input), expected);
}

for (const [number, string] of inchesNumberStringPairs) {
	test(`inchesNumberToString: Properly convert ${number} => ${string}`, inchesNumberToStringMacro, number, string);
}

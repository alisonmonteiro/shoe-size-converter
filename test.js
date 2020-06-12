import test from 'ava';
import {converter, convertSizeRange, getClosestValidSize, inchesStringToNumber, inchesNumberToString, sizes} from './index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions

test('ensure that a random size have the same length of the other', t => {
	const euSize = sizes.eu.w.length;
	const caSize = sizes.ca.m.length;

	const usSize = sizes.us.m.length;
	const brSize = sizes.br.w.length;

	const cmSize = sizes.cm.w.length;
	const inSize = sizes.in.m.length;

	t.is(euSize, caSize);
	t.is(usSize, brSize);
	t.is(cmSize, inSize);
});

test('returns right values when passed a valid country', t => {
	const sizes = converter('uk', 'w', 3);

	t.is(Object.keys(sizes).length, 4);
	t.is(sizes.eu, 36);
	t.is(sizes.br, 34);
});

test('returns true when the size is float', t => {
	const sizes = converter('au', 'm', 4.5);

	t.is(Object.keys(sizes).length, 4);
	t.is(sizes.cm, 24);
	t.is(sizes.br, 35);
	t.is(sizes.eu, 37);
});

test('returns false if size does not exists for a specific country and genre', t => {
	const sizes = converter('ca', 'w', 3.5);

	t.is(sizes, false);
});

test('returns specifics output', t => {
	const sizes = converter('uk', 'm', 6, ['br', 'us']);

	t.is(Object.keys(sizes).length, 2);
	t.is(sizes.br, 37);
	t.is(sizes.us, 6.5);
	t.is(sizes.cm, undefined);
	t.is(sizes.eu, undefined);
});

test('throws when country is not valid', t => {
	const error = t.throws(() => {
		converter('hue', 'w', 1.5);
	}, {instanceOf: Error});

	t.is(error.message, 'hue is not supported as a country.');
});

test('throws when output is not valid', t => {
	const error = t.throws(() => {
		converter('uk', 'm', 1.5, ['invalid']);
	}, {instanceOf: Error});

	t.is(error.message, 'invalid is not a valid output.');
});

test('verify string output', t => {
	const sizes = converter('uk', 'm', 6, 'br');

	t.is(Object.keys(sizes).length, 1);
	t.is(sizes.br, 37);
});

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
	test(`inchesStringToNumber: ${string} => ${number}`, inchesStringToNumberMacro, string, number);
}

function inchesNumberToStringMacro(t, input, expected) {
	t.is(inchesNumberToString(input), expected);
}

for (const [number, string] of inchesNumberStringPairs) {
	test(`inchesNumberToString: ${number} => ${string}`, inchesNumberToStringMacro, number, string);
}

test('getClosestValidSize: Size smaller than smallest available', t => {
	const size = getClosestValidSize('eu', 'm', 6);

	t.deepEqual(size, {type: 'm', size: sizes.eu.m[0]});
});

test('getClosestValidSize: Size larger than largest available', t => {
	const size = getClosestValidSize('eu', 'm', 47);

	t.deepEqual(size, {type: 'm', size: sizes.eu.m[sizes.eu.m.length - 1]});
});

test('getClosestValidSize: Size smaller than smallest available - reverse', t => {
	const size = getClosestValidSize('eu', 'm', 6, false);

	t.deepEqual(size, {type: 'm', size: sizes.eu.m[0]});
});

test('getClosestValidSize: Size larger than largest available - reverse order', t => {
	const size = getClosestValidSize('eu', 'm', 47, false);

	t.deepEqual(size, {type: 'm', size: sizes.eu.m[sizes.eu.m.length - 1]});
});

test('getClosestValidSize: Find size in first set - rounded down', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 6.125);

	t.deepEqual(size, {type: 'm', size: 6});
});

test('getClosestValidSize: Find size in first set - rounded up', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 6.375);

	t.deepEqual(size, {type: 'm', size: 6.5});
});

test('getClosestValidSize: Find size in second set', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 13.125);

	t.deepEqual(size, {type: 'w', size: 13});
});

test('getClosestValidSize: Find size in first set - rounded down - reverse', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 6.125, false);

	t.deepEqual(size, {type: 'w', size: 6});
});

test('getClosestValidSize: Find size in first set - rounded up - reverse', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 6.375, false);

	t.deepEqual(size, {type: 'w', size: 6.5});
});

test('getClosestValidSize: Find size in second set - reverse', t => {
	const size = getClosestValidSize('us', ['m', 'w'], 3.625, false);

	t.deepEqual(size, {type: 'm', size: 3.5});
});

test('getClosestValidSize: Find size straight in between', t => {
	const size = getClosestValidSize('ca', ['m', 'k', 'w'], 12.25);

	t.deepEqual(size, {type: 'm', size: 12.5});
});

test('getClosestValidSize: Find size straight in between - reverse', t => {
	const size = getClosestValidSize('ca', ['m', 'k', 'w'], 10.5, false);

	t.deepEqual(size, {type: 'w', size: 11});
});

test('convertSizeRange: EU m/w 37-46', t => {
	const size = convertSizeRange('eu', ['m', 'w'], [37, 46]);

	t.deepEqual(size, [{
		sizes: {
			br: 35,
			cm: 24,
			eu: 37,
			in: '9 3/8'
		},
		type: 'm'
	}, {
		sizes: {
			br: 45,
			cm: 28.6,
			eu: 46.5,
			in: '11 1/4'
		},
		type: 'w'
	}]);
});

test('convertSizeRange: IN m/k/w 9 5/8 - 10.25', t => {
	const size = convertSizeRange('in', ['m', 'k', 'w'], ['9 5/8', 10.25]);

	t.deepEqual(size, [{
		sizes: {
			br: 36,
			cm: 25,
			eu: 38,
			in: '9 5/8'
		},
		type: 'm'
	}, {
		sizes: {
			br: 40,
			cm: 26,
			eu: 42,
			in: '10 1/4'
		},
		type: 'w'
	}]);
});

test('convertSizeRange: ca m/k/w 4.875 - 10.5', t => {
	const size = convertSizeRange('ca', ['m', 'k', 'w'], [4.875, 10.5], ['us', 'uk', 'eu']);

	t.deepEqual(size, [{
		sizes: {
			us: 5,
			uk: 4.5,
			eu: 37
		},
		type: 'm'
	}, {
		sizes: {
			us: 11,
			uk: 9,
			eu: 43
		},
		type: 'w'
	}]);
});

import test from 'ava';
import {converter, sizes} from './index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions

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


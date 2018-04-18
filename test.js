import test from 'ava';
import m from '.';

test('returns right values when passed a valid country', t => {
	const sizes = m('uk', 'w', 3);

	t.is(Object.keys(sizes).length, 4);
	t.is(sizes.eu, 36);
	t.is(sizes.br, 34);
});

test('returns true when the size is float', t => {
	const sizes = m('au', 'm', 4.5);

	t.is(Object.keys(sizes).length, 4);
	t.is(sizes.cm, 24);
	t.is(sizes.br, 35);
	t.is(sizes.eu, 37);
});

test('returns false if size does not exists for a specific country and genre', t => {
	const sizes = m('ca', 'w', 3.5);

	t.is(sizes, false);
});

test('returns specifics output', t => {
	const sizes = m('uk', 'm', 6, ['br', 'us']);

	t.is(Object.keys(sizes).length, 2);
	t.is(sizes.br, 37);
	t.is(sizes.us, 6.5);
	t.is(sizes.cm, undefined);
	t.is(sizes.eu, undefined);
});

test('throws when country is not valid', t => {
	const error = t.throws(() => {
		m('hue', 'w', 1.5);
	}, Error);

	t.is(error.message, 'hue is not supported as a contry.');
});


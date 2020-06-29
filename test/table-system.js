import test from 'ava';
import {table} from '../systems/table/index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions
import {convert} from '../index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions

test('Convert size 230 (Adult, with default values) to proper sizes', t => {
	const results = convert({size: 3, system: 'uk', women: true}, table);

	t.deepEqual(results, [{
		size: 5.5,
		system: 'us',
		women: true
	}, {
		size: 5.5,
		system: 'ca',
		women: true
	}, {
		size: 3,
		system: 'uk',
		women: true
	}, {
		size: 4,
		system: 'au',
		women: true
	}, {
		size: 36,
		system: 'eu',
		unisex: true
	}, {
		size: 34,
		system: 'br',
		unisex: true
	}, {
		size: 23,
		system: 'cm',
		unisex: true
	}, {
		size: 9.125,
		prettySize: '9 1/8',
		system: 'in',
		unisex: true
	}]);
});

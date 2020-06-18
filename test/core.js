import test from 'ava';
import {convert, convertSizeRange, iso} from '../index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions

const adultResults = [{
	size: 4,
	prettySize: '4',
	system: 'au',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'au',
	women: true
}, {
	size: 5,
	prettySize: '5',
	system: 'brannock',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'brannock',
	women: true
}, {
	size: 23,
	system: 'cm',
	unisex: true
}, {
	size: 36.5,
	system: 'eu',
	unisex: true
}, {
	size: 230,
	system: 'mondopoint',
	unisex: true
}, {
	size: 3.5,
	prettySize: '3 1/2',
	system: 'mx',
	men: true,
	women: true
}, {
	size: 4,
	prettySize: '4',
	system: 'uk',
	men: true,
	women: true
}, {
	size: 5,
	prettySize: '5',
	system: 'us',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'us',
	women: true
}];

test('Convert size 230 (Adult, with default values) to proper sizes', t => {
	const results = convert({size: 230}, iso);

	t.deepEqual(results, adultResults);
});

test('Convert size 36.5 EU (Adult) to proper sizes', t => {
	const results = convert({size: 36.5, system: 'eu'}, iso);

	t.deepEqual(results, adultResults);
});

test('Convert size 5 UK (Adult without gender) to proper sizes', t => {
	const results = convert({size: 5, system: 'us'}, iso);

	t.deepEqual(results, adultResults);
});

test('Convert size 6 UK (Adult - women) to proper sizes', t => {
	const results = convert({size: 6, system: 'us', women: true}, iso);

	t.deepEqual(results, adultResults);
});

test('Convert size 23 cm (Adult) to proper sizes', t => {
	const results = convert({size: 23, system: 'cm'}, iso);

	t.deepEqual(results, adultResults);
});

const childrenResults = [{
	size: 5,
	prettySize: '5',
	system: 'au',
	children: true
}, {
	size: 5.5,
	system: 'brannock',
	prettySize: '5 1/2',
	children: true
}, {
	size: 13.5,
	system: 'cm',
	unisex: true,
	children: true
}, {
	size: 22,
	system: 'eu',
	unisex: true,
	children: true
}, {
	size: 135,
	system: 'mondopoint',
	unisex: true,
	children: true
}, {
	size: 4.5,
	prettySize: '4 1/2',
	system: 'mx',
	children: true
}, {
	size: 5,
	prettySize: '5',
	system: 'uk',
	children: true
}, {
	size: 5.5,
	system: 'us',
	prettySize: '5 1/2',
	children: true
}];

test('Convert size 135 (Children - implicit, with default values) to proper sizes', t => {
	const results = convert({size: 135}, iso);

	t.deepEqual(results, childrenResults);
});

test('Convert size 22 EU (Children - implicit) to proper sizes', t => {
	const results = convert({size: 22, system: 'eu'}, iso);

	// Roundings causes a half size diff from 135 mondopoints
	const adjustedChildrenResults = childrenResults.slice(0);
	adjustedChildrenResults[0] = {...adjustedChildrenResults[0], size: 5.5, prettySize: '5 1/2'};
	adjustedChildrenResults[6] = {...adjustedChildrenResults[6], size: 5.5, prettySize: '5 1/2'};

	t.deepEqual(results, adjustedChildrenResults);
});

test('Convert size 5 UK (Children - explicit) to proper sizes', t => {
	const results = convert({size: 5, system: 'uk', children: true}, iso);

	// Roundings causes a half size diff from 135 mondopoints
	const adjustedChildrenResults = childrenResults.slice(0);
	adjustedChildrenResults[3] = {...adjustedChildrenResults[3], size: 21.5};

	t.deepEqual(results, adjustedChildrenResults);
});

test('Convert size 5.5 US (Children - explicit) to proper sizes', t => {
	const results = convert({size: 5.5, system: 'us', children: true}, iso);

	t.deepEqual(results, childrenResults);
});

test('Convert size 13.5 cm (Children - implicit) to proper sizes', t => {
	const results = convert({size: 13.5, system: 'cm'}, iso);

	t.deepEqual(results, childrenResults);
});

test('Convert size 5 1/2 UK (Adult in pretty print) to proper sizes', t => {
	const results = convert({size: '5 1/2', system: 'uk'}, iso);

	const adjustedAdultResults = adultResults.slice(0);
	adjustedAdultResults[0] = {...adjustedAdultResults[0], size: 5.5, prettySize: '5 1/2'};
	adjustedAdultResults[1] = {...adjustedAdultResults[1], size: 7.5, prettySize: '7 1/2'};
	adjustedAdultResults[2] = {...adjustedAdultResults[2], size: 6.5, prettySize: '6 1/2'};
	adjustedAdultResults[3] = {...adjustedAdultResults[3], size: 7.5, prettySize: '7 1/2'};
	adjustedAdultResults[4] = {...adjustedAdultResults[4], size: 24};
	adjustedAdultResults[5] = {...adjustedAdultResults[5], size: 38};
	adjustedAdultResults[6] = {...adjustedAdultResults[6], size: 240};
	adjustedAdultResults[7] = {...adjustedAdultResults[7], size: 5, prettySize: '5'};
	adjustedAdultResults[8] = {...adjustedAdultResults[8], size: 5.5, prettySize: '5 1/2'};
	adjustedAdultResults[9] = {...adjustedAdultResults[9], size: 6.5, prettySize: '6 1/2'};
	adjustedAdultResults[10] = {...adjustedAdultResults[10], size: 7.5, prettySize: '7 1/2'};

	t.deepEqual(results, adjustedAdultResults);
});

test('Convert size 230 Mondo (Adult, with synonym as system) to proper sizes', t => {
	const results = convert({size: 230, system: 'mondo'}, iso);

	t.deepEqual(results, adultResults);
});

test('Convert size range 135 - 230 (with default values) to proper sizes', t => {
	const results = convertSizeRange({size: 135}, {size: 230}, iso);

	t.deepEqual(results.uk, {
		from: childrenResults.filter(result => result.system === 'uk')[0],
		to: adultResults.filter(result => result.system === 'uk')[0]
	});

	t.deepEqual(results.us, {
		from: childrenResults.filter(result => result.system === 'us')[0],
		to: adultResults.filter(result => result.system === 'us')[1]
	});
});

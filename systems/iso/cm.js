/*
 * Simple mm (mondopoints) -> cm converter
 *
 * Based on ISO 19407: 2015, see
 * https://en.wikipedia.org/wiki/Shoe_size (2020-06-15)
 * for details.
 */
function cmToMondopoint({size, children}) {
	return {
		size: size * 10,
		system: 'mondopoints',
		unisex: true,
		...(children ? {children: true} : {})
	};
}

function mondopointToCm({size, children}) {
	return {
		size: size / 10,
		system: 'cm',
		unisex: true,
		...(children ? {children: true} : {})
	};
}

const system = {
	from: cmToMondopoint,
	to: mondopointToCm,
	children: 19.8, // Quite arbitrarily set, based on where it makes sense and similar to other systems (~198 mondopoints)
	round: 0.5,
	synonyms: ['jp']
};

export {
	cmToMondopoint,
	mondopointToCm,
	system
};

// Based on ISO 19407: 2015 - see https://en.wikipedia.org/wiki/Shoe_size (2020-06-15) for details
function euToMondopoint(parameters, options) {
	const {size: eu} = parameters;
	const {footToLast} = options;

	const children = eu <= 32;

	const size = footToLast(eu, {...parameters, children, reverse: true}) * 2 / 3 * 10;

	return {
		size,
		system: 'mondopoints',
		unisex: true,
		children
	};
}

function mondopointToEU(parameters, options) {
	const {size: mondopoints, children} = parameters;
	const {footToLast} = options;

	const size = footToLast(mondopoints * 3 / 2 / 10, parameters);

	return {
		size,
		system: 'eu',
		unisex: true,
		...(children ? {children: true} : {})
	};
}

const system = {
	from: euToMondopoint,
	to: mondopointToEU,
	children: 32, // Quite arbitrarily set, based on where it makes sense and similar to other systems (~198 mondopoints)
	round: 0.5
};

export {
	euToMondopoint,
	mondopointToEU,
	system
};

// Basically just a formatter, since this is the base system
function mondopointToMondopoint({size, children}) {
	return {
		size,
		system: 'mondopoint',
		unisex: true,
		...(children ? {children: true} : {})
	};
}

const system = {
	from: mondopointToMondopoint,
	to: mondopointToMondopoint,
	children: 198, // Quite arbitrarily set, based on where it makes sense and similar to other systems
	round: 5,
	synonyms: ['mondo', 'mondopoints', 'mm']
};

export {
	mondopointToMondopoint,
	system
};

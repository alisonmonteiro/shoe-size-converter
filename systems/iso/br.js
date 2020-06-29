/*
 * Derivative of EU-system
 *
 * The EU-system but 2 sizes smaller, which in practice
 * means that it's based on foot length instead of last
 * (except for children). Not a universal truth, but
 * probably the closest common view on things possible.
 * Also used in the Middle East.
 *
 * See https://en.wikipedia.org/wiki/Shoe_size#Europe (2020-06-29)
 * for details.
 */
import {euToMondopoint, mondopointToEU, system as euSystem} from './eu.js'; // eslint-disable-line import/extensions

function brToMondopoint(parameters, options) {
	return {...euToMondopoint({...parameters, size: parameters.size + 2}, {...options}), system: 'br'};
}

function mondopointToBR(parameters, options) {
	const result = mondopointToEU(parameters, {...options});

	return {
		...result,
		size: result.size - 2,
		system: 'br'
	};
}

const system = {
	from: brToMondopoint,
	to: mondopointToBR,
	children: euSystem.children - 2,
	round: euSystem.round
};

export {
	brToMondopoint,
	mondopointToBR,
	system
};

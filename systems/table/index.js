/*
 * A very simple table-based approach
 *
 * Currently using the old table, to keep backwards
 * compatibility with <1.0.0 (at least for the
 * conversion part).
 */
import {sizes} from '../../size-tables.js'; // eslint-disable-line import/extensions
import {inchesStringToNumber, inchesNumberToString} from '../../helpers.js'; // eslint-disable-line import/extensions

const systems = Object.keys(sizes);

function toIndexFactory(system) {
	function toIndex(parameters) {
		const {size, women} = parameters;

		const gender = women ? 'w' : 'm';

		const index = sizes[system][gender].indexOf(size);

		if (index < 0) {
			throw new Error(`${size} does not exist in table`);
		}

		return {
			size: index,
			system: 'index',
			...(women ? {women} : {men: true})
		};
	}

	return toIndex;
}

function toSystemFactory(system) {
	function fromIndex(parameters) {
		const {size: index, women} = parameters;

		const gender = women ? 'w' : 'm';

		const size = sizes[system][gender][index];

		const genderResult = {};

		if (['eu', 'br', 'cm', 'in'].includes(system)) {
			genderResult.unisex = true;
		} else if (women) {
			genderResult.women = true;
		} else {
			genderResult.men = true;
		}

		return {
			...genderResult,
			size,
			system
		};
	}

	return fromIndex;
}

// Generate systems
const table = {};

function systemFactory(system) {
	return {
		from: toIndexFactory(system),
		to: toSystemFactory(system),
		round: 0.001 // The lowest denominator of all systems. For systems that should have a larger denominator, it won't matter anyway, since it's table based (we can rely on the table being rounded already anyway).
	};
}

systems.forEach(system => {
	table[system] = systemFactory(system);
});

table.in.fromPrettyFormat = inchesStringToNumber;
table.in.toPrettyFormat = inchesNumberToString;

export {
	table
};

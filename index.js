import isString from 'lodash/isString.js'; // eslint-disable-line import/extensions
import {round, roundUp, roundDown, footToLast, isChildrenThreshold} from './helpers.js'; // eslint-disable-line import/extensions
import {iso} from './systems/iso/index.js'; // eslint-disable-line unicorn/import-index, import/no-useless-path-segments, import/extensions

function convert(parameters, systems, options = {}) {
	let {size, system} = parameters;

	options = {
		// Default options
		footToLast,
		round,
		// User assigned options
		...options
	};

	if (typeof system === 'undefined') {
		// If system hasn't been specified, look for a default system
		system = Object.keys(systems).find(system => {
			return systems[system].default;
		});
	}

	// Parameters validation
	if (!systems[system]) {
		// Check synonyms
		const possibleSystem = Object.keys(systems).find(actualSystem => {
			if (!systems[actualSystem].synonyms) {
				return false;
			}

			return systems[actualSystem].synonyms.includes(system);
		});

		if (!possibleSystem) {
			throw new Error(`System: ${system} not supported/not included in the provided systems!`);
		}

		system = possibleSystem;
	}

	// Figure out whether children size or not
	// NOTE: Doesn't catch NaN and Infinity, but good enough for our purposes
	if (typeof systems[system].children === 'number') {
		parameters.children = isChildrenThreshold(size, systems[system].children);
	} else {
		parameters.children = systems[system].children(parameters);
	}

	if (isString(parameters.size)) {
		if (systems[system].fromPrettyFormat) {
			parameters.prettySize = parameters.size;
			parameters.size = systems[system].fromPrettyFormat(parameters.prettySize);
		}

		parameters.size = Number.parseFloat(parameters.size);
	}

	// Convert from original system to base system
	const {size: baseSize} = systems[system].from(parameters, options);

	// Convert from base system to every available system
	return Object.keys(systems).flatMap(outSystem => {
		const result = systems[outSystem].to({...parameters, size: baseSize}, options);
		const results = Array.isArray(result) ? result : [result];

		return results.map(result => {
			const output = {
				...result,
				size: round(result.size, systems[outSystem].round)
			};

			if (systems[outSystem].toPrettyFormat) {
				output.prettySize = systems[outSystem].toPrettyFormat(output.size);
			}

			return output;
		});
	});
}

function convertSizeRange(from, to, systems, options = {}) {
	const fromResult = convert(from, systems, {...options, round: roundDown});
	const toResult = convert(to, systems, {...options, round: roundUp});

	const result = {};

	for (const system of Object.keys(systems)) {
		result[system] = {
			from: fromResult.filter(result => result.system === system).sort((a, b) => a.size - b.size)[0],
			to: toResult.filter(result => result.system === system).sort((a, b) => b.size - a.size)[0]
		};
	}

	return result;
}

export {
	convert,
	convertSizeRange,
	iso
};

'use strict';

const unisex = {
	eu: [35, 36, 36, 37, 38, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46.5],
	br: [33, 34, 34, 35, 36, 36, 37, 37, 38, 39, 40, 41, 42, 43, 45],
	cm: [23, 23, 24, 24, 24, 25, 25, 25, 25, 25.7, 26, 26.7, 27.3, 28, 28.6],
	in: [
		'9',
		'9 1/8',
		'9 1/4',
		'9 3/8',
		'9 1/2',
		'9 5/8',
		'9 3/4',
		'9 7/8',
		'10',
		'10 1/8',
		'10 1/4',
		'10 1/2',
		'10 3/4',
		'11',
		'11 1/4'
	]
};

const defaultSizes = {
	us: {
		m: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10.5, 12, 12.5],
		w: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13, 14]
	},
	ca: {
		m: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10.5, 12, 12.5],
		w: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13, 14]
	},
	uk: {
		m: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 10, 11, 12],
		w: [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 11, 12]
	},
	au: {
		m: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12],
		w: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10.5, 12, 12.5]
	},
	eu: {m: unisex.eu, w: unisex.eu},
	br: {m: unisex.br, w: unisex.br},
	cm: {m: unisex.cm, w: unisex.cm},
	in: {m: unisex.in, w: unisex.in}
};

const isString = value => {
	return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
};

const hasOwnProps = (object, key) => {
	return Object.prototype.hasOwnProperty.call(object, key);
};

const isValidType = type => {
	return type === 'm' || type === 'w';
};

const isValidCountry = country => {
	return hasOwnProps(defaultSizes, country);
};

const isValidOutput = outputs => {
	if (!Array.isArray(outputs)) {
		return false;
	}

	if (outputs.length > 1) {
		for (const output of outputs) {
			if (!hasOwnProps(defaultSizes, output)) {
				return false;
			}
		}

		return true;
	}

	return hasOwnProps(defaultSizes, outputs[0]);
};

function converter(country, type, size, out = ['eu', 'br', 'cm', 'in']) {
	const output = isString(out) ? [out] : out;

	if (!isValidType(type)) {
		type = 'm';
	}

	if (!isValidCountry(country)) {
		throw new Error(`${country} is not supported as a country.`);
	}

	if (!isValidOutput(output)) {
		throw new Error(`${output} is not a valid output.`);
	}

	const sizes = defaultSizes[country][type];
	const position = sizes.indexOf(size);

	if (position === -1) {
		return false;
	}

	const converteds = {};
	for (const key of output) {
		const convertedValue = defaultSizes[key][type][position];

		converteds[key] = convertedValue;
	}

	return converteds;
}

export default converter;
export {converter, defaultSizes as sizes};

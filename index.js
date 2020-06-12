'use strict';

const unisex = {
	eu: [35, 36, 36, 37, 38, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46.5],
	br: [33, 34, 34, 35, 36, 36, 37, 37, 38, 39, 40, 41, 42, 43, 45],
	cm: [23, 23, 24, 24, 24, 25, 25, 25, 25, 25.7, 26, 26.7, 27.3, 28, 28.6],
	in: [
		9,			// 9
		9.125,	// 9 1/8
		9.25,		// 9 1/4
		9.375,	// 9 3/8
		9.5,		// 9 1/2
		9.625,	// 9 5/8
		9.75,		// 9 3/4
		9.875,	// 9 7/8
		10,			// 10
		10.125, // 10 1/8
		10.25,	// 10 1/4
		10.5,		// 10 1/2
		10.75,	// 10 3/4
		11,			// 11
		11.25		// 11 1/4
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

const genders = ['w', 'm', 'k'];

const isString = value => {
	return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
};

const hasOwnProps = (object, key) => {
	return Object.prototype.hasOwnProperty.call(object, key);
};

const isValidGender = gender => {
	return genders.includes(gender);
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

const partNumberToNumber = partNumber => {
	const parts = partNumber.split('/');

	return parts[0] / parts[1];
};

const inchesStringToNumber = inchesString => {
	const parts = inchesString.split(' ');

	if (parts.length === 1) {
		return Number(parts[0]);
	}

	return Number.parseInt(parts[0], 10) + (parts[1] ? partNumberToNumber(parts[1]) : 0);
};

const inchesNumberToString = inchesNumber => {
	// ToFixed is used in order to avoid JS aritchmetic issues
	const rest = Number((inchesNumber % 1).toFixed(5));

	if (!rest) {
		return String(inchesNumber);
	}

	let denominator = 8;
	let numerator = rest * denominator;

	if (Number((numerator % 1).toFixed(5)) !== 0) {
		return String(inchesNumber);
	}

	while (denominator > 1 && Number((numerator % 2).toFixed(1)) === 0) {
		denominator /= 2;
		numerator /= 2;
	}

	return `${Number.parseInt(inchesNumber, 10)} ${numerator}/${denominator}`;
};

const compare = (a, b, smaller = true) => {
	if (smaller) {
		return a <= b;
	}

	return a > b;
};

const getClosestValidSize = (country, inGenders, inSize, small = true) => {
	if (isString(inGenders)) {
		inGenders = [inGenders];
	}

	for (const gender of inGenders) {
		if (!isValidGender(gender)) {
			throw new Error(`${gender} is not supported as a gender.`);
		}
	}

	if (!isValidCountry(country)) {
		throw new Error(`${country} is not supported as a country.`);
	}

	const orderedGenders = [...genders.filter(gender => inGenders.includes(gender))];

	if (small) {
		orderedGenders.reverse();
	}

	let current = null;

	for (const gender of orderedGenders) {
		if (!defaultSizes[country][gender]) {
			continue;
		}

		const sizes = [...defaultSizes[country][gender]];

		if (!small) {
			sizes.reverse();
		}

		if (current === null) {
			current = {gender, size: sizes[0]};

			if (compare(inSize, sizes[0], small)) {
				return current;
			}
		}

		for (const size of sizes) {
			if (compare(inSize, size, small)) {
				if (compare(size - inSize, inSize - current.size, !small)) {
					return current;
				}

				return {gender, size};
			}

			current = {gender, size};
		}
	}

	return current;
};

function converter(country, gender, size, out = ['eu', 'br', 'cm', 'in']) {
	const output = isString(out) ? [out] : out;

	if (!isValidGender(gender)) {
		gender = genders[0];
	}

	if (!isValidCountry(country)) {
		throw new Error(`${country} is not supported as a country.`);
	}

	if (!isValidOutput(output)) {
		throw new Error(`${output} is not a valid output.`);
	}

	const sizes = defaultSizes[country][gender];
	const position = sizes.indexOf(size);

	if (position === -1) {
		return false;
	}

	const converteds = {};
	for (const key of output) {
		let convertedValue = defaultSizes[key][gender][position];

		if (key === 'in') {
			convertedValue = inchesNumberToString(convertedValue);
		}

		converteds[key] = convertedValue;
	}

	return converteds;
}

function convertSizeRange(country, inGender, inSizes, inOutput = ['eu', 'br', 'cm', 'in']) {
	const output = isString(inOutput) ? [inOutput] : inOutput;

	if (isString(inGender)) {
		inGender = [inGender];
	}

	for (const gender of inGender) {
		if (!isValidGender(gender)) {
			throw new Error(`${gender} is not supported as a gender.`);
		}
	}

	if (!isValidCountry(country)) {
		throw new Error(`${country} is not supported as a country.`);
	}

	if (!isValidOutput(output)) {
		throw new Error(`${output} is not a valid output.`);
	}

	if (!Array.isArray(inSizes) || inSizes.length !== 2) {
		throw new Error(`${inSizes} is not a two-value array.`);
	}

	let smallSize = inSizes[0];
	let largeSize = inSizes[1];

	// If inches, ensure we deal with numbers
	if (country.includes('in')) {
		if (isString(smallSize)) {
			smallSize = inchesStringToNumber(smallSize);
		}

		if (isString(largeSize)) {
			largeSize = inchesStringToNumber(largeSize);
		}
	}

	const small = getClosestValidSize(country, inGender, smallSize);
	const large = getClosestValidSize(country, inGender, largeSize, false);

	return [
		{sizes: converter(country, small.gender, small.size, output), gender: small.gender},
		{sizes: converter(country, large.gender, large.size, output), gender: large.gender}
	];
}

export default converter;
export {
	converter,
	convertSizeRange,
	getClosestValidSize,
	inchesStringToNumber,
	inchesNumberToString,
	defaultSizes as sizes
};

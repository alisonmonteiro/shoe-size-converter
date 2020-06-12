import {sizes as defaultSizes} from './sizes/default.js'; // eslint-disable-line import/extensions

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
	inchesNumberToString
};

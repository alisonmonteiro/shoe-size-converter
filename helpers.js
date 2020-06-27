// Taken straight from https://stackoverflow.com/a/34591063/856559
// and updated with more modern syntax + support for user-defined
// rounding function (to support roundUp/Down).
function round(value, step = 1, fn = 'round') {
	const inverse = 1 / step;
	return Math[fn](value * inverse) / inverse;
}

function roundUp(value, step) {
	return round(value, step, 'ceil');
}

function roundDown(value, step) {
	return round(value, step, 'floor');
}

function mmToInches(mm) {
	return mm / 25.4;
}

function inchesToMm(inches) {
	return inches * 25.4;
}

function partNumberToNumber(partNumber) {
	const parts = partNumber.split('/');

	return parts[0] / parts[1];
}

function inchesStringToNumber(inchesString) {
	const parts = inchesString.split(' ');

	if (parts.length === 1) {
		return Number(parts[0]);
	}

	return Number.parseInt(parts[0], 10) + (parts[1] ? partNumberToNumber(parts[1]) : 0);
}

function inchesNumberToString(inchesNumber) {
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
}

function footToLast(size, options) {
	const {children = false, reverse = false} = options;

	if (children) {
		return size * (reverse ? 1 / 1.08 : 1.08);
	}

	return size + (reverse ? -2 : 2);
}

function isChildrenParameter(parameters) {
	return Boolean(parameters.children);
}

function isChildrenThreshold(size, threshold) {
	return size < threshold;
}

export {
	round,
	roundDown,
	roundUp,
	mmToInches,
	inchesToMm,
	inchesStringToNumber,
	inchesNumberToString,
	footToLast,
	isChildrenParameter,
	isChildrenThreshold
};

// Based on ISO 19407: 2015 - see https://en.wikipedia.org/wiki/Shoe_size (2020-06-15) for details
import {mmToInches, inchesToMm, inchesStringToNumber, inchesNumberToString, isChildrenParameter} from '../../helpers.js'; // eslint-disable-line import/extensions

function ukAdjustment(parameters) {
	const {children} = parameters;

	return children ? 12 : 25;
}

function baseUKToMondopoint(parameters, options) {
	const {size: inSize} = parameters;
	const {footToLast, adjustmentFn = ukAdjustment} = options;
	const adjustment = adjustmentFn(parameters);

	const size = inchesToMm(footToLast(inSize + adjustment, {...parameters, reverse: true}) * 1 / 3); // eslint-disable-line no-implicit-coercion

	return {
		size
	};
}

function baseMondopointToUK(parameters, options) {
	const {size: mondopoints} = parameters;
	const {footToLast, adjustmentFn = ukAdjustment} = options;
	const adjustment = adjustmentFn(parameters);

	return {
		size: footToLast(mmToInches(mondopoints) * 3, parameters) - adjustment
	};
}

function ukToMondopoint(parameters, options) {
	const {size} = baseUKToMondopoint(parameters, options);

	return {
		size,
		system: 'mondopoints',
		unisex: true
	};
}

function mondopointToUK(parameters, options) {
	const {children} = parameters;
	const {size} = baseMondopointToUK(parameters, options);

	return {
		size,
		system: 'uk',
		...(children ? {children: true} : {men: true, women: true})
	};
}

const system = {
	from: ukToMondopoint,
	to: mondopointToUK,
	children: isChildrenParameter,
	round: 0.5,
	fromPrettyFormat: inchesStringToNumber,
	toPrettyFormat: inchesNumberToString
};

export {
	ukAdjustment,
	baseUKToMondopoint,
	baseMondopointToUK,
	ukToMondopoint,
	mondopointToUK,
	system
};

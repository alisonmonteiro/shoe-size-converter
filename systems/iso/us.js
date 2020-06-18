/*
 * Derivative of UK-system
 *
 * Based on ISO 19407: 2015, which states that the only the
 * adjustment differs (possibly causing some issues when
 * getting close to size range edges, such as adult 0 vs
 * children 13). This is not handled currently.
 *
 * See https://en.wikipedia.org/wiki/Shoe_size (2020-06-15)
 * for details.
 */
import {inchesStringToNumber, inchesNumberToString, isChildrenParameter} from '../../helpers.js'; // eslint-disable-line import/extensions
import {ukAdjustment, baseUKToMondopoint, baseMondopointToUK} from './uk.js'; // eslint-disable-line import/extensions

function usAdjustment(parameters) {
	const {children, women} = parameters;

	const adjustment = ukAdjustment(parameters);

	if (children) {
		return adjustment - (1 / 3);
	}

	if (women) {
		return adjustment - 2;
	}

	// Men
	return adjustment - 1;
}

function usToMondopoint(parameters, options) {
	const {size} = baseUKToMondopoint(parameters, {adjustmentFn: usAdjustment, ...options});

	return {
		size,
		system: 'mondopoints',
		unisex: true
	};
}

function mondopointToUS(parameters, options) {
	const {children} = parameters;

	if (children) {
		return {
			...baseMondopointToUK(parameters, {adjustmentFn: usAdjustment, ...options}),
			system: 'us',
			children: true
		};
	}

	return [{
		...baseMondopointToUK({...parameters, women: false}, {adjustmentFn: usAdjustment, ...options}),
		system: 'us',
		men: true
	}, {
		...baseMondopointToUK({...parameters, women: true}, {adjustmentFn: usAdjustment, ...options}),
		system: 'us',
		women: true
	}];
}

const system = {
	from: usToMondopoint,
	to: mondopointToUS,
	children: isChildrenParameter,
	round: 0.5,
	fromPrettyFormat: inchesStringToNumber,
	toPrettyFormat: inchesNumberToString
};

export {
	usAdjustment,
	usToMondopoint,
	mondopointToUS,
	system
};

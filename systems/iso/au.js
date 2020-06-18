/*
 * Derivative of UK-system
 *
 * Uses UK-system, with a twist for women which have two
 * sizes smaller (which also happens to be the same as the
 * US system).
 *
 * See the following references:
 * - https://en.wikipedia.org/wiki/Shoe_size#United_Kingdom
 * - https://www.internationalshoesizes.com/
 * - https://www.finder.com.au/shoe-size-conversion-guide
 *
 * And the following example:
 * - https://www.target.com.au/size-chart/viewallsize
 *
 * (all from 2020-06-17)
 */
import {inchesStringToNumber, inchesNumberToString, isChildrenParameter} from '../../helpers.js'; // eslint-disable-line import/extensions
import {ukAdjustment, baseUKToMondopoint, baseMondopointToUK} from './uk.js'; // eslint-disable-line import/extensions

function auAdjustment(parameters) {
	const {women} = parameters;

	const adjustment = ukAdjustment(parameters);

	// Women - same as US(?)
	//
	// NOTE! Kept as separate logic because it seems unclear
	// if it really comes from the US, or just a coincident.
	if (women) {
		return adjustment - 2;
	}

	// Men and children - same as UK
	return adjustment;
}

function auToMondopoint(parameters, options) {
	const {size} = baseUKToMondopoint(parameters, {adjustmentFn: auAdjustment, ...options});

	return {
		size,
		system: 'mondopoints',
		unisex: true
	};
}

function mondopointToAU(parameters, options) {
	const {children} = parameters;

	if (children) {
		return {
			...baseMondopointToUK(parameters, {adjustmentFn: auAdjustment, ...options}),
			system: 'au',
			children: true
		};
	}

	return [{
		...baseMondopointToUK({...parameters, women: false}, {adjustmentFn: auAdjustment, ...options}),
		system: 'au',
		men: true
	}, {
		...baseMondopointToUK({...parameters, women: true}, {adjustmentFn: auAdjustment, ...options}),
		system: 'au',
		women: true
	}];
}

const system = {
	from: auToMondopoint,
	to: mondopointToAU,
	children: isChildrenParameter,
	round: 0.5,
	synonyms: ['nz'],
	fromPrettyFormat: inchesStringToNumber,
	toPrettyFormat: inchesNumberToString
};

export {
	auAdjustment,
	auToMondopoint,
	mondopointToAU,
	system
};

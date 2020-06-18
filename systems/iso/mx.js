/*
 * Derivative of UK-system
 *
 * NOTE! This is not the cm alternative system which is now
 * quite commonly used, which really is the cm-system, and
 * nothing else!
 *
 * Same as UK, but with a slightly different adjustment. This
 * seems to be quite unclear, but some refer to 1/2 size in
 * difference, such as wikipedia. But most tables suggest 1
 * whole size in difference. It also seems to differ between
 * men/women sometimes, but most seem to think that it's still
 * unisex (and rather have different men/women for other
 * systems). Based on this, something in between has been
 * chosen (3/4 size) as the way to go.
 *
 * See the following references:
 * - https://en.wikipedia.org/wiki/Shoe_size#United_Kingdom
 * - https://www.lonelyplanet.com/thorntree/forums/americas-mexico/mexico/mexican-shoe-sizes?page=2
 *
 *
 * See the following examples:
 * - http://www.i18nguy.com/l10n/shoes.html
 * - https://www.convertworld.com/en/shoe-size/mexico.html
 *
 * (all from 2020-06-17)
 */
import {inchesStringToNumber, inchesNumberToString, isChildrenParameter} from '../../helpers.js'; // eslint-disable-line import/extensions
import {ukAdjustment, baseUKToMondopoint, baseMondopointToUK} from './uk.js'; // eslint-disable-line import/extensions

function mxAdjustment(parameters) {
	return ukAdjustment(parameters) + 0.75;
}

function mxToMondopoint(parameters, options) {
	const {size} = baseUKToMondopoint(parameters, {adjustmentFn: mxAdjustment, ...options});

	return {
		size,
		system: 'mondopoints',
		unisex: true
	};
}

function mondopointToMX(parameters, options) {
	const {children} = parameters;

	return {
		...baseMondopointToUK(parameters, {adjustmentFn: mxAdjustment, ...options}),
		system: 'mx',
		...(children ? {children: true} : {men: true, women: true})
	};
}

const system = {
	from: mxToMondopoint,
	to: mondopointToMX,
	children: isChildrenParameter,
	round: 0.5,
	fromPrettyFormat: inchesStringToNumber,
	toPrettyFormat: inchesNumberToString
};

export {
	mxAdjustment,
	mxToMondopoint,
	mondopointToMX,
	system
};

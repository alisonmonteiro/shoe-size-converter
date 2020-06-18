/*
 * Brannock is a US derivative
 *
 * It's actually the same as the US system, but with
 * a specific footToLast conversion. For adults, the
 * footToLast conversion is 2 sizes - meaning equal
 * to our current standard conversion. For children,
 * it's a little bit unclear (no clear
 * specifications). According to their own chart, it
 * seems to be ~2/3 inches diff to UK children.
 * However, there also seems to be a full 1 size
 * difference to men - meaning very close to UK
 * adult. All in all, the same as the US (something
 * in between) is probably pretty good. Thus, for
 * now, it's treated as equal as the US but kept
 * separate since it's not really a synonym.
 *
 * References:
 * - https://en.wikipedia.org/wiki/Shoe_size#United_States
 * - https://brannock.com/pages/instructions-fitting-tips
 * - https://brannock.com/pages/conversion-chart
 * - https://cdn.shopify.com/s/files/1/0725/6433/files/Scale-Comparison-Chart.pdf?2281987510852295578
 *
 * (all from 2020-06-17)
 */
import {inchesStringToNumber, inchesNumberToString, isChildrenParameter} from '../../helpers.js'; // eslint-disable-line import/extensions
import {usAdjustment, usToMondopoint, mondopointToUS} from './us.js'; // eslint-disable-line import/extensions

function brannockToMondopoint(parameters, options) {
	return systemToBrannock(usToMondopoint(parameters, options));
}

function mondopointToBrannock(parameters, options) {
	return systemToBrannock(mondopointToUS(parameters, options));
}

function systemToBrannock(result) {
	if (!Array.isArray(result)) {
		result = [result];
	}

	return result.map(result => {
		return {
			...result,
			system: 'brannock'
		};
	});
}

const system = {
	from: brannockToMondopoint,
	to: mondopointToBrannock,
	children: isChildrenParameter,
	round: 0.5,
	fromPrettyFormat: inchesStringToNumber,
	toPrettyFormat: inchesNumberToString
};

export {
	usAdjustment as brannockAdjustment,
	brannockToMondopoint,
	mondopointToBrannock,
	system
};

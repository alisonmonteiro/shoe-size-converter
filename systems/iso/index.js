/*
 * A complete systems export of all supported systems (see below),
 * based on ISO 19407: 2015
 *
 * References:
 * - https://en.wikipedia.org/wiki/Shoe_size
 * - https://www.sis.se/api/document/preview/918490/
 *
 * (all from 2020-06-15)
 *
 * How it works:
 * All systems converts to mondopoints (since that's the
 * recommended way of doing it according to ISO) - and then to
 * the desired format since all will then be interoperable.
 * For originally last length based approaches, this will cause
 * some difference compared to a straight comparison. Since this
 * aims to  adhere to ISO (ISO recommends to go through
 * mondopoints), this seems fine. It also (so far) seems to be a
 * sort of best middle-ground.
 *
 * All systems are based on one (or more) of the 3 main ones:
 * - EU (originally last length based, using Parisian points = 2/3 cm)
 * - UK (originally last length based, using Barleycorns = 1/3 inch)
 * - Mondopoints (foot length based in mm)
 *
 *
 * Systems which haven't yet been implemented:
 * - China (have adopted mondopoint - used a system similar to EU before - but quite unclear how to convert properly - see e.g. https://www.blitzresults.com/en/chinese-sizes/ https://www.yesstyle.com/en/shoe-size/help/section.html/hsi.798 https://www.asknumbers.com/ShoeSizeMensConversion.aspx https://www.quora.com/What-is-the-difference-between-Chinese-and-U-S-shoe-sizes http://www.shoesizes.co/resources.html https://www.liveabout.com/womens-international-shoe-size-conversion-chart-2987808 https://www.liveabout.com/mens-international-shoe-size-conversion-chart-2989633 and https://www.disabled-world.com/calculators-charts/clothing-sizes.php for some examples)
 * - Russia/CIS (have adopted mondopoint - used a system similar to EU before - see https://en.wikipedia.org/wiki/Shoe_size#USSR_(Russia/CIS) for some guidance)
 */

import {system as au} from './au.js'; // eslint-disable-line import/extensions
import {system as br} from './br.js'; // eslint-disable-line import/extensions
import {system as brannock} from './brannock.js'; // eslint-disable-line import/extensions
import {system as cm} from './cm.js'; // eslint-disable-line import/extensions
import {system as eu} from './eu.js'; // eslint-disable-line import/extensions
import {system as mondopoint} from './mondopoint.js'; // eslint-disable-line import/extensions
import {system as mx} from './mx.js'; // eslint-disable-line import/extensions
import {system as uk} from './uk.js'; // eslint-disable-line import/extensions
import {system as us} from './us.js'; // eslint-disable-line import/extensions

const iso = {
	au,
	br,
	brannock,
	cm,
	eu,
	mondopoint: {...mondopoint, default: true},
	mx,
	uk,
	us
};

export {
	iso
};

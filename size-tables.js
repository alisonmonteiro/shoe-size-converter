/* eslint-disable object-curly-spacing */
/*
 * This is a collection of gathered size tables. It's currently not
 * in use, but kept to be able to compare with.
 */

// Old table included in previous version that used to be the base for the conversion
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

export const sizes = {
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
	eu: { m: unisex.eu, w: unisex.eu },
	br: { m: unisex.br, w: unisex.br },
	cm: { m: unisex.cm, w: unisex.cm },
	in: { m: unisex.in, w: unisex.in }
};

// https://www.japan-zone.com/store/japanese-shoe-footwear-sizes-i-30.html
export const japanStore = {
	men: {
		uk: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
		us: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
		eu: [40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47],
		jp: [26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 31, 32]
	},
	women: {
		uk: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
		us: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
		eu: [35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42],
		jp: [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27]
	},
	kids: {
		uk: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
		us: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5],
		eu: [33, 34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39, 40],
		jp: [20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5]
	},
	infants: {
		uk: [5, 6, 7, 8, 8.5, 9, 10, 11, 11.5, 12, 13, 13.5],
		us: [6, 7, 8, 9, 9.5, 10, 11, 12, 12.5, 13, 1, 1.5],
		eu: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 32.5],
		jp: [14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5]
	}
};

// https://www.blitzresults.com/gb/shoe-size-women/
// https://www.blitzresults.com/gb/shoe-size-men/
// https://www.blitzresults.com/gb/kids-shoe-size-chart/
// MX and JP is the same (cm)
export const blitzResults = {
	men: {
		in: [7.666666667, 7.833333333, 8, 8.166666667, 8.333333333, 8.5, 8.666666667, 8.833333333, 9, 9.166666667, 9.333333333, 9.5, 9.666666667, 9.833333333, 10, 10.16666667, 10.33333333, 10.5, 10.66666667, 10.83333333, 11, 11.16666667, 11.33333333, 11.5, 11.66666667, 11.83333333, 12, 12.16666667, 12.33333333, 12.5, 12.66666667],
		cm: [19.4, 19.8, 20.3, 20.7, 21.1, 21.5, 22, 22.4, 22.8, 23.2, 23.7, 24.1, 24.5, 24.9, 25.4, 25.8, 26.2, 26.6, 27, 27.5, 27.9, 28.3, 28.7, 29.2, 29.6, 30, 30.4, 30.9, 31.3, 31.7, 32.1],
		uk: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15],
		eu: [32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36.5, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 41.5, 42.5, 43.5, 44, 44.5, 45.5, 46, 46.5, 47, 47.5, 48.5, 49, 49.5, 50],
		us: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5],
		mx: [19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34],
		jp: [19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34]
	},
	women: {
		in: [7.666666667, 7.833333333, 8, 8.166666667, 8.333333333, 8.5, 8.666666667, 8.833333333, 9, 9.166666667, 9.333333333, 9.5, 9.666666667, 9.833333333, 10, 10.16666667, 10.33333333, 10.5, 10.66666667, 10.83333333, 11, 11.16666667, 11.33333333, 11.5, 11.66666667, 11.83333333, 12, 12.16666667, 12.33333333, 12.5, 12.66666667],
		cm: [19.4, 19.8, 20.3, 20.7, 21.1, 21.5, 22, 22.4, 22.8, 23.2, 23.7, 24.1, 24.5, 24.9, 25.4, 25.8, 26.2, 26.6, 27, 27.5, 27.9, 28.3, 28.7, 29.2, 29.6, 30, 30.4, 30.9, 31.3, 31.7, 32.1],
		uk: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15],
		eu: [32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36.5, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 41.5, 42.5, 43.5, 44, 44.5, 45.5, 46, 46.5, 47, 47.5, 48.5, 49, 49.5, 50],
		us: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17],
		mx: [19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34],
		jp: [19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34]
	},
	kids: {
		in: [3.25, 3.5, 3.625, 3.75, 4, 4.125, 4.25, 4.5, 4.625, 4.75, 5, 5.125, 5.25, 5.5, 5.625, 5.75, 5, 6.125, 6.25, 6.5, 6.625, 6.75, 7, 7.125, 7.25, 7.5, 7.625, 7.75, 8, 8.125, 8.25, 8.5, 8.625, 8.75, 9, 9.125, 9.25, 9.5, 9.625, 9.75],
		us: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
		uk: [0, 0.5, 1, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5, 6],
		eu: [16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 27, 28, 29, 30, 30, 31, 31, 32, 33, 33, 34, 34, 35, 36, 36, 37, 37, 38, 38, 39],
		cm: [8.3, 8.9, 9.2, 9.5, 10.2, 10.5, 10.8, 11.4, 11.7, 12.1, 12.7, 13, 13.3, 14, 14.3, 14.6, 15.2, 15.6, 15.9, 16.5, 16.8, 17.1, 17.8, 18.1, 18.4, 19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6, 21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8]
	},
	infants: {
		in: [3.3, 3.6, 3.9, 4.3, 4.6, 4.9, 5.2, 5.6, 5.9, 6.3, 6.6, 6.8, 6.9, 7.1, 7.2, 7.4, 7.6, 7.8],
		cm: [8.3, 9.1, 10, 10.8, 11.6, 12.5, 13.3, 14.2, 15, 15.9, 16.7, 17.2, 17.6, 18, 18.4, 18.8, 19.3, 19.7],
		us: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
		eu: [15, 16, 17, 18.5, 19.5, 21, 22, 23.5, 25, 26, 27, 27.5, 28, 28.5, 29.5, 30, 31, 31.5],
		uk: [0, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]
	}
};

// https://www.blitzresults.com/gb/shoe-size/
// Difference between Men & Women
export const blitzResults2 = {
	men: {
		uk: [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5],
		eu: [37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
		us: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		mx: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
		cm: [22.9, 23.2, 23.5, 24.1, 24.4, 24.8, 25.4, 25.7, 26, 26.7, 27, 27.3, 27.9, 28.6, 29.5, 30.5, 31.1, 32.1, 33, 33.7, 34.6, 35.6],
		in: [9, 9.125, 9.25, 9.5, 9.625, 9.75, 10, 10.125, 10.25, 10.5, 10.625, 10.75, 11, 11.25, 11.625, 12, 12.25, 12.625, 13, 13.25, 13.625, 14]
	},
	women: {
		uk: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
		eu: [34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 41, 42, 43, 44, 45],
		us: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14],
		mx: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
		cm: [21, 21.6, 21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8, 25.4, 24.7, 26, 26.7, 27, 27.9, 28.6, 29.5],
		in: [8.25, 8.5, 8.625, 8.75, 9, 9.125, 9.25, 9.5, 9.625, 9.75, 10, 10.125, 10.25, 10.5, 10.625, 11, 11.25, 11.625]
	}
};

// https://www.blitzresults.com/en/chinese-sizes/
// Exists with conversion to US and inch (but inch is just cm -> inch). It doesn't match with any of the above anyway (originally it seemed very US-oriented)
export const blitzResults3 = {
	men: {
		ch: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
		cm: [16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28]
	}
};

// https://www.sizeguide.net/shoe-sizes.html
// https://www.sizeguide.net/sizes-for-childrens-shoes-convert-kids-shoe-sizes.html
// AU same as UK for men. For women, it's NOT the same as anything else! (in contrast with what seems to be the standard)
export const sizeguide = {
	men: {
		us: [6, 7, 7.5, 8, 8.5, 9, 10.5, 11.5, 12, 13, 14],
		uk: [5, 6, 6.5, 7, 7.5, 8, 9.5, 10.5, 11, 12, 13],
		eu: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
		au: [5, 6, 6.5, 7, 7.5, 8, 9.5, 10.5, 11, 12, 13],
		ch: [39, 41, 41.5, 42, 43, 43.5, 44.5, 46, 47, 48, 49],
		jp: [23.5, 24.5, 25, 25.5, 26, 27, 28, 29, 30, 31, 32]
	},
	women: {
		us: [5, 6, 6.5, 7.5, 8.5, 9, 9.5, 10, 10.5],
		uk: [2.5, 3.5, 4, 5, 6, 6.5, 7, 7.5, 8],
		eu: [35, 36, 37, 38, 39, 40, 41, 42, 43],
		au: [3.5, 4.5, 5, 6, 7, 7.5, 8, 8.5, 9],
		ch: [35.5, 37, 38, 39, 40, 41, 42, 43, 44],
		jp: [21, 22, 22.5, 23.5, 24.5, 25, 25.5, 26, 27]
	},
	kids: {
		in: [5.38, 5.56, 5.75, 5.88, 6.06, 6.25, 6.38, 6, 47, 6, 67, 6.83, 6.98, 7.14, 7.3, 7.46, 7.77, 7.93, 8.09, 8.25, 8.4],
		us: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 1, 1.5, 2, 2.5, 3],
		uk: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 13, 1, 1.5, 2],
		eu: [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 30, 31, 31.5, 32.5, 33, 33.5],
		jp: [13.5, 14, 14.5, 15, 15.5, 16, 16.25, 16.5, 17, 17.5, 18, 18.5, 18.75, 19, 20, 20.5, 21, 21.5, 22]
	},
	infants: {
		us: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		uk: [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		eu: [16, 17, 18, 19, 20, 22, 23, 24, 25, 27, 28, 30]
	}
};

// Additional size tables, not yet added here
// https://www.asos.com/discover/size-charts/men/shoes/?channelref=paid+search&affid=20309&&channelref=paid+search&affid=20309&lid=39700053597391836&ds_s_kwgid=58700005862188753&gclid=Cj0KCQjwz4z3BRCgARIsAES_OVec9DYpvXM1C8gVyQvr0uNZ8IwzEiF3HfltwQEbej1X1WADIB8iMF4aApANEALw_wcB&gclsrc=aw.ds
// https://www.zappos.com/c/shoe-size-conversion
// https://www.dancesport.uk.com/shoes/conchart.htm
// https://www.thepurplestore.com/shoe-size-conversion.shtml
// https://www.sinonome.org/en/content/6-japanese-shoes-size
// https://www.candefashions.com/about/shoe-size-conversion-chart/
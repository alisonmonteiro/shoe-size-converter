# shoe-size-converter

> Convert your shoe size 👟

[![Build Status](https://travis-ci.com/alisonmonteiro/shoe-size-converter.svg?branch=master)](https://travis-ci.com/alisonmonteiro/shoe-size-converter)

## Usage
`npm install shoe-size-converter --save`

```javascript
import {convert, iso} from 'shoe-size-converter';

convert({size: 36.5, system: 'eu'}, iso);
// =>
[{
	size: 4,
	prettySize: '4',
	system: 'au',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'au',
	women: true
}, {
	size: 5,
	prettySize: '5',
	system: 'brannock',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'brannock',
	women: true
}, {
	size: 23,
	system: 'cm',
	unisex: true
}, {
	size: 36.5,
	system: 'eu',
	unisex: true
}, {
	size: 230,
	system: 'mondopoint',
	unisex: true
}, {
	size: 3.5,
	prettySize: '3 1/2',
	system: 'mx',
	men: true,
	women: true
}, {
	size: 4,
	prettySize: '4',
	system: 'uk',
	men: true,
	women: true
}, {
	size: 5,
	prettySize: '5',
	system: 'us',
	men: true
}, {
	size: 6,
	prettySize: '6',
	system: 'us',
	women: true
}]
```

## API

### convert(parameters, systems, [options]);

#### parameters.size
Type: `string|number`

The shoe size you want to convert.

Can either be a size in number, or a string that can be transformed
using each system's pretty transformers. For inch-based sizes, the iso
system default to handling 'X Y/Z' formats (where Z is 2, 4 or 8).

#### [parameters.system]
Type: `string`

The system of the specified size

Default: As specified in systems. For iso: `mondopoints`

#### [parameters.women]
Type: `boolean`

Whether the passed in size should be treated as a women's size.
Otherwise treated as a men's size (unless `parameters.children` has
been specified).

Default: `false`

#### [parameters.children]
Type: `boolean`

Whether the passed in size should be treated as a children's size.
Otherwise treated as a men's size (unless `parameters.women` has
been specified).

Default: `false`

#### system
Type: A System

Usually iso is passed in, unless you want to use a custom system.

Check `systems/iso/index.js` for an example of the format.

#### options.footToLast
Type: `Function`

A function to convert between foot length and last length (both
ways). See `helpers.js` for the existing/default one and use the
same function signature if you want to provide a custom one.

The default implementation follows ISO, i.e. 2 size difference
for adults, and 8% for children.

Default: See `helpers.js -> footToLast`

#### options.round
Type: `Function`

A function to round shoe sizes to reasonable sizes. See
`helpers.js` for the existing/default one and use the same
function signature if you want to provide a custom one.

Works in tandem with the round-property on each system.

Default: See `helpers.js -> round`

## How it works

Converts footwear (shoe) sizes using a collection of sizing
systems, provided along when converting. Each system support
converting from the system to a unified format and from the
unified format back to the system format. The default system
follows the ISO standard (roughly - even the ISO standard say
that footwear size conversion isn't a solved problem yet,
unfortunately).

The default collection of systems included (iso) follows the
ISO standardization (all systems convert to mondopoints and
back for conversion) and implements the following systems (
either according to spec, or best match possible):

- Mondopoint (mm, mondo, mondopoints)
- EU
- UK
- US
- Brannock (currently the same as US)
- cm
- AU
- MX

See each system file for comments and details. They are
quite short and easy to read.

#### Custom system collection
To implement your own systems, see the current
implementation(s) at `systems/iso/` (or `systems/table/`)
for reference. As long as the same structure is followed,
it should be fairly trivial.

## Table-based system (and backwards compatibility)
There's a table-based systems collection which can be used instead
of iso:

```javascript
import {convert} from 'shoe-size-converter';
import {table} from 'shoe-size-converter/systems/table';

convert({size: 36.5, system: 'eu'}, table);
// => Same format as above - but with different conversion result
```

Currently, it's based on the old sizing table, which means it can
be used to have the same conversion as version 0.0.5 and earlier,
BUT with the new API.

The old conversion table can be found in the `size-tables.js
` file, along with other conversion tables.

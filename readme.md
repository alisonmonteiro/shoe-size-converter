# shoe-size-converter

> Convert your shoe size 👟

[![Build Status](https://travis-ci.com/alisonmonteiro/shoe-size-converter.svg?branch=master)](https://travis-ci.com/alisonmonteiro/shoe-size-converter)

## Usage

```javascript
const converter = require('shoe-size-converter');

converter('au', 'm', 4.5);
//=> {eu: 37, br: 35, cm: 24, in: '9 3/8'}

converter('uk', 'w', 6, ['br', 'us']);
//=> {br: 37, us: 6.5}
```

## API

### converter(location, gender, size, [output]);

#### location
Type: `string`

Options: `us`, `ca`, `uk`, `au`, `eu`, `br`

#### gender
Type: `string`

Options: `w` for woman, `m` for man

Default: `m`

#### size
Type: `string`

Your shoe size based on `location`

#### output
Type: `Array`

Default: `['eu', 'br', 'cm', 'in']`

Options: `us`, `ca`, `uk`, `au`, `eu`, `br`, `cm`, `in`

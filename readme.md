# shoe-size-converter

> Convert your shoe size 👟

## Usage

```javascript
const converter = require('shoe-size-converter');

converter('au', 'm', 4.5);
//=> {eu: 37, br: 35, cm: 24, in: '9 3/8'}

converter('uk', 'w', 6, ['br', 'us']);
//=> {br: 37, us: 6.5}
```

## API

### converter(location, genre, size, [output]);

#### location
Type: `string`

Options: `us`, `ca`, `uk`, `au`, `eu`, `br`

#### genre
Type: `string`

Options: `w`, `m`

Default: `m`

#### size
Type: `string`

Your shoe size based on `location`

#### output
Type: `Array`

Default: `['eu', 'br', 'cm', 'in']`

Options: `us`, `ca`, `uk`, `au`, `eu`, `br`, `cm`, `in`

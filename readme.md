## shoe-size-converter

### usage

##### converter(country, genre, size, [output]);

```javascript
const converter = require('shoe-size-converter');

converter('au', 'm', 4.5);
//=> {eu: 37, br: 35, cm: 24, in: '9 3/8'}

converter('uk', 'w', 6, ['br']);
//=> {br: 37}
```

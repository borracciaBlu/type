[![*nix build status][nix-build-image]][nix-build-url]
[![Windows build status][win-build-image]][win-build-url]
[![Tests coverage][cov-image]][cov-url]

# type

## Runtime validation and processing of JavaScript types

#### Value

_Value_ is assumed to be any JavaScript value that's neither `null` nor `undefined` .

##### `value/is`

Confirms whether passed argument is a _value_

```javascript
const isValue = require("type/value/is");

isValue({}); // true
isValue(null); // false
```

##### `value/ensure`

Ensures if given argument is a _value_. If it's a value it is returned back, if not `TypeError` is thrown

```javascript
const ensureValue = require("type/value/ensure");

const obj = {};

ensureValue(obj); // obj
ensureValue(null); // Thrown TypeError: Cannot use null
```

#### String

_string_ primitives

##### `string/coerce`

Restricted string coercion. Returns string presentation for every value that follows below constraints

-   is implicitly coercible to string
-   is neither`null` nor `undefined`
-   its `toString` method is not `Object.prototype.toString`

For all other values `null` is returned

```javascript
const stringCoerce = require("type/string/coerce");

stringCoerce(12); // "12"
stringCoerce(undefined); // null
```

##### `string/ensure`

If given argument is a string coercible value (via [`string/coerce`](#stringcoerce)) returns result string.
Otherwise `TypeError` is thrown.

```javascript
const ensureString = require("type/string/ensure");

ensureString(12); // "12"
ensureString(null); // Thrown TypeError: null is not a string
```

#### Object

_Object_ is assumed to be any non-primitive JavaScript value

##### `object/is`

```javascript
const isObject = require("type/object/is");

isObject({}); // true
isObject(true); // false
isObject(null); // false
```

##### `object/ensure`

If given argument is an object, it is returned back. Otherwise `TypeError` is thrown.

```javascript
const ensureObject = require("type/object/ensure");

const obj = {};

ensureObject(obj); // obj
ensureString(null); // Thrown TypeError: null is not an object
```

#### Prototype

_Prototype_ is assumed to be some constructor's `prototype` property

##### `prototype/is`

```javascript
const isPrototype = require("type/prototype/is");

isPrototype({}); // false
isPrototype(Object.prototype); // true
isPrototype(Array.prototype); // true
```

#### RegExp

The JavaScript _RegExp_ instance

##### `reg-exp/is`

```javascript
const isRegExp = require("type/reg-exp/is");

isRegExp(/foo/);
isRegExp({}); // false
isRegExp("foo"); // false
```

##### `reg-exp/ensure`

If given argument is a regular expression object, it is returned back. Otherwise `TypeError` is thrown.

```javascript
const ensureRegExp = require("type/reg-exp/ensure");

ensureRegExp(/foo/); // /foo/
ensureRegExp("foo"); // Thrown TypeError: null is not a regular expression object
```

### Tests

    $ npm test

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/type/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/type
[win-build-image]: https://ci.appveyor.com/api/projects/status/8nrtluuwsb5k9l8d?svg=true
[win-build-url]: https://ci.appveyor.com/api/project/medikoo/type
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/type.svg
[cov-url]: https://codecov.io/gh/medikoo/type

# Lodash Mixins
Just some extra functionality I find myself needing in some projects

* **[_.uniqObjs](#_uniqobjs-array-arrayofobjects-)** - Return only the unique plain objects from a collection of plain objects
* **[_.sortObj](#_sortobj-object-object-)** - Return a copy of the object with the content sorted by the keys
* **[_.isNumeric](#_isnumeric-mixed-something)** - Checks if a value is numeric, also able to determine if a string value is numeric (useful for GetOpts or URI Params)
* **[_.isEmail](#_isemail-string-email-)** - Check if an e-mail address is RFC822 compliant
* **[_.sortMatch](#_sortmatch-mixed-foo-mixed-bar-)** - Checks if the sorted version of two objects or arrays match
* **[_.bool](#_bool-mixed-boolstr--mixed-otherbools--)** - Checks if a string (or boolean) object is boolean (again, useful for GetOpts or URI Params)
* **[_.typeof](#_typeof-mixed-element--bool-discern-)** - Somewhat like the standard `typeof` operator, but can also parse strings as other possible values ('true' can be boolean, '1' can be number, etc)
* **[_.utf8Encode](#_utf8encode-string-data-)** - Encodes an ISO-8859-1 string to UTF-8, this is meant to provide the same functionality as the PHP [utf8_encode](http://php.net/manual/en/function.utf8-encode.php) function
* **[_.utf8Decode](#_utf8decode-string-data-)** - Decodes a UTF-8 encoded string to the standard ISO-8859-1, this is meant to provide the same functionality as the PHP [utf8_decode](http://php.net/manual/en/function.utf8-decode.php) function
* **[_.censor](#_censor-string-data-)** - Censor common English profanity
* **[_.sha1](#_sha1-string-data-)** - Calculate the sha1 hash of a specific string. This is the equivalent of PHP's [sha1](http://php.net/manual/en/function.sha1.php) function
* **[_.endWith](#_endwith-string-data-string-suffix-)** - Ensure a specific string ends with a certain character
* **[_.startWith](#_startwith-string-data-string-prefix-)** - Ensure a specific string starts with a certain character
* **[_.multiReplace](#_multireplace-string-data-mixed-replacements--string-regexflags--)** - This performs a series of replacements in a string, using the items within an object/array. Quicker than chaining a bunch of `replace()`
* **[_.replaceAt](#_replaceat-string-data-mixed-locations--string-replacement--)** - Substitute specific characters within a string with a specified replacement.
* **[_.type](#_type-mixed-data-)** - Return items true type by grabbing the 2nd string content from Object.prototype.toString.call, as opposed to the less-specific 'typeof'
* **[_.swap](#_swap-object-data-)** - Return a version of the provided object with the keys/values swapped
* **[_.nl2br](#_nl2br-string-data-)** - Replaces any line return variants with HTML line breaks
* **[_.br2nl](#_br2nl-string-data-)** - Replaces any variants of the HTML line break tag with the line return character
* **[_.randStr](#_randstr--number-length--)** - Generate a random alpha-numeric string
* **[_.hash](#_hash-mixed-string-string-salt-)** - Generate a salted hash
* **[_.passwordHash](#_passwordhash-string-string-)** - Generate a randomly generated salted password hash, (which can only be verified via [_.passwordVerify](#_passwordverify-string-password-string-hash-))
* **[_.passwordVerify](#_passwordverify-string-password-string-hash-)** - Verify the hash generated by [_.passwordHash](#_passwordhash-string-string-)
* **[_.isUniq](#_isuniq-array-collection--string-element--)** - Validate the uniqueness of an array, of objects in an array, or of a specific element in the objects in an array
* **[_.removeObj](#_removeobj-object-obj-mixed-del-)** - Remove one or more element from an object, returning a new array with said elements
* **[_.includesAll](#_includesall-mixed-collection-mixed-values-number-fromindex--)** - Verify that a collection (string, array or object) has all listed values.
* **[_.isSnake](#_issnake-string-str-)** - Validates that a string is in *snake_case* format
* **[_.isCamel](#_iscamel-string-str-)** - Validates that a string is in *camelCase* format
* **[_.isKebab](#_iskebab-string-str-)** - Validates that a string is in *kebab-case* format
* **[_.isUpper](#_isupper-string-str-)** - Validates that a string is in *UPPER CASE* format
* **[_.isLower](#_islower-string-str-)** - Validates that a string is in *lower case* format
* **[_.isStart](#_isstart-string-str-)** - Validates that a string is in *Start Case* format
* **[_.getCase](#_getcase-string-str-)** - Retrieve the case type a specified string is formatted in
* **[_.isCase](#_iscase-string-str-string-case-)** - Validate that a string is in the format of the case-type specified

----
### _.uniqObjs( *array* arrayOfObjects )

Return a new array containing only the unique objects inside the provided array. Unlike _.uniq, this will check _every_ key/value in the array

```javascript
const objs = [ { x: 1, y: 2 }, { a: 1, b: 2 }, { x: 1, y: 2 }]

_( objs ).uniqObjs().value()
_.uniqObjs( objs )

// => [ { x: 1, y: 2 }, { a: 1, b: 2 } ]
```

### _.sortObj( *object* Object )

Return a copy of the object with the content sorted by the keys

```javascript
const obj = {b: 3, c: 2, a: 1}

_.sortObj( obj )
_( obj ).sortObj().value()

// => {a: 1, b: 3, c: 2}

_.sortObj(obj, (value, key) => {
	return value
})

// => {a: 1, c: 2, b: 3}
```

### _.isNumeric( *mixed* something)

Check if the provided number is a float or integer value. This just tacks a 2nd check onto lodashes isNumber, which uses a lenient comparative operator to check if the value of parseFloat is the same as the provided number

```javascript
_.isNumeric( 123   )
_.isNumeric( '123' )
_.isNumeric( 1.2   )
_.isNumeric( '1.2' )

// => true
```

### _.isEmail( *string* email )

Attempt to validate an e-mail address against the [RFC822](https://www.w3.org/Protocols/rfc822/) standard.

**Note**: It's actually impossible to validate an e-mail address against the RFC822 format and be 100% positive in it's results. There are a very few cases that may slip through the pattern matching validation, but the pattern used here is about as close as I can get

```javascript
_.isEmail( 'john@gmail.com' ) === true
_.isEmail( 'john.m.doe@sub.domain.co.uk' ) === true
_.isEmail( 'john@@gmail.com' ) === fail
_.isEmail( 'john@gmail,com' ) === fail
```

### _.sortMatch( *mixed* foo, *mixed* bar )

Check if two values match each other. Basically sorts the object and source, then passes it off to _.isMatch, (Since objects/arrays with same values in different orders would be considered discrepancies

```javascript
_.sortMatch([1,2,3], [3,2,1]) === true

_.sortMatch({a:1,b:2,c:3}, {c:3,b:2,a:1})==== true

_.sortMatch( {a:1,b:2,c:3}, {d:4,e:5,f:6} ) === false
```

### _.bool( *mixed* boolStr [, *mixed* otherBools ] )

Just a boolean comparison tool, Allows you to specify other true-type variables, as well as convert the value to lower case (Since the string representations of the boolean values are lower). Also compares integer values

```javascript
bool( true ) === true
bool( 'true' ) === true
bool( 'false' ) === false
bool( false ) === false
bool( 1 ) === true
bool( '1' ) === true
bool( 0 ) === false
bool( '0' ) === false
bool( 'foo', [ 'foo', 'bar' ] ) === true
bool( 'foo', [ 'bar', 'baz' ] ) === false

// => true
```

### _.typeof( *mixed* element [, *bool* discern ])

Return the type of a specific variable, much like the standard 'typeof', only with a little more functionality. This is primarily used for input from libraries/packages/modules that may convert the variable to a different type when interacting with it. For example, pretty much anything passed through the URI parameters will be a string, as well as anything passed through GetOpts, but you may want integers, for example, to actually be identified as numbers, or true/false/null/undefined strings to be identified as boolean/null/undefined. That's what the *discern* parameter does here, it will process the variable to attempt to identify the type it originally was.

```javascript
_.typeof( [1,2] )       // array
_.typeof( 'foo' )       // string
_.typeof( true )        // boolean
_.typeof( 'true' )      // string
_.typeof( 'true',true ) // boolean
_.typeof( null )        // null
_.typeof( 'null' )      // string
_.typeof( 'null',true ) // null
```

### _.utf8Encode( *string* data )

Encodes an ISO-8859-1 string to UTF-8, this is meant to provide the same functionality as the PHP [utf8_encode](http://php.net/manual/en/function.utf8-encode.php) function.

```javascript
_.utf8Encode( 0xD800 ) === '55296'
```

### _.utf8Decode( *string* data )

Decodes a UTF-8 encoded string to the standard ISO-8859-1, this is meant to provide the same functionality as the PHP [utf8_decode](http://php.net/manual/en/function.utf8-decode.php) function.

```javascript
_.utf8Decode('TÃ©lÃ©com') === 'Télécom'
```

### _.censor( *string* data )

Censor any common profanity words by replacing it with a specified word, or masking all or some of the characters with a single specified character. The words are kept in the separate data.js file, and base64 encrypted, as to not store a huge list of profanity on any users computer. The list of words is actually a list that was downloaded from a TeamSpeak related website of words to ban ([here](http://addons.teamspeak.com/directory/addon/miscellaneous-tools/TXT-English-badwords-bans-and-list.html))

 **Note**: This only supports the English language, the dirty version

 **Note**: The content for this method (censored words) are all base64 encoded, meaning you wont have a file with hundreds of naughty words in your dependencies (In case that was bothering you)

 ```javascript
_.censor( 'damn' ) === 'd**n' // Partial censor (default)
_.censor( 'damn', '!' ) === 'd!!n' // Partial with altered mask
_.censor( 'damn', '#', 'full' ) === '####' // Full censor
_.censor( 'damn', '#', 'firstlast' ) === '#am#' // Censor first and last letters
_.censor( 'damn', null, 'middle' ) === 'd**n' // Censor middle characters
_.censor( 'damn', '-censored-' ) === '-censored-' // Censor entire word (If mask is more than a single character)
_.censor( 'damn', '_', 'single' ) === 'd_mn' // Censor single character
```

### _.sha1( *string* data )

Calculate the sha1 hash of a specific string. This is the equivalent of PHP's [sha1](http://php.net/manual/en/function.sha1.php) function.

```javascript
_.sha1( 'Hello World' ) === '0a4d55a8d778e5022fab701977c5d840bbc486d0'
_.sha1('TÃ©lÃ©com') === '1472543473c082833b239fee0f615b284b970519'
```

### _.endWith( *string* data, *string* suffix )

Ensure a specific string ends with a certain character

```javascript
_.endWith('/User/john.doe/Documents', '/') === '/User/john.doe/Documents/'
_.endWith('Something else.', '.') === 'Something else.'
```

### _.startWith( *string* data, *string* prefix )

Ensure a specific string starts with a certain character

```javascript
_.startWith('Documents/', '~/') === '~/Documents/'
_.startWith('Something else.', '.') === 'Something else.'
_( 'Using startsWith and endsWith together' ).startWith('(').endWith(')').value() === '(Using startsWith and endsWith together)'
```

### _.multiReplace( *string* data, *mixed* replacements [, *string* regexFlags ] )

This performs a series of replacements in a string, using the items within an object/array. Just a quicker/easier way than chaining .replace() over and over again. The replacements can be an array of arrays, an array of objects, or an object

```javascript
_.multiReplace( 'test', { t: 'T'} ) === 'TesT'
_.multiReplace( 'foo', { FOO: 'bar'}, 'i' ) === 'bar'
_.multiReplace( 'Windows XP', [{ windows: 'Linux'}, {xp: 'RHEL'}], 'i' ) === 'Linux RHEL'
```

### _.replaceAt( *string* data, *mixed* locations [, *string* replacement ] )

Substitute specific characters within a string with a specified replacement. Replacement positions are specified by either a single (numeric) value, or an array of numeric values

```javascript
_.replaceAt( 'baz', 2, 'r') === 'bar'
_.replaceAt( 'bad-word', [1,2,5,6], '*') === 'b**-w**d'
_.replaceAt( 'Hello World', [6,7,8,9,10] )=== 'Hello ?????'
```

### _.type( *mixed* data )

Return items true type by grabbing the 2nd string content from Object.prototype.toString.call, as opposed to the less-specific 'typeof'

```javascript
_.type([]) === 'array'
_.type({}) === 'object'
_.type(() => {}) === 'function'
```

### _.swap( *object* data )

Swap the keys and values of a simple plain object

```javascript
_.swap( { a: 'b', c: 'd'} ) === { b: 'a', d: 'c' }
```

### _.nl2br( *string* data )

Convert any new-line characters to HTML Line breaks, which can optionally be specified, but defaults to just &lt;/br&gt;. The replaced characters consists of \r\n, \n\r, \n and \r.

```javascript
_.nl2br("One\r\nTwo\n\rThree\nFour\rFive") === 'One</br>Two</br>Three</br>Four</br>Five'
 ```

### _.br2nl( *string* data )

Complete opposite of the _.nl2br - This replaces any HTML Line breaks with the line return character, which can optionally be specified, but defaults to just \r\n. The HTML break replaced is &lt;/br&gt;, &lt;br&gt;, &lt;/BR&gt; or &lt;BR&gt;

```javascript
_.nl2br("One<br>Two</br>Three</BR>Four<BR>Five") === 'One\r\nTwo\r\nThree\r\nFour\r\nFive'
 ```

### _.randStr( [ *number* length ] )

Generate a random alpha-numeric string, 20 characters in length by default, or a specific length

```javascript
_.randStr()   // Random string, 20 characters in length
_.randStr(15) // Something like: l5hVisKauNR1a2h
 ```

### _.hash( *mixed* string, *string* salt )

Generate a salted hash

```javascript
_.hash('secret-word','3o3UnhWFB28hGYK') === 'WHJzvf0ZLXXOHW5uVlB/FWaAbsQFzkXgtG7CvDQGWplqlVd20WDZ4eYBX3062dRxJFf+4bx1IBn/LJBst6BN2w=='
```

### _.passwordHash( *string* string )

Generate a password hash with a randomly generated salt, which can only be verified via `_.passwordVerify`
*(Based off of PHPs [password-hash](http://php.net/manual/en/function.password-hash.php) function)*

```javascript
_.passwordHash('secret') // d3eXU3x/LcnvQskL.eDruJHeJO+V6FaDYd+iF/DfrgJ7bYca3G6AR+o3Rd7j20osNLiQNNb/Q/6RZc7c6b/L9l5FW++LE7eX9g3NxWFxXg==
```

### _.passwordVerify( *string* password, *string* hash )

Validate a password against a hash that was generated by `_.passwordHash`
*(Based off of PHPs [password-verify](http://php.net/manual/en/function.password-verify.php) function)*

```javascript
const pwdHash = _.passwordHash('secret')
_.passwordVerify( 'secret', pwdHash ) === true
_.passwordVerify( 'foo', pwdHash ) === false
```

### _.isUniq( *array* collection [, *string* element ] )

Validate the uniqueness of an array, of objects in an array, or of a specific element in the objects in an array

```javascript
_.isUniq( [ 1, 2, 3, 2 ] ) === false
_.isUniq( [ {a: 1}, {a: 2}, {a: 1} ] ) === false
_.isUniq( [ {a: 1, b: 2}, {a: 2, b: 5}, {a: 1, b: 2} ], 'b') === false
```

### _.removeObj( *object* obj, *mixed* del )

Remove specific elements from an object (either a single element specifying the element key as a string, or multiple, specifying the element keys in an array), returning a new object with the elements removed from the original object. This is essentially the same logic as lodashes [_.remove](https://lodash.com/docs#remove) method, except this is for objects, not arrays

**Note:** This method manipulates the original object. The element(s) specified at `del` will be completely removed from the original object, and returned in a new object

```javascript
const baz = { foo: 'one', bar: 'two', baz: 'three' }
const bar = _.removeObj( baz, [ 'foo', 'bar' ] )
const foo = _.removeObj( bar, 'foo' )

// foo: { foo: 'one' }
// bar: { bar: 'two' }
// baz: { baz: 'three' }
```

### _.includesAll( *mixed* collection, *mixed* values[, *number* fromIndex ] )

Verify that a collection (string, array or object) has all listed values, basically just an array-friendly version of _.includes

```javascript
_.includesAll( [1,2,3], [1,3] ) === true
_.includesAll( [1,2,3], [1,2], 2 ) === false
_.includesAll( {user: 'fred', age: 40 }, ['fred', 40] ) === true
_.includesAll( 'abcdef', ['a','d'] ) === true
```

### _.isSnake( *string* str )

Verify that a specified string is in *snake_case* format

```javascript
_.isSnake( 'kebab-case' ) === false
_.isSnake( 'snake_case' ) === true
```

### _.isCamel( *string* str )

Verify that a specified string is in *camelCase* format

```javascript
_.isCamel( 'kebab-case' ) === false
_.isCamel( 'camelCase' ) === true
```

### _.isKebab( *string* str )

Verify that a specified string is in *kebab-case* format

```javascript
_.isKebab( 'camelCase' ) === false
_.isKebab( 'kebab-case' ) === true
```

### _.isStart( *string* str )

Verify that a specified string is in *Start Case* format

```javascript
_.isStart( 'lower case' ) === false
_.isStart( 'Start Case' ) === true
```

### _.isLower( *string* str )

Verify that a specified string is in *lower case* format

```javascript
_.isLower( 'UPPER CASE' ) === false
_.isLower( 'lower case' ) === true
```

### _.isUpper( *string* str )

Verify that a specified string is in *UPPER CASE* format

```javascript
_.isUpper( 'lower case' ) === false
_.isUpper( 'UPPER CASE' ) === true
```

### _.getCase( *string* str )

Retrieve the case type of a specified string

**Note**: The order of case checks is: snake, camel, kebab, start, lower, upper. So `snake_case` will register as `snake`, but `snake case` will register as `lower`

```javascript
_.getCase( 'snake_case' ) === 'snake'
_.getCase( 'camelCase' ) === 'camel'
_.getCase( 'kebab-case' ) === 'kebab'
_.getCase( 'Start Case' ) === 'start'
_.getCase( 'lower case' ) === 'lower'
_.getCase( 'UPPER CASE' ) === 'upper'
_.getCase( 'This isnt-any_case' ) === undefined
```

### _.isCase( *string* str, *string* case )

Verify a string is in a specified format

```javascript
_.isCase( 'camelCase', 'camel' ) === true
_.isCase( 'snake_case', 'camel' ) === false
_.isCase( 'lower_case', 'lower' ) === false
_.isCase( 'lower_case', 'snake' ) === true
```


**Note:** If somehow I ended up re-inventing the wheel with one of these, and they already exist.. oops.
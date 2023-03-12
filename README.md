# library-class-javascript
Plain javascript helper library (for frontend & backend) which includes numerous useful functions and methods (without any external dependencies)

## for Backend (nodejs, etc..)
```
const PuvoxLibrary = require('puvox-library');
```
## for Frontend
Include `<script src="https://unpkg.com/puvox-library"></script>` in your front-end and use `PuvoxLibrary` global variable:

## Examples
```
PuvoxLibrary.arrayValue ( {a:11, b:22, c:33}, 'c' );         // 33
PuvoxLibrary.arrayRemoveValue ( ["k", "z", "g"] , "z" );     // ["k", "g"]
PuvoxLibrary.randomNumber (length);                          // 29873433
PuvoxLibrary.removeKeys ( {a:11, b:22, c:33},  ['c'] );      // {a:11, b:22}
PuvoxLibrary.stringToArray ( {a:11, b:22, c:33},  ['c'] );   // {a:11, b:22}
// etc, numerous useful methods...
```

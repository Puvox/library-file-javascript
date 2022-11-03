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
let myVar = PuvoxLibrary.arrayLastItem ( [1,2,3,4,5] );
let myVar = PuvoxLibrary.removeKeys ( {a:11, b:22, c:33},  ['c'] );
// etc, numberous useful methods...
```

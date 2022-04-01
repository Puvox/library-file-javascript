# library-class-javascript
Plain javascript helper library (for frontend & backend) which includes numerous useful functions and methods (without any external dependencies)

## Frontend
Include `<script src="https://unpkg.com/library-puvox"></script>` in your front-end and use `LIBRARY_PUVOX` c:
```
let myVar = LIBRARY_PUVOX.arrayLastItem ( [1,2,3,4,5] );
let myVar = LIBRARY_PUVOX.removeKeys ( {a:11, b:22, c:33},  ['c'] );
// etc, various useful methods...
```

## Backend
```
const helpers = require('library-puvox');
let myVar = LIBRARY_PUVOX.arrayLastItem ( [1,2,3,4,5] );
let myVar = LIBRARY_PUVOX.removeKeys ( {a:11, b:22, c:33},  ['c'] );
// etc, various useful methods...
```
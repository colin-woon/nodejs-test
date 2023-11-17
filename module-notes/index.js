console.log(process.env.USER);

//ES6 Style
// import myModule/ {myVar, myFunction} from './myModule';

//CommonJS style
// 1st way to import module
const math = require('./math');
console.log(math.add(2, 3));
console.log(math.multiply(3, 3));

// 2nd way to export module
// const { add, subtract, multiply, divide } = require('./math')
// console.log(add(2, 3));
// console.log(multiply(3, 3));

// common js import, if not common, need to state file path without extension name like above ^
const os = require('os')
const path = require('path')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename)) //gives directory name of file (*/index.js)
console.log(path.basename(__filename)) //gives the file name (index.js)
console.log(path.extname(__filename)) //gives the file's extension (.js)
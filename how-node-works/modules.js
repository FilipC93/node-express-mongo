// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./calculator');
const calc1 = new C();
console.log(calc1.add(4, 1));
console.log(arguments);

//* Caching
require('./caching')();

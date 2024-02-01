const fs = require('fs');

// //* Blocking, synchronous way
const path = './hello.txt'
const textIn = fs.readFileSync(path, 'utf-8');
const startDate = new Date(2023, 11, 16, 15, 42, 7);
const upgradedText = `This was created at ${startDate.toDateString()}, and the original text was: ${textIn}`;
fs.writeFileSync(path, upgradedText);
console.log('File written');

//* Non-blocking, async way
const asyncPath = './asyncjs.txt';
//? 1st param: path, 2nd: encoding, 3rd: callback
fs.readFile(asyncPath, 'utf-8', (e, data) => console.log(data));
console.log('data written');
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //? Solution 1
  //*   fs.readFile('./text.txt', (e, data) => {
  //*     if (e) console.log(e);
  //*     res.end(data);
  //*   });
  //? Solution 2: Streams
  //*   const readable = fs.createReadStream('text.txt');
  //*   readable.on('data', (chunk) => res.write(chunk));
  //*   readable.on('end', () => res.end());
  //*   readable.on('error', (e) => {
  //*     console.log(e);
  //*    res.statusCode = 500;
  //*     res.end('File not found');
  //*   });
  //?Solution 3 (best)
  const readable = fs.createReadStream('text.txt');
  readable.pipe(res);
});

server.listen(8000, 'localhost', () => console.log('Listening...'));

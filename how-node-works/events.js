const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.on('newSale', () => console.log('new sale alert'));
myEmitter.on('newSale', () => console.log('customer name Filip'));
myEmitter.on('newSale', (stock) => console.log(`there are ${stock} items left`));
myEmitter.emit('newSale', 9);

/////////////////////////////////////////////////////////////////////////////////
const server = http.createServer();
server.on('request', (req, res) => {
  console.log(req.url);
  console.log('req 1');
  res.end('Req received');
});

server.on('request', (req, res) => {
  console.log('Another one');
});

server.on('close', (req, res) => {
  console.log('server closed');
});

server.listen(8000, 'localhost', () => console.log('waiting for requests'));

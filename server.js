const http = require('http');
const url = require('url');
const fs = require('fs');

//?Mini-api
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//* Starting a web server:
const server = http.createServer((req, res) => {
    //? req is the 'request' object
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('Hello from the overview tab');
    } else if (pathName === '/product') {
        res.end('This is the product');
    }
    else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h2>The page you requested cannot be found</h2>');
    }
});

server.listen(8000, 'localhost', () => {
    console.log('Server is listening');
});

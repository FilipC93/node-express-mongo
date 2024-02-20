const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//?Mini-api
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//* Just for practice.
const slugs = dataObj.map((e) => slugify(e.productName, { lower: true }));
//* Starting a web server:
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHTML = dataObj.map((e) => replaceTemplate(card, e)).join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', cardsHTML);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const productOutput = replaceTemplate(productTemplate, product);
    res.end(productOutput);
  } else if (pathname === '/api') {
    res.writeHead(
      200,
      { 'Content-type': 'application/json' },
      { 'set-cookie': [(text = 'javascript')] }
    );
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h2>The page you requested cannot be found</h2>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Server is listening');
});

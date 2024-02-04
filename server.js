const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not organic');
    return output;
}

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//?Mini-api
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//* Starting a web server:
const server = http.createServer((req, res) => {
    //? req is the 'request' object
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHTML = dataObj.map(e => replaceTemplate(card, e)).join('');
        const output = overview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        res.end(output);
    } else if (pathName === '/product') {
        res.end(product);
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' }, { "set-cookie": [text = 'javascript'] });
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

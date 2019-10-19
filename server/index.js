const express = require('express');
//const queryString = require('query-string');
const path = require('path')
const proxy = require('express-http-proxy');
const app = express();
const port = 3000

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/description', proxy(`http://localhost:3002`,{
  proxyReqPathResolver: function (req) {
    var prod = req.url.split('?');
    var pram = prod[1]
    return `/description?${pram}`
  }
}));

app.use('/reviews', proxy('http://localhost:3004', {
  proxyReqPathResolver: function (req) {
    var prod = req.url.split('?');
    var pram = prod[1]
    return `/reviews?${pram}`
  }
}));

app.use('/images', proxy(`http://localhost:3003`, {
  proxyReqPathResolver: function (req) {
    var prod = req.url.split('?');
    var pram = prod[1]
    return `/images?${pram}`
  }
}));

app.use('/suggested', proxy('http://localhost:3001', {
  proxyReqPathResolver: function (req) {
    var prod = req.url.split('?');
    var pram = prod[1]
    return `/suggested?${pram}`
  }
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
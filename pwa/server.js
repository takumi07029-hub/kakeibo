var http = require('http');
var fs = require('fs');
var path = require('path');

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/manifest+json',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.js':   'text/javascript'
};

http.createServer(function(req, res) {
  var filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    var ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(8080, function() {
  console.log('http://localhost:8080 で起動中');
});

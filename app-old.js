const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

const server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let url = req.url;
  if (url === '/about') {
    res.write('Welcome to about us page');
    res.end();
  } else {
    res.end('Hello World');
  }
});


server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
});
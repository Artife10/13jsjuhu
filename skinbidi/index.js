const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsf-Y2vXzsIa5kftzAPMcUuZwAuJsTHWtCaEessylsJw&s">');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("x3")
});

const http = require("http");
const app = require("./src/app.js");

const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is live on port ${port}.`);
  console.log(`http://localhost:3000`);
});

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./api/db.json"); // Path to db.json
const middlewares = jsonServer.defaults();

// Middleware to handle CORS
server.use(middlewares);
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(router);

// Export the server as a serverless function
module.exports = server;
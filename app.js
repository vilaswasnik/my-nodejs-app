const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const pagePath = path.join(__dirname, "index.html");

const server = http.createServer((request, response) => {
  if (request.method !== "GET" || (request.url !== "/" && request.url !== "/index.html")) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(pagePath, (error, page) => {
    if (error) {
      console.error("Failed to read index.html:", error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Internal server error");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page);
  });
});

server.listen(port, () => {
  console.log(`Sample app listening at http://localhost:${port}`);
});

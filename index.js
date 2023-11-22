const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "./";

  if (req.url === "/" || req.url === "/index.html") {
    filePath += "index.html";
  } else if (req.url === "/about.html") {
    filePath += "about.html";
  } else if (req.url === "/contact-me.html") {
    filePath += "contact-me.html";
  } else {
    filePath += "404.html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile("./404.html", (err, notFoundContent) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(notFoundContent);
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

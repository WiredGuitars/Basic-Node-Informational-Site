const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact-me.html", (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
});

// Handling 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Server Error: ${err.message}`);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import path from "path";
import express from "express";

const app = express();
const DIST_DIR = __dirname; // Server run from within /dist folder thus using __dirname
const HTML_FILE = path.join(DIST_DIR, "index.html");
const port = process.env.PORT || 3031;

app.use("/dist", express.static(DIST_DIR));

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log("server running at ", port);
});

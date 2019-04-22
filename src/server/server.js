import path from "path";
import express from "express";
import fs from "fs";

const app = express();
const DIST_DIR = __dirname; // Server run from within /dist folder thus using __dirname
// const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackConfig = require('./webpack.config.js');
// const webpack = require('webpack');
const port = process.env.PORT || 3031;
// const compiler = webpack(webpackConfig);

// app.use(
//   webpackDevMiddleware(compiler, {
//     hot: true,
//     filename: 'bundle.js',
//     contentBase: './dist',
//     host: 'localhost'
//   })
// );

// app.use(
//   webpackHotMiddleware(compiler, {
//     log: console.log,
//     reload: true,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
//   })
// );
console.log(DIST_DIR, HTML_FILE);
fs.readdir(DIST_DIR, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file); 
  });
});

app.use("/dist", express.static(DIST_DIR));
// app.use('/public', express.static(__dirname + '/public'));

// viewed at http://localhost:3031
app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log("server running at ", port);
});

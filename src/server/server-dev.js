import path from "path";
import express from "express";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.dev.config';

const app = express();
const DIST_DIR = __dirname; // Server run from within /dist folder thus using __dirname
const HTML_FILE = path.join(DIST_DIR, "index.html");
const compiler = webpack(config);
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
console.log(DIST_DIR, HTML_FILE, config);

app.use("/dist", webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // contentBase: "../",
}))

// app.use("/dist", express.static(DIST_DIR));
// app.use('/public', express.static(__dirname + '/public'));

// viewed at http://localhost:3031
app.get("*", (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
   })
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log("server running at ", port);
});

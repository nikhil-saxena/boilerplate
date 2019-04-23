import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config";

const app = express();
const DIST_DIR = __dirname; // Server run from within /dist folder thus using __dirname
const HTML_FILE = path.join(DIST_DIR, "index.html");
const port = process.env.PORT || 3031;
const compiler = webpack(
  Object.assign(config, {
    output: {
      path: __dirname,
      filename: "[name].[hash:8].js",
      publicPath: "/dist"
    }
  })
);

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

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      console.log("error ======== ", err);
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.listen(port, () => {
  console.log("server running at ", port);
});

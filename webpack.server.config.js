const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const DEV = process.env.NODE_ENV !== "production";

module.exports = {
  mode: DEV ? "development" : "production",
  entry: {
    server: path.join(__dirname, "src", "server", `server-${ DEV ? "dev" : "prod" }.js`)
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
    filename: "[name].js"
  },
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};

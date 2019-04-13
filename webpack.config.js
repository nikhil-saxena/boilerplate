const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const DEV = process.env.NODE_ENV !== "production";
console.info(
  `-----Bundling in ${DEV ? "development" : "production"} mode-----`
);

module.exports = {
  mode: DEV ? "development" : "production",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:8].js"
  },
  devtool: DEV ? "cheap-module-source-map" : "none",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "eslint-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html"
    })
  ]
};

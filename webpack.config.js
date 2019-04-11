import * as path from "path";

const DEV = process.env.NODE_ENV !== "production";

module.exports = {
  mode: DEV ? "development" : "production",
  entry: "src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash:8].js"
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
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

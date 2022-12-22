const path = require("path");
const fs = require("fs");
// App directory
const appDirectory = fs.realpathSync(process.cwd());
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: "./.env" });
const webpack = require("webpack");

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = () => ({
  mode: "development",
  entry: { "./src/index": "./src/index.js" },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    libraryTarget: "var",
    library: `${process.env.APP_NAME}`,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      chunks: ["main"],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
});

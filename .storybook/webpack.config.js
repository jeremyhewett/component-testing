/* eslint-disable jsx-a11y/href-no-hash */
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        loaders: ["babel-loader?cacheDirectory"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../"),
      },
      {
        test: /\.yml/,
        loaders: ["json-loader", "yaml-loader"],
      },
      {
        test: /\.json/,
        loaders: ["json-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "acl-ui": path.resolve("./src/"),
    },
  },
};

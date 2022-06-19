const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./front.js",
  output: {
    filename: "result.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  devServer: {
    port: 3060,
    proxy: {
      "/api/*": {
        target: "http://localhost:3065",
        changeOrigin: true,
      },
    },
  },
};

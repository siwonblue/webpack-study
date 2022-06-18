const path = require("path");

module.exports = {
  mode: "development",
  entry: "./front.js",
  output: {
    filename: "result.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:3065",
        changeOrigin: true,
      },
    },
  },
};

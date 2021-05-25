const path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      Util: path.resolve(__dirname, "src/Util/"),
      css: path.resolve(__dirname, "src/client/css/")
    }
  },
  watchOptions: { ignored: /node_modules/},
  mode: 'development',
  devtool: 'inline-source-map'
};

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.NODE_ENV || "development",
  entry: "./test",
  target: "node",
  output: {
    path: "/Users/guillaume/Documents/github/test/public",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: "native-addon-loader",
            options: { name: "[name]-[hash].[ext]" }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          { 
            loader: "style-loader", 
            options: { injectType: "styleTag" } 
          } , {
            loader : "css-loader" , 
            options: {
              url: true ,
              esModule: false,
              sourceMap: true,
            }
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              esModule: false,
              encoding: false,
              mimetype: false,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [new CleanWebpackPlugin({
    // dangerouslyAllowCleanPatternsOutsideProject: true
  })]
};

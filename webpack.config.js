const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const environment = "production";

module.exports = {
  entry: "./src/index.tsx",
  mode: environment,
  // source code should be accessible in browser devtools
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      // add rule for loading css
      {
        test: /\.css$/,
        use: [, MiniCssExtractPlugin.loader, "css-loader"],
      },
      // add rule for loading images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),

    new webpack.DefinePlugin({
      "process.env.REACT_APP_BACK_END_URL":
        environment === "development"
          ? JSON.stringify("http://localhost:1337")
          : JSON.stringify(
              "https://asia-south1-kkss-5a230.cloudfunctions.net/kkssCloudFunctions"
            ),
    }),
  ],
};

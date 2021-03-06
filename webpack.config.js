const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const config = {
  mode,
  entry: "./src/index.tsx",
  output: {
    path: process.cwd() + "/dist",
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: mode == "development",
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          "file-loader",
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.ya?ml$/,
        use: ["js-yaml-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name]-[id]-[hash].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: "public" }])
  ],
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

if (mode == "development") {
  Object.assign(config, {
    devtool: "cheap-module-source-map",
    devServer: {
      contentBase: "./dist",
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/postman": "http://localhost:5555",
        "/v1": "http://localhost:28080"
      }
    }
  });
}

module.exports = config;

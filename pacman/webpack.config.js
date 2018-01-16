const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const isProd = process.env.NODE_ENV === "production";

const config = {
  devtool: "inline-source-map",
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
    // plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [new FriendlyErrorsPlugin()]
};

if (isProd) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false,
      parallel: true
    })
  );
}

module.exports = [
  merge({}, config, {
    entry: "./src/game.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "game.js"
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          context: "src",
          from: {
            glob: "**/*.{json,jpg,png}"
          },
          to: "./"
        }
      ])
    ]
  }),
  merge({}, config, {
    entry: "./src/workers/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/workers"),
      filename: "index.js"
    }
  })
];

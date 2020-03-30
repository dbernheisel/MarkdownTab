/*eslint-env node*/

const path = require("path");
const glob = require("glob-all");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./src/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const purge = new PurgecssPlugin({
  paths: glob.sync([
    path.resolve(__dirname, "./src/**/*.vue"),
    path.resolve(__dirname, "./src/**/*.js")
  ], { nodir: true }),
  // https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475#3f95
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
    /^router-link(|-exact)-active$/, /data-v-.*/
  ],
  defaultExtractor (content) {
    const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
    return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
  }
});

module.exports = (_env, _options) => ({
  mode: devMode ? "development" : "production",
  devtool: "cheap-module-source-map",
  entry: {
    newtab: ["./src/newtab.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "newtab.html",
      template: "./src/newtab.html",
      hash: true
    }),
    new CopyPlugin([
      {
        from: "src/icons",
        to: "icons"
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    }),
    new VueLoaderPlugin(),
    ...(devMode ? [] : [purge])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          { loader: "vue-style-loader" },
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, sourceMap: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: { loader: "vue-loader", options: { hotReload: devMode } }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
});

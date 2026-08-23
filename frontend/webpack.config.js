const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, "src/index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // A relative "./" public path breaks for deep-linked routes: the SPA GitHub Pages 404
    // redirect trick has to call history.replaceState to restore the real URL before React
    // Router mounts, but that changes the document's base URL out from under every relative
    // asset reference that resolves after it (fonts, CSS url(), etc) - so bundle.js and
    // everything it references needs an absolute path that doesn't care what the current
    // URL depth is.
    publicPath: argv.mode === "development" ? "/" : "/ultimate-hitboxes/",
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname, "./jquery-stub.js"),
    },
    extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  watchOptions: {
    poll: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
      { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname, "src"),
        loader: "ts-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "public"),
      path.resolve(__dirname, "static"),
    ],
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", //source html
    }),
  ],
});

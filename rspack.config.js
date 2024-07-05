const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: false,
              },
              target: "es2015",
            },
          },
        },
      },
    ],
  },
  externals: ["plop", "path", "fs", "minimist", "fs-extra", "find-up"],
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.emit.tap("AddShebang", (compilation) => {
          const assetPath = "index.js";
          const asset = compilation.assets[assetPath];
          if (asset) {
            const content = asset.source();
            compilation.assets[assetPath] = {
              source: () => `#!/usr/bin/env node\n${content}`,
              size: () => asset.size() + 20,
            };
          }
        });
      },
    },
  ],
};

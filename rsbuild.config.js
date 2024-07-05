import { defineConfig } from "@rsbuild/core";
import { pluginNode } from "@rsbuild/plugin-node";

export default defineConfig({
  plugins: [pluginNode()],
  source: {
    entry: {
      index: "./src/index.js",
    },
  },
  output: {
    path: "dist",
    filename: "index.js",
  },
  tools: {
    rspack: {
      output: {
        clean: true,
      },
      externals: [
        "plop",
        "path",
        "fs",
        "minimist",
        "fs-extra",
        "find-up",
        // Add any other built-in Node.js modules or external packages you're using
      ],
    },
  },
  performance: {
    buildCache: false,
  },
});

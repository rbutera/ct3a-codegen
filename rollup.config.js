import json from "@rollup/plugin-json";
import multi from "@rollup/plugin-multi-entry";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: ["src/index.ts", "src/plopfile.ts"],
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name].js",
    // banner: "#!/usr/bin/env node", // Uncomment if needed for index.js
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    multi(),
    typescript(),
    json(),
  ],
  external: [
    "plop",
    "path",
    "fs",
    "minimist",
    "fs-extra",
    "find-up",
    // Add any other built-in Node.js modules or external packages you're using
  ],
};

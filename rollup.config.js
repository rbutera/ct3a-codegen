import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    // banner: "#!/usr/bin/env node",
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
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

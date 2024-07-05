import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    terser(),
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

#!/usr/bin/env node
import minimist from "minimist";
import path from "path";
import { Plop, run } from "plop";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const argv = minimist(args);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: path.join(__dirname, "../plopfile.js"),
    preload: argv.preload || [],
    completion: argv.completion,
  },
  (env) =>
    Plop.execute(env, (env) => {
      const options = {
        ...env,
        dest: process.cwd(), // this will make the destination path to be based on the cwd when calling the wrapper
      };
      return run(options, undefined, true);
    })
);

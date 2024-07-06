#!/usr/bin/env node
import { findUp } from "find-up";
import fs from "fs-extra";
import minimist from "minimist";
import path from "node:path";
import { Plop, run } from "plop";

const args = process.argv.slice(2);
const argv = minimist(args);

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function getProjectRoot() {
  // Look for package.json or .t3-root file
  const rootFile = await findUp(["package.json", ".t3-root"]);
  return rootFile ? path.dirname(rootFile) : process.cwd();
}

async function getSrcPath() {
  const projectRoot = await getProjectRoot();
  return path.join(projectRoot, "src");
}

async function getConfig(projectRoot: string): Promise<Record<string, any>> {
  const configPath = path.join(projectRoot, ".t3gen.json");
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return {};
}

async function main() {
  const projectRoot = await getProjectRoot();
  const srcPath = await getSrcPath();
  const config = await getConfig(projectRoot);

  Plop.prepare(
    {
      cwd: argv.cwd,
      configPath: path.join(__dirname, "plopfile.js"),
      preload: argv.preload || [],
      completion: argv.completion,
    },
    (env) =>
      Plop.execute(env, (env) => {
        const options = {
          ...env,
          dest: projectRoot,
          data: {
            projectRoot,
            srcPath,
            config,
          },
        };
        return run(options, undefined, true);
      })
  );
}

main().catch(console.error);
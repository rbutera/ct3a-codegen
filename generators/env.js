import fs from "fs/promises";
import path from "path";

export function envGenerator(plop) {
  plop.setGenerator("env", {
    description: "Add a new environment variable",
    prompts: [
      {
        type: "input",
        name: "envVar",
        message: "Enter the environment variable (e.g., FOO_BAR='baz'):",
      },
      {
        type: "confirm",
        name: "isPublic",
        message: "Is this a public variable (will be exposed to the client)?",
        default: false,
        when: (answers) => answers.envVar.startsWith("NEXT_PUBLIC_"),
      },
    ],
    actions: (data) => {
      const [name, value] = data.envVar.split("=");
      const isPublic =
        name.startsWith("NEXT_PUBLIC_") && data.isPublic !== false;

      return [
        {
          type: "append",
          path: ".env",
          template: "{{name}}={{value}}",
          data: { name, value },
        },
        async (answers) => {
          const envPath = path.resolve(process.cwd(), "src/env.js");
          let envContent = await fs.readFile(envPath, "utf-8");

          const schemaType = isPublic ? "client" : "server";
          const schemaLine = `    ${name}: z.string(),`;
          const schemaRegex = new RegExp(`(${schemaType}:\\s*{[^}]*)`);
          envContent = envContent.replace(schemaRegex, `$1\n${schemaLine}`);

          const runtimeEnvLine = `  ${name}: process.env.${name},`;
          const runtimeEnvRegex = /(runtimeEnv:\s*{[^}]*)/;
          envContent = envContent.replace(
            runtimeEnvRegex,
            `$1\n${runtimeEnvLine}`
          );

          await fs.writeFile(envPath, envContent);

          return `Updated ${envPath}`;
        },
      ];
    },
  });
}

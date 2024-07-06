import fs from "fs/promises";
import path from "path";

function inferType(value) {
  // Remove quotes if present
  value = value.replace(/^['"]|['"]$/g, "");

  if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
    return "boolean";
  } else if (
    (!isNaN(value) || !isNaN(Number.parseInt(value))) &&
    value.trim() !== ""
  ) {
    return "number";
  } else if (value.startsWith("http://") || value.startsWith("https://")) {
    return "url";
  } else {
    return "string";
  }
}

function getZodSchema(type) {
  switch (type) {
    case "boolean":
      return "z.boolean()";
    case "number":
      return "z.number()";
    case "url":
      return "z.string().url()";
    default:
      return "z.string()";
  }
}

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
        message:
          "Is this a public variable (WARNING: will be exposed to the client)?",
        default: false,
        when: (answers) => answers.envVar.startsWith("NEXT_PUBLIC_"),
      },
    ],
    actions: (data) => {
      const { projectRoot } = data;
      const [name, value] = data.envVar.split("=");
      const isPublic =
        name.startsWith("NEXT_PUBLIC_") && data.isPublic !== false;

      const inferredType = inferType(value);
      const zodSchema = getZodSchema(inferredType);

      return [
        {
          type: "append",
          path: ".env",
          template: "{{name}}='{{value}}'",
          data: { name, value },
        },
        async (answers) => {
          const envPath = path.resolve(projectRoot, "src/env.js");
          let envContent = await fs.readFile(envPath, "utf-8");

          const schemaType = isPublic ? "client" : "server";
          const schemaLine = `      ${name}: ${zodSchema},`;
          const schemaRegex = new RegExp(`(${schemaType}:\\s*{[^}]*)`);
          envContent = envContent.replace(schemaRegex, `$1${schemaLine}\n`);

          const runtimeEnvLine = `      ${name}: process.env.${name},`;
          const runtimeEnvRegex = /(runtimeEnv:\s*{[^}]*)/;
          envContent = envContent.replace(
            runtimeEnvRegex,
            `$1${runtimeEnvLine}\n`
          );

          await fs.writeFile(envPath, envContent);

          return `Updated ${envPath}`;
        },
      ];
    },
  });
}

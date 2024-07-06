import { __awaiter } from "tslib";
import fs from "fs/promises";
import path from "path";
function inferType(value) {
    if (typeof value === "string") {
        // Remove quotes if present
        value = value.replace(/^['"]|['"]$/g, "");
    }
    if ((typeof value === "string" && value.toLowerCase() === "true") ||
        (typeof value === "string" && value.toLowerCase() === "false")) {
        return "boolean";
    }
    else if ((typeof value === "number" && !isNaN(value)) ||
        (typeof value === "string" &&
            !isNaN(Number.parseInt(value)) &&
            value.trim() !== "")) {
        return "number";
    }
    else if ((typeof value === "string" && value.startsWith("http://")) ||
        (typeof value === "string" && value.startsWith("https://"))) {
        return "url";
    }
    else {
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
                message: "Is this a public variable (WARNING: will be exposed to the client)?",
                default: false,
                when: (answers) => answers.envVar.startsWith("NEXT_PUBLIC_"),
            },
        ],
        // @ts-expect-error plop has a bug where it doesn't type the data object
        actions: (data) => {
            if (!data)
                return [];
            const { projectRoot, envVar } = data;
            const [name, value] = envVar.split("=");
            const isPublic = name.startsWith("NEXT_PUBLIC_") &&
                data.isPublic !== false;
            const inferredType = inferType(value);
            const zodSchema = getZodSchema(inferredType);
            return [
                {
                    type: "append",
                    path: ".env",
                    template: "{{name}}='{{value}}'",
                    data: { name, value },
                },
                (answers) => __awaiter(this, void 0, void 0, function* () {
                    const envPath = path.resolve(projectRoot, "src/env.js");
                    let envContent = yield fs.readFile(envPath, "utf-8");
                    const schemaType = isPublic ? "client" : "server";
                    const schemaLine = `      ${name}: ${zodSchema},`;
                    const schemaRegex = new RegExp(`(${schemaType}:\\s*{[^}]*)`);
                    envContent = envContent.replace(schemaRegex, `$1${schemaLine}\n`);
                    const runtimeEnvLine = `      ${name}: process.env.${name},`;
                    const runtimeEnvRegex = /(runtimeEnv:\s*{[^}]*)/;
                    envContent = envContent.replace(runtimeEnvRegex, `$1${runtimeEnvLine}\n`);
                    yield fs.writeFile(envPath, envContent);
                    return `Updated ${envPath}`;
                }),
            ];
        },
    });
}

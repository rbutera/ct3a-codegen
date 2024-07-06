import { __awaiter } from "tslib";
import fs from "fs/promises";
import path from "path";
export function routerGenerator(plop) {
    plop.setGenerator("router", {
        description: "Create a new tRPC router",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the new router?",
            },
        ],
        // @ts-expect-error plop has a bug where it doesn't type the data object
        actions: (data) => {
            const { projectRoot, config } = data;
            const srcPath = config.srcPath || "src";
            const routerName = data.name.toLowerCase();
            const routerFileName = `${routerName}.ts`;
            const routersPath = path.resolve(projectRoot, srcPath, "server/api/routers");
            const rootRouterPath = path.resolve(projectRoot, srcPath, "server/api/root.ts");
            return [
                {
                    type: "add",
                    path: `${routersPath}/${routerFileName}`,
                    templateFile: "templates/router.hbs",
                },
                () => __awaiter(this, void 0, void 0, function* () {
                    // Update root.ts to import and include the new router
                    let rootContent = yield fs.readFile(rootRouterPath, "utf-8");
                    // Add import statement
                    const importStatement = `import { ${routerName}Router } from "./routers/${routerFileName}";\n`;
                    rootContent = importStatement + rootContent;
                    // Add router to appRouter
                    const appRouterRegex = /(export const appRouter = createTRPCRouter\({[\s\S]*?)(}\);)/;
                    const newRouterLine = `  ${routerName}: ${routerName}Router,\n`;
                    rootContent = rootContent.replace(appRouterRegex, `$1${newRouterLine}$2`);
                    yield fs.writeFile(rootRouterPath, rootContent);
                    return `Updated ${rootRouterPath}`;
                }),
            ];
        },
    });
}

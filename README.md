# t3gen
Code generation tool for NextJS / create-t3-app projects powered by Plop

If you find this project useful, please consider giving it a star ⭐️ on GitHub!

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Generators](#generators)
- [Configuration using .t3gen.json (Optional) (WIP)](#configuration)
- [Contribution](#contribution)
- [License](#license)

## Motivation
[create-t3-app](https://github.com/t3-oss/create-t3-app) is a great tool for creating NextJS projects, but it is a little repetitive to add things like environment variables, tRPC routers, and feature directories. t3gen aims to simplify the process of creating new components, pages, and actions by providing a set of generators that can be easily customized to fit your project's needs.

Everyone can be lazy and just want to do things quickly, so t3gen is designed to be as easy to use as possible. See [Usage without Installation](#usage-without-installation) for an example of how t3gen will literally just save you time. It's that simple!

## Installation (Optional)

```bash
# npm
npm install -g t3gen

# yarn
yarn global add t3gen

# pnpm (recommended)
pnpm install -g t3gen
```

### Usage without Installation

You can also use t3gen without installation by running the following command:

```bash
npx t3gen <generator-name> [options]
```

So, for example, if you want to create a new environment variable, you can run the following command:

```bash
npx t3gen env FOO='bar'
```

This will update the `.env` file in your project and add the environment variable to the `src/env.js` file in your project.

The generator will infer the type of the environment variable based on the value you provide. For example, if you provide:

- a url, it will be inferred as a `url` type, and the zod schema will be `z.string().url()`. 
- a number, it will be inferred as a `number` type, and the zod schema will be `z.number()`. 
- a boolean, it will be inferred as a `boolean` type, and the zod schema will be `z.boolean()`. 
- anything else, it will be inferred as a `string` type, and the zod schema will be `z.string()`.

## Usage

```bash
t3gen <generator-name> [options]
```

See the list of generators below for more details.

## Features

- 🧠 Smart Insertion: t3gen will figure out where to insert the new code based on the current project structure, that means you can run t3gen from any directory and it will work.
- 🪛Generators: t3gen comes with a set of generators that can help you get started quickly. See the list below for more details.
- 🌟Custom Generators: t3gen is built on top of [Plop](https://plopjs.com/), so you can create your own generators by extending the Plop API.

## Generators

| Generator      | Status | Description                                                                                         | Example Command          |
|----------------|--------|-----------------------------------------------------------------------------------------------------|---------------------------|
| env            | ✔️     | Creates an environment variable in .env, and adds the appropriate definition and zod schema in `src/env.js` | `t3gen env FOO='bar'`          |
| router    | ⏳     | Creates a tRPC router in `src/server/api/` and adds it to the appRouter in `src/server/api/root.ts`      | `t3gen router posts` |
| feature        | ⏳     | Creates a directory in `src` for a client feature, or in `src/server` for a server feature               | `t3gen feature posts`        |
| page           | ⏳     | Creates a page.tsx in `src/<feature>/<name>/`                                                         | `t3gen page contact`         |
| component      | ⏳     | Creates a client/server component tsx file as src/feature/_components/<name>.tsx or src/server/feature/_components/<name>.tsx | `t3gen component button` or `t3gen component button --client` or `t3gen component posts/button` |
| action         | ⏳     | Creates server actions files: `src/feature/action.ts` and/or `src/feature/validation.ts`                 | `t3gen action posts/create` |
| procedure | ⏳     | Creates a tRPC procedure in `src/server/api/routers/<router>.ts`      | `t3gen procedure posts/getPost` |
| store          | ⏳     | Creates a Zustand store in `src/<feature>/store.ts`                                                   | `t3gen store posts`        |

## Configuration using .t3gen.json (Optional) {#configuration}
t3gen should work out of the box, but if you want to customize the behavior of t3gen, you can create a `.t3gen.json` file in the root of your project. This file should be a JSON object with the following properties:

```jsonc
{
  "srcPath": "custom/path/to/src" // defaults to "src"
}
```

## Contribution

This project is still in its early stages, so contributions are welcome. If you have any ideas or suggestions, please open an issue or submit a pull request. 


## License

[Apache-2.0](LICENSE)

## Credits

- [Plop](https://plopjs.com/): The tool that powers t3gen
- [create-t3-app](https://github.com/t3-oss/create-t3-app): The template that t3gen is based on
- [Zod](https://github.com/colinhacks/zod): The library that t3gen uses to generate Zod schemas for environment variables
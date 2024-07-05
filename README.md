# ct3a-codegen
Code generation tool for NextJS / create-t3-app projects powered by Plop

## Installation

```bash
# npm
npm install -g ct3a-codegen 

# yarn
yarn global add ct3a-codegen

# pnpm (recommended)
pnpm install -g ct3a-codegen
```

## Usage

```bash
ct3a-codegen <generator-name>
```

## Generators

| Generator      | Status | Description                                                                                         | Example Command          |
|----------------|--------|-----------------------------------------------------------------------------------------------------|---------------------------|
| env            | ✔️     | Creates an environment variable in .env, and adds the appropriate definition and zod schema in src/env.js | ct3a-codegen env          |
| trpc-router    | ⏳     | Creates a tRPC router in src/server/api/ and adds it to the appRouter in src/server/api/root.ts      | ct3a-codegen trpc-router  |
| feature        | ⏳     | Creates a directory in src for a client feature, or in src/server for a server feature               | ct3a-codegen feature      |
| page           | ⏳     | Creates a page.tsx in src/<feature>/<name>/                                                         | ct3a-codegen page         |
| component      | ⏳     | Creates a client/server component tsx file as src/feature/_components/<name>.tsx or src/server/feature/_components/<name>.tsx | ct3a-codegen component    |
| action         | ⏳     | Creates server actions files: src/feature/action.ts and/or src/feature/validation.ts                 | ct3a-codegen action       |
| store          | ⏳     | Creates a Zustand store in src/<feature>/store.ts                                                   | ct3a-codegen store        |


## License

[Apache-2.0](LICENSE)
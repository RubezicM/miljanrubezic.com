import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    ["https://cms.miljanrubezic.com/graphql"]: {
      headers: {
        "User-Agent": "Codegen",
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    },
  },
  documents: [
    "app/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "!src/gql/**/*", // Exclude generated files
  ],
  ignoreNoDocuments: true, // Ignore if no documents are found
  generates: {
    "./gql/": {
      preset: "client",
    },
    "./gql/schema.gql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;

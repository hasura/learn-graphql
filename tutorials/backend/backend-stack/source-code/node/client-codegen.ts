
import type { CodegenConfig } from '@graphql-codegen/cli';

const client: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/v1/graphql",
  documents: "src/**/*.ts",
  generates: {
    "./src/gql/client/": {
      preset: "client",
      plugins: []
    }
  }
};

export default client;
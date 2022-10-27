import type { CodegenConfig } from '@graphql-codegen/cli';

const server: CodegenConfig = {
    schema: 'schema.graphql',
    generates: {
        './src/gql/server/resolvers-types.ts': {
            config: {
                useIndexSignature: true,
            },
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};
export default server;
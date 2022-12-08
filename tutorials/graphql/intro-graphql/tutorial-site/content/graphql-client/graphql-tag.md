## Parsing queries with graphql-tag - `gql`

When you use a GraphQL client, you will most likely use `graphql-tag`. `graphql-tag` is a library for parsing GraphQL operations. It includes the `gql` tag, which parses a GraphQL operation (query/mutation/subscription) string into an AST (Abstract Syntax Tree) document your client understands.

That means you can define the GraphQL operations in your code using template literals and use `gql` to compile them to an AST document.
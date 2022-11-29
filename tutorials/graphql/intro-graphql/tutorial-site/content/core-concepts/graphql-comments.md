## GraphQL Comments

With GraphQL, you can add code comments that are also shown in GraphQL tools such as GraphiQL, GraphQL Playground, and others. As a result, the comments are helpful for both the developers working on your GraphQL API and the developers consuming the API.

You can add comments to your code by using quotation marks as follows:

```
"""
 Retrieve one or more notes from the database
"""
type Query {
    notes: [Note]
    note(id: Int): Note 
}
```

The figure below shows an example of GraphQL comments from an existing application.

![GraphQL server comments](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/graphql-server-comments.png)

Using the [public GraphQL API explorer](https://cloud.hasura.io/public/graphiql), we can explore the GraphQL API and see the comments live.

![GraphQL comments showing in the GraphQL Playground](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/note-comment.png)

In the above figure, you can see the comments added for the `Note` type.

![GraphQL comments showing in the GraphQL Playground](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/query-comment.png)

You can also see the comments for the "Query" type. Code comments are a great way to add additional context and help the developers using your GraphQL API.

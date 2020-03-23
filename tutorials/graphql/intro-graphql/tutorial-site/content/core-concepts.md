---
title: "GraphQL Core Concepts"
metaTitle: "GraphQL Core Concepts | GraphQL Tutorial"
metaDescription: "Learn about the core concepts of GraphQL - document, operation, fields, arguments, variables, aliases, fragments and directives"
---

Let's look at the core concepts of GraphQL from a client perspective.

## GraphQL document 
The content of a GraphQL request string is called the GraphQL document. The string follows a syntax which a GraphQL server or client can parse and validate.

## GraphQL operation
A GraphQL operation can be of type

- query (a read-only fetch)
- mutation (a write followed by fetch)
- subscription (a long‐lived request that fetches data in response to source events.)

GraphQL document can contain one or more of these operations (i.e multiple queries/mutations/subscriptions).

Let's look at a simple example of a GraphQL document:

```graphql
query {
  author {
    id
    name
  }
}
```

In this example, document contains a query operation. GraphQL operation selects the set of information it needs, referred to as the selection set. In the above example, the query operation selects information about the `author` and their `id` and `name`.

We will look into the anatomy of the document in detail now.

## Anatomy of a GraphQL Document

Let's take the following example now:

```graphql
query {
  author(limit: 5) {
    id
    name
  }
}
```

You would have realised that this is another GraphQL document with query operation.

What is the rest of the document composed of? Read on.

#### Fields

A GraphQL field describes a discrete piece of information. This information could be simple or complex with relationships between data.

In the above document, everything enclosed within the operation are fields. (author, id and name).

```
author {
  id
  name
}
```

There can be complex information with relationships like the one below:

```graphql
query {
  author(limit: 5) {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

Here in addition to author fields, we also have articles fields allowing you to represent relationships between fields.

#### Arguments

Imagine fields as functions which return values. Now let's assume the function also accepts arguments which behave differently.

In the above example,

```
author(limit: 5)
```

The author field accepts an argument `limit` to limit the number of results returned. These arguments can be optional or mandatory and can appear on any field in the document.

#### Variables

GraphQL query can be parameterized with variables for reuse and easy construction of queries on the client side.

In the simple example above, assume the limit parameter is configurable by the user viewing the page, then it would be easier to pass a variable to the field argument.

```
query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
```

The variable(s) is defined at the top of the operation and the value for the variable can be sent by the client in a format that the server understands. Typically variables are represented in JSON like below

```
{
  limit: 5
}
```

#### Operation Name

When the document contains multiple operations, the server has to know which one's to execute and map the results back in the same order. For example:

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic
  }
}
query fetchAuthors {
  authors(limit: 5, order_by: { name: asc }) {
    id
    name
    profile_pic
  }
}
```

This has two operations - one for fetching a single author and one for fetching multiple authors.

These are the most common ones typically used in a simple GraphQL request.

But there are more concepts which is useful for complex apps.

#### Aliases

Consider the following example:

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic_large: profile_pic(size: "large")
    profile_pic_small: profile_pic(size: "small")
  }
}
```

When you are fetching information about an author, let's say you have two images, different sizes and you have a field with an argument to do that. In this case, you cannot use the same field twice under the same selection set and hence an `Alias` would be helpful to distinguish the two fields.

#### Fragments

Fragments make GraphQL's reusability even better. If there are some parts of your document that reuses the same set of fields on a given type, then fragment can be powerful.

For example:

```graphql
fragment authorFields on author {
  id
  name
  profile_pic
  created_at
}

query fetchAuthor {
  author(id: 1) {
    ...authorFields
  }
}

query fetchAuthors {
  author(limit: 5) {
    ...authorFields
  }
}
```

Notice the usage of fragment here - `...authorFields`. This type of usage is called a spread fragment. There's also inline fragments where you don't explictly declare fragment separately but use it inline in a query.

#### Directives

Directives are identifiers which add additional functionality without affecting the value of the response but can affect what response comes back to the client.

The identifier `@` is optionally followed by a list of named arguments.

Some default server directives supported by GraphQL spec are:

- @deprecated(reason: String) - marks field as deprecated
- @skip (if: Boolean) - Skips GraphQL execution for this field
- @include (if: Boolean) - Calls resolver for annotated field, if true.

You can also use custom directives to handle other use cases.

These are some of the core concepts that you might encounter most of the time and getting familar with these should suffice to move forward.


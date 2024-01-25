---
title: 'Iterate on the Connector'
metaTitle: 'Iterate on the Connector | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Use watch mode to test your supergraph in real time.'
---

## Make changes to the connector {#make-changes}

At this point, our function doesn't do much. Since Hasura and Deno are using watch mode, we can make changes to our
connector and see them reflected in near-real time.

We can keep our `hello()` function, but let's add a new one below it:

```typescript
/**
 * Returns a greeting for the user based on their preference.
 *
 * @param preference The user's preference for the greeting.
 * @returns The greeting as a string.
 * @pure This function should only query data without making modifications
 */
export function greeting(preference: string): string {
  const name = 'Placeholder';

  switch (preference) {
    case 'formal':
      return `Good day to you, ${name}`;
    case 'informal':
      return `Hey, ${name}`;
    case 'bro':
      return `Sup, ${name} 🤙`;
    default:
      return `Hello, ${name}`;
  }
}
```

By adding JS Doc comments, we can provide some documentation for our function. We can also use the `@pure` tag to
indicate that this function will only query data and not make any modifications. This will tell Hasura two things:

- This is a function, not a procedure (like our `hello()` function).
- This should be made available to our GraphQL API as a query, not a mutation.

As we added this new function, we'll need to track it. In our `ts_logic.hml` file, we'll see that the `greeting()`
function has the same warning as our `hello()` function did earlier:

```yaml
- arguments:
        preference:
          type:
            name: String
            type: named
      name: greeting
      result_type:
        name: String
        type: named
```

We can use the quick fix like before to track it and generate a new build. Then, we can test it out in the Console:

```graphql
query sample_greeting {
  greeting(preference: "bro")
}
```

Let's change the name in our function to "Hasura":

```typescript
export function greeting(preference: string): string {
  const name = 'Hasura';

  switch (preference) {
    case 'formal':
      return `Good day to you, ${name}`;
    case 'informal':
      return `Hey, ${name}`;
    case 'bro':
      return `Sup, ${name} 🤙`;
    default:
      return `Hello, ${name}`;
  }
}
```

We can instantly head to the Console and test it out:

```graphql
query sample_greeting {
  greeting(preference: "bro")
}
```

This should now return, "Sup, Hasura 🤙" 🚀

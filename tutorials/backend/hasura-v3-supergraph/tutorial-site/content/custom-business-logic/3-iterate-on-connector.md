---
title: "Iterate on the Connector"
metaTitle: "Iterate on the Connector | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Use watch mode to test your supergraph in real time."
---

## Make changes to the connector {#make-changes}

At this point, our function doesn't do much. Since the CLI is using dev mode, we can make changes to our connector and
see them reflected in near-real time.

We can keep our `hello()` function, but let's add a new one below it:

```typescript
/**
 * Returns a greeting for the user based on their preference.
 * @read-only
 */
export function greeting(preference: string): string {
  const name = "Placeholder";

  switch (preference) {
    case "formal":
      return `Good day to you, ${name}`;
    case "informal":
      return `Hey, ${name}`;
    case "bro":
      return `Sup, ${name} 🤙`;
    default:
      return `Hello, ${name}`;
  }
}
```

By adding JS Doc comments, we can provide some documentation for our function. We can also use the `@read-only` tag to
indicate that this function will only query data and not make any modifications.

After saving the file and letting the connector rebuild, we can test it out in the Console:

```graphql
query app_sample_greeting {
  greeting(preference: "bro")
}
```

Let's change the name in our function to "Hasura":

```typescript
export function greeting(preference: string): string {
  const name = "Hasura";

  switch (preference) {
    case "formal":
      return `Good day to you, ${name}`;
    case "informal":
      return `Hey, ${name}`;
    case "bro":
      return `Sup, ${name} 🤙`;
    default:
      return `Hello, ${name}`;
  }
}
```

We can instantly head to the Console and test it out:

```graphql
query app_sample_greeting {
  greeting(preference: "bro")
}
```

This should now return, "Sup, Hasura 🤙" 🚀

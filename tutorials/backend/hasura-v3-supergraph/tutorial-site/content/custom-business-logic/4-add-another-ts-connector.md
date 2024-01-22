---
title: 'Reuse the TS Connector'
metaTitle: 'Reuse the TS Connector | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Add the TypeScript Connector to a subgraph.'
---

The beauty of connectors is that they're reusable. We can generate a new connector and add it to another subgraph
without having to write any new code. Let's add the TypeScript Connector to the `fulfillment_services` subgraph.

## Add the TypeScript Connector to the Fulfillment Services subgraph {#add-fs-connector}

Start by killing watch mode by pressing `Ctrl+C` in the terminal where you ran `hasura3 watch`. Then, run the following
command to add the TypeScript Connector to the UX subgraph:

```bash
hasura3 metadata add-hub-connector fulfillment_logic --dir . --subgraph fulfillment_services --id hasura/ts-deno --url http://localhost:8200
```

Notice we're using the same `ts_logic` name as before. This is because we're adding the same connector to a different
subgraph. Additionally, as we'll already have the UX's subgraph's connector running on port `8100`, we'll need to use a
different port for the fulfillment services subgraph. We'll use port `8200`.

We'll also need to add the `--port` flag to the watch command in our `build-profile.yaml`:

```yaml
connectors:
  fulfillment_logic:
    watchCommand:
      deno run -A --watch --check https://deno.land/x/hasura_typescript_connector/mod.ts serve --configuration
      ./ts.connector.config.json --port 8200
```

## Add our new function to the Fulfillment Services subgraph {#add-fs-function}

Let's go ahead and remove the `hello()` function from the new `subgraphs/fulfillment_services/dataconnectors/ts_logic`
directory's `index.ts`. We'll replace it with a new function that the Fulfillment Services team can use to get the
average shipping time for a fulfillment service:

```typescript
/**
 * Returns the average shipping time for the fulfillment service.
 *
 * @returns The average shipping time in days.
 * @pure This function should only query data without making modifications
 */
export function averageShippingTime(): number {
  // Placeholder for the average shipping time
  const averageShippingTime = 5;

  return averageShippingTime;
}
```

We can then fire up watch mode again by running `hasura3 watch` in the root directory of our project. We'll need to
[track the function](#), and then we can test it out in the Console:

```graphql
query average_shipping_time {
  fulfillmentServicesAverageshippingtime
}
```

## Next steps {#next-steps}

Of course, our function isn't very useful with hardcoded information. However, we could query our database to get the
orders and then do some calculations to determine the average shipping time as a relationship between when the order was
placed and when it was fulfilled. And, all of this can be done in TypeScript and made available to our GraphQL API!

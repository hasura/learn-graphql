---
title: "Reuse the TS Connector"
metaTitle: "Reuse the TS Connector | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Add the TypeScript Connector to a subgraph."
---

The beauty of connectors is that they're reusable. We can generate a new connector and add it to another subgraph
without having to write any new code. Let's add the TypeScript Connector to the `fulfillment_services` subgraph.

## Add the TypeScript Connector to the Fulfillment Services subgraph {#add-fs-connector}

Start by killing watch mode by pressing `Ctrl+C` in the terminal where you ran `hasura3 watch`. Then, run the following
command to add the TypeScript Connector to the UX subgraph:

```bash
ddn add connector-manifest fulfillment_logic --subgraph fulfillment_services --hub-connector hasura/nodejs --type cloud
```

## Add our new function to the Fulfillment Services subgraph {#add-fs-function}

Let's go ahead and remove the `hello()` function from the new `fulfillment_services/ts_logic/connector` directory's
`functions.ts`. We'll replace it with a new function that the Fulfillment Services team can use to get the average
shipping time for a fulfillment service:

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

We can then fire up dev mode again by running `ddn dev` in the root directory of our project. After the connector
builds, we can test it out in the Console:

```graphql
query fulfillment_services_average_shipping_time {
  fulfillmentServicesAverageshippingtime
}
```

## Next steps {#next-steps}

Of course, our function isn't very useful with hardcoded information. However, we could query our database to get the
orders and then do some calculations to determine the average shipping time as a relationship between when the order was
placed and when it was fulfilled. And, all of this can be done in TypeScript and made available to our GraphQL API!

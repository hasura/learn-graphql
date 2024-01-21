---
title: "Implementation"
metaTitle: 'Implementation | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Right now, we only need to implement five required functions:
- `validate_raw_configuration` - which validates the configuration provided by the user.
- `try_init_state` - which initializes our database connection.
- `get_capabilities` - which returns the capabilities of our connector as per the spec.
- `get_schema` - which returns a spec-compatible schema containing our tables and columns.
- `query` - which actually responds to query requests.

We'll skip configuration validation entirely for now, so in the `validate_raw_configuration` function which you 
pasted in the previous step, we'll just return the configuration. Edit it as follows:

[//]: # (TODO: Need to understand what this is)

```typescript
async function validate_raw_configuration(configuration: RawConfiguration): Promise<RawConfiguration> {
  return configuration;
}
```

To initialize our state, which in our case contains a connection to the database, we'll use the `open` function to 
open a connection to it, and store the resulting connection object in our state by returning it:

```typescript
async function try_init_state(configuration: RawConfiguration, metrics: unknown): Promise<State> {
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  return { db };
}
```

[//]: # (TODO: Link to the relevant part of the spec)
Our capabilities response will be very simple, because we won't support many capabilities yet. We just return the 
version range of the specification that we are compatible with, and the basic `query` capability.

```typescript
function get_capabilities(configuration: RawConfiguration): CapabilitiesResponse {
  return {
    versions: "^0.1.0",
    capabilities: {
      query: {}
    }
  }
}
```
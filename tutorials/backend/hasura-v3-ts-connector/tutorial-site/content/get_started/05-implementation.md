---
title: "Implementation"
metaTitle: 'Implementation | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Right now, we only need to implement five required functions:
- `parseConfiguration`: which reads the configuration from files on disk.
- `tryInitState`: which initializes our database connection.
- `getCapabilities`: which returns the NDC capabilities of our connector.
- `getSchema`: which returns an NDC schema containing our tables and columns.
- `query`: which actually responds to query requests.

We'll skip configuration validation entirely for now, and just read the raw configuration from a `configuration.json` 
file in the configuration directory:

```typescript
async function parseConfiguration(configurationDir: string): Promise<Configuration> {
  const configuration_file = resolve(configurationDir, 'configuration.json');
  const configuration_data = await readFile(configuration_file);
  const configuration = JSON.parse(configuration_data.toString());
  return {
    filename: resolve(configurationDir, 'database.db'),
    ...configuration
  };
}
```

To initialize our state, which in our case contains a connection to the database, we'll use the `open` function to 
open a connection to it, and store the resulting connection object in our state by returning it:

```typescript
async function tryInitState(
  configuration: Configuration,
  registry: Registry
): Promise<State> {
  const db = await open({
    filename: configuration.filename,
    driver: sqlite3.Database
  });

  return { db };
}
```

[//]: # (TODO: Link to the relevant part of the spec)
Our capabilities response will be very simple, because we won't support many capabilities yet. We just return the 
version range of the specification that we are compatible with, and the basic `query` and `mutation` capabilities.

```typescript
function getCapabilities(configuration: Configuration): CapabilitiesResponse {
  return {
    version: "0.1.2",
    capabilities: {
      query: {},
      mutation: {}
    }
  }
}
```
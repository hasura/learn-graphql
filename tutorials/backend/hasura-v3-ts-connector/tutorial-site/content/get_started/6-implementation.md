---
title: "Implementation"
metaTitle: 'Implementation | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Right now, we only need to implement five required functions:
- `validate_raw_configuration`, which validates the configuration from the user
- `try_init_state`, which initializes our database connection
- `get_capabilities`, which returns the NDC capabilities of our connector
- `get_schema`, which returns an NDC schema containing our tables and columns
- `query`, which actually responds to query requests

We'll skip configuration validation entirely for now, so in the `validate_raw_configuration` function which you 
pasted in the previous step, we'll just return the configuration. Edit it as follows:

```typescript
async function validate_raw_configuration(configuration: RawConfiguration): Promise<RawConfiguration> {
  return configuration;
}
```

To initialize our state, we'll use the `open` function to open a connection to the database, and store the resulting
connection object in our connector state:

```typescript
async function try_init_state(configuration: RawConfiguration, metrics: unknown): Promise<State> {
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  return { db };
}
```

Our capabilities response will be very simple, because we won't support many capabilities yet.

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

We just return the version range of the specification that we are compatible with, and the basic `query` capability.

`get_schema` is the first interesting function. We're going to define scalar types, and an object type and a collection
for each table in the configuration. Let's first define the scalar types. In fact, we're only going to define one,
called `any`:

```typescript
async function get_schema(configuration: RawConfiguration): Promise<SchemaResponse> {
  let scalar_types: { [k: string]: ScalarType } = {
    'any': {
      aggregate_functions: {},
      comparison_operators: {},
      update_operators: {},
    }
  };
}
```

`any` is a generic scalar type that we'll use as the type of all of our columns. It doesn't have any comparison
operators or aggregates defined. Later, when we talk about those features, we'll need to split this type up into several
different scalar types.

Now let's define the object types.

```typescript {5}
async function get_schema(configuration: RawConfiguration): Promise<SchemaResponse> {
  let scalar_types: { [k: string]: ScalarType } = {
    'any': {
      aggregate_functions: {},
      comparison_operators: {},
      update_operators: {},
    }
  };

  let object_types: { [k: string]: ObjectType } = {};

  for (const table of configuration.tables) {
    let fields: { [k: string]: ObjectField } = {};

    for (const columnName in table.columns) {
      fields[columnName] = {
        type: {
          type: 'named',
          name: 'any'
        }
      };
    }

    object_types[table.tableName] = {
      fields
    };
  }
}
```

Here I create one `ObjectType` definition for each table in the configuration.

Notice that the name of the object type is the name of the table, and each column uses the `any` type that we just
defined.

## Collections

Now let's define the collections:

```typescript
async function get_schema(configuration: RawConfiguration): Promise<SchemaResponse> {
  let scalar_types: { [k: string]: ScalarType } = {
    'any': {
      aggregate_functions: {},
      comparison_operators: {},
      update_operators: {},
    }
  };

  let object_types: { [k: string]: ObjectType } = {};

  for (const table of configuration.tables) {
    let fields: { [k: string]: ObjectField } = {};

    for (const columnName in table.columns) {
      fields[columnName] = {
        type: {
          type: 'named',
          name: 'any'
        }
      };
    }

    object_types[table.tableName] = {
      fields
    };
  }

  let collections: CollectionInfo[] = configuration.tables.map((table) => {
    return {
      arguments: {},
      name: table.tableName,
      deletable: false,
      foreign_keys: {},
      uniqueness_constraints: {},
      type: table.tableName,
    };
  });
}
```

Again, we define one collection per table in the configuration, and we use the object type with the same name that we
just defined.

Now we can put the schema response together:

```typescript
async function get_schema(configuration: RawConfiguration): Promise<SchemaResponse> {
  let scalar_types: { [k: string]: ScalarType } = {
    'any': {
      aggregate_functions: {},
      comparison_operators: {},
      update_operators: {},
    }
  };

  let object_types: { [k: string]: ObjectType } = {};

  for (const table of configuration.tables) {
    let fields: { [k: string]: ObjectField } = {};

    for (const columnName in table.columns) {
      fields[columnName] = {
        type: {
          type: 'named',
          name: 'any'
        }
      };
    }

    object_types[table.tableName] = {
      fields
    };
  }

  let collections: CollectionInfo[] = configuration.tables.map((table) => {
    return {
      arguments: {},
      name: table.tableName,
      deletable: false,
      foreign_keys: {},
      uniqueness_constraints: {},
      type: table.tableName,
    };
  });

  return {
    functions: [],
    procedures: [],
    collections,
    object_types,
    scalar_types,
  };
}
```

Notice that we don't define `functions` or `procedures`, but we'll cover those features later in the series.
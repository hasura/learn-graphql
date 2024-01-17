---
title: "Setup"
metaTitle: 'Setup | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector for Hasura DDN'
---

[![Setup the connector video](https://img.youtube.com/vi/9V8IwOaozqE/0.jpg)](https://www.youtube.com/watch?v=9V8IwOaozqE)

## Clone the finished repo

You can use this course by following the videos and instructions, and you can also clone the finished repo to see 
it in action straight away too. To set up a skeleton project and follow on your own, clone the repo and checkout the 
`follow-along` branch:

```shell
git clone TODO TODO
```

```shell
npm install
```

## Setup

Let's set up the scaffolding for our connector, and we'll see the first queries start to work. We'll also start to 
develop a test suite, and see our connector running in Hasura.

For now, we'll just handle the most basic queries, but later, we'll start to fill in some of the gaps in our 
implementation, and see more queries return results correctly. We'll also cover topics such as metrics, connector
configuration, error reporting, and tracing.

The data source we'll be targeting is a SQLite database running on my local machine, and we'll be using the Hasura
TypeScript connector SDK.

Here I have an empty TypeScript project, and I've added the SDK as a dependency along with the SQLite library and its
TypeScript bindings.

Let's start by following the [SDK guidelines](https://github.com/hasura/ndc-sdk-typescript) and using the `start` function.

In your `src/index.ts` file, add the following:

```typescript
const connector: Connector<RawConfiguration, Configuration, State> = {};

start(connector);
```

We need to fill in implementations for each of the required functions, but we won't need all of these to work just yet.

First, you'll see that we define three types: `RawConfiguration`, `Configuration`, and `State`.

Let's define those now above the `connector` and `start` function:

```typescript
type RawConfiguration = {
  tables: TableConfiguration[];
};

type TableConfiguration = {
  tableName: string;
  columns: { [k: string]: Column };
};

type Column = {};

type Configuration = RawConfiguration;

type State = {
  db: Database;
};
```

`RawConfiguration` is the type of configuration that the user will see. By convention, this configuration should be
enough to reproducibly determine the NDC schema, so for our SQLite connector, we configure the connector with a list of
tables that we want to expose. Each table is defined by its name and a list of columns. Columns don't have any specific
configuration yet, but we leave an empty object type here because we might want to capture things like column types
later on.

The `Configuration` type is a validated version of the raw configuration, but for our purposes, we'll reuse the same
type.

The `State` type is for things like connection pools, handles, or any non-serializable state that gets allocated on
startup, and which lives for the lifetime of the connector. For our connector, we need to keep a handle to our SQLite
database.

Now let's fill in some function definitions.

```typescript
function get_raw_configuration_schema(): JSONSchemaObject {
  throw new Error("Function not implemented.");
}

function get_configuration_schema(): JSONSchemaObject {
  throw new Error("Function not implemented.");
}

function make_empty_configuration(): RawConfiguration {
  throw new Error("Function not implemented.");
}

async function update_configuration(configuration: RawConfiguration): Promise<RawConfiguration> {
  throw new Error("Function not implemented.");
}

async function fetch_metrics(configuration: RawConfiguration, state: State): Promise<undefined> {
  throw new Error("Function not implemented.");
}

async function health_check(configuration: RawConfiguration, state: State): Promise<undefined> {
  throw new Error("Function not implemented.");
}

async function explain(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<ExplainResponse> {
  throw new Error("Function not implemented.");
}

async function mutation(configuration: RawConfiguration, state: State, request: MutationRequest): Promise<MutationResponse> {
  throw new Error("Function not implemented.");
}

// Implementat these 5 functions below for this course

async function validate_raw_configuration(configuration: RawConfiguration): Promise<RawConfiguration> {
  throw new Error("Function not implemented.");
}

async function try_init_state(configuration: RawConfiguration, metrics: unknown): Promise<State> {
  throw new Error("Function not implemented.");
}

function get_capabilities(configuration: RawConfiguration): CapabilitiesResponse {\
  throw new Error("Function not implemented.");
}

async function get_schema(configuration: RawConfiguration): Promise<SchemaResponse> {
  throw new Error("Function not implemented.");
}

async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  throw new Error("Function not implemented.");
}

const connector: Connector<RawConfiguration, Configuration, State> = {
  get_raw_configuration_schema,
  get_configuration_schema,
  make_empty_configuration,
  update_configuration,
  validate_raw_configuration,
  try_init_state,
  fetch_metrics,
  health_check,
  get_capabilities,
  get_schema,
  explain,
  mutation,
  query
};
```
Right now, we only need to implement five functions: 
- `validate_raw_configuration`, which validates the configuration from the user
- `try_init_state`, which initializes our database connection
- `get_capabilities`, which returns the NDC capabilities of our connector
- `get_schema`, which returns an NDC schema containing our tables and columns
- `query`, which actually responds to query requests

We'll skip configuration validation entirely for now, and just return the raw configuration.

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

You will need to add these imports:

```typescript
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
```

Our capabilities response will be very simple, because we won't support many capabilities yet.

```typescript
function get_capabilities(configuration: RawConfiguration): CapabilitiesResponse {\
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
}
```

```typescript
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
```

Here I create one `ObjectType` definition for each table in the configuration. 

Notice that the name of the object type is the name of the table, and each column uses the `any` type that we just
defined.

Now let's define the collections:

```typescript
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
```

Again, we define one collection per table in the configuration, and we use the object type with the same name that we
just defined.

Now we can put the schema response together:

```typescript
return {
    functions: [],
    procedures: [],
    collections,
    object_types,
    scalar_types,
};
```

Notice that we don't define `functions` or `procedures`, but we'll cover those features later in the series.

So we have one more function to define, which is the query function, but before we do, let's talk about tests. The NDC
specification repository provides a test runner executable called `ndc-test`, which can be used to implement a test
suite for a connector. We can also use ndc-test to run some automatic tests and validate the work we've done so far.
Let's compile and run our connector, and then use the test runner with the running connector.

Here I have a configuration.json file which I can use to run the connector against my sample database.

First let's run the connector.

```sh
npm run build && node dist/index.js serve --configuration configuration.json
```

Now, let's run the tests. Of course, we expected it to fail, but we can already see that our schema response is good.

Let's modify our query function to print out the request it receives, and this will give us a goal to work towards.

```typescript
console.log(JSON.stringify(request, null, 2));
```

In the logs, we can see the request that was sent. It identifies the name of the collection, and a query object to run.
The query has a list of fields to retrieve, and a limit of 10 rows. With this as a guide, we can start to implement our
query function.

The query function is going to delegate to a function called `fetch_rows`, but only when rows are requested, which is
indicated by the presence of the query fields property.

```typescript
const rows = request.query.fields && await fetch_rows(state, request);

return [{ rows }];
```

Later, we'll also implement aggregates here.

Let's fill in the `fetch_rows` function:

```typescript
async function fetch_rows(state: State, request: QueryRequest): Promise<{
  [k: string]: RowFieldValue
}[]> {
  const fields = [];

  for (const fieldName in request.query.fields) {
    if (Object.prototype.hasOwnProperty.call(request.query.fields, fieldName)) {
      const field = request.query.fields[fieldName];
      switch (field.type) {
        case 'column':
          fields.push(`${field.column} AS ${fieldName}`);
          break;
        case 'relationship':
          throw new Error("Relationships are not supported");
      }

    }
  }

  if (request.query.order_by != null) {
    throw new NotSupported("Sorting is not supported");
  }

  const limit_clause = request.query.limit == null ? "" : `LIMIT ${request.query.limit}`;
  const offset_clause = request.query.offset == null ? "" : `OFFSET ${request.query.offset}`;

  const sql = `SELECT ${fields.join(", ")} FROM ${request.collection} ${limit_clause} ${offset_clause}`;

  console.log(JSON.stringify({ sql }, null, 2));

  return state.db.all(sql);
}
```
This function breaks down the request that we saw earlier and produces some SQL with this basic shape here. The
requested fields get pushed down in the target list here, and the limit and offset clauses are generated based on the
request as well. Notice that we don't fetch more data than we need, either in terms of rows or columns. That's the
benefit of connectors - we get to push down the query execution to the data sources themselves.

Now let's see it work in the test runner. We'll rebuild and restart the connector, and run the tests again.

Of course we still see our tests fail, but now we've made some progress because the most basic tests are passing. If we
look at the connector logs, we can see that we're now receiving some more advanced queries which we're not handling yet,
such as queries with predicates and orderings.

In fact, we can get the test runner to write these expectations out as snapshot files to disk by adding the
`--snapshots-dir` argument.

```sh
ndc-test test --endpoint http://0.0.0.0:8100 --snapshots-dir snapshots
```
Here we can build up a library of query requests and expected responses that can be replayed in order to make sure that
our connector continues to exhibit the same behavior over time.

Finally, let's see what this connector looks like when we add it to our Hasura graph. I have some Hasura metadata ready
here, but I won't go into the setup now - I'll save that explanation for a later video.

For now, we can run a command to deploy this metadata to Hasura cloud, and see our connector in action. I can use the
`build create` command to create a new build from my metadata:

```sh
hasura3 cloud build create -p deployment/hasura.yaml
```

As you can see, I get a GraphQL endpoint and a console URL that I can use to test it. Let's take a look.

Let's make a request for albums, and specify a limit of 5 rows. In my metadata configuration, I've set up Hasura Cloud
to tunnel requests for this connector to my local machine, so as we can see, our connector has received the request and
generated the appropriate SQL.

So that's it for this video. In the next one, we'll start to fill out some of the missing query functionality, beginning
with where clauses.

Thanks for watching!






```shell
npm i
npm run build # this just runs tsc
```

Run the connector:

```shell
node dist/index.js serve --configuration configuration.json
```

To start from scratch and create the initial project:

---
title: "Configuration and State"
metaTitle: 'Configuration and State | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

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

## State

The `State` type is for things like connection pools, handles, or any non-serializable state that gets allocated on
startup, and which lives for the lifetime of the connector. For our connector, we need to keep a handle to our SQLite
database.
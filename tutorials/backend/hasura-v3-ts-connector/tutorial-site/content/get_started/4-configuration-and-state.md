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
enough to reproducibly determine the connector's schema, so for our SQLite connector, we configure the connector 
with an array of tables that we want to expose. Each of these table types in `TableConfiguration` is defined by its 
name and a list of columns. 

`Column`s don't have any specific configuration yet, but we leave an empty object type here because we might want to 
capture things like column types later on.

The `Configuration` type is supposed to be a validated version of the raw configuration, but for our purposes, we'll 
reuse the same type.

[//]: # (TODO: What does it mean to validate the configuration? What does it mean to have a validated configuration?)

## State

The `State` type is for things like connection pools, handles, or any non-serializable state that gets allocated on
startup, and which lives for the lifetime of the connector. For our connector, we need to keep a handle to our SQLite
database.

Cool, so now that we've got our types defined, we can fill in the function definitions which the connector requires 
in order to interact with our SQLite database and Hasura DDN. Let's do that in the next step.
---
title: "The Get Schema Function"
metaTitle: 'The Get Schema Function | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

`get_schema` is the first interesting function. It needs to return a spec-compatible schema containing our tables and 
columns.

In it, we're going to define scalar types, and an object type and a collection for each table in the configuration. 
For this course, we're going to ignore the `functions` and `procedures` fields, but we'll cover those in a later 
courses.

It takes the RawConfiguration as an argument, and returns an abject in the format of the `SchemaResponse`
shape eg:

```typescript
export interface SchemaResponse {
  /**
   * Collections which are available for queries and/or mutations
   */
  collections: CollectionInfo[];
  /**
   * Functions (i.e. collections which return a single column and row)
   */
  functions: FunctionInfo[];
  /**
   * A list of object types which can be used as the types of arguments, or return types of procedures. Names should not overlap with scalar type names.
   */
  object_types: {
    [k: string]: ObjectType;
  };
  /**
   * Procedures which are available for execution as part of mutations
   */
  procedures: ProcedureInfo[];
  /**
   * A list of scalar types which will be used as the types of collection columns
   */
  scalar_types: {
    [k: string]: ScalarType;
  };
}
```

Let's first define the scalar types. In fact, we're only going to define one, called `any` as  a string literal:

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
[//]: # (TODO: This is confusing name because of the any type in typescript)
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

Here we create one `ObjectType` definition for each table in the configuration.

Notice that the name of the object type will be the name of the table, and each column uses the `any` type that we just
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

As mentioned before, we aren't defining `functions` or `procedures`, but we'll cover those features later in the 
series.

Now we almost have a working connector apart from actually querying the database. Let's set up some testing so we 
know what we're working to and when we're done.
---
title: "Function Definitions"
metaTitle: 'Function Definitions | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Now let's fill in some function definitions, these are the functions required to provide to the connector to satisfy 
the Hasura connector specification, and we'll be implementing them as we go through the course.

Copy and paste the following required functions into the `src/index.ts` file. Note that the amended `connector` is 
also included at the bottom, overwriting the previous connector definition with this which takes these functions as 
arguments.

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

// Implement these 5 functions below for this course

async function validate_raw_configuration(configuration: RawConfiguration): Promise<RawConfiguration> {
  throw new Error("Function not implemented.");
}

async function try_init_state(configuration: RawConfiguration, metrics: unknown): Promise<State> {
  throw new Error("Function not implemented.");
}

function get_capabilities(configuration: RawConfiguration): CapabilitiesResponse {
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

Ok, moving on swiftly, for this course we will only need to implement the last 5 functions of 
`validate_raw_configuration`, `try_init_state`, `get_capabilities`, `get_schema`, and `query`, in order to get a 
basic working connector. Let's do that now.

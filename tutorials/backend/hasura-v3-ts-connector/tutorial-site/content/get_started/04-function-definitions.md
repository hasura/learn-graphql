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
async function parseConfiguration(configurationDir: string): Promise<Configuration> {
  throw new Error("Function not implemented.");
}

async function tryInitState(configuration: RawConfiguration, metrics: unknown): Promise<State> {
  throw new Error("Function not implemented.");
}

async function fetchMetrics(configuration: RawConfiguration, state: State): Promise<undefined> {
  throw new Error("Function not implemented.");
}

async function healthCheck(configuration: RawConfiguration, state: State): Promise<undefined> {
  throw new Error("Function not implemented.");
}

function getCapabilities(configuration: RawConfiguration): CapabilitiesResponse {
  throw new Error("Function not implemented.");
}

async function getSchema(configuration: RawConfiguration): Promise<SchemaResponse> {
  throw new Error("Function not implemented.");
}

async function queryExplain(configuration: RawConfiguration, state: State, request: QueryRequest): 
  Promise<ExplainResponse> {
  throw new Error("Function not implemented.");
}

async function mutationExplain(configuration: Configuration, state: State, request: MutationRequest): Promise<ExplainResponse> {
  throw new Error("Function not implemented.");
}

async function mutation(configuration: RawConfiguration, state: State, request: MutationRequest): Promise<MutationResponse> {
  throw new Error("Function not implemented.");
}

async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  throw new Error("Function not implemented.");
}

const connector: Connector<Configuration, State> = {
  parseConfiguration,
  tryInitState,
  fetchMetrics,
  healthCheck,
  getCapabilities,
  getSchema,
  queryExplain,
  mutationExplain,
  mutation,
  query
};
```

Ok, moving on swiftly, for this course we will only need to implement the last five functions: 
- `parseConfiguration`: which reads the configuration from files on disk.
- `tryInitState`: which initializes our database connection. 
- `getCapabilities`: which returns the NDC capabilities of our connector.
- `getSchema`: which returns an NDC schema containing our tables and columns.
- `query`: which actually responds to query requests.

Let's do that now.
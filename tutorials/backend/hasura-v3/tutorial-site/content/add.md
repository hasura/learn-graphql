---
title: "Add another subgraph"
metaTitle: "Add additional subgraphs with Hasura | Hasura v3 Tutorial"
metaDescription: "Here, we'll cover how to add additional subgraphs and connect them in Hasura v3."
---

Our supergraph wouldn't be much of a supergraph with only a single subgraph. As we said in the overview, it's
convenient, but not required, to organize subgraph metadata files around data domains / data sources.

Ideally, for organizations, the team responsible for a set of data sources **owns** a specific subgraph and is
responsible for authoring and maintaining it.

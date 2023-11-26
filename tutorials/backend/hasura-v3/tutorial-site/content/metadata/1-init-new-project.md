---
title: 'Create a new project'
metaTitle: 'Create a new project | Hasura v3 Tutorial'
metaDescription: "Let's create a new project by defining our metadata."
---

All projects are hosted on the Hasura Data Delivery Network (DDN). You can create your project using the Hasura CLI and
then manage it using the Hasura Console. While projects can also be created via the Console, we recommend using the CLI
to create your project so that you can easily version control your metadata.

## Authenticate your CLI

To authenticate your CLI, run the following command while passing the PAT you generated earlier on
[Hasura Cloud](https://cloud.arusah.com/account-settings/access-tokens):

```bash
hasura3 login --pat <YOUR_PAT>
```

## Create a new project {#create-a-new-project}

We can create a local project and the companion project on Hasura DDN using the following command:

```bash
hasura3 init --dir <PROJECT_DIRECTORY>
```

The CLI will prompt you with the following:

```plaintext
Use the arrow keys to navigate: ↓ ↑ → ←
Please choose how you would like to initialise Hasura DDN?
  Create a new project        |        (Start building on a new DDN project)
  From an existing project
  Empty project
```

Choose `Create a new project` and the CLI will respond with the following:

```bash
Creating a new project
Creating hasura.yaml ...
Creating build-profile ...
Creating metadata.hml ...
Project <PROJECT_NAME> is created at <DIR>
```

This will generate the following directory structure:

```bash
├── build-profile.yaml
├── hasura.yaml
├── subgraphs
│   └── default
│       ├── commands
│       ├── dataconnectors
│       └── models
└── supergraph
    ├── auth-config.hml
    └── compatibility-config.hml
```

You can read more about the directory structure in [the docs](https://hasura.io/docs/3.0/ci-cd/configuration); but, to
give an overview, the `hasura.yaml` file contains the metadata for your project, the `build-profile.yaml` file contains
the build configuration for your project, and the `supergraph` and `subgraphs` directories contain the project-wide and
subgraph-specific metadata, respectively.

In the next step, we'll add a data source to the `dataconnectors` directory in the `default` subgraph. Then, we'll add
each of our tables to the `models` directory in the `default` subgraph.

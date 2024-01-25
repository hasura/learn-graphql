---
title: 'Create a Production Build'
metaTitle: 'Create a Production Build | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Test a build of your supergraph using one of your build profiles.'
---

Imagine we're satisfied with our changes and want to deploy them to production. We can do this by manually creating a
build on our `default` environment.

## Create a production build {#create-production-build}

Using the CLI, we can create a new build on our `default` environment:

```bash
hasura3 build create --environment default
```

This will use our local metadata to create a build on the `default` environment. The CLI will output the results of the
build, including a Console URL where we can view the API.

## Apply the build {#apply-build}

If we're satisfied with the build, we can **apply** it using the CLI and the build version, which was returned in the
previous step:

```bash
hasura3 build apply --version <build-version>
```

Builds are associated with a specific environment, so we don't need to specify the environment here.

## Automating builds with CI/CD {#automating-builds}

CI/CD pipelines can be used to automate the process of creating and applying builds. As the Hasura CLI is a standalone
tool, it can be used in any CI/CD pipeline.

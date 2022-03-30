---
title: "Connect to the SpaceX GraphQL API"
metaTitle: "Connect to the SpaceX GraphQL API | Remix Fullstack GraphQL Tutorial"
metaDescription: "Using Hasura's remote schema feature we connect to the SpaceX GraphQL API"
---

1. In the Hasura Console click the Remote Schema tab and click `Add`

1. The name can be anything you'd like, such as `SpaceXGraphql`, while the URL is `https://api.spacex.land/graphql/`

1. One type from the SpaceX schema conflicts with the schema Hasura generates so we need to fix that

   1. Navigate to the modify tab and at the bottom click `Modify`

   1. Under `GraphQL Customizations` click Add and under `Rename Type Names` select `String_comparison_exp`, rename it something else like `String_comparison_exp_spacex`

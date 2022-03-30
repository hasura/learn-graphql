---
title: "Create the Launch Details Page GraphQL queries"
metaTitle: "Create the Launch Details Page GraphQL queries | Remix Fullstack GraphQL Tutorial"
metaDescription: "We'll start the launch details page with writing the GraphQL queries"
---

import GithubLink from "../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/graphql/launch.graphql" text="launch.graphql" />

To start with we'll create `./app/graphql/launch.graphql`

```graphql
fragment LaunchDetails on Launch {
  id
  mission_name
  details
  links {
    flickr_images
    mission_patch
  }
}

fragment CargoWeightCapacity on Launch {
  rocket {
    rocket {
      payload_weights {
        id
        lb
      }
    }
  }
}

fragment CurrentCargoWeight on cargo_aggregate {
  aggregate {
    sum {
      weight
    }
  }
}

# Launch details when not logged in
query AnonymousLaunchDetails($id: ID!) {
  launch(id: $id) {
    ...LaunchDetails
  }
}

# When logged in get both launch and cargo details
query UserLaunchDetails($id: ID!, $launchId: String!) {
  launch(id: $id) {
    ...LaunchDetails
    ...CargoWeightCapacity
  }
  # Notice we don't have to pass in userId, the permissions take care of it
  cargo(where: { launchId: { _eq: $launchId } }) {
    id
    weight
    name
  }
  cargo_aggregate(where: { launchId: { _eq: $launchId } }) {
    ...CurrentCargoWeight
  }
}

# When we are about to add new cargo, we get info on the current cargo
query CurrentCargoInfo($id: ID!, $launchId: String!) {
  launch(id: $id) {
    ...CargoWeightCapacity
  }
  cargo_aggregate(where: { launchId: { _eq: $launchId } }) {
    ...CurrentCargoWeight
  }
}

mutation AddCargo($cargo: cargo_insert_input!) {
  insert_cargo_one(object: $cargo) {
    id
  }
}
```

Run `npm run codegen`

We use [Graphql fragments](https://graphql.org/learn/queries/#fragments) and have different queries based on login status. We also have a single mutation to add cargo.

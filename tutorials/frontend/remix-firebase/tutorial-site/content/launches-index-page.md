---
title: "Create the Launches Index Page"
metaTitle: "Create the Launches Index Page | Remix Fullstack GraphQL Tutorial"
metaDescription: "Using our foundation we've setup, we now display launches to book cargo on"
---

import GithubLink from "../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/graphql/index.graphql" text="index.graphql" />

1. Create `./app/graphql/index.graphql`

   ```graphql
   query pastLaunchesList($limit: Int! = 10) {
     launchesPast(limit: $limit, sort: "launch_date_utc", order: "DESC") {
       id
       mission_name
       links {
         flickr_images
         mission_patch
       }
       rocket {
         rocket_name
       }
     }
   }
   ```

2. Run `npm run codegen`

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/utils/api.server.ts" text="api.server.ts" />

3. Create our API wrapper in `./app/utils/api.server.ts`

   ```typescript
   import { getSdk } from "~/graphql/generated";
   import { GraphQLClient } from "graphql-request";

   const sdk = getSdk(new GraphQLClient(process.env.GRAPHQL_ENDPOINT!));

   export { sdk };
   ```

4. Create our CSS in `./app/styles/homepage.css`

   <GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/styles/homepage.css" text="homepage.css" />

   ```css
   .container {
     padding-top: 20px;
     display: grid;
     grid-gap: 30px;
     grid-template-columns: repeat(auto-fill, 350px);
     justify-content: center;
   }

   /* Card CSS from w3 schools https://www.w3schools.com/howto/howto_css_cards.asp */
   .card {
     /* Add shadows to create the "card" effect */
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
     transition: 0.3s;
     border-radius: 5px; /* 5px rounded corners */
   }

   /* On mouse-over, add a deeper shadow */
   .card:hover {
     box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
   }

   /* Add some padding inside the card container */
   .card-container {
     padding: 2px 16px;
   }

   /* Add rounded corners to the top left and the top right corner of the image */
   img {
     border-radius: 5px 5px 0 0;
   }
   ```

5. Now, we put everything together and create our index page component that displays all the launches we can book cargo on. Update `./app/routes/index.tsx`

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/routes/index.tsx" text="index.tsx" />

```typescript
import {
  HeadersFunction,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { sdk } from "~/utils/api.server";
import { PastLaunchesListQuery } from "~/graphql/generated";
import { getSessionData } from "~/utils/auth.server";
import styles from "~/styles/homepage.css";

interface LoaderData {
  launches: PastLaunchesListQuery;
  isLoggedIn: boolean;
}

// Set page title
export const meta: MetaFunction = () => {
  return { title: "Remix Hasura Spacex" };
};

// Add CSS
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Load JS if we are logged in
export let handle = {
  hydrate: ({ isLoggedIn }: LoaderData) => isLoggedIn,
};

// Cache the whole HTML page
// max-age is low so when we login the login button doesn't still appear
export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=5, s-maxage=345600",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { idToken } = await getSessionData(request);

  const launches = await sdk.pastLaunchesList({ limit: 10 });
  return json<LoaderData>(
    {
      launches,
      isLoggedIn: !!idToken,
    },
    // If JS is loaded, the JSON we fetch on navigation is cached
    {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800" },
    }
  );
};

export default function Index() {
  const { launches } = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <section className="container">
        {launches.launchesPast?.map((launch, index) => {
          return (
            <Link
              to={`launch/${launch?.id}`}
              key={launch?.id}
              // Prefetch pages on mouseover
              // https://remix.run/docs/en/v1/api/remix#link
              prefetch="intent"
            >
              <div className="card">
                <img
                  src={
                    launch?.links?.flickr_images?.[0] ??
                    launch?.links?.mission_patch!
                  }
                  alt={`${launch?.mission_name!}`}
                  style={{ width: "100%", height: "400px" }}
                  // We don't want to lazy load above the fold images
                  // You can make this more advanced
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="card-container">
                  <h4>
                    <b>{launch?.mission_name!}</b>
                  </h4>
                  <p>{launch?.rocket?.rocket_name!}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
```

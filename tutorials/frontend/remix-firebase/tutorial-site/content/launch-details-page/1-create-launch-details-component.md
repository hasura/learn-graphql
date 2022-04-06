---
title: "Create the Launch Details Component"
metaTitle: "Create the Launch Details Component | Remix Fullstack GraphQL Tutorial"
metaDescription: "With our GraphQL setup, now we build the Remix component"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/styles/launch.css" text="launch.css" />

Create `./app/styles/launch.css`

```css
.photo-grid {
  padding-top: 30px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
}
```

Following [Remix's file based routing](https://remix.run/docs/en/v1/guides/routing) we create `./app/routes/launch/$launchId.tsx`

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/routes/launch/$launchId.tsx" text="$launchId.tsx" />

Let's build this component piece by piece.

First, we add our imports, custom typescript interfaces, and helper function for calculating cargo weights

```typescript
import { useRef } from "react";
import {
  ActionFunction,
  Form,
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { AuthenticityTokenInput, badRequest, notFound } from "remix-utils";
import {
  CargoWeightCapacityFragment,
  CurrentCargoWeightFragment,
  LaunchDetailsFragment,
  UserLaunchDetailsQuery,
} from "~/graphql/generated";
import { sdk } from "~/utils/api.server";
import { getSessionData } from "~/utils/auth.server";
import { admin } from "~/utils/firebase.server";
import { useUpdateEffect } from "react-use";
import { z } from "zod";
import styles from "~/styles/launch.css";

interface AnonymousLoaderData {
  launch: NonNullable<LaunchDetailsFragment>;
}

interface UserLoaderData extends AnonymousLoaderData {
  launch: NonNullable<LaunchDetailsFragment> & CargoWeightCapacityFragment;
  cargo: UserLaunchDetailsQuery["cargo"];
  maxWeight: number;
  remainingWeight: number;
}

type LoaderData = AnonymousLoaderData | UserLoaderData;

// Helper function for extracting weight info from the GraphQL queries
const calculateWeight = (
  launch: CargoWeightCapacityFragment,
  cargo_aggregate: CurrentCargoWeightFragment
): {
  remainingWeight: number;
  maxWeight: number;
} => {
  // Get how much weight the rocket can take to Mars
  const maxWeight =
    launch!.rocket?.rocket?.payload_weights?.find(
      (payload) => payload!.id === "mars"
    )?.lb! || 0;
  const remainingWeight =
    maxWeight - (cargo_aggregate!.aggregate!.sum?.weight || 0);
  return {
    maxWeight,
    remainingWeight,
  };
};
```

Now various Remix functions doing things like setting cache headers and adding CSS

```typescript
// Set title based on data
export const meta: MetaFunction = ({ data }) => {
  return { title: `${(data as LoaderData).launch.mission_name} details` };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// If we are logged in, load JavaScript
export let handle = {
  hydrate(loader: LoaderData) {
    return "cargo" in loader ? true : false;
  },
};

// If we aren't logged in, reuse cache from loader
// Otherwise no-cache because we want fresh data
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") || "no-cache",
  };
};
```

Now we set up our Remix action that receives a cargo, checks how much weight is left on the rocket, and then validates the cargo. In a real app, you would use a database transaction to ensure the current cargo doesn't change while you do this.

```typescript
// Add cargo to rocket
export const action: ActionFunction = async ({ request, params }) => {
  // Check CSRF token and get the users Firebase ID token
  const { idToken } = await getSessionData(request, true);

  const data = await request.formData();

  // Homework is to setup a optimistic UI delete action
  // https://www.youtube.com/watch?v=vTzNpiOk668
  // https://youtu.be/EdB_nj01C80
  if (data.get("_action") === "add") {
    // Because we are handling the insert permission instead of Hasura, we need to verify user
    const { sub: userId } = await admin.auth().verifySessionCookie(idToken!);

    // Get how much cargo is currently booked for the user
    const { cargo_aggregate, launch } = await sdk.CurrentCargoInfo(
      {
        id: params.launchId!,
        launchId: params.launchId!,
      },
      {
        Authorization: `Bearer ${idToken}`,
      }
    );

    // Calculate how much weight is left
    const { remainingWeight } = calculateWeight(launch!, cargo_aggregate);

    // We do data validation with zod
    // For more advanced use cases I recommend Remix Validated Form + Zod
    // https://www.remix-validated-form.io/
    const input = z
      .object({
        name: z.string().min(1).max(100),
        weight: z.number().int().positive().lte(remainingWeight),
      })
      .parse({
        name: data.get("name"),
        weight: parseInt(data.get("weight") as string),
      });

    return sdk.AddCargo(
      {
        cargo: {
          ...input,
          launchId: params.launchId!,
          userId,
        },
      },
      // Pass in the admin secret because we did the validation
      {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      }
    );
  }

  throw badRequest({ message: "No action" });
};
```

We fetch different data based on if the user is logged in or not

```typescript
export const loader: LoaderFunction = async ({ request, params }) => {
  const { idToken } = await getSessionData(request);

  if (!idToken) {
    const { launch } = await sdk.AnonymousLaunchDetails({
      id: params.launchId!,
    });
    if (!launch) {
      return notFound("Not Found");
    }
    return json<LoaderData>(
      { launch },
      {
        headers: {
          "Cache-Control": "public, max-age=5, s-maxage=345600",
        },
      }
    );
  }
  // If user logged in get launch + cargo details
  const { launch, cargo, cargo_aggregate } = await sdk.UserLaunchDetails(
    {
      id: params.launchId!,
      launchId: params.launchId!,
    },
    // Pass in the user JWT so Hasura permissions can work
    {
      Authorization: `Bearer ${idToken}`,
    }
  );
  if (!launch) {
    return notFound("Not Found");
  }

  return json<LoaderData>({
    launch,
    cargo,
    ...calculateWeight(launch, cargo_aggregate),
  });
};
```

Finally, we write the UI component

```typescript
export default function Launch() {
  const { launch, ...cargoDetails } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  // From Ryan Florence's excellent video on pending UI
  // This tells us if we are currently mutating
  // https://www.youtube.com/watch?v=y4VLIFjFq8k
  const isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "add";

  /**
   * From Ryan Florence's video https://www.youtube.com/watch?v=bMLej7bg5Zoz
   * useUpdateEffect doesn't run on first render
   */
  useUpdateEffect(() => {
    if (!isAdding) {
      // When done adding cargo, clear form and refocus on first input
      formRef.current?.reset();
      nameRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <>
      <section
        style={{
          textAlign: "center",
        }}
      >
        <h1>{launch.mission_name}</h1>
        <img
          src={launch.links?.mission_patch! ?? launch.links?.flickr_images?.[0]}
          alt={`${launch.mission_name} patch`}
          height="256"
          width="256"
        ></img>
        <p>{launch.details}</p>
      </section>
      <section className="photo-grid">
        {launch.links?.flickr_images?.map((imgUrl) => {
          return (
            <img
              src={imgUrl!}
              alt="Picture of launch"
              height="300"
              width="300"
              loading="lazy"
              key={imgUrl}
            ></img>
          );
        })}
      </section>
      {/* If user is logged in then display the cargo form */}
      {"cargo" in cargoDetails && (
        <section>
          <h3>
            Total Capacity for Mars: {cargoDetails.maxWeight}lb, Weight Left:{" "}
            {cargoDetails.remainingWeight}lb
          </h3>
          {/* replace on the form means nothing is added to the history stack */}
          <Form replace method="post" ref={formRef}>
            {/* Usually all forms should have a CSRF token */}
            <AuthenticityTokenInput />
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              ref={nameRef}
            ></input>

            <label htmlFor="name">Weight (lbs):</label>
            <input
              type="number"
              name="weight"
              id="weight"
              min="1"
              step="1"
              max={cargoDetails.remainingWeight}
              required
              ref={weightRef}
            ></input>
            <button
              disabled={isAdding || cargoDetails.remainingWeight <= 0}
              type="submit"
              name="_action"
              value="add"
            >
              {isAdding ? "Adding..." : "Add"}
            </button>
          </Form>
          <ul>
            {cargoDetails.cargo.map(({ id, name, weight }) => (
              <li key={id}>
                {name} - {weight}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
```

Congrats, your app should be completed and working!

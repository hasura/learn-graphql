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

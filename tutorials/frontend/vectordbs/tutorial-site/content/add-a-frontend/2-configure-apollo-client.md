---
title: "Configure Apollo Client"
metaTitle: "Add a frontend | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

While Next.js 13 supports React Server Components (RSC), we're going to use client-side rendering for this tutorial. As
our application doesn't have much that would need to be rendered on the server, we'll use Apollo Client to handle our
GraphQL requests.

## Create the Apollo Client

Inside `/app`, let's create a new folder called `utilities` and then create a new file called `ApolloWrapper.js` and add
the following:

```js
// inside /app/utilities/apollo-wrapper.js

"use client";

import { ApolloClient, ApolloLink, HttpLink, SuspenseCache } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "<YOUR-ADMIN-SECRET>",
    },
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
      {children}
    </ApolloNextAppProvider>
  );
}
```

**Note: for simplicity, we're adding the `x-hasura-admin-secret` header to our requests. In production, you should use a
more secure method of authentication.** Check out our course on authentication for more information...

## Wrap the layout with the ApolloWrapper

As with other implementations of Apollo Client, we'll simply wrap our application with the `ApolloWrapper` component. In
`/app/layout.tsx`, let's import our `ApolloWrapper` component and wrap our application with it. Our complete file should
look like this now:

```tsx
// inside /app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "./utilities/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "People Pleasers | The most pleasing HR service in the world",
  description: "Ask your AI assistant to find the perfect candidate and save you time and money",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
```

## Create a queries.ts file

We'll go ahead and create two queries that we'll eventually need in our application. One will handle vectorized search
while the other will use LLM to generate a generative AI response. We'll also generate a `TEST` query that we can use to
confirm that our Apollo Client is working correctly.

In `/app/utilities`, create a new file called `queries.ts` and add the following:

```ts
// inside /app/utilities/queries.ts

import { gql, DocumentNode } from "@apollo/client";

interface TestQuery {
  application: {
    candidate_id: string;
  };
}

const TEST: DocumentNode = gql`
  query TestQuery {
    application {
      candidate_id
    }
  }
`;

interface NearTextQuery {
  Resume: {
    application_id: string;
    content: string;
    application_relationship: {
      hiring_manager: string;
      resume_url: string;
    };
  }[];
}

const NEAR_TEXT_RESPONSE: DocumentNode = gql`
  query NearTextQuery($user_query: text!) {
    Resume(where: { vector: { near_text: $user_query } }, limit: 10) {
      application_id
      content
      application_relationship {
        hiring_manager
        resume_url
      }
    }
  }
`;

interface LLMQuery {
  QueryLLM: string;
}

const LLM_QUERY: DocumentNode = gql`
  query LLMQuery($user_query: String!) {
    QueryLLM(user_query: $user_query)
  }
`;

export { NEAR_TEXT_RESPONSE, LLM_QUERY, TEST };
```

## Create a QueryResponse component

Next, we'll create a `QueryResponse` component that will eventually handle our queries. For now, it will run the `TEST`
query so we can confirm that our Apollo Client is working correctly. Let's create a new folder in `/app` called
`components`, and then create a new file called `QueryResponse.tsx` and add the following:

```tsx
"use client";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { TEST } from "../utilities/queries";

export default function QueryResponse(): JSX.Element {
  const { data, loading } = useQuery(TEST);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{data.application.length}</div>;
}
```

## Test our Apollo Client

In our `/app/page.tsx` file, let's import our `QueryResponse` component and add it to our page:

```tsx
// inside /app/pages/index.tsx

import QueryResponse from "./components/QueryResponse";

export default function Home() {
  return (
    <main className="p4">
      <QueryResponse />
    </main>
  );
}
```

If all works, we should see `2484` (or similar) returned to the page, as this is the number of resumes we have in our
database.

![Confirm connection](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/confirm-connection.png)

If you see this, you've successfully configured your Apollo Client to work with your Hasura GraphQL API! Next, let's get
on with making this useful and allowing a user to query information.

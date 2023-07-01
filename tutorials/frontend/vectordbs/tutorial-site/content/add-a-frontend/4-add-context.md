---
title: "Manage state with context"
metaTitle: "Add a frontend | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Eventually, our application will need to manage state. For example, we'll want to track the user's input and the
response type they've selected. We'll also want to track whether or not the user has sent a request to the backend.

## Create context

While it can be tempting to start setting state in the `Input` component, we'll be sharing this state across components.
In this case, we're going to reach for React's `Context` API.

First, let's create a new file at `/app/utilities/context.tsx`:

```tsx
"use client";

import { ReactNode, useState, useContext, createContext } from "react";
```

Then, we'll create a new provider we can use to wrap our app in:

```tsx
"use client";

import { ReactNode, useState, useContext, createContext } from "react";

const AppContext = createContext({});

export function AppWrapper({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [responseType, setResponseType] = useState("near_text");
  const [queryLoading, setQueryLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  let state = {
    query,
    setQuery,
    responseType,
    setResponseType,
    queryLoading,
    setQueryLoading,
    isSent,
    setIsSent,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
```

## Wrap the app in context

Next, inside `app/layout.tsx`, we need to wrap our app in the `AppWrapper` component. The new `app/layout.tsx` should
look like this:

```tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "./utilities/ApolloWrapper";
import { AppWrapper } from "./utilities/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "People Pleasers | The most pleasing HR service in the world",
  description: "Ask your AI assistant to find the perfect candidate and save you time and money",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          <ApolloWrapper>{children}</ApolloWrapper>
        </AppWrapper>
      </body>
    </html>
  );
}
```

## Use context

Now, we can import this context into any component and use it to track state. We'll begin with the `Input` component and
import it like this:

```tsx
"use client";

import { useAppContext } from "../utilities/context";
```

**Note: we're also turning `Input` into a client component. By default, in Next.js 13 , all components are RSCs.**

Before then destructuring the needed variables and their methods:

```tsx
const { query, setQuery, responseType, setResponseType, queryLoading, setQueryLoading, isSent, setIsSent } =
  useAppContext();
```

Equipped with this context, we can now add the functionality we want to the `Input` component.

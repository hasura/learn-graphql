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

interface AppState {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  responseType: string;
  setResponseType: React.Dispatch<React.SetStateAction<string>>;
  queryLoading: boolean;
  setQueryLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSent: boolean;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppState | null>(null);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [responseType, setResponseType] = useState("near_text");
  const [queryLoading, setQueryLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const state: AppState = {
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

export function useAppContext(): AppState {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
```

This is the first time we've encountered interfaces in TypeScript. Interfaces are a way to define the shape of an
object. In this case, we're defining the shape of our `AppState` object. This object will contain all of the state we
want to track in our application. Additionally, we're using the `ReactNode` type to define the type of the `children`
prop. This is a special type that allows us to pass any valid JSX as a prop.

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

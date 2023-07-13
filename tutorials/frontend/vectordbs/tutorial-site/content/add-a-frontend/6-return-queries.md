---
title: "Return responses"
metaTitle: "Add a frontend | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Finally, we're ready to return the results of our query to the frontend. We already have a component called
`QueryResponses` that's utilizing our `useQuery` hook. We'll trade out the `TEST` query that we imported earlier and
replace it with our `NEAR_TEXT_RESPONSE` and `LLM_QUERY` queries. Additionally, we'll need access to our context. Inside
the `QueryResponses.tsx` file, let's import the queries and the context along with the `useEffect` hook:

```tsx
import { useEffect } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { NEAR_TEXT_RESPONSE, LLM_QUERY } from "../utilities/queries";
import { useAppContext } from "../utilities/context";
```

Within the function, we'll also need this context; we'll need to destructure three pieces in this component:

```tsx
const { query, responseType, setQueryLoading } = useAppContext();
```

We'll also create a series of interfaces that will help us to type the data that we're receiving from our queries:

```tsx
interface Resume {
  application_id: string;
  content: string;
  application_relationship: {
    hiring_manager: string;
    resume_url: string;
  };
}

interface NearTextQueryResponse {
  Resume: Resume[];
}

interface LLMQueryResponse {
  QueryLLM: string;
}
```

## Making the right query

Remember, our users can decide what type of response they want to receive. We'll need to conditionally choose a query
based on the `responseType` value:

```tsx
const { data, loading } = useQuery(responseType === "near_text" ? NEAR_TEXT_RESPONSE : LLM_QUERY, {
  variables: {
    user_query: query,
  },
});
```

## Rendering the response

In all, our file will look like what's below. As Apollo Client gives us access to the `loading` state, we can use that
to render a loading indicator while the query is being made. Additionally, our vectorized resumes are quite long and
we're choosing to render parts of them. We'll add a function that truncates the text and gives the user a preview.
Finally, we're including a smooth-scroll effect so that the user can see the response as soon as it's returned.

```tsx
import { useEffect } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { NEAR_TEXT_RESPONSE, LLM_QUERY } from "../utilities/queries";
import { useAppContext } from "../utilities/context";

interface Resume {
  application_id: string;
  content: string;
  application_relationship: {
    hiring_manager: string;
    resume_url: string;
  };
}

interface NearTextQueryResponse {
  Resume: Resume[];
}

interface LLMQueryResponse {
  QueryLLM: string;
}

export default function QueryResponse(): JSX.Element {
  const { query, responseType, setQueryLoading } = useAppContext();
  console.log(query);
  const { data, loading, error } = useQuery<NearTextQueryResponse | LLMQueryResponse>(
    responseType === "near_text" ? NEAR_TEXT_RESPONSE : LLM_QUERY,
    {
      variables: {
        user_query: query,
      },
    }
  );

  data && console.log(data);

  function formatResumeString(string: string): string {
    let newString = string.substring(0, 200);
    newString = newString + "...";
    return newString;
  }

  useEffect(() => {
    const querySelector = document.querySelector("#responses");
    if ((querySelector && data !== undefined) || error !== undefined) {
      querySelector.scrollIntoView({ behavior: "smooth" });
      setQueryLoading(false);
    }
  }, [data, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    setQueryLoading(false);
    return <div>This question is too long for the OpenAI model. Try again with something shorter.</div>;
  }

  return (
    <div className="flex flex-col w-3/4 h-full place-content-center mx-auto mb-32 gap-4">
      {responseType === "full_text" && data && (
        <div className="flex flex-col text-start min-h-32 p-12 gap-2">
          <p>{data.QueryLLM}</p>
        </div>
      )}
      {responseType === "near_text" &&
        data &&
        data.Resume.map((item: Resume, i: number) => {
          return (
            <div className="flex rounded-md shadow-lg min-h-32 p-12 gap-2" key={i}>
              <div>
                <p
                  className="grid place-items-center text-white text-sm rounded-full w-8 h-8 bg-indigo-500"
                  id={i.toString()}>
                  {i + 1}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm font-semibold">Candidate {item.application_id}</p>
                <p className="text-xs font-normal">{item.application_relationship.hiring_manager}</p>
                <a
                  className="text-sm font-normal text-indigo-500 transition-all ease-in-out hover:text-indigo-700"
                  href={item.application_relationship.resume_url}
                  rel="noopener noreferrer"
                  target="_blank">
                  Link to CV
                </a>
                <p className="text-start">{formatResumeString(item.content)}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
```

## Triggering the query

Of course, we need to actually tell the component to make the query. Back in our `app/page.tsx` component, we'll add a
conditional that checks if the `isSent` state is true. If it is, we'll render the `QueryResponse` component. The whole
file will look like this now:

```tsx
"use client";

import Input from "./components/Input";
import QueryResponse from "./components/QueryResponse";
import { useAppContext } from "./utilities/context";

export default function Home() {
  const { isSent } = useAppContext();
  return (
    <main className="p4">
      <Input />
      {isSent && (
        <div className="flex flex-col col-span-2 mx-auto w-full text-center min-h-96" id="responses">
          <h2 className="text-2xl font-bold">Results</h2>
          <p className="text-sm mb-3 text-slate-500">Here are the results for your query.</p>
          {isSent && <QueryResponse />}
        </div>
      )}
    </main>
  );
}
```

**Note: Since we're using context inside this root `page.tsx` file, we'll need to let Next.js know it's not a sever
component, thus we add `use client` to the top of the file.**

Inside our `/app/components/Input.tsx`, we'll add a function that will handle the button click:

```tsx
function handleAsk() {
  setQueryLoading(true);
  setIsSent(true);
}
```

We'll make some updates to our button so that it will conditionally render text based on whether or not the query is
loading, and we'll disable it when it is:

```tsx
<button
  className={`bg-indigo-500 text-white rounded-lg px-8 py-4 mt-4 hover:bg-indigo-600 transition-all ease-in-out ${
    queryLoading && "disabled:opacity-50 disabled:cursor-not-allowed"
  }`}
  disabled={queryLoading}
  onClick={handleAsk}>
  {queryLoading ? "Working on it..." : "Ask"}
</button>
```

And, finally, a `useEffect` which will set the `isSent` state to true whenever the query is loading and cause our new
component to render:

```tsx
useEffect(() => {
  if (queryLoading) {
    setIsSent(true);
  }
}, [queryLoading]);
```

<details>
<summary>If you need to see the 'Input' code in its entirety, you can self-check using this 👇</summary>

```tsx
"use client";

import { useAppContext } from "../utilities/context";
import { useState, useEffect } from "react";

export default function Input() {
  const { setQuery, responseType, setResponseType, queryLoading, setQueryLoading, setIsSent } = useAppContext();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholders, setPlaceholders] = useState([
    "Which candidates have the most management experience?",
    "Which manager is available for an interview?",
    "Which resumes mention payroll experience?",
    "Who lists communication skills on their resume?",
  ]);

  function changePlaceholder() {
    setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changePlaceholder();
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderIndex]);

  function handleToggle() {
    setResponseType(responseType === "near_text" ? "full_text" : "near_text");
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleAsk() {
    setQueryLoading(true);
    setIsSent(true);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 h-screen p-4">
      <div className="flex flex-col col-span-2 place-content-center mx-auto text-center md:text-left">
        <h1 className="text-5xl font-bold mb-4">People Pleasers</h1>
        <p className="text-xl text-slate-500">The most pleasing HR service 😘</p>
      </div>
      <div className="flex flex-col col-span-3 justify-center text-center md:text-left">
        <h2 className="text-2xl font-bold">How can I help you?</h2>
        <p className="text-sm mb-3 text-slate-500">
          Ask me anything about the available candidates, their resumes, or the HR managers who are available to help
          you with your hiring process.
        </p>
        <input
          className="rounded-lg border w-full p-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          type="text"
          placeholder={placeholders[placeholderIndex]}
          onChange={(e) => handleChange(e)}
        />

        <div className="flex mt-4">
          <input id="toggle" className="hidden" type="checkbox" onChange={() => handleToggle()} />
          <label
            className={`flex items-center cursor-pointer w-12 h-6 rounded-full p-1 transition-all ease-in-out duration-200 ${
              responseType === "full_text" ? "bg-indigo-500" : "bg-gray-300"
            }`}
            htmlFor="toggle">
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                responseType === "full_text" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </label>
          <span className={`ml-3`}>Talk to me like a human (resource)</span>
        </div>
        <button
          className={`bg-indigo-500 text-white rounded-lg px-8 py-4 mt-4 hover:bg-indigo-600 transition-all ease-in-out ${
            queryLoading && "disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
          disabled={queryLoading}
          onClick={handleAsk}>
          {queryLoading ? "Working on it..." : "Ask"}
        </button>
      </div>
    </div>
  );
}
```

</details>

## Run a query

At this point, we should be able to ask questions and get responses from our AI assistant in one of two ways: either as
an array of resumes based on the `near_text` vector property, or as a natural language response from our LLM 🎉

![Working query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/gen-ai-frontend.gif)

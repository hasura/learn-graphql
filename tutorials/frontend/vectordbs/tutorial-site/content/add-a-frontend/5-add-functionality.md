---
title: "Add functionality to the frontend"
metaTitle: "Add a frontend | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

We want our service to be engaging so users will want to use it. We're going to add a few things to make it more
engaging, such as placeholder text that rotates and suggests different things to ask, and a toggle that allows users to
switch between different types of results. We'll also use the state we've created to add dynamic styling to our UI and
help to create a rich and engaging experience.

## The placeholder text

First, let's import the `useState`, `useEffect`, and `ChangeEvent` hooks from React at the top of the
`app/components/Input.tsx` file:

```tsx
import { useState, useEffect, ChangeEvent } from "react";
```

These hooks will allow us to create state variables and update them when certain events occur.

Then, inside the `Input()` function, let's create a state variable that will hold the placeholder text's index, along
with a series of placeholders to cycle through:

```tsx
const [placeholderIndex, setPlaceholderIndex] = useState(0);
const [placeholders, setPlaceholders] = useState([
  "Which candidates have the most management experience?",
  "Which manager is available for an interview?",
  "Which resumes mention payroll experience?",
  "Who lists communication skills on their resume?",
]);
```

We'll also need a function that will cycle through the array of placeholders. We can utilize `useEffect` to call this
function every 3 seconds:

```tsx
function changePlaceholder() {
  setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
}

useEffect(() => {
  const interval = setInterval(() => {
    changePlaceholder();
  }, 3000);
  return () => clearInterval(interval);
}, [placeholderIndex]);
```

Finally, let's update the input to use the state variable:

```tsx
<input
  className="rounded-lg border w-full p-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
  type="text"
  placeholder={placeholders[placeholderIndex]}
/>
```

At this point, you should see the placeholder text change every 3 seconds 🥳

## The toggle

We'd like to have the toggle switch between different types of results. We already have a state variable called
`responseType` that defaults to `near_text`, which is the default type of result that VectorDB returns. We'll also need
a function to update this state variable whenever the toggle is clicked:

```tsx
function handleToggle() {
  setResponseType(responseType === "near_text" ? "full_text" : "near_text");
}
```

Then, we'll need to update the toggle to use this state variable:

```tsx
<input id="toggle" className="hidden" type="checkbox" onChange={() => handleToggle()} />
```

At this point, our toggle should be working, but we need to style and animate it. Tailwind allows us to conditionally
apply classes using the `className` prop of the toggle's `label`, so we can update the toggle to use the following:

```tsx
<label
className={`flex items-center cursor-pointer w-12 h-6 rounded-full p-1 transition-all ease-in-out duration-200 ${
responseType === "full_text" ? "bg-indigo-500" : "bg-gray-300"
}`}
htmlFor="toggle">
```

And then the position of the toggle along the x-axis:

```tsx
<div
  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
    responseType === "full_text" ? "translate-x-6" : "translate-x-0"
  }`}
/>
```

Now, clicking the toggle will both change the state variable and update the UI to reflect the change.

## The query

The last thing to configure is the query. We'll need to update the `query` variable's value to match whatever a user is
typing in the input. We can do this by first adding a `handleChange()` function:

```tsx
function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setQuery(event.target.value);
}
```

And then updating the `onChange` prop of the input:

```tsx
<input
  className="rounded-lg border w-full p-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
  type="text"
  placeholder={placeholders[placeholderIndex]}
  onChange={(e) => handleChange(e)}
/>
```

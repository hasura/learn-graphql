---
title: "Create Next.js project"
metaTitle: "Add a frontend | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

We're usings the - at time of writing - new app router from Next.js. [App Router](https://nextjs.org/docs/app) is a new
feature that allows you to utilize React's newest features like Suspense and Concurrent Mode. However, our application
will only be a single page, comprised of a few different components.

## Init the project

Let's start by creating a new Next.js project.

```bash
npx create-next-app@latest hrtool .
```

Follow the steps and choose `TypeScript`, `Tailwind CSS`, and `App Router` when prompted.

Fire up the development server and make sure everything is working.

```bash
cd hrtool
npm run dev
```

If you see the Next.js welcome page, you're good to go!

![Next.js landing page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/next-welcome.png)

## Housekeeping

Let's clean up the project a bit. First, let's clear out everything inside the `/app/page.tsx` file. You can replace it
with the following:

```tsx
export default function Home() {
  return <main className="p4"></main>;
}
```

Next, let's reset the default stylings by removing everything inside `/styles/globals.css`. You can replace it with the
following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, as we all forget to do these things, let's update the `metadata` object in `/app/layout.tsx`:

```tsx
export const metadata = {
  title: "People Pleasers | The most pleasing HR service in the world",
  description: "Ask your AI assistant to find the perfect candidate and save you time and money",
};
```

## Install dependencies

We're going to use Apollo Client to communicate with our GraphQL API. Apollo has an experimental package that's built
for Next.js and the App Router paradigm:

```bash
npm install @apollo/client@beta @apollo/experimental-nextjs-app-support
```

With our application gutted and our dependencies installed, we're ready to start building!

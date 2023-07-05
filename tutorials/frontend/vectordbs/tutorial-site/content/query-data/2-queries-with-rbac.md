---
title: "Query data | Fullstack VectorDB Tutorial"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---
# Remote joins with Access Control
Let us now define permissions on our data. Our current usecase has user profile of `Hiring Manager` and hiring managers should be able to review only the resumes that are tagged to them.

We can do this easily by defining `SELECT` permission on our `hiring_manager` relationship.

<access_control_image.png>
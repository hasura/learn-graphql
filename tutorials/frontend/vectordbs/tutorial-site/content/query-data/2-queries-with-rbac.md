---
title: "Query data | Fullstack VectorDB Tutorial"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---
# Remote joins with Access Control
Let us now define permissions on our data. Our current usecase has user profile of `Hiring Manager` and hiring managers should be able to review only the resumes that are tagged to them.

We can do this easily by defining `SELECT` permission on our `hiring_manager` relationship. You can copy and paste this rule into the first line of the editor, or configure it using the dropdown GUI.

```
{"application_relationship":{"hiring_manager":{"_eq":"x-hasura-manager-id"}}}
```

<access_control_image.png>

Adding this rule does the magic! We'll now only see the applications belonging to the manager id in x-hasura-manager-id 🎉

Don’t forget to send x-hasura-role as manager and x-hasura-manager-id as your id of choice:
<x_hasura_manager_id.png>
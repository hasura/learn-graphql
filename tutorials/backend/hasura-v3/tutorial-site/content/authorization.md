---
title: 'Authorization'
metaTitle: 'Authorization with Hasura | Hasura v3 Tutorial'
metaDescription:
  'This part of the tutorial covers how to implement Authorization in Hasura v3 by defining role-based access control
  rules for models.'
---

One of the most time-consuming parts of building an application is implementing authorization. Hasura makes this easy by
allowing you to write access control rules declaratively in your metadata. This allows you to define who can access what
data in your database, right down to the row and column level.

We break down authorization into three sets of permissions:

## Model permissions

Model permissions allow you to control which roles can access which tables in your database. You can use these to ensure
that anonymous users can't access sensitive data, or that only admins can access certain tables.

## Output permissions

Output permissions allow you to control which fields are returned to which roles. You can these to ensure that users can
only access editable fields, or that only admins can access sensitive fields.

## Command permissions

Command permissions focus on functions or procedures that can be run on your database. You can use these to ensure that
only admins can run certain functions, or that only users can run functions that affect their own data.

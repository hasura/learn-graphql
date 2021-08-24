---
title: "Postgres Triggers"
metaTitle: "Postgres Triggers | PostgreSQL Tutorial"
metaDescription: "In this section, we will look at what is a trigger and how it works, when to use triggers and a few example usage"
---

In this section, we will look at

- What is a trigger and how it works
- When to use triggers?
- Examples of triggers

PostgreSQL Triggers are database callback functions, which are automatically performed/invoked when a specified database event occurs.

PostgreSQL trigger can be specified to fire on three different scenarios.

- Before the operation is attempted on a row (before constraints are checked and the INSERT, UPDATE or DELETE is attempted)

- After the operation has completed (after constraints are checked and the INSERT, UPDATE, or DELETE has completed)

- Instead of the operation (in the case of inserts, updates or deletes on a view)

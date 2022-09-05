---
title: "Relationships"
metaTitle: "PostgreSQL Relationships | One to One, One to Many, Many to Many | PostgreSQL Tutorial"
metaDescription: "There are 3 types of table relationships in a relational database like PostgreSQL. The relationships can be enforced by defining the right foreign key constraints on the columns."
---

There are 3 types of table relationships in a relational database. The relationships can be enforced by defining the right foreign key constraints on the columns.

## One-to-One and One-to-Many

A one-to-one relationship between two tables can be established via a unique foreign key constraint.

Say we have the following two tables in our database schema:

```sql
CREATE TABLE author (
  id SERIAL PRIMARY KEY,
  name TEXT
)

CREATE TABLE article (
  id SERIAL PRIMARY KEY,
  author_id INT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES author(id)
)
```

These two tables are related via

- one-to-one relationship. An article can have one author.
- one-to-many relationship. An author can have multiple articles.

## Many-to-Many

A many to many relationship is typically created using a `join` table.

Consider the following two tables `article` and `tag`.

```sql
CREATE TABLE article (
  id SERIAL PRIMARY KEY,
  title TEXT
)

CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  tag_value TEXT
)
```

In practical use cases, each article can have multiple tags and each tag can be mapped to multiple articles.

Now let us create a bridge table called `article_tag`.

```sql
CREATE TABLE article_tag (
  article_id INT
  tag_id INT
  PRIMARY KEY (article_id, tag_id)
  CONSTRAINT fk_article FOREIGN KEY(article_id) REFERENCES article(id)
  CONSTRAINT fk_tag FOREIGN KEY(tag_id) REFERENCES tag(id)
)
```

We have applied two foreign key constraints, one for article_id and one for tag_id. The table `article_tag` is the bridge table involved in the many-to-many relationship.

## GraphQL Example

Check out the Postgres schema in GraphQL using our example [running in Hasura Cloud](https://cloud.hasura.io/public/graphiql?endpoint=https://learn-postgres.hasura.app/v1/graphql).

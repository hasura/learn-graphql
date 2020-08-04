---
title: "Push Query for RxDB"
metaTitle: "Push Query for RxDB | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "We will look at the push query for RxDB making use of upsert mutation in Hasura"
---

For the push query we use an upsert:

```js
    const pushQueryBuilder = doc => {
        const query = `
            mutation InsertTodo($todo: [todos_insert_input!]!) {
                insert_todos(
                    objects: $todo,
                    on_conflict: {
                        constraint: todos_pkey,
                        update_columns: [text, isCompleted, deleted, updatedAt]
                    }){
                    returning {
                    id
                    }
                }
        }
        `;
        const variables = {
            todo: doc
        };

        return {
            query,
            variables
        };
    };
```

RxDB will call the above method whenever a document is updated or a new document is created. RxDB will then fire the graphQL query returned along with the variables returned. In the above function the InsertTodo mutation tells hasura to try to insert the row only if a row with the same `id` does not already exist. If a row with the same `id` exists then Hasura will simply update the columns given in the `update_columns` field of that row. 
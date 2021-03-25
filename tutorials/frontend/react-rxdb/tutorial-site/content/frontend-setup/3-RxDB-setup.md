---
title: "RxDB setup"
metaTitle: "RxDB setup| React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "In this part of the tutorial, we will look at how to add RxDB dependency and configure it in the app by creating a schema"
---

## Add RxDB dependency

Open package.json and add the following line under the dependencies section

```js
 "rxdb": "^8.7.4",
 "pouchdb-adapter-idb": "^7.1.1",
```

Now RUN npm ci & restart the server

## Create RxDB schema

The next step is to create a schema for RxDB to understand. Create a file `src/components/Schema.js`
with the following contents

```js
export const todoSchema  = {
    'title': 'todo schema',
    'description': 'todo schema',
    'version': 0,
    'type': 'object',
    'properties': {
        'id': {
            'type': 'string',
            'primary': true
        },
        'text': {
            'type': 'string'
        },
        'isCompleted': {
            'type': 'boolean'
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'index': true,        
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time'
        },
        'userId': {
            'type': 'string'
        },
    },
    'required': ['text', 'isCompleted', 'userId', 'createdAt'],
    additionalProperties: true
};
```

The above code tells RxDB what all fields will be present in a todo item. You can learn more about RxDB schema from the [documentation](https://rxdb.info/rx-schema.html)

## Initialize RxDB

Create a file `src/components/Database.js` with the following contents:

```js
import RxDB from 'rxdb';

import { todoSchema } from './Schema';

import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import RxDBValidateModule from 'rxdb/plugins/validate';

RxDB.plugin(RxDBSchemaCheckModule);
RxDB.plugin(RxDBErrorMessagesModule);
RxDB.plugin(RxDBValidateModule);

RxDB.plugin(require('pouchdb-adapter-idb'));

export const createDb = async () => {
    console.log('DatabaseService: creating database..');

    const db = await RxDB.create({
        name: 'tododb',
        adapter: 'idb',
    });

    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging

    await db.collection({
        name: 'todos',
        schema: todoSchema
     })

    return db;
};
```


The above code initializes RxDB and the todos collection with the schema we created above.

RxDB has various adapters that it can use to store data. In this tutorial we use `pouchdb-adapter-idb` which is PouchDB running on top of IndexDB. You can learn more about adapters over [here](https://rxdb.info/adapters.html)

Once RxDB is initialized, you'll be able to play around with RxDB from the devtools console in your browser.


To use RxDB in the app first change `src/components/AppWrapper.js` to include Database.js

```js
import * as Database from './Database';
import Loading from './Loading'; // We will use this to show a loader while RxDB initializes
```

Now initialize RxDB in `componentDidMount` and modify the `render` method in the same file:

```js
    // Mark the function as Async
    async componentDidMount() {
        const db = await Database.createDb()

        this.setState({ db });

        //Leave the rest of the function unchanged
    }

    ...

    render() {
        const location = this.props.location;
        const isCallbackPage = location && location.pathname.startsWith('/callback');

        if (!this.isLoggedIn() && !isCallbackPage) {
            return (<Login loginHandler={this.login} />);
        }

        // Add this if statement
        if(!this.state.db) {
            return <Loading />
        }

        // Pass db in props to the App
        return (<App
            auth={{ userId: this.userId }}
            logoutHandler={this.logout}
            db={this.state.db}
        />);
    }
```

Now change `src/components/App.js` to use the `db` prop:

```js

// Add the db parameter to props
const App = ({auth, db, logoutHandler}) => {
  
  return (
    <div>
      <Header logoutHandler={logoutHandler} />
      <div className="todo-list">

        {/* Pass on the db parameter to TodoListWrapper */}
        <TodoListWrapper auth={auth} db={db} />
      </div>
    </div>
  );
};
```

Similarly change `src/components/Todo/TodoListWrapper.js` file to pass the `db` prop down to the `TodoInput` & `TodoList`:

```js

  render() {
    return (
      <div className="todoWrapper">
        <div className="sectionHeader"> Todos </div>

        {/* Pass db to TodoInput & TodoList */}
        <TodoInput auth={this.props.auth} db={this.props.db} />

        <TodoList todos={this.state.todos} db={this.props.db} auth={this.props.auth} />
      </div>
    );
  }
```

Now that RxDb is setup, open the webconsole on the browser and try the following:

```js
> window.db.todos.insert({
    id: "mytodo1",
    text: 'Todo 1',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: localStorage.getItem("userId")
}).then((doc) => console.log(doc.toJSON()))
```

This should output something like this:

```js
{
    id: "mytodo1",
    text: "Todo 1",
    isCompleted: false,
    createdAt: "2019-12-31T16:31:24.541Z",
    updatedAt: "2019-12-31T16:31:24.541Z",
    userId: "google-oauth2|117035715025033185506",
    _rev: "1-648021ff54ae3ed8cc2e27982e08b44c"
}
```

We are now ready to integrate RxDB with the rest of the app.
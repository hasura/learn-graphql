---
title: "Integrating RxDB"
metaTitle: "Integrating RxDB| React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "A powerful and concise tutorial that will show you how to build an offline first app with RxDB and Hasura."
---

## Creating todos

Open `src/components/Todo/TodoInput.js`. You will see an empty `addTodo` method in the `TodoInput` class. Change it as follows:

```js
addTodo(text) {
  this.props.db.todos.insert({
    id: uuidv4(),
    text: text,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    userId: this.props.auth.userId
  });
}
```

You can now create Todos from the UI. However they will not appear in the Todo list yet. For that we need to load todos from RxDB as well

## Loading Todos from RxDB

Open `src/components/TodoListWrapper.js` and add the following code to `TodoListWrapper` class:

```js

class TodoListWrapper extends Component {
  ...

  componentDidMount() {
    this.props.db.todos.find()
                .sort('createdAt').$.subscribe(todos => {
        if (!todos) {
            return;
        }
                
        this.setState({ todos });
    });
  }

  ...
}

```

In the above code we are providing RxDB with a callback function to be called whenever there is a change to the todos collection. 

### Marking a todo as completed

Open `src/components/Todo/TodoItem.js`. You will see an empty toggleTodo function. Change it as follows:

```js
const toggleTodo = () => {
  todo.update({
    $set: {
      isCompleted: !todo.isCompleted,
    }
  })
};
```

You should now be able to toggle todos from the UI. RxDB uses `mongo-update-syntax` for updating fields. You can see the supported operators over [here](https://docs.mongodb.com/manual/reference/operator/update-field/). In the above code we are using the `$set` operator to toggle the `isCompleted` field.

Note that when we update a todo RxDB will automatically re-run the callback function we provided while loading todos. This is the 'Reactive' part of RxDB. Without RxDB we will have to either query the database periodically or have setup some kind of a notification mechanism whenever a todo is created, updated or deleted.

### Deleting a todo

In the same file change the `removeTodo` function as follows:

```js
const removeTodo = (e) => {
  e.preventDefault();
  e.stopPropagation();

  todo.remove()
};
```

### Clearing completed todos

Open `src/components/Todo/TodoList.js` and change the empty `clearCompleted` method as show below:

```js
clearCompleted() {
  this.props.db.todos.find({ isCompleted: true}).remove()
}
```
At this point we can create, edit & delete todos client-side only and everything will work entirely offline too!

However, if you say open the app in a different browser and login, you will not see the todo items you created in the first browser window. The next step is to setup a two way sync between RxDB and Hasura.
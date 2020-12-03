import { Component, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { GET_MY_TODOS } from './TodoPrivateList';

const ADD_TODO = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;

// type for a returning Todo from ADD_TODO mutation
interface Todo {
  id: number;
  title: string;
  created_at: Date;
  is_completed: boolean;
}

// type for the full result of ADD_TODO mutation
interface InsertTodoResult {
  insert_todos: {
    affected_rows: number;
    returning: Todo[];
  };
}

@Component({
  selector: 'TodoInput',
  templateUrl: './TodoInput.template.html',
})
export class TodoInput {
  @Input() isPublic: any = false;
  todoInput: any = '';
  loading = true;

  constructor(private apollo: Apollo) { }

  addTodo(e) {
    e.preventDefault();
    this.apollo
      .mutate<InsertTodoResult>({
        mutation: ADD_TODO,
        variables: {
          todo: this.todoInput,
          isPublic: this.isPublic,
        },
        update: (cache, { data }) => {
          if (this.isPublic) {
            return null;
          }

          const existingTodos: any = cache.readQuery({
            query: GET_MY_TODOS,
          });

          const newTodo = data.insert_todos.returning[0];
          cache.writeQuery({
            query: GET_MY_TODOS,
            data: { todos: [newTodo, ...existingTodos.todos] },
          });
        },
      })
      .subscribe(
        ({ data }) => {
          this.loading = false;
          this.todoInput = '';
          console.log('got data ', data);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
}

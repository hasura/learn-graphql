import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';


import { AppRoutingModule } from './app-routing.module';
import { App } from './App';
import { Auth0Wrapper } from './Auth/Auth0Wrapper';
import { Callback } from './Auth/Callback';
import { Login } from './Auth/Login';
import { LogoutBtn } from './Auth/LogoutBtn';
import { OnlineUser } from './OnlineUsers/OnlineUser';
import { OnlineUsersWrapper } from './OnlineUsers/OnlineUsersWrapper';
import { TaskItem } from './Todo/TaskItem';
import { TodoFilters } from './Todo/TodoFilters';
import { TodoInput } from './Todo/TodoInput';
import { TodoItem } from './Todo/TodoItem';
import { TodoPrivateList } from './Todo/TodoPrivateList';
import { TodoPrivateWrapper } from './Todo/TodoPrivateWrapper';
import { TodoPublicList } from './Todo/TodoPublicList';
import { TodoPublicWrapper } from './Todo/TodoPublicWrapper';
import { Header } from './Header';

@NgModule({
  declarations: [
    Auth0Wrapper,
    Callback,
    Login,
    LogoutBtn,
    OnlineUser,
    OnlineUsersWrapper,
    TaskItem,
    TodoFilters,
    TodoInput,
    TodoItem,
    TodoPrivateList,
    TodoPrivateWrapper,
    TodoPublicList,
    TodoPublicWrapper,
    App,
    Header,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return {
          cache: new InMemoryCache(),
          link: new WebSocketLink({
            uri: 'wss://hasura.io/learn/graphql',
            options: {
              reconnect: true,
              connectionParams: {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              },
            },
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [Auth0Wrapper],
})
export class AppModule { }

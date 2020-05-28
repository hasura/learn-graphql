import React from "react";

import TodoInput from "./TodoInput";
import TodoPrivateList from "./TodoPrivateList";

const TodoPrivateWrapper = (props) => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Personal todos</div>

      <TodoInput />
      <TodoPrivateList />
    </div>
  );
};

export default TodoPrivateWrapper;

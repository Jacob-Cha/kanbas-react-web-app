import React, { useState } from "react";
import TodoForm from "./TodoFrom";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
export default function TodoList() {
    
    const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
      <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}

        {/* <li className="list-group-item">
          <button onClick={() => addTodo(todo)}
                  id="wd-add-todo-click">Add</button>
          <button onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click">
            Update </button>
          <input value={todo.title}
            onChange={(e) =>
              setTodo({ ...todo,
                title: e.target.value })
            }
          />
        </li>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <button onClick={() => deleteTodo(todo.id)}
                    id="wd-delete-todo-click">
              Delete </button>
            <button onClick={() => setTodo(todo)}
                    id="wd-set-todo-click">
              Edit </button>
            {todo.title}
          </li>
        ))} */}
      </ul>
      <hr/>
    </div>
  );
}

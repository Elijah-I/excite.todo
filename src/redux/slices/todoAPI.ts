import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uniq } from "uuid";
import type { UrlSearchParams } from "types/url.search.params";
import { URL_FILTER_OPTIONS } from "types/url.search.params";
import type { TodoItem, TodoState } from "types/todo.state";

interface GetTodosPayload extends UrlSearchParams {}
interface createTodoPayload {
  content: string;
  id: string;
}

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const todoAPI = {
  async requestTodos() {
    await delay(1000);
    return JSON.parse(localStorage.getItem("todos") || "[]");
  },

  getTodoById(todos: TodoItem[], id: string): TodoItem | undefined {
    let todoItem: TodoItem | undefined = undefined;

    todos.forEach((todo) => {
      if (todo.id === id) todoItem = todo;
      else if (todo.children.length)
        todoItem = this.getTodoById(todo.children, id);
    });

    return todoItem;
  },

  getCurrentIsUpdatind(
    isUpdating: TodoState["isUpdating"],
    id: TodoItem["id"]
  ) {
    return Object.keys(isUpdating).includes(id);
  },

  getTodos: createAsyncThunk(
    "todo/getTodos",
    async (payload: GetTodosPayload) => {
      let todos: TodoState["todos"] = await todoAPI.requestTodos();

      if (payload.search || payload.option) {
        todos = todos.filter((todo) => {
          let passed = true;

          if (payload.search) {
            passed = todo.content
              .toLowerCase()
              .includes(payload.search.toLowerCase());
          }
          if (payload.option) {
            passed = todo.done === payload.option;
          }

          return passed;
        });
      }

      return todos;
    }
  ),

  createTodo: createAsyncThunk(
    "todo/createTodo",
    async (payload: createTodoPayload) => {
      const todos: TodoState["todos"] = await todoAPI.requestTodos();
      const todoContainer =
        payload.id === "root"
          ? todos
          : todoAPI.getTodoById(todos, payload.id)?.children;

      if (!todoContainer) return { todos, currentTodo: payload.id };

      todoContainer.push({
        id: uniq(),
        order: todoContainer.length,
        done: URL_FILTER_OPTIONS.NEW,
        content: payload.content,
        children: []
      });

      localStorage.setItem("todos", JSON.stringify(todos));

      return { todos, currentTodo: payload.id };
    }
  )
};

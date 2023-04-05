import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uniq } from "uuid";
import type { UrlSearchParams } from "types/url.search.params";
import { URL_FILTER_OPTIONS } from "types/url.search.params";
import type { TodoItem, TodoState } from "types/todo.state";

interface GetTodosPayload extends UrlSearchParams {}
interface createTodoPayload {
  content: string;
  id: TodoItem["id"];
}
interface updateTodoPayload extends createTodoPayload {}
interface removeTodoPayload {
  id: TodoItem["id"];
}

interface DumpReturn {
  todos: TodoItem[];
  currentTodo: TodoItem["id"];
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

  async saveTodos(todos: TodoItem[]) {
    await delay(0);
    localStorage.setItem("todos", JSON.stringify(todos));
  },

  dump(todos: TodoItem[], id: TodoItem["id"]): DumpReturn {
    return { todos, currentTodo: id };
  },

  getTodoById(todos: TodoItem[], id: TodoItem["id"]): TodoItem {
    let todoItem: TodoItem = {
      id: "",
      order: -1,
      done: URL_FILTER_OPTIONS.ALL,
      content: "",
      children: []
    };

    for (const todo of todos) {
      if (todo.id === id) todoItem = todo;
      else if (todo.children.length)
        todoItem = this.getTodoById(todo.children, id);
    }

    return todoItem;
  },

  filterById(todos: TodoItem[], id: TodoItem["id"]): TodoItem[] {
    todos.forEach((todo) => {
      if (todo.id === id) todos = todos.filter((item) => item.id !== id);
      else if (todo.children.length)
        todo.children = this.filterById(todo.children, id);
    });

    return todos;
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
    async (payload: createTodoPayload): Promise<DumpReturn> => {
      const todos: TodoState["todos"] = await todoAPI.requestTodos();

      const todoContainer =
        payload.id === "root"
          ? todos
          : todoAPI.getTodoById(todos, payload.id).children;

      todoContainer.push({
        id: uniq(),
        order: todoContainer.length,
        done: URL_FILTER_OPTIONS.NEW,
        content: payload.content,
        children: []
      });

      todoAPI.saveTodos(todos);

      return todoAPI.dump(todos, payload.id);
    }
  ),

  updateTodo: createAsyncThunk(
    "todo/updateTodo",
    async (payload: updateTodoPayload): Promise<DumpReturn> => {
      const todos: TodoState["todos"] = await todoAPI.requestTodos();

      const currentTodo = todoAPI.getTodoById(todos, payload.id);
      currentTodo.content = payload.content;

      todoAPI.saveTodos(todos);

      return todoAPI.dump(todos, payload.id);
    }
  ),

  removeTodo: createAsyncThunk(
    "todo/updateTodo",
    async (payload: removeTodoPayload): Promise<DumpReturn> => {
      let todos: TodoState["todos"] = await todoAPI.requestTodos();

      todos = todoAPI.filterById(todos, payload.id);

      todoAPI.saveTodos(todos);

      return todoAPI.dump(todos, payload.id);
    }
  )
};

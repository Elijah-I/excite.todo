import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uniq } from 'uuid';
import type { UrlSearchParams } from 'types/url.search.params';
import { URL_FILTER_OPTIONS } from 'types/url.search.params';
import type { TodoItem, TodoState } from 'types/todo.state';

interface GetPayload extends UrlSearchParams {}
interface FilterPayload extends UrlSearchParams {}

interface CreatePayload extends UrlSearchParams {
  content: string;
  id: TodoItem['id'];
}
type UpdatePayload = CreatePayload;
type RemovePayload = Omit<CreatePayload, 'content'>;

interface DumpReturn {
  todos: TodoItem[];
  currentTodo: TodoItem['id'];
}

export const todoAPI = {
  delay(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  },

  async request() {
    await todoAPI.delay(1000);
    return JSON.parse(localStorage.getItem('todos') || '[]');
  },

  async save(todos: TodoItem[]) {
    await todoAPI.delay(0);
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  dump(todos: TodoItem[], id: TodoItem['id']): DumpReturn {
    return { todos, currentTodo: id };
  },

  getById(todos: TodoItem[], id: TodoItem['id']): TodoItem {
    let todoItem: TodoItem = {
      id: '',
      order: -1,
      done: URL_FILTER_OPTIONS.ALL,
      content: '',
      children: [],
    };

    for (const todo of todos) {
      if (todo.id === id) todoItem = todo;
      else if (todo.children.length) todoItem = this.getById(todo.children, id);
    }

    return todoItem;
  },

  filterById(todos: TodoItem[], id: TodoItem['id']): TodoItem[] {
    todos.forEach((todo) => {
      if (todo.id === id) todos = todos.filter((item) => item.id !== id);
      else if (todo.children.length) todo.children = this.filterById(todo.children, id);
    });

    return todos;
  },

  getContainerById(todos: TodoItem[], id: TodoItem['id']) {
    return id === 'root' ? todos : todoAPI.getById(todos, id).children;
  },

  getCurrentIsUpdatind(isUpdating: TodoState['isUpdating'], id: TodoItem['id']) {
    return Object.keys(isUpdating).includes(id);
  },

  filter(todos: TodoItem[], payload: FilterPayload) {
    if (payload.search || payload.option) {
      return todos.filter((todo) => {
        let passed = true;

        if (payload.search) {
          passed = todo.content.toLowerCase().includes(payload.search.toLowerCase());
        }
        if (passed && payload.option) {
          passed = todo.done === payload.option;
        }

        return passed;
      });
    }

    return todos;
  },

  get: createAsyncThunk('todo/get', async (payload: GetPayload): Promise<TodoItem[]> => {
    const todos: TodoState['todos'] = await todoAPI.request();
    return todoAPI.filter(todos, payload);
  }),

  create: createAsyncThunk('todo/create', async (payload: CreatePayload): Promise<DumpReturn> => {
    const todos: TodoState['todos'] = await todoAPI.request();
    const todoContainer = todoAPI.getContainerById(todos, payload.id);

    todoContainer.push({
      id: uniq(),
      order: todoContainer.length,
      done: URL_FILTER_OPTIONS.NEW,
      content: payload.content,
      children: [],
    });

    todoAPI.save(todos);

    return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
  }),

  update: createAsyncThunk('todo/update', async (payload: UpdatePayload): Promise<DumpReturn> => {
    const todos: TodoState['todos'] = await todoAPI.request();

    const currentTodo = todoAPI.getById(todos, payload.id);

    currentTodo.content = payload.content;

    todoAPI.save(todos);

    return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
  }),

  remove: createAsyncThunk('todo/update', async (payload: RemovePayload): Promise<DumpReturn> => {
    let todos: TodoState['todos'] = await todoAPI.request();

    todos = todoAPI.filterById(todos, payload.id);

    todoAPI.save(todos);

    return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
  }),
};

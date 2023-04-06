import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uniq } from 'uuid';
import type { UrlSearchParams } from 'types/url.search.params';
import { URL_FILTER_OPTIONS } from 'types/url.search.params';
import type { TodoItem, TodoState } from 'types/todo';
import { NOTIFICATION_STATUS } from 'types/notification';
import { setNotification } from '../notification';

interface GetPayload extends UrlSearchParams {}
interface SetPayload {
  todos: TodoItem[];
}
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
    let todoItem: TodoItem = {} as TodoItem;

    for (const todo of todos) {
      if (todo.id === id) {
        todoItem = todo;
      } else if (todo.children.length) {
        todoItem = this.getById(todo.children, id);
      }

      if (Object.keys(todoItem).length) break;
    }

    return todoItem;
  },

  removeById(todos: TodoItem[], id: TodoItem['id']): TodoItem[] {
    todos.forEach((todo) => {
      if (todo.id === id) todos = todos.filter((item) => item.id !== id);
      else if (todo.children.length) todo.children = this.removeById(todo.children, id);
    });

    return todos;
  },

  updateById(todos: TodoItem[], payload: UpdatePayload): TodoItem[] {
    const todosFragment = todoAPI.getById(todos, payload.id);
    todosFragment.content = payload.content;
    return todos;
  },

  createById(todos: TodoItem[], payload: CreatePayload): TodoItem[] {
    const todosAddPlace =
      payload.id === 'root' ? todos : todoAPI.getById(todos, payload.id).children;
    todosAddPlace.unshift({
      id: uniq(),
      order: todosAddPlace.length,
      done: URL_FILTER_OPTIONS.NEW,
      content: payload.content,
      children: [],
    });
    return todos;
  },

  checkById(todos: TodoItem[], id: TodoItem['id']): TodoItem[] {
    todos.forEach((todo) => {
      if (todo.id === id)
        todos.map((item) => {
          if (item.id === id) {
            item.done =
              item.done === URL_FILTER_OPTIONS.NEW
                ? URL_FILTER_OPTIONS.DONE
                : URL_FILTER_OPTIONS.NEW;
          }
          return item;
        });
      else if (todo.children.length) this.checkById(todo.children, id);
    });

    return todos;
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

  set: createAsyncThunk('todo/set', async (payload: SetPayload): Promise<TodoItem[]> => {
    await todoAPI.delay(0);
    todoAPI.save(payload.todos);
    return payload.todos;
  }),

  create: createAsyncThunk(
    'todo/update',
    async (payload: CreatePayload, thunkAPI): Promise<DumpReturn> => {
      let todos: TodoState['todos'] = await todoAPI.request();
      todos = todoAPI.createById(todos, payload);
      todoAPI.save(todos);
      thunkAPI.dispatch(setNotification({ show: true, status: NOTIFICATION_STATUS.CREATED }));
      return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
    }
  ),

  update: createAsyncThunk(
    'todo/update',
    async (payload: UpdatePayload, thunkAPI): Promise<DumpReturn> => {
      let todos: TodoState['todos'] = await todoAPI.request();
      todos = todoAPI.updateById(todos, payload);
      todoAPI.save(todos);
      thunkAPI.dispatch(setNotification({ show: true, status: NOTIFICATION_STATUS.UPDATED }));
      return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
    }
  ),

  remove: createAsyncThunk('todo/update', async (payload: RemovePayload): Promise<DumpReturn> => {
    let todos: TodoState['todos'] = await todoAPI.request();
    todos = todoAPI.removeById(todos, payload.id);
    todoAPI.save(todos);
    return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
  }),

  check: createAsyncThunk('todo/update', async (payload: RemovePayload): Promise<DumpReturn> => {
    let todos: TodoState['todos'] = await todoAPI.request();
    todos = todoAPI.checkById(todos, payload.id);
    todoAPI.save(todos);
    return todoAPI.dump(todoAPI.filter(todos, payload), payload.id);
  }),
};

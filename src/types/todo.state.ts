import { URL_FILTER_OPTIONS } from './url.search.params';

export interface TodoItem {
  id: string;
  order: number;
  done: URL_FILTER_OPTIONS;
  content: string;
  children: TodoItem[];
}

export interface TodoState {
  todos: TodoItem[];
  isLoading: boolean;
  isUpdating: Record<TodoItem['id'], boolean>;
}

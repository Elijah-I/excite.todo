export interface TodoItem {
  id: string;
  order: number;
  done: boolean;
  content: string;
  children: TodoItem[];
}

export interface TodoState {
  items: TodoItem[];
  isLoading: boolean;
}

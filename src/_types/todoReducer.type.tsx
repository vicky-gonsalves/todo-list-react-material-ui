import { Todo } from './todo.type';

export interface TodoMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface TodoReducer {
  isFetchingTodo: boolean;
  hasError: boolean;
  todos: Todo[];
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  selected?: Todo | null;
}

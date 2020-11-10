export interface Todo {
  id: string;
  title: string;
  description: string;
  due?: Date;
  done: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface TodoUpdate {
  title?: string;
  description?: string;
  due?: Date;
  done?: boolean;
  priority?: number;
}

export interface TodoActionProps {
  id: string;
  isEdit?: boolean;
  handleSubmit?: Function;
  isFetchingTodo?: boolean;
  values?: any,
  touched?: any,
  errors?: any,
  handleChange?: any,
  handleBlur?: any,
  isFetching?: any,
  setFieldTouched?: any,
  params?: Todo;
  onExited?: Function;
}

export interface TodoPaginationProps {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

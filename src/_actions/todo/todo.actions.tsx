import { errorActions, todoEditorDialogActions } from '..';
import { confirmDeleteDialogConstants, todoConstants } from '../../_constants';
import { todoService } from '../../_services';
import { Todo, TodoMeta, TodoUpdate } from '../../_types';

const setTodosFetching = (flag: boolean) => (dispatch: any) => {
  dispatch({ type: todoConstants.UPDATE_FETCHING, payload: flag });
};

const storeTodoList = (response: any) => (dispatch: any) => {
  dispatch({ type: todoConstants.TODO_STORE_ALL, payload: response });
};

const updateTodoInStore = (response: any) => (dispatch: any) => {
  dispatch({ type: todoConstants.TODO_UPDATED, payload: response });
};

const selectTodo = (response: any) => (dispatch: any) => {
  dispatch({ type: todoConstants.TODO_SELECTED, payload: response });
};

const removeTodo = (id: string) => (dispatch: any) => {
  dispatch({ type: todoConstants.TODO_DELETED, payload: id });
};

const closeDialog = () => (dispatch: any) => {
  dispatch({ type: confirmDeleteDialogConstants.CLOSE_CONFIRM });
};

const setMeta = (meta: TodoMeta) => (dispatch: any) => {
  dispatch({ type: todoConstants.TODO_SET_META, payload: meta });
};

const getTodos = (params?: any) => async (dispatch: any) => {
  try {
    dispatch(setTodosFetching(true));
    const response = await todoService.getTodos(params);
    dispatch(storeTodoList(response));
    dispatch(setMeta(response.meta));
    dispatch(selectTodo(response.items[0]));
    dispatch(setTodosFetching(false));
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

const addTodo = (data: Todo) => async (dispatch: any) => {
  try {
    dispatch(setTodosFetching(true));
    const response = await todoService.addTodo(data);
    dispatch(getTodos());
    dispatch(setTodosFetching(false));
    dispatch(todoEditorDialogActions.close());
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(todoEditorDialogActions.close())
  }
};

const updateTodo = (id: string, data: TodoUpdate) => async (dispatch: any) => {
  try {
    dispatch(setTodosFetching(true));
    const response = await todoService.updateTodo(id, data);
    dispatch(updateTodoInStore(response));
    dispatch(selectTodo(response));
    dispatch(setTodosFetching(false));
    dispatch(todoEditorDialogActions.close());
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(todoEditorDialogActions.close())
  }
};

const deleteDevice = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setTodosFetching(true));
    await todoService.deleteTodo(id);
    dispatch(removeTodo(id));
    dispatch(closeDialog());
    dispatch(getTodos());
    dispatch(setTodosFetching(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(closeDialog());
  }
};

export const todoActions = {
  getTodos,
  selectTodo,
  deleteDevice,
  setMeta,
  addTodo,
  updateTodo
};

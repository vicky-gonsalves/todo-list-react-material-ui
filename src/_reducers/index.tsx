/* istanbul ignore file */
import { combineReducers } from 'redux';
import { appConstants } from '../_constants';
import ConfirmDeleteDialogReducer from './confirm-delete/confirm-delete.reducer';
import PriorityReducer from './priority/priority.reducer';
import TodoEditorReducer from './todo-editor/todo-editor.reducer';
import TodoReducer from './todo/todo.reducer';

const appReducer = combineReducers({
  TodoReducer,
  ConfirmDeleteDialogReducer,
  PriorityReducer,
  TodoEditorReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === appConstants.CLEAR_DATA) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

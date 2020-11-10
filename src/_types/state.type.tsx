import { ConfirmDeleteReducer } from './confirmDeleteReducer.type';
import { PriorityReducer } from './priorityReducer.type';
import { TodoEditorReducer } from './todoEditorReducer.type';
import { TodoReducer } from './todoReducer.type';

export interface State {
  TodoReducer: TodoReducer;
  ConfirmDeleteDialogReducer: ConfirmDeleteReducer;
  PriorityReducer: PriorityReducer;
  TodoEditorReducer: TodoEditorReducer;
}

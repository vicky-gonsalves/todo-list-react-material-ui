import { todoEditorDialogConstants } from '../../_constants';
import { TodoEditorReducer } from '../../_types/todoEditorReducer.type';

const initialState: TodoEditorReducer = {
  open: false,
};

const todoEditorDialog = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case todoEditorDialogConstants.OPEN_TODO_EDITOR:
      return {
        ...state,
        open: true,
      };

    case todoEditorDialogConstants.CLOSE_TODO_EDITOR:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
export default todoEditorDialog;

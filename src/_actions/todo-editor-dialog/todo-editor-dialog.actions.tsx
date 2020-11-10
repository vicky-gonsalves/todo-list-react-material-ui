import { todoEditorDialogConstants } from '../../_constants';

const open = () => (dispatch: any) => dispatch({ type: todoEditorDialogConstants.OPEN_TODO_EDITOR });

const close = () => (dispatch: any) => dispatch({ type: todoEditorDialogConstants.CLOSE_TODO_EDITOR });

export const todoEditorDialogActions = {
  open,
  close,
};

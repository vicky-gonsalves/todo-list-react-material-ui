import { priorityDialogConstants } from '../../_constants';

const open = () => (dispatch: any) => dispatch({ type: priorityDialogConstants.OPEN_PRIORITY });

const close = () => (dispatch: any) => dispatch({ type: priorityDialogConstants.CLOSE_PRIORITY });

export const priorityDialogActions = {
  open,
  close,
};

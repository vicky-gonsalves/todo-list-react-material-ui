import { confirmDeleteDialogConstants } from '../../_constants';

const open = () => (dispatch: any) => dispatch({ type: confirmDeleteDialogConstants.OPEN_CONFIRM });

const close = () => (dispatch: any) => dispatch({ type: confirmDeleteDialogConstants.CLOSE_CONFIRM });

export const confirmDeleteDialogActions = {
  open,
  close,
};

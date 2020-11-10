import { confirmDeleteDialogConstants } from '../../_constants';
import { ConfirmDeleteReducer } from '../../_types';

const initialState: ConfirmDeleteReducer = {
  open: false,
};

const confirmDeleteDialog = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case confirmDeleteDialogConstants.OPEN_CONFIRM:
      return {
        ...state,
        open: true,
      };

    case confirmDeleteDialogConstants.CLOSE_CONFIRM:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
export default confirmDeleteDialog;

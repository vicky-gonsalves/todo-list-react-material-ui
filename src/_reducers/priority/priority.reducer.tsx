import { priorityDialogConstants } from '../../_constants';
import { PriorityReducer } from '../../_types';

const initialState: PriorityReducer = {
  open: false,
};

const priorityDialog = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case priorityDialogConstants.OPEN_PRIORITY:
      return {
        ...state,
        open: true,
      };

    case priorityDialogConstants.CLOSE_PRIORITY:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
export default priorityDialog;

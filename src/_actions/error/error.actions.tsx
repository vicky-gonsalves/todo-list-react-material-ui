import { errorConstants } from '../../_constants';

const clearError = () => (dispatch: (arg0: { type: string; }) => void) => {
  dispatch({
    type: errorConstants.CLEAR_ERROR,
  });
};

const setError = (error: any) => {
  return {
    type: errorConstants.SET_ERROR,
    payload: { error },
  };
};

export const errorActions = {
  clearError,
  setError,
};

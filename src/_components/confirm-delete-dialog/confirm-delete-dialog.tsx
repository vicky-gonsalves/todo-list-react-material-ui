import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDeleteDialogActions, todoActions } from '../../_actions';
import { DeleteConfirmDialogPropsType, State } from '../../_types';

export default function DeleteConfirmDialog(props: DeleteConfirmDialogPropsType) {
  const dispatch = useDispatch();
  const dialog = useSelector((state: State) => state && state.ConfirmDeleteDialogReducer);
  const open = dialog ? dialog.open : false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDeletion = () => {
    if (props.id != null) {
      dispatch(todoActions.deleteDevice(props.id));
    }
  };

  const handleClose = () => {
    dispatch(confirmDeleteDialogActions.close());
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete his Todo Item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeletion} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

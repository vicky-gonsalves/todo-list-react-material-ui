import { createStyles, TextField, Theme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../_actions';
import { priorityDialogActions } from '../../_actions/priority-dialog/priority-dialog.actions';
import { PriorityPropsType, State } from '../../_types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      minWidth: 300,
      marginBottom: theme.spacing(2)
    },
    formControl: {
      padding: theme.spacing(2)
    }
  }),
);


export default function PriorityDialog(props: PriorityPropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [priority, setPriority] = useState<number>(2);
  const dialog = useSelector((state: State) => state && state.PriorityReducer);
  const open = dialog ? dialog.open : false;

  const priorities = [
    {
      value: 1,
      label: 'Low',
    },
    {
      value: 2,
      label: 'Medium',
    },
    {
      value: 3,
      label: 'High',
    }
  ];

  const handleClose = () => {
    dispatch(priorityDialogActions.close());
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(event.target.value));
    if (props.id != null) {
      dispatch(todoActions.updateTodo(props.id, { priority: parseInt(event.target.value) }))
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{"Set Priority"}</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" className={classes.formControl}>
          <div>
            <TextField
              id="priority"
              select
              label="Filter by Priority"
              value={priority}
              onChange={handlePriorityChange}
              className={classes.select}
            >
              {priorities.map((option: any) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

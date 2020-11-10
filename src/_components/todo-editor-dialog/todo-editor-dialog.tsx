import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDeleteDialogActions } from '../../_actions';
import { State, TodoActionProps } from '../../_types';
import TodoForm from '../todo-editor/todo-editor';

export default function TodoEditorDialog(props: TodoActionProps) {
  const dispatch = useDispatch();
  const dialog = useSelector((state: State) => state && state.TodoEditorReducer);
  const open = dialog ? dialog.open : false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    dispatch(confirmDeleteDialogActions.close());
  };

  const renderEditorForm = () => {
    if (Component && typeof Component === 'function') {
      return (
        <TodoForm
          data-test="editorFormComponent"
          isEdit={props.isEdit}
          handleSubmit={props.handleSubmit}
          isFetching={props.isFetchingTodo}
          params={props}
          onExited={props.onExited}
        />
      );
    }
    return null;
  };


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="Editor"
        fullWidth={true}
      >
        <DialogTitle id="Editor">{props.isEdit ? "Edit Todo" : "Add new Todo Item"}</DialogTitle>
        <DialogContent>{renderEditorForm()}</DialogContent>
      </Dialog>
    </div>
  );
}

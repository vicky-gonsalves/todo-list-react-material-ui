import { Chip, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDeleteDialogActions, todoActions, todoEditorDialogActions } from '../../_actions';
import { priorityDialogActions } from '../../_actions/priority-dialog/priority-dialog.actions';
import { Todo } from '../../_types';
import DeleteConfirmDialog from '../confirm-delete-dialog/confirm-delete-dialog';
import PriorityDialog from '../priority-dialog/priority-dialog';
import TodoEditorDialog from '../todo-editor-dialog/todo-editor-dialog';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
  chip: {
    marginLeft: theme.spacing(5)
  },
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(10),
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function TodoAction(props: Todo) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(confirmDeleteDialogActions.open());
  }

  const handleSetPriority = () => {
    dispatch(priorityDialogActions.open());
  }

  const handleEditor = (edit: boolean) => {
    setIsEdit(edit);
    dispatch(todoEditorDialogActions.open());
  }

  const renderPriority = () => {
    let p = props.priority - 1;
    const priorities = ['Low Priority', 'Medium Priority', 'High Priority', 'Todo is Completed'];
    const icons = [<AcUnitIcon/>, <LowPriorityIcon/>, <PriorityHighIcon/>, <DoneIcon/>];
    if (props.done) {
      p = 3;
    }
    return <Chip
      className={classes.chip}
      icon={icons[p]}
      label={priorities[p]}
      color={props.priority === 3 && p !== 3 ? "secondary" : "primary"}
    />;
  }

  const renderDueDate = () => {
    if (props.due) {
      return <Chip
        className={classes.chip}
        icon={<WatchLaterIcon/>}
        label={`Due on ${moment(props.due).format('MMMM Do YYYY, h:mm:ss a')}`}
        color="primary"
      />;
    }
    return null;
  }

  const renderCreatedDate = () => {
    return <Chip
      className={classes.chip}
      label={`Created on ${moment(props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`}
      color="default"
    />;
  }

  const submitForm = useCallback((todo: Todo) => {
      let action = todoActions.addTodo(todo);
      if (isEdit) {
        action = todoActions.updateTodo(props.id, todo);
      }
      dispatch(action);
    },
    [isEdit, dispatch, props.id]
  );

  const onEditorDialogExited = useCallback(() => {
    dispatch(todoEditorDialogActions.close());
  }, [dispatch]);

  return (
    <React.Fragment>
      <DeleteConfirmDialog id={props.id}/>
      <PriorityDialog id={props.id}/>
      <TodoEditorDialog id={props.id} handleSubmit={submitForm} isEdit={isEdit} params={props} onExited={onEditorDialogExited}/>
      <div>
        <Tooltip title="Add New Todo" aria-label="Add New Todo">
          <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => {
            handleEditor(false)
          }}>
            <AddIcon/>
          </Fab>
        </Tooltip>
      </div>
      <footer className={classes.footer}>
        <div>
          <Tooltip title="Delete" aria-label="delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Set Priority" aria-label="Priority">
            <IconButton aria-label="Set Priority" onClick={handleSetPriority}>
              <FlagIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Todo" aria-label="Edit Todo">
            <IconButton aria-label="Edit Todo" onClick={() => {
              handleEditor(true)
            }}>
              <EditIcon/>
            </IconButton>
          </Tooltip>
          {renderPriority()}
          {renderDueDate()}
          {renderCreatedDate()}
        </div>
      </footer>
    </React.Fragment>
  );
}

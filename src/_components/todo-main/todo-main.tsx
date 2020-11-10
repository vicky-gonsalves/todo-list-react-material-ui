import { CssBaseline } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { TodoContext } from '../../_contexts/todo/todoContext.provider';
import TodoAction from '../todo-action/todo-action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      paddingTop: theme.spacing(3),
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    },
    todoMain: {
      flexGrow: 1,
      padding: theme.spacing(3),
      margin: 0,
    },
    title: {
      flexGrow: 1
    },
    offset: theme.mixins.toolbar,
  }),
);

export default function TodoMain() {
  const classes = useStyles();
  const todoContext: any = useContext(TodoContext);
  const todo = todoContext.todos.selected;

  const renderIfSelected = () => {
    if (todo) {
      return (
        <React.Fragment>
          <Paper className={classes.todoMain} square elevation={0}>
            <Toolbar disableGutters>
              <Typography variant='h4' className={classes.title}>
                {todo.title}
              </Typography>
            </Toolbar>
            <Divider/>
            <Typography variant="h5" className={classes.description}>
              {todo.description}
            </Typography>
          </Paper>
          <TodoAction {...todo}/>
        </React.Fragment>
      )
    }
    return null;
  }
  return (
    <React.Fragment>
      <CssBaseline/>
      <main className={classes.content}>
        <div className={classes.offset}/>
        {renderIfSelected()}
      </main>
    </React.Fragment>
  );
}

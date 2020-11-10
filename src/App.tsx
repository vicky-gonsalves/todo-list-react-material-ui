import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TodoList from './_components/todo-list/todo-list';
import TodoContextProvider from './_contexts/todo/todoContext.provider';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  offset: theme.mixins.toolbar,
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
        <TodoContextProvider>
          <TodoList/>
        </TodoContextProvider>
      </Container>
    </React.Fragment>
  );
}

export default App;

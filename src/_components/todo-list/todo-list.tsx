import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import SubjectIcon from '@material-ui/icons/Subject';
import WarningIcon from '@material-ui/icons/Warning';
import moment from 'moment';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../_actions';
import { TodoContext } from '../../_contexts/todo/todoContext.provider';
import { Todo } from '../../_types';
import Filter from '../filter/filter';
import FuzzySearch from '../fuzzy-search/fuzzy-search';
import Navbar from '../navbar/navbar';
import Sort from '../sort/sort';
import TodoMain from '../todo-main/todo-main';
import TodoPagination from '../todo-pagination/todo-pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '30%'
      },
      [theme.breakpoints.up('xl')]: {
        width: '20%'
      },
      flexShrink: 0,
      flexGrow: 1,
    },
    drawerPaper: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '30%'
      },
      [theme.breakpoints.up('xl')]: {
        width: '20%'
      },
    },
    drawerContainer: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    inline: {
      display: 'block',
    },
    offset: theme.mixins.toolbar,
    spacer: {
      flexGrow: 1,
    },
  }),
);

export default function TodoList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todoContext: any = useContext(TodoContext);
  const todosList = todoContext.todos.todos;
  const totalItems = todoContext.todos.totalItems;
  const currentPage = todoContext.todos.currentPage;
  const itemCount = todoContext.todos.itemCount;
  const itemsPerPage = todoContext.todos.itemsPerPage;
  const totalPages = todoContext.todos.totalPages;

  const handleClick = (todo: Todo) => {
    dispatch(todoActions.selectTodo(todo));
  }

  const renderTodoIcon = (todo: Todo) => {
    let defaultIcon = <SubjectIcon/>;
    if (todo.done) {
      defaultIcon = <DoneIcon color={'primary'}/>;
    } else if (todo.priority === 3) {
      defaultIcon = <WarningIcon color={'secondary'}/>;
    }
    return defaultIcon;
  }

  const renderTitle = (title: string) => {
    return (<Typography
      component="span"
      variant="h6"
      className={classes.inline}
      color="textPrimary"
      noWrap
    >
      {title}
    </Typography>);
  }

  const renderDescription = (desc: string, createdAt: Date) => {
    return (<React.Fragment>
      <Typography
        component="span"
        variant="body1"
        className={classes.inline}
        color="textPrimary"
        noWrap
      >
        {desc}
      </Typography>
      <Typography
        component="span"
        variant="caption"
        className={classes.inline}
        color="textPrimary"
        noWrap
      >
        Created on {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography>
    </React.Fragment>);
  }

  const renderList = () => {
    return todosList.map((todo: Todo) => (
      <React.Fragment key={todo.id}>
        <ListItem button onClick={() => {
          handleClick(todo)
        }}>
          <ListItemIcon>{renderTodoIcon(todo)}</ListItemIcon>
          <ListItemText primary={renderTitle(todo.title)} secondary={renderDescription(todo.description, todo.createdAt)}/>
        </ListItem>
        <Divider/>
      </React.Fragment>
    ))
  }

  const renderTodos = () => {
    if (todosList) {
      return (<div className={classes.root}>
        <CssBaseline/>
        <Navbar data-test="appNavBar"/>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.offset}/>
          <div className={classes.drawerContainer}>
            <div className={classes.drawerContainer}>
              <Toolbar>
                <FuzzySearch/>
                <div className={classes.spacer}/>
                <Sort/>
                <Filter/>
              </Toolbar>
              <List>{renderList()}</List>
            </div>
            <TodoPagination
              totalItems={totalItems}
              currentPage={currentPage}
              itemCount={itemCount}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}/>
          </div>
        </Drawer>
        <TodoMain/>
      </div>)
    }
    return null;
  }
  return renderTodos();
}

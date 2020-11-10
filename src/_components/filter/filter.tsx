import { createStyles, IconButton, Popover, TextField, Theme, Tooltip, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../_actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      '& div:first-child': {
        width: '350px',
      }
    },
    spacer: {
      flexGrow: 1,
    },
    formControl: {
      padding: theme.spacing(2)
    },
    select: {
      maxWidth: '100%',
      marginBottom: theme.spacing(2)
    },
    toolbar: {
      width: '350px'
    },
  }),
);


export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [done, setDone] = useState<boolean | null>(null);
  const [priority, setPriority] = useState<number>(2);

  const status = [
    {
      value: true,
      label: 'Completed',
    },
    {
      value: false,
      label: 'Incomplete',
    }
  ];

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    setDone(null);
    setPriority(2);
    handleClose();
  };

  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDone(Boolean(event.target.value));
    dispatch(todoActions.getTodos({ done: event.target.value, priority }));
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(event.target.value));
    dispatch(todoActions.getTodos({ done, priority: event.target.value }));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-menu' : undefined;

  return (
    <React.Fragment>
      <Tooltip title="Filter" aria-label="filter">
        <IconButton aria-controls="sort" aria-haspopup="true" onClick={handleClick}>
          <AppsIcon fontSize="inherit"/>
        </IconButton>
      </Tooltip>
      <Popover
        className={classes.menu}
        id={id}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Filter</Typography>
          <div className={classes.spacer}/>
          <div>
            <Tooltip title="Clear All" aria-label="clear all">
              <IconButton aria-label="clear" size="medium" onClick={handleClearAll}>
                <ClearAllIcon fontSize="inherit"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Close" aria-label="Close">
              <IconButton aria-label="close" size="medium" onClick={handleClose}>
                <CloseIcon fontSize="inherit"/>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        <form noValidate autoComplete="off" className={classes.formControl}>
          <div>
            <TextField
              id="done"
              select
              label="Filter by Todo Status"
              value={done}
              onChange={handleDoneChange}
              className={classes.select}
            >
              {status.map((option: any) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
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
      </Popover>
    </React.Fragment>
  );
}

import { createStyles, IconButton, Theme, Tooltip, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../_actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    spacer: {
      flexGrow: 1,
    },
  }),
);

export default function Sort() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (column: string) => {
    if (sort === column && order === 'ASC') {
      setOrder('DESC');
      dispatch(todoActions.getTodos({ sort: column, order: 'DESC' }));
    } else if (sort === column && order === 'DESC') {
      setOrder('ASC');
      dispatch(todoActions.getTodos({ sort: column, order: 'ASC' }));
    } else if (sort !== column) {
      setOrder('ASC');
      dispatch(todoActions.getTodos({ sort: column, order: 'ASC' }));
    }
    setSort(column);
    handleClose();
  };

  const renderIcon = (column: string) => {
    let icon = <SwapVertIcon fontSize="inherit"/>;
    if (sort === column && order === 'ASC') {
      icon = <ArrowUpwardIcon color={'secondary'}/>;
    } else if (sort === column && order === 'DESC') {
      icon = <ArrowDownwardIcon color={'secondary'}/>;
    }
    return icon;
  }

  return (
    <Toolbar>
      <div className={classes.spacer}/>
      <Tooltip title="Sort" aria-label="sort">
        <IconButton aria-controls="sort" aria-haspopup="true" onClick={handleClick}>
          <SwapVertIcon fontSize="inherit"/>
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          handleSort('title')
        }}>
          {renderIcon('title')}
          <Typography variant="subtitle1">Title</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleSort('due')
        }}>
          {renderIcon('due')}
          <Typography variant="subtitle1">Due Date</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleSort('done')
        }}>
          {renderIcon('done')}
          <Typography variant="subtitle1">Done</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleSort('priority')
        }}>
          {renderIcon('priority')}
          <Typography variant="subtitle1">Priority</Typography>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}

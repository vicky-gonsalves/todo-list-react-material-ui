import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../_actions';
import { TodoPaginationProps } from '../../_types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      display: 'flex',
      padding: theme.spacing(10),
      minHeight: theme.spacing(10),
    }
  }),
);

export default function TodoPagination(props: TodoPaginationProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getTodos = useCallback(() => {
    dispatch(todoActions.getTodos({ limit: rowsPerPage, page: page + 1 }))
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    if (page >= 0 && rowsPerPage >= 1) {
      getTodos();
    }
  }, [getTodos, page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      className={classes.pagination}
      component="div"
      count={props.totalItems}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

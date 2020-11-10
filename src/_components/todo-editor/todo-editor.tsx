import MomentUtils from '@date-io/moment';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormikBag, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TodoActionProps } from '../../_types';
import OverlayLoading from '../overlay-loading/OverlayLoading';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 150
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 200,
  },
  select: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 300,
  },
  spacer: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexGrow: 1,
  },
}));

const SimpleTodoForm = (props: any) => {
  const classes = useStyles();
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

  const renderOverlay = () => {
    if (isFetching) {
      return <OverlayLoading data-test="overlayComponent"/>;
    }
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFetching,
    onExited,
  } = props;

  const [dueDate, setDueDate] = useState(values.due);

  useEffect(() => {
    values.due = dueDate;
  }, [dueDate, values])

  const handleCancel = () => {
    if (onExited && typeof onExited === 'function') {
      onExited();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      {renderOverlay()}
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          type="text"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors.title && touched.title}
          helperText={errors.title && touched.title && errors.title}
          data-test="titleInput"
          value={values.title}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={10}
          name="description"
          label="Description"
          type="text"
          id="description"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors.description && touched.description}
          helperText={errors.description && touched.description && errors.description}
          data-test="descriptionInput"
          value={values.description}
        />
      </div>
      <div>
        <TextField
          id="done"
          name="done"
          select
          label="Todo Status"
          value={values.done}
          onChange={handleChange}
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
          name="priority"
          select
          label="Priority"
          value={values.priority}
          onChange={handleChange}
          className={classes.select}
        >
          {priorities.map((option: any) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            id="due"
            name="due"
            disabled={isFetching}
            value={dueDate}
            disablePast
            showTodayButton
            label="Due Date"
            format="YYYY/MM/DD hh:mm A"
            onChange={setDueDate}
            className={classes.select}
          />
        </MuiPickersUtilsProvider>
      </div>
      <Toolbar>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isFetching}
          data-test="submitButton"
        >
          Save
        </Button>
        <div className={classes.spacer}/>
        <Button
          type="reset"
          variant="contained"
          color="default"
          className={classes.submit}
          disabled={isFetching}
          data-test="cancelButton"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Toolbar>
    </form>
  );
};

const getInitialValues = (params: any, isEdit: any): any => {
  if (params && isEdit) {
    const { title, description, done, due, priority } = params.params;
    return { title, description, done, due, priority };
  }
  return { title: '', description: '', done: false, due: new Date(), priority: 2 };
};
export const TodoForm: any = withFormik({
  handleSubmit<Values, OuterProps>(values: Values, formikBag: FormikBag<OuterProps, Values>): void {
    // @ts-ignore
    formikBag.props.handleSubmit(values);
  },
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, params }: TodoActionProps) => {
    return getInitialValues(params, isEdit);
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .max(100)
      .required('Please enter Title'),
    description: yup
      .string()
      .max(500)
      .required('Please enter Description'),
    done: yup.boolean(),
    due: yup.date().min(new Date()),
    priority: yup.number().min(1).max(3),
  }),
  displayName: 'todoForm',
})(SimpleTodoForm);

export default TodoForm;

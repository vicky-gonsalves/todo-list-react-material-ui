import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../_types';

export const TodoContext = React.createContext({});

const TodoContextProvider = (props: { children: React.ReactNode; }) => {
  const todos = useSelector((state: State) => state && state.TodoReducer);
  return <TodoContext.Provider value={{ todos }}>{props.children}</TodoContext.Provider>;
};

export default TodoContextProvider;

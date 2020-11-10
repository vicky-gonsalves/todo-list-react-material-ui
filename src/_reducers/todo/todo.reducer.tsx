import { todoConstants } from '../../_constants';
import { Payload, Todo, TodoMeta, TodoReducer } from '../../_types';

const initialState: TodoReducer = {
  isFetchingTodo: false,
  hasError: false,
  todos: [],
  selected: null,
  totalItems: 0,
  itemCount: 0,
  itemsPerPage: 10,
  totalPages: 0,
  currentPage: 1,
};

const todos = (state = initialState, action: { type: any; payload: Payload | Todo | TodoMeta }) => {
  switch (action.type) {
    case todoConstants.UPDATE_FETCHING:
      return {
        ...state,
        isFetchingTodo: action.payload,
      };

    case todoConstants.TODO_STORE_ALL:
      return {
        ...state,
        isFetchingTodo: false,
        todos: 'items' in action.payload ? action.payload.items : [],
      };

    case todoConstants.TODO_SET_META:
      return {
        ...state,
        totalItems: 'totalItems' in action.payload ? action.payload.totalItems : 0,
        itemCount: 'itemCount' in action.payload ? action.payload.itemCount : 0,
        itemsPerPage: 'itemsPerPage' in action.payload ? action.payload.itemsPerPage : 10,
        totalPages: 'totalPages' in action.payload ? action.payload.totalPages : 0,
        currentPage: 'currentPage' in action.payload ? action.payload.currentPage : 1
      };

    case todoConstants.TODO_SELECTED:
      return {
        ...state,
        selected: action.payload
      };

    case todoConstants.TODO_CREATED:
      return {
        ...state,
        devices: [...state.todos, action.payload],
      };

    case todoConstants.TODO_UPDATED:
      const updateTodos = state.todos.map((todo: Todo) => {
        if ('id' in action.payload && todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });

      return {
        ...state,
        todos: updateTodos,
      };

    case todoConstants.TODO_DELETED:
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };

    case todoConstants.TODO_REFRESH:
      return {
        ...state,
        selected: state.todos[0],
      };

    default:
      return state;
  }

}
export default todos;

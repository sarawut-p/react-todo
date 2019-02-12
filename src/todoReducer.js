import { handleActions } from 'redux-actions';
import { addTodo, updateTodo, deleteTodo, toggleDone } from './todoActions';
import uuidv1 from 'uuid/v1';

export const initialState = {
  todos: {}
};

export const todoReducer = handleActions(
  {
    [addTodo]: (state, action) => {
      const {text} = action.payload;
      const todoItem = {
        uuid: uuidv1(),
        text,
        isDone: false
      };
      return {
        ...state,
        todos: Object.assign(state.todos, { [todoItem.uuid]: todoItem })
      };
    },
    [updateTodo]: (state, action) => {
      const { uuid, text } = action.payload;
      const itemToUpdate = state.todos[uuid];
      return {
        ...state,
        todos: Object.assign(state.todos, {
          [uuid]: Object.assign(itemToUpdate, { text })
        })
      };
    },
    [deleteTodo]: (state, action) => {
      const { uuid } = action.payload;
      const { [uuid]: value, ...todos } = state.todos;
      return {
        ...state,
        todos
      };
    },
    [toggleDone]: (state, action) => {
      const { uuid } = action.payload;
      const itemToUpdate = state.todos[uuid];
      return {
        ...state,
        todos: Object.assign(state.todos, {
          [uuid]: Object.assign(itemToUpdate, { isDone: !itemToUpdate.isDone })
        })
      };
    }
  },
  initialState
);

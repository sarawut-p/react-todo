import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAction, handleActions } from 'redux-actions';
import logger from 'redux-logger';
import uuidv1 from 'uuid/v1';

const initialState = {
  todos: {}
};

export const addTodo = createAction('ADD_TODO');
export const updateTodo = createAction('UPDATE_TODO');
export const deleteTodo = createAction('DELETE_TODO');
export const toggleDone = createAction('TOGGLE_DONE');

// As object key in handleActions:
const reducer = handleActions(
  {
    [addTodo]: (state, action) => {
      const todoItem = {
        uuid: uuidv1(''),
        text: action.payload,
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

const store = createStore(reducer, initialState, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

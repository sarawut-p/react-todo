import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import {createAction} from 'redux-actions';
import logger from 'redux-logger'
import uuidv1 from 'uuid/v1';

const initialState = {
    todos:[]
}

export const addTodo = createAction('ADD_TODO')

function todos(state, action) {
    if(action.type === 'ADD_TODO') {
        const todoItem = {uuid: uuidv1(''), text: action.payload}
        return {
            ...state,
            todos: [...state.todos, todoItem]
        }
    }
    return state;
}
const store = createStore(todos, initialState, applyMiddleware(logger))


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

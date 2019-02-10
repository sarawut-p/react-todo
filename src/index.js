import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {createAction} from 'redux-actions';

const initialState = {
    todos:['Go for a walk']
}

export const addTodo = createAction('ADD_TODO')

function todos(state = initialState.todos, action) {
    if(action.type === 'ADD_TODO') {
        return [action.payload];
    }
    return state;
}
const store = createStore(todos, initialState)


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

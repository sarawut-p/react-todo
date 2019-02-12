import {createAction} from 'redux-actions';

export const addTodo = createAction('TODO/ADD');
export const updateTodo = createAction('TODO/UPDATE');
export const deleteTodo = createAction('TODO/DELETE');
export const toggleDone = createAction('TODO/TOGGLE_DONE');
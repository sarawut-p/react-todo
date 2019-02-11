import React, { Component } from 'react';
import { Form, Button, Container, ProgressBar, Row, Col, ListGroup, ButtonToolbar } from 'react-bootstrap';
import './Todo.css';
import { connect } from "react-redux";
import {updateTodo, deleteTodo, toggleDone } from '../index';
import classNames from 'classnames';
import TodoAdd from './TodoAdd';
import TodoProgress from './TodoProgress';
import TodoItems from './TodoItems';

class Todo extends Component {
    render() {
        const { todos } = this.props;
        return (
            <Container>
                <TodoAdd/>
                <TodoProgress todos={todos}/>
                <TodoItems todos={todos}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: Object.values(state.todos),
    }
}


export default connect(mapStateToProps, null)(Todo);

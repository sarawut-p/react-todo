import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import './Todo.css';
import { connect } from "react-redux";
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
                <TodoItems label='To do' todos={todos.filter(item=>!item.isDone)}/>
                <TodoItems label='Done' todos={todos.filter(item=>item.isDone)}/>
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

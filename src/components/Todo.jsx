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
        const todoItems = todos.filter(item=>!item.isDone);
        const doneItems = todos.filter(item=>item.isDone);

        return (
            <Container>
                <TodoAdd/>
                <TodoProgress todos={todos}/>
                <TodoItems label={`Todo (${todoItems.length})`} todos={todoItems}/>
                <TodoItems label={`Done (${doneItems.length})`} todos={doneItems}/>
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

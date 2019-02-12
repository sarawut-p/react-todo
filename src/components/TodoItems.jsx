import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, ListGroup, ButtonToolbar } from 'react-bootstrap';
import './TodoItems.css';
import { connect } from "react-redux";
import classNames from 'classnames';
import { updateTodo, deleteTodo, toggleDone } from '../todoActions';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingUuid: '',
            editingText: '',
        };
    }

    getListItemReadMode = (item) => {
        const { toggleDone } = this.props;
        const { uuid, text, isDone } = item;
        const textClass = classNames({
            'done': isDone,
            'clickable': true
        });

        const startEditing = () => this.setEditingUuid(item);

        return <ListGroup.Item key={uuid}>
            <Container>
                <Row>
                    <Col xs="9">
                        <Form.Check type="checkbox" defaultChecked={isDone} onClick={() => toggleDone({ uuid })} />
                        <span className={textClass} onClick={startEditing}>{text}</span>
                    </Col>
                    <Col>
                        <ButtonToolbar>
                            <Button variant="primary" type="button" onClick={startEditing}>Edit</Button>
                            <Button variant="danger" type="button" onClick={() => this.deleteTodoItem(item)}>Delete</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    }

    deleteTodoItem = (item) => {
        const {uuid, text} = item;    
        const { deleteTodoItem } = this.props;
        if(window.confirm(`Do you want to delete ${text} ?`)) {
            deleteTodoItem({ uuid });
        }        
    }

    setEditingUuid = (item) => {
        const { uuid, text } = item;
        this.setState({ editingUuid: uuid, editingText: text });
    }

    canUpdate = () => this.state.editingText.trim();

    cancelUpdateItem = () => {
        this.setState({ editingUuid: '' });
    }

    updateTodoItem = () => {

        if(!this.canUpdate()) {
            return;
        }

        const { updateTodoItem } = this.props;
        const { editingUuid, editingText } = this.state;
        updateTodoItem({ uuid: editingUuid, text: editingText });
        this.setState({ editingUuid: '', editingText: '' });
    }

    getListItemEditMode = (item) => {
        const { uuid, text } = item;
        const onEditItemTextKeypress = (e) => {
            if (e.key === 'Enter') {
                this.updateTodoItem();
            }
        }
       
        return <ListGroup.Item key={uuid}>
            <Container>
                <Row>
                    <Col xs="9"><Form.Control type="text" onKeyPress={onEditItemTextKeypress} onChange={(e) => this.setState({ editingText: e.target.value })} defaultValue={text} placeholder="Add your todo item" /></Col>
                    <Col>
                        <ButtonToolbar>
                            <Button variant="primary" type="button" disabled={!this.canUpdate()} onClick={this.updateTodoItem}>Update</Button>
                            <Button variant="outline-secondary" type="button" onClick={this.cancelUpdateItem}>Cancel</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    }

    getListItem = () => {
        const { todos } = this.props;
        const { editingUuid } = this.state;
        return todos.map(item => item.uuid === editingUuid ? this.getListItemEditMode(item) : this.getListItemReadMode(item));
    }

    render() {
        const {label, todos} = this.props;
        
        if (todos.length === 0) {
            return null;
        }

        return (
            <Container className='todo-items'>
                <h2>{label}</h2>
                <ListGroup className="list-items">
                    {this.getListItem()}
                </ListGroup>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTodoItem: (todoItem) => {
            dispatch(updateTodo(todoItem));
        },
        deleteTodoItem: (todoItem) => {
            dispatch(deleteTodo(todoItem));
        },
        toggleDone: (params) => {
            dispatch(toggleDone(params));
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoItem);

import React, { Component } from 'react';
import { Form, Button, Container, InputGroup, ProgressBar, Row, Col, ListGroup, ButtonToolbar } from 'react-bootstrap';
import './App.css';
import {connect} from "react-redux";
import {addTodo, updateTodo, deleteTodo} from './index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItem:'',
      editingUuid:'',
      editingText: '',
    };
    this.todoItemInput = React.createRef();
  }

  getListItemReadMode = (item) => {
    const {uuid, text} = item;
    return <ListGroup.Item key={uuid}>
      <Container>
        <Row>
          <Col xs="9"><Form.Check type="checkbox" />{text}</Col>
          <Col>
            <ButtonToolbar>
              <Button variant="primary" type="button" onClick={() => this.setEditingUuid(uuid)}>Edit</Button>
              <Button variant="danger" type="button" onClick={()=>this.deleteTodoItem(uuid)}>Delete</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  }

  deleteTodoItem = (uuid) => {
    const {deleteTodoItem} = this.props;
    deleteTodoItem({uuid});
  }  

  setEditingUuid = (editingUuid) => {
    this.setState({editingUuid});
  }

  cancelUpdateItem = () => {
    this.setState({editingUuid: ''});
  }

  updateTodoItem = () => {
    const {updateTodoItem}  = this.props;
    const {editingUuid, editingText} = this.state;
    updateTodoItem({uuid: editingUuid, text:editingText});
    this.setState({editingUuid: '', editingText: ''});
  }  

  getListItemEditMode = (item) => {
    const {uuid, text} = item;
    return <ListGroup.Item key={uuid}>
      <Container>
        <Row>
          <Col xs="9"><Form.Control type="text" onChange={(e)=>this.setState({editingText: e.target.value})} defaultValue={text} placeholder="Add your todo item" /></Col>
          <Col>
            <ButtonToolbar>
              <Button variant="primary" type="button" onClick={this.updateTodoItem}>Update</Button>
              <Button variant="outline-secondary" type="button" onClick={this.cancelUpdateItem}>Cancel</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  } 

  getListItem = () => {
    const {todos} = this.props;
    const {editingUuid} = this.state;
    return Object.values(todos).map(item => item.uuid === editingUuid ? this.getListItemEditMode(item) : this.getListItemReadMode(item));
  }

  handleItemChange = (event) => {
    this.setState({currentItem: event.target.value});
  }

  handleAddButton = () => {
    const {addTodoItem} = this.props;
    addTodoItem(this.state.currentItem);
    this.setState({currentItem: ''});
    this.todoItemInput.current.focus(); //
  }

  componentDidMount() {
    this.todoItemInput.current.focus(); // one important change here is that we need to access the element via current.
  }  

  render() {
    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`Progress - ${now}%`} />;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <InputGroup >
                <Form.Control ref={this.todoItemInput} type="text" value={this.state.currentItem} onChange={this.handleItemChange} placeholder="Add your todo item" />
                <Button variant="primary" onClick={this.handleAddButton} type="submit">
                  Add
                 </Button>
              </InputGroup>
            </Row>
            <Row>
              <Col sm={12}>
                {progressInstance}
              </Col>
            </Row>
            <ListGroup className="list-items">
              {this.getListItem()}
            </ListGroup>
          </Container>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodoItem: (todoItem) => {
      dispatch(addTodo(todoItem));
    },
    updateTodoItem: (todoItem) => {
      dispatch(updateTodo(todoItem));
    },
    deleteTodoItem: (todoItem) => {
      dispatch(deleteTodo(todoItem));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

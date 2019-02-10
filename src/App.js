import React, { Component } from 'react';
import { Form, Button, Container, InputGroup, ProgressBar, Row, Col, ListGroup, ButtonToolbar } from 'react-bootstrap';
import './App.css';
import {connect} from "react-redux";
import {addTodo, updateTodo, deleteTodo, toggleDone} from './index';

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
    const {toggleDone} = this.props;
    const {uuid, text, isDone} = item;
    return <ListGroup.Item key={uuid}>
      <Container>
        <Row>
          <Col xs="9" className='clickable' onClick={()=>toggleDone({uuid})}>
            <Form.Check type="checkbox" defaultChecked={isDone}/>
            <span className={isDone && 'done'}>{text}</span>
          </Col>
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
    return todos.map(item => item.uuid === editingUuid ? this.getListItemEditMode(item) : this.getListItemReadMode(item));
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

  getProgressBar = () => {
    const {todos} = this.props;
    const total = todos.length;

    if(total === 0) {
      return null;
    }    

    const totalDone= todos.filter(item=>item.isDone).length;    
    const donePercentage = (totalDone / total) * 100;
    return (
      <Container>
        <Row>
        <Col xs="12">
          Progress - {totalDone || 0} of {todos.length} done
          </Col>
        </Row>
        <Row>
        <Col xs="12">          
          <ProgressBar now={donePercentage} label={`${donePercentage}%`} />
          </Col>          
        </Row>        
      </Container>      
    );
  }

  render() {


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
            {this.getProgressBar()}
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
    todos: Object.values(state.todos),    
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
    },
    toggleDone: (params) => {
      dispatch(toggleDone(params));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

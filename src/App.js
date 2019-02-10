import React, { Component } from 'react';
import { Form, Button, Container, InputGroup, ProgressBar, Row, Col, ListGroup, ButtonToolbar } from 'react-bootstrap';
import './App.css';
import {connect} from "react-redux";
import {addTodo} from './index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItem:''
    }
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.getListItem = this.getListItem.bind(this);
    this.textInput = React.createRef();
  }

  getListItem() {
    const {todos} = this.props;
    return todos && todos.map(item =><ListGroup.Item key={item}>
      <Container>
        <Row>
          <Col xs="9"><Form.Check type="checkbox" />{item}</Col>
          <Col>
            <ButtonToolbar>
              <Button variant="primary" type="button">Edit</Button>
              <Button variant="danger" type="button">Delete</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>);
  }

  handleItemChange(event){
    this.setState({currentItem: event.target.value});
  }

  handleAddButton(){
    const {addTodoItem} = this.props;
    addTodoItem(this.state.currentItem);
    this.setState({currentItem: ''});
    this.textInput.current.focus(); //
  }

  componentDidMount() {
    this.textInput.current.focus(); // one important change here is that we need to access the element via current.
  }  

  render() {
    const {todos} = this.props;
    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`Progress - ${now}%`} />;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <InputGroup >
                <Form.Control ref={this.textInput} type="text" value={this.state.currentItem} onChange={this.handleItemChange} placeholder="Add your todo item" />
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
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col xs="9"><Form.Control type="text" placeholder="Add your todo item" /></Col>
                    <Col>
                      <ButtonToolbar>
                        <Button variant="primary" type="button">Update</Button>
                        <Button variant="outline-secondary" type="button">Cancel</Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
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
    } 
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

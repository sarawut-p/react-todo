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
  }

  handleItemChange(event){
    this.setState({currentItem: event.target.value});
  }

  render() {
    // const {todos} = this.props;
    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`Progress - ${now}%`} />;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <InputGroup >
                <Form.Control type="text" value={this.state.currentItem} onChange={this.handleItemChange} placeholder="Add your todo item" />
                <Button variant="primary" onClick={()=>{}} type="submit">
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
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col xs="9"><Form.Check type="checkbox" />Cras justo odio</Col>
                    <Col>
                      <ButtonToolbar>
                        <Button variant="primary" type="button">Edit</Button>
                        <Button variant="danger" type="button">Delete</Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
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

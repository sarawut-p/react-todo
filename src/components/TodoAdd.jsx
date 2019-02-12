import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  InputGroup,
  Row,
} from 'react-bootstrap';
import {connect} from 'react-redux';
import { addTodo } from '../todoActions';

class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.todoItemInput = React.createRef();
    this.state = {
        currentItem: '',
    };
  }

  handleAddButton = () => {
    const { addTodoItem } = this.props;
    addTodoItem(this.state.currentItem);
    this.setState({ currentItem: '' });
    this.todoItemInput.current.focus();
  };

  componentDidMount() {
    this.todoItemInput.current.focus();
  }

  render() {
    const onAddItemTextKeypress = e => {
      if (e.key === 'Enter') {
        this.handleAddButton();
      }
    };
    return (
      <Container>
        <Row className="addItemBar">
          <InputGroup>
            <Form.Control
              ref={this.todoItemInput}
              onKeyPress={onAddItemTextKeypress}
              type="text"
              value={this.state.currentItem}
              onChange={(event)=>this.setState({ currentItem: event.target.value })}
              placeholder="Add your todo item"
            />
            <Button
              variant="primary"
              onClick={this.handleAddButton}
              type="submit"
            >
              Add
            </Button>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodoItem: todoItem => {
      dispatch(addTodo(todoItem));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TodoAdd);

import React, { Component } from 'react';
import {Form, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Container>
                <InputGroup >
                <Form.Control type="email" placeholder="Type what you need to get done here" />
                  <Button variant="primary" type="submit">
                    Add
                  </Button>                    
                </InputGroup>
            </Container>
        </header>
      </div>
    );
  }
}

export default App;

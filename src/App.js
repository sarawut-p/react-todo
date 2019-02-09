import React, { Component } from 'react';
import { Form, Button, Container, InputGroup, ProgressBar, Row, Col, ListGroup, Label, ButtonToolbar } from 'react-bootstrap';
import './App.css';


class App extends Component {
  render() {

    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`Progress - ${now}%`} />;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <InputGroup >
                <Form.Control type="text" placeholder="Add your todo item" />
                <Button variant="primary" type="submit">
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
              <ListGroup.Item action>
                <Container>
                  <Row>
                    <Col xs="10"><Form.Check type="checkbox"/>Cras justo odio</Col>
                    <Col>
                    <ButtonToolbar>
                      <Button variant="primary" type="button">Edit</Button>
                      <Button variant="danger" type="button">Delete</Button>
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

export default App;

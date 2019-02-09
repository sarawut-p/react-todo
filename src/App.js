import React, { Component } from 'react';
import {Form, Button, Container, InputGroup, ProgressBar, Row, Col} from 'react-bootstrap';
import './App.css';


class App extends Component {
  render() {

    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <InputGroup >
                <Form.Control type="email" placeholder="Type what you need to get done here" />
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
          </Container>
        </header>
      </div>
    );
  }
}

export default App;

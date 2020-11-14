import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Form, Button, Col } from 'react-bootstrap';

const InstrumentForm = (props) => {
  const { handleSubmit, value, handleInput } = props;
  return (<Form onSubmit={handleSubmit}>
    <Form.Row>
      <Col>
        <Form.Group controlId="formValue">
          <Form.Control type="text" value={value} onChange={handleInput}/>
        </Form.Group>
      </Col>
      <Col>
        <Button variant="outline-secondary" type="submit">
          OK
        </Button>
      </Col>
    </Form.Row>
  </Form>);
}

export default class Instrument extends React.Component{
  constructor (props) {
    super(props);
    const { instrument } = this.props;
    this.state = {
      isEditable: false,
      symbol: instrument.symbol,
      value: instrument.value,
      instrumentId: instrument._id,
    }
  }
  handleInput = (e) => {
    this.setState({ value: e.target.value });
  }
  handleSubmit = async () => {
    this.setState({ isEditable: false });
    await axios.post(`/portfolio/update`,
    {
      username: getContext().username,
      symbol: this.state.symbol,
      value: this.state.value
    },
    {
      auth: getContext(),
      baseURL: config.baseURL,
    });
  }
  handleToggle = () => {
    this.setState({ isEditable: true });
  }
  handleRemove = async () => { // curl -X POST -H "Content-Type: application/json" --user user11:111 --data '{"username": "user2", "symbol":"AAPL"}' localhost:4000/portfolio/remove
    await axios.post(`/portfolio/remove`,
    {
      username: getContext().username,
      symbol: this.state.symbol,
    },
    {
      auth: getContext(),
      baseURL: config.baseURL,
    });

  }
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
        <div className="col-7"><b>{this.state.symbol}</b></div>
        {this.state.isEditable ?
          <div className="col-3">
            <InstrumentForm 
              handleSubmit={this.handleSubmit} 
              value={this.state.value} 
              handleInput={this.handleInput}
            />
          </div> :
          <>
            <div className="col-1"><b>{this.state.value}</b></div>
            <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={this.handleToggle}>Изменить</button></div>
          </>}
        <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={this.handleRemove}>Удалить</button></div>
        </div>
      </li>
    )
  }
} 
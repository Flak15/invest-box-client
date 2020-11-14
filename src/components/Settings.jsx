import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import Instrument from './Instrument';
import { Modal, Button, Form } from 'react-bootstrap';

export default class Settings extends React.Component {
  state = {
    portfolio: [],
    modal: {
      show: false,
      symbol: '',
      value: ''
    }
  }
  async componentDidMount() {
    const res = await axios.get(`/portfolio/${getContext().username}`, {
      auth: getContext(),
      baseURL: config.baseURL
    });
    const portfolio = JSON.parse(res.data.p);
    this.setState({ portfolio });
  }
  showAddModal = () => {
    this.setState({  modal: { ...this.state.modal, show: true } });
  }
  handleClose = () => {
    this.setState({ modal: { ...this.state.modal, show: false } });
  }
  handleAdd = async () => {
    await axios.post(`/portfolio/add`,
    {
      username: getContext().username,
      symbol: this.state.modal.symbol,
      value: this.state.modal.value
    },
    {
      auth: getContext(),
      baseURL: config.baseURL,
    });
    this.setState({ modal: { show: false } });
  }
  handleInput = (e) => {
    this.setState({ modal: { ...this.state.modal, [e.target.name]: e.target.value } });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row justify-content-md-center">
            <h1 className="">Настройки портфеля</h1>
          </div>
          <div className="row justify-content-md-center">
          <ul className="list-group col-8">
              {this.state.portfolio.map(instrument => (<Instrument key={instrument._id} instrument={instrument} />))}
          </ul>
          </div>
          
          <div className="row justify-content-md-center mt-4">
            <div className="col-2 "><button type="button" className="btn btn-outline-secondary" onClick={this.showAddModal}>Добавить</button></div>
          </div>
        </div>
        <Modal show={this.state.modal.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить инструмент в портфель</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Тикер</Form.Label>
                <Form.Control type="text" placeholder="Введите название" name="symbol" value={this.state.modal.symbol} onChange={this.handleInput} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Количество</Form.Label>
                <Form.Control type="text" placeholder="Введите количество" name="value" value={this.state.modal.value} onChange={this.handleInput} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Закрыть
            </Button>
            <Button variant="secondary" onClick={this.handleAdd}>
              Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

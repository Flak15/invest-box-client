import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import Instrument from './Instrument';
import { Modal, Button, Form } from 'react-bootstrap';

const Settings = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalInput, setModalInput] = useState({  symbol: '', value: '' });

  const showModal = () => {
    setIsShowModal(true);
  }
  const hideModal = () => {
    setIsShowModal(false);
  }
  const addInstrument =  async () => {
      await axios.post(`/portfolio/add`,
      {
        username: getContext().username,
        symbol: modalInput.symbol,
        value: modalInput.value,
      },
      {
        auth: getContext(),
        baseURL: config.baseURL,
      });
      setIsShowModal(false);
    }
  
  
  const handleInput = (e) => {
    setModalInput( {...modalInput, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const getP = async () => {
      const res = await axios.get(`/portfolio/${getContext().username}`, {
        auth: getContext(),
        baseURL: config.baseURL
      });
      setPortfolio(JSON.parse(res.data.p));
    }
    getP();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <h1 className="">Настройки портфеля</h1>
        </div>
        <div className="row justify-content-md-center">
        <ul className="list-group col-8">
            {portfolio.map(instrument => (<Instrument key={instrument._id} instrument={instrument} setPortfolio={setPortfolio} />))}
        </ul>
        </div>
        <div className="row justify-content-md-center mt-4">
          <div className="col-2 "><button type="button" className="btn btn-outline-secondary" onClick={showModal}>Добавить</button></div>
        </div>
      </div>
      <Modal show={isShowModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить инструмент в портфель</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Тикер</Form.Label>
              <Form.Control type="text" placeholder="Введите название" name="symbol" value={modalInput.symbol} onChange={handleInput} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Количество</Form.Label>
              <Form.Control type="text" placeholder="Введите количество" name="value" value={modalInput.value} onChange={handleInput} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={hideModal}>
            Закрыть
          </Button>
          <Button variant="secondary" onClick={addInstrument}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Settings;

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import config from '../config';
import { getContext } from '../storage';
import Instrument from './Instrument';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Iauth, IportfolioItem } from '../types/index';
import { REQUEST_PORTFOLIO } from '../store/portfolio/actions/requestPortfolio';
import { ADD_PORTFOLIO_INSTRUMENT } from '../store/portfolio/actions/addPortfolioInstrument';

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState({ symbol: '', value: '' });
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.list);
  const loading = useSelector((state) => state.portfolio.loading);
  const doShowModal = () => {
    setShowModal(true);
  }
  const hideModal = () => {
    setShowModal(false);
  }
  const addInstrument = () => {
    dispatch(ADD_PORTFOLIO_INSTRUMENT(modalInput));
    setShowModal(false);
  }
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInput( {...modalInput, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(REQUEST_PORTFOLIO());
  }, [dispatch]);
  if (loading) {
    return <Spinner animation="border" variant="secondary" />
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <h1 className="">Настройки портфеля</h1>
        </div>
        <div className="row justify-content-md-center">
        <ul className="list-group col-8">
            {portfolio.map((instrument: IportfolioItem) => (<Instrument key={instrument._id} instrument={instrument} />))}
        </ul>
        </div>
        <div className="row justify-content-md-center mt-4">
          <div className="col-2 "><button type="button" className="btn btn-outline-secondary" onClick={doShowModal}>Добавить</button></div>
        </div>
      </div>
      <Modal show={showModal} onHide={hideModal}>
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
              <Form.Control type="text" placeholder="Введите количество" name="value" autoComplete="off" value={modalInput.value} onChange={handleInput} />
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

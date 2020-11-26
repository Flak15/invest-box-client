import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../config';
import { getContext } from '../storage';
import Instrument from './Instrument';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Iauth, IportfolioItem, Istate } from '../types/index';
import setPortfolioAction from 'src/store/actions/setPortfolio';

interface IsettingsComponentProps {
  portfolio: IportfolioItem[],
  setPortfolio: typeof setPortfolioAction,
}

const Settings = ({ portfolio, setPortfolio }: IsettingsComponentProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalInput, setModalInput] = useState({ symbol: '', value: '' });
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsShowModal(true);
  }
  const hideModal = () => {
    setIsShowModal(false);
  }
  const addInstrument =  async () => {
    try {
      const authData: Iauth | null = getContext();
      if (!authData) {
        throw new Error('User undefined!');
      }
      await axios.post(`/portfolio/add`, { username: authData.username, ...modalInput }, { 
        auth: authData,
        baseURL: config.baseURL,
      });
      const res = await axios.get(`/portfolio/${authData.username}`, {
        auth: authData,
        baseURL: config.baseURL
      });
      setPortfolio(JSON.parse(res.data.p));
    } catch (e) {
      alert(e.message);
      console.log('Error while adding new instrument: ', e);
    }
      setIsShowModal(false);
    }
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInput( {...modalInput, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setLoading(true);
    const getP = async () => {
      const authData: Iauth | null = getContext();
      try {
        if (!authData) {
          throw new Error('User undefined!');
        }
        const res = await axios.get(`/portfolio/${authData.username}`, {
          auth: authData,
          baseURL: config.baseURL
        });
        setPortfolio(JSON.parse(res.data.p));
        setLoading(false);
      } catch (e) {
        alert(e.message);
        console.log('Error while loading portfolio: ', e);
      }
    }
    getP();
  }, [setPortfolio]);
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

const mapStateToProps = (state: Istate) => {
  return {
    portfolio: state.portfolio,
  }  
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setPortfolio: bindActionCreators(setPortfolioAction, dispatch),
  }  
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

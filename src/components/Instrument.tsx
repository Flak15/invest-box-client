import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Form, Button, Col } from 'react-bootstrap';
import { Iauth, IportfolioItem } from '../types/index';

const InstrumentForm = (props: any) => {
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

const Instrument = (props: any) => {
  const [edit, setEdit] = useState(false);
  const { setPortfolio, instrument } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPortfolio((prevPortfolio: IportfolioItem[]) => prevPortfolio.map(inst => {
      if (inst._id === instrument._id) {
         return { ...inst, value: e.target.value };
      }
      return inst;
    }));
  }
  const handleSubmit = async () => {
    setEdit(false);
    try {
      const authData: Iauth | null = getContext();
      console.log('1');
      if (authData) {
        await axios.post(`/portfolio/update`,
        {
          username: authData.username,
          symbol: instrument.symbol,
          value: instrument.value
        },
        {
          auth: authData,
          baseURL: config.baseURL,
        });
      } else {
        console.log('User undefined!')
      }
    } catch (e) {
      console.log(e);
    }
  }
  const handleToggle = () => {
    setEdit(true);
  }
  const handleRemove = async () => {
    try {
      const authData: Iauth | null = getContext();
      if (authData) {
        await axios.post(`/portfolio/remove`,
        {
          username: authData.username,
          symbol: instrument.symbol,
        },
        {
          auth: authData,
          baseURL: config.baseURL,
        });
      } else {
        console.log('User undefined!')
      }
      setPortfolio((prevPortfolio: IportfolioItem[]) => prevPortfolio.filter(inst => inst._id !== instrument._id));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <li className="list-group-item">
      <div className="row">
      <div className="col-7"><b>{instrument.shortName}</b></div>
      {edit ?
        <div className="col-3">
          <InstrumentForm 
            handleSubmit={handleSubmit} 
            value={instrument.value} 
            handleInput={handleInput}
          />
        </div> :
        <>
          <div className="col-1"><b>{props.instrument.value}</b></div>
          <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleToggle}>Изменить</button></div>
        </>}
      <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleRemove}>Удалить</button></div>
      </div>
    </li>
  )
}

export default Instrument;

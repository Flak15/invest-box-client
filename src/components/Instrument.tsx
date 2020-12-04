import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Iauth, IportfolioItem } from '../types/index';
import { useDispatch, useSelector } from 'react-redux';
import InstrumentForm from './InstrumentForm';
import setPortfolioAction from 'src/store/actions/setPortfolio';

interface IinstrumentComponent {
  instrument: IportfolioItem,
}
const Instrument = ({ instrument }: IinstrumentComponent) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio);
  const handleSubmit = async () => {
    setEdit(false);
    try {
      const authData: Iauth | null = getContext();
      if (!authData) {
        throw new Error('User undefined!');
      }
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
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }
  const handleToggle = () => {
    setEdit(true);
  }
  const handleRemove = async () => {
    try {
      const authData: Iauth | null = getContext();
      if (!authData) {
        throw new Error('user undefined!');
      }
      await axios.post(`/portfolio/remove`,
      {
        username: authData.username,
        symbol: instrument.symbol,
      },
      {
        auth: authData,
        baseURL: config.baseURL,
      });
      dispatch(setPortfolioAction(portfolio.filter(inst => inst._id !== instrument._id)));
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

  return (
    <li className="list-group-item">
      <div className="row">
      <div className="col-7"><b>{instrument.priceData.shortName}</b></div>
      {edit ?
        <div className="col-3">
          <InstrumentForm instrument={instrument} handleSubmit={handleSubmit} />
        </div> :
        <>
          <div className="col-1"><b>{instrument.value}</b></div>
          <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleToggle}>Изменить</button></div>
        </>}
      <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleRemove}>Удалить</button></div>
      </div>
    </li>
  )
}

export default Instrument; 

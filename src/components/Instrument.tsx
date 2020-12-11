import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Iauth, IportfolioItem } from '../types/index';
import { useDispatch, useSelector } from 'react-redux';
import InstrumentForm from './InstrumentForm';
import setPortfolioAction from 'src/store/portfolio/actions/setPortfolio';
import { UPDATE_INSTRUMENT_VALUE } from '../store/portfolio/actions/updateValue';
import { REMOVE_INSTRUMENT } from 'src/store/portfolio/actions/removeInstrument';
interface IinstrumentComponent {
  instrument: IportfolioItem,
}
const Instrument = ({ instrument }: IinstrumentComponent) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(instrument.value);  
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.list);
  
  const handleSubmit = async () => {
    setEdit(false);
    if (value === instrument.value) {
      return ;
    }
    // try {
    //   const authData: Iauth | null = getContext();
    //   if (!authData) {
    //     throw new Error('User undefined!');
    //   }
    //   await axios.post(`/portfolio/update`,
    //   {
    //     username: authData.username,
    //     symbol: instrument.symbol,
    //     value: instrument.value
    //   },
    //   {
    //     auth: authData,
    //     baseURL: config.baseURL,
    //   });
    // } catch (e) {
    //   alert(e.message);
    //   console.log(e);
    // }
    dispatch(UPDATE_INSTRUMENT_VALUE(instrument.symbol, value));
  }
  const handleToggle = () => {
    setEdit(true);
  }
  const handleRemove = async () => {
    try {
      // const authData: Iauth | null = getContext();
      // if (!authData) {
      //   throw new Error('user undefined!');
      // }
      // await axios.post(`/portfolio/remove`,
      // {
      //   username: authData.username,
      //   symbol: instrument.symbol,
      // },
      // {
      //   auth: authData,
      //   baseURL: config.baseURL,
      // });
      // dispatch(setPortfolioAction(portfolio.filter(inst => inst._id !== instrument._id)));
      dispatch(REMOVE_INSTRUMENT(instrument.symbol));
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
          <InstrumentForm value={value} handleSubmit={handleSubmit} handleChange={setValue} />
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

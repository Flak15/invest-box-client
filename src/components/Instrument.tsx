import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Iauth, IportfolioItem, Istate } from '../types/index';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import InstrumentForm from './InstrumentForm';
import setPortfolioAction from 'src/store/actions/setPortfolio';

interface IinstrumentComponent {
  instrument: IportfolioItem,
  portfolio: IportfolioItem[],
  setPortfolio: (portfolio: IportfolioItem[]) => void
}
const Instrument = ({ instrument, portfolio, setPortfolio }: IinstrumentComponent) => {
  const [edit, setEdit] = useState(false);
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
      setPortfolio(portfolio.filter(inst => inst._id !== instrument._id));
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
const mapStateToProps = (state: Istate) => {
  return {
    portfolio: state.portfolio,
  }
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setPortfolio: bindActionCreators(setPortfolioAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instrument);

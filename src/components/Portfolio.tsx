import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Iauth, IportfolioItem, Istate } from '../types/index';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import setPortfolioAction from '../store/actions/setPortfolio';

interface IportfolioComponentProps {
  portfolio: IportfolioItem[],
  setPortfolio: typeof setPortfolioAction,
}

const Portfolio = ({ portfolio, setPortfolio }: IportfolioComponentProps) => {
  const [loading, setLoading] = useState(false);
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
  }, [setPortfolio]); // как правильно определять зависимости?
  if (loading) {
    return <Spinner animation="border" variant="secondary" />
  };
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <h1>Портфель</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
                <th scope="col">Price</th>
                <th scope="col">Total value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((instrument: IportfolioItem) => {
                return (
                  <tr key={instrument._id}>
                    <td>{instrument.symbol}</td>
                    <td>{instrument.shortName}</td>
                    <td>{instrument.value}</td>
                    <td>{(instrument.totalValue / instrument.value).toFixed(2)}</td>
                    <td>{instrument.totalValue.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h3>Стоимость портфеля: {portfolio.reduce((total: number, inst: IportfolioItem) => total + inst.totalValue, 0).toFixed(2)}</h3>
        </div>
      </div>
    </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
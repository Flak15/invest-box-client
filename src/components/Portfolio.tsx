import React from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { IportfolioItem } from '../types/index';
import { useDispatch, useSelector } from 'react-redux';
import { requestPortfolio } from '../store/portfolio/actions/requestPortfolio';

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.list);
  const loading = useSelector((state) => state.portfolio.loading);
  useEffect(() => {
    dispatch(requestPortfolio());
  }, [dispatch]);

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
                    <td>{instrument.priceData.shortName}</td>
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

export default Portfolio;
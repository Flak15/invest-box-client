import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useState, useEffect } from 'react';
import { Iauth, IportfolioItem } from '../types/index';
const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const getP = async () => {
      const authData: Iauth | null = getContext();
      if (authData) {
        const res = await axios.get(`/portfolio/${authData.username}`, {
          auth: authData,
          baseURL: config.baseURL
        });
        setPortfolio(JSON.parse(res.data.p));
      } else {
        console.log('User undefined!')
      }
    }
      getP();
  }, []); // как правильно определять зависимости?

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <h2>Портфель</h2>
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
                    <td>{instrument.totalValue / instrument.value}</td>
                    <td>{instrument.totalValue}</td>
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
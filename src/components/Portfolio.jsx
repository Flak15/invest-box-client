import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';

export default class Portfolio extends React.Component {
  state = {
    portfolio: []
  }

  async componentDidMount() {
    // Simple GET request using fetch
    const res = await axios.get(`/portfolio/${getContext().username}`, {
      auth: getContext(),
      baseURL: config.baseURL
    });
    const portfolio = JSON.parse(res.data.p);
    this.setState({ ...this.state, portfolio });
  }

  render() {
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
                {this.state.portfolio.map(instrument => {
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
            <h3>Стоимость портфеля: {this.state.portfolio.reduce((total, inst) => total + inst.totalValue, 0).toFixed(2)}</h3>
          </div>
        </div>
      </div>
    )
  }
}

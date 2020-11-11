import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';

const Instrument = (props) => {
  const { instrument } = props;
  return (

    <li className="list-group-item">
      <div className="row">
      <div className="col-7"><b>{instrument.symbol}</b></div>
      <div className="col-1"><b>{instrument.value}</b></div>
      <div className="col-2"><button type="button" className="btn btn-sm btn-light">Изменить</button></div>
      <div className="col-2"><button type="button" className="btn btn-sm btn-light">Удалить</button></div>
      </div>
    </li>

  )
}

export default class Settings extends React.Component {
  state = {
    user: '',
    pass: '',
    portfolio: []
  }

  async componentDidMount() {
    await this.setState({ ...getContext() });
    const res = await axios.get(`/portfolio/${this.state.user}`, {
      auth: {
          username: this.state.user,
          password: this.state.pass
      },
      baseURL: config.baseURL
    });
    const portfolio = JSON.parse(res.data.p);
    this.setState({ ...this.state, portfolio });
  }

  render() {
    return (

      <div className="container">
        <div className="row justify-content-md-center">
          <h1 className="">Настройки портфеля</h1>
        </div>
        <div className="row justify-content-md-center">
        <ul className="list-group col-8">
            {this.state.portfolio.map(instrument => (<Instrument key={instrument._id} instrument={instrument} />))}
        </ul>
        </div>
        
        <div className="row justify-content-md-center mt-4">
          <div className="col-2 "><button type="button" className="btn btn-outline-secondary">Добавить</button></div>
        </div>
      </div>

    )
  }
}

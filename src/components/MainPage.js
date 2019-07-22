import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { removeContext } from '../storage';

export default class MainPage extends React.Component {

  signOut = (e) => {
    e.preventDefault();
    removeContext();
    window.location.href='/';
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-2">
            <h3>Invest-box</h3>
          </div>
          <div className="col-6">
            <Link className="btn btn-primary" to='/news/'>Новости</Link>
            <Link className="btn btn-primary" to='/quotes/'>Котировки</Link>
            <Link className="btn btn-primary" to='/portfolio/'>Портфель</Link>
          </div>
          <div className="col-4">
            <Link className="btn btn-primary" to='/settings/'>Настройки</Link>
            <button type="submit" className="btn btn-primary" onClick={this.signOut}>Выход</button>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { removeContext } from '../storage';

export default class PersonalPage extends React.Component {

  signOut = (e) => {
    e.preventDefault();
    removeContext();
    window.location.href='/';
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
          <h1>Home</h1>
          </div>
        </div>
      </div>
    )
  }
}

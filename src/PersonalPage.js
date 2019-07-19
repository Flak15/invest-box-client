import React from 'react';
import { removeContext } from './storage';

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
          <p>Hello World!</p>
          <button type="submit" className="btn btn-primary" onClick={this.signOut}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}

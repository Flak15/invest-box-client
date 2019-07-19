import React from 'react';

export default class PersonalPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
          <p>Hello World!</p>
          <button type="submit" className="btn btn-primary">Sign out</button>
          </div>
        </div>
      </div>
    )
  }

}

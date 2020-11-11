import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';

export default class Portfolio extends React.Component {
  state = {
    user: '',
    pass: ''
  }

  async componentDidMount() {
    // Simple GET request using fetch
    await this.setState({ ...getContext() });
    console.log(this.state.user, this.state.pass);
    axios.get(`/portfolio/${this.state.user}`, {
      // headers: {
      //   Authorization: `${this.state.user}:${this.state.pass}`
      // },
      auth: {
          username: this.state.user,
          password: this.state.pass
      },
      baseURL: config.baseURL,
    }).then(res => console.log(res));
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <h1>Portfolio</h1>
            <p>User: {this.state.user}</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Symbol</th>
                  <th scope="col">Value</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total value</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

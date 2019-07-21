import React from 'react';
import axios from 'axios';
import './App.css';
import { setContext } from './storage';

export default class AuthForm extends React.Component {
  state = {
    user: '',
    pass: ''
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('/', {
          auth: {
              username: this.state.user,
              password: this.state.pass
          },
          baseURL: 'http://localhost:4000',
        }
      );
      setContext(this.state);
      window.location.reload();
    } catch (e) {
      alert('login error!');
      console.log(e);
    }
    this.setState({user: '', pass: ''});
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="user">User</label>
                <input type="text" className="form-control" id="user" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.onChange} value={this.state.user}/>
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input type="password" className="form-control" id="pass" placeholder="Password" onChange={this.onChange} value={this.state.pass}/>
              </div>
              <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    )
  };
};

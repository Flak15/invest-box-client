import React from 'react';
import axios from 'axios';
import './App.css';


export default class AuthForm extends React.Component {

  state = {
    username: '',
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
              username: this.state.username,
              password: this.state.pass
          },
          baseURL: 'http://localhost:4000',
        }
      );
      console.log(res.status);
    } catch (e) {
      console.log(e);
    }

    this.setState({username: '', pass: ''});
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">User</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.onChange} value={this.state.username}/>
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

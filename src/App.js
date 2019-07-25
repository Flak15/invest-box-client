import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { getContext } from './storage';
import Nav from './components/Nav';
import News from './components/News';
import Portfolio from './components/Portfolio';
import Quotes from './components/Quotes';
import Settings from './components/Settings';
import Main from './components/Main';


export default class App extends React.Component {
  state = { auth: 'out' }

  login = () => {
    this.setState({auth: 'login'});
  }

  logout = () => {
    this.setState({auth: 'logout'});
  }

  componentDidMount() {
    this.setState({auth: getContext() ? 'login' : 'logout'})
  }

  render() {
    if (this.state.auth === 'login') {
      return (
        <Router>
          <Nav logout={this.logout} />
          <Route path="/" exact component={Main} />
          <Route path="/news/" component={(News)} />
          <Route path="/portfolio/" component={(Portfolio)} />
          <Route path="/quotes/" component={(Quotes)} />
          <Route path="/settings/" render={props => <Settings {...props} change={this.testChangeState} />} />
        </Router>
      );
    } else {
      return <AuthForm onLogin={this.login}/>;
    }
  }
}

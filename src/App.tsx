import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { getContext } from './storage';
import NavBar from './components/NavBar';
import News from './components/News';
import Portfolio from './components/Portfolio';
import Quotes from './components/Quotes';
import Settings from './components/Settings';
import Main from './components/Main';
import Registration from './components/Registration';
const App = () => {
  const [auth, setAuth] = useState('logout');
  const login = () => {
    setAuth('login');
  }
  const logout = () => {
    setAuth('logout');
  }
  useEffect(() => {
    setAuth(getContext() ? 'login' : 'logout'); 
  }, []);

  if (auth === 'login') {
    return (
      <Router>
        <NavBar logout={logout} />
          <Route path="/" exact component={Main} />
          <Route path="/news/" component={News} />
          <Route path="/portfolio/" component={Portfolio} />
          <Route path="/quotes/" component={Quotes} />
          <Route path="/settings/" component={Settings} />
          {/* render={props => <Settings {...props}/> для чего это*/} 
      </Router>
    );
  } else {
    return (
      <Router>
        <Route path="/" exact render={props => <AuthForm onLogin={login}/>} />
        <Route path="/registration" component={Registration} /> 
      </Router>
    
    );
  }
}

export default App;

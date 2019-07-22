import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import PersonalPage from './components/PersonalPage';
import { getContext } from './storage';
import MainPage from './components/Nav';
import News from './components/News';
import Portfolio from './components/Portfolio';
import Quotes from './components/Quotes';
import Settings from './components/Settings';


const isAuth = () => getContext();

const protect = (elementToProtect) => {
  if (isAuth()) {
    return elementToProtect;
  } else {
    return AuthForm;
  }
};

function App() {
  return (
    <Router>
      <Route path="/" component={protect(MainPage)} />
      <Route path="/news/" exact component={protect(News)} />
      <Route path="/portfolio/" exact component={protect(Portfolio)} />
      <Route path="/quotes/" exact component={protect(Quotes)} />
      <Route path="/settings/" exact component={protect(Settings)} />
    </Router>
  );
};

export default App;

      // <Router>
      //   <div>
      //     <Route
      //       path="/" exact
      //       component={}
      //     />
      //     <Route path="/news/" component={News} />
      //   </div>
      // </Router>

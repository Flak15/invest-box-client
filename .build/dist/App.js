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
const App = () => {
    const [auth, setAuth] = useState('logout');
    const login = () => {
        setAuth('login');
    };
    const logout = () => {
        setAuth('logout');
    };
    useEffect(() => {
        setAuth(getContext() ? 'login' : 'logout');
    }, []);
    if (auth === 'login') {
        return (React.createElement(Router, null,
            React.createElement(NavBar, { logout: logout }),
            React.createElement(Route, { path: "/", exact: true, component: Main }),
            React.createElement(Route, { path: "/news/", component: News }),
            React.createElement(Route, { path: "/portfolio/", component: Portfolio }),
            React.createElement(Route, { path: "/quotes/", component: Quotes }),
            React.createElement(Route, { path: "/settings/", component: Settings })));
    }
    else {
        return React.createElement(AuthForm, { onLogin: login });
    }
};
export default App;

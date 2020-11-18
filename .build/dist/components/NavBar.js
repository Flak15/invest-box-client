import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { removeContext } from '../storage';
const NavBar = (props) => {
    const signOut = (e) => {
        e.preventDefault();
        removeContext();
        props.logout();
        window.history.pushState(null, 'signOut', '/');
    };
    return (React.createElement(Navbar, { bg: "light", expand: "lg" },
        React.createElement(Navbar.Brand, { href: "/" }, "Invest-Box"),
        React.createElement(Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
        React.createElement(Navbar.Collapse, { id: "basic-navbar-nav" },
            React.createElement(Nav, { className: "mr-auto" },
                React.createElement(Link, { className: "nav-link", to: "/news" }, "\u041D\u043E\u0432\u043E\u0441\u0442\u0438"),
                React.createElement(Link, { className: "nav-link", to: "/quotes" }, "\u041A\u043E\u0442\u0438\u0440\u043E\u0432\u043A\u0438"),
                React.createElement(Link, { className: "nav-link", to: "/portfolio" }, "\u041F\u043E\u0440\u0442\u0444\u0435\u043B\u044C"),
                React.createElement(Link, { className: "nav-link", to: "/settings" }, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438")),
            React.createElement(Nav, { className: "ml-auto" },
                React.createElement(Button, { variant: "outline-secondary", onClick: signOut }, "\u0412\u044B\u0445\u043E\u0434")))));
};
export default NavBar;

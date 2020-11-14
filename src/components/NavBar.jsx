import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { removeContext } from '../storage';

export default class NavBar extends React.Component {

  signOut = (e) => {
    e.preventDefault();
    removeContext();
    this.props.logout();
    window.history.pushState(null, null, '/');
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Invest-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/news">Новости</Link>
            <Link className="nav-link" to="/quotes">Котировки</Link>
            <Link className="nav-link" to="/portfolio">Портфель</Link>
            <Link className="nav-link" to="/settings">Настройки</Link>
          </Nav>
          <Nav className="ml-auto">
            <Button variant="outline-secondary" onClick={this.signOut}>Выход</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

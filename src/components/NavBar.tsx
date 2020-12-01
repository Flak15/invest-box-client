import React, { MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { removeContext } from '../storage';

interface InavBarComponent {
  logout: () => void
}

const NavBar = ({ logout }: InavBarComponent) => {
  const history = useHistory();
  const signOut = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    removeContext();
    logout();
    history.push('/');
  }
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
          <Button variant="outline-secondary" onClick={signOut}>Выход</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
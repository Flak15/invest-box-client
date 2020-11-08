import React from 'react';
import axios from 'axios';
import { setContext } from '../storage';
import config from '../config';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

export default class AuthForm extends React.Component {
  state = {
    user: '',
    pass: ''
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/', {
          auth: {
              username: this.state.user,
              password: this.state.pass
          },
          baseURL: config.baseURL,
        }
      );
      this.props.onLogin();
      setContext(this.state);
    } catch (e) {
      alert('login error!');
      console.log(e);
    }
    this.setState({user: '', pass: ''});
  }

  render() {
    return (
      <Container className="p-4">
        <Jumbotron>
          <Form onSubmit={this.onSubmit}>
            <h2>Вход в кабинет</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="name" name="user" placeholder="Введите ваш логин" onChange={this.onChange} value={this.state.user}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" name="pass" placeholder="Введите ваш пароль" onChange={this.onChange} value={this.state.pass}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Вход
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    )
  };
};

import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { setContext } from '../storage';
import config from '../config';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

const AuthForm = (props: any) => {
  const [formInputs, setFormInputs] = useState({ username: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }
  const onSubmit = async () => {
    try {
      await axios.get('/', {
          auth: formInputs,
          baseURL: config.baseURL,
        }
      );
      props.onLogin();
      setContext(formInputs);
    } catch (e) {
      alert('login error!');
      console.log(e);
    }
    setFormInputs({ username: '', password: '' });
  }

  return (
    <Container className="p-4">
      <Jumbotron>
        <Form onSubmit={onSubmit}>
          <h2>Вход в кабинет</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="name" name="username" placeholder="Введите ваш логин" onChange={onChange} value={formInputs.username}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" name="password" placeholder="Введите ваш пароль" onChange={onChange} value={formInputs.password}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Вход
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}
export default AuthForm;

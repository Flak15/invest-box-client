import React, { ChangeEvent, useState } from "react";
// import axios from 'axios';
// import { setContext } from '../storage';
// import config from '../config';
import { Form, Button, Container, Jumbotron } from "react-bootstrap";

interface IauthFormComponent {
  onLogin: () => void;
}

const AuthForm = ({ onLogin }: IauthFormComponent) => {
  const [formInputs, setFormInputs] = useState({ username: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const onSubmit = async () => {
    // try {
    //   await axios.get('/', {
    //       auth: formInputs,
    //       baseURL: config.baseURL,
    //     }
    //   );
    //
    //   setContext(formInputs);
    // } catch (e) {
    //   alert(e.message);
    //   console.log('Login error: ', e);
    // }
    onLogin();
    setFormInputs({ username: "", password: "" });
  };

  return (
    <Container className="p-4">
      <Jumbotron>
        <Form onSubmit={onSubmit}>
          <h2>Вход в кабинет</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="name"
              name="username"
              placeholder="Введите ваш логин"
              onChange={onChange}
              value={formInputs.username}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Введите ваш пароль"
              onChange={onChange}
              value={formInputs.password}
            />
          </Form.Group>
          <Button className="mr-2" variant="secondary" type="submit">
            Вход
          </Button>
          <Button href="/registration" variant="outline-secondary">
            Регистрация
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
};
export default AuthForm;

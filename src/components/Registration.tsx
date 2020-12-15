import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/user/actions/addUser';

const Registration = () => {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({ username: '', password: '', code: '' });
  const dispatch = useDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   await axios.post('/user', { ...formInputs }, { baseURL: config.baseURL });
    //   history.push('/');
    // } catch (e) {
    //   alert(e.message);
    //   console.log('Registration error: ', e);
    // }
    dispatch(addUser(formInputs));
    setFormInputs({ username: '', password: '', code: '' });
  }
  return (
    <Container className="p-4">
      <Jumbotron>
        <Form onSubmit={onSubmit}>
          <h2>Вход в кабинет</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control type="name" name="username" placeholder="Введите имя нового пользователя" onChange={onChange} value={formInputs.username}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" name="password" placeholder="Задайте пароль" onChange={onChange} value={formInputs.password}/>
          </Form.Group>
          <Form.Group controlId="formBasicCode">
            <Form.Label>Секретный код</Form.Label>
            <Form.Control type="text" name="code" placeholder="Введите код" onChange={onChange} value={formInputs.code}/>
          </Form.Group>
          <Button className="mr-2" variant="secondary" type="submit">
            Создать пользователя
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default Registration;
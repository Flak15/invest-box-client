import React, { useState } from 'react';
import axios from 'axios';
import { setContext } from '../storage';
import config from '../config';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';
const AuthForm = (props) => {
    const [formInputs, setFormInputs] = useState({ username: '', password: '' });
    const onChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    };
    const onSubmit = async () => {
        try {
            console.log(formInputs);
            await axios.get('/', {
                auth: formInputs,
                baseURL: config.baseURL,
            });
            props.onLogin();
            setContext(formInputs);
        }
        catch (e) {
            alert('login error!');
            console.log(e);
        }
        setFormInputs({ username: '', password: '' });
    };
    return (React.createElement(Container, { className: "p-4" },
        React.createElement(Jumbotron, null,
            React.createElement(Form, { onSubmit: onSubmit },
                React.createElement("h2", null, "\u0412\u0445\u043E\u0434 \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442"),
                React.createElement(Form.Group, { controlId: "formBasicEmail" },
                    React.createElement(Form.Label, null, "\u041B\u043E\u0433\u0438\u043D"),
                    React.createElement(Form.Control, { type: "name", name: "username", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043B\u043E\u0433\u0438\u043D", onChange: onChange, value: formInputs.username })),
                React.createElement(Form.Group, { controlId: "formBasicPassword" },
                    React.createElement(Form.Label, null, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                    React.createElement(Form.Control, { type: "password", name: "password", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C", onChange: onChange, value: formInputs.password })),
                React.createElement(Button, { variant: "primary", type: "submit" }, "\u0412\u0445\u043E\u0434")))));
};
export default AuthForm;

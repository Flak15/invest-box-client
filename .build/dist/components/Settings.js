import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import Instrument from './Instrument';
import { Modal, Button, Form } from 'react-bootstrap';
const Settings = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalInput, setModalInput] = useState({ symbol: '', value: '' });
    const showModal = () => {
        setIsShowModal(true);
    };
    const hideModal = () => {
        setIsShowModal(false);
    };
    const addInstrument = async () => {
        const authData = getContext();
        if (authData) {
            await axios.post(`/portfolio/add`, {
                username: authData.username,
                symbol: modalInput.symbol,
                value: modalInput.value,
            }, {
                auth: authData,
                baseURL: config.baseURL,
            });
        }
        else {
            console.log('User undefined!');
        }
        setIsShowModal(false);
    };
    const handleInput = (e) => {
        setModalInput({ ...modalInput, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const getP = async () => {
            const authData = getContext();
            if (authData) {
                const res = await axios.get(`/portfolio/${authData.username}`, {
                    auth: authData,
                    baseURL: config.baseURL
                });
                setPortfolio(JSON.parse(res.data.p));
            }
            else {
                console.log('User undefined!');
            }
        };
        getP();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row justify-content-md-center" },
                React.createElement("h1", { className: "" }, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044F")),
            React.createElement("div", { className: "row justify-content-md-center" },
                React.createElement("ul", { className: "list-group col-8" }, portfolio.map((instrument) => (React.createElement(Instrument, { key: instrument._id, instrument: instrument, setPortfolio: setPortfolio }))))),
            React.createElement("div", { className: "row justify-content-md-center mt-4" },
                React.createElement("div", { className: "col-2 " },
                    React.createElement("button", { type: "button", className: "btn btn-outline-secondary", onClick: showModal }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")))),
        React.createElement(Modal, { show: isShowModal, onHide: hideModal },
            React.createElement(Modal.Header, { closeButton: true },
                React.createElement(Modal.Title, null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0432 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C")),
            React.createElement(Modal.Body, null,
                React.createElement(Form, null,
                    React.createElement(Form.Group, { controlId: "formBasicEmail" },
                        React.createElement(Form.Label, null, "\u0422\u0438\u043A\u0435\u0440"),
                        React.createElement(Form.Control, { type: "text", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", name: "symbol", value: modalInput.symbol, onChange: handleInput })),
                    React.createElement(Form.Group, { controlId: "formBasicPassword" },
                        React.createElement(Form.Label, null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E"),
                        React.createElement(Form.Control, { type: "text", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E", name: "value", value: modalInput.value, onChange: handleInput })))),
            React.createElement(Modal.Footer, null,
                React.createElement(Button, { variant: "outline-secondary", onClick: hideModal }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"),
                React.createElement(Button, { variant: "secondary", onClick: addInstrument }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")))));
};
export default Settings;

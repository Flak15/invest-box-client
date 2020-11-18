import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { Form, Button, Col } from 'react-bootstrap';
const InstrumentForm = (props) => {
    const { handleSubmit, value, handleInput } = props;
    return (React.createElement(Form, { onSubmit: handleSubmit },
        React.createElement(Form.Row, null,
            React.createElement(Col, null,
                React.createElement(Form.Group, { controlId: "formValue" },
                    React.createElement(Form.Control, { type: "text", value: value, onChange: handleInput }))),
            React.createElement(Col, null,
                React.createElement(Button, { variant: "outline-secondary", type: "submit" }, "OK")))));
};
const Instrument = (props) => {
    const [edit, setEdit] = useState(false);
    const { setPortfolio, instrument } = props;
    const handleInput = (e) => {
        setPortfolio((prevPortfolio) => prevPortfolio.map(inst => {
            if (inst._id === instrument._id) {
                return { ...inst, value: e.target.value };
            }
            return inst;
        }));
    };
    const handleSubmit = async () => {
        // alert(1111);
        // // setEdit(false);
        // try {
        //   const authData: Iauth | null = getContext();
        //   console.log('1');
        //   if (authData) {
        //     const res = await axios.post(`/portfolio/update`,
        //     {
        //       username: authData.username,
        //       symbol: instrument.symbol,
        //       value: instrument.value
        //     },
        //     {
        //       auth: authData,
        //       baseURL: config.baseURL,
        //     });
        //     const res = await axios.get(`/portfolio/${authData.username}`, {
        //       auth: authData,
        //       baseURL: config.baseURL
        //     });
        //     setPortfolio(JSON.parse(res.data.p));
        //   } else {
        //     console.log('User undefined!')
        //   }
        // } catch (e) {
        //   console.log(e);
        // }
    };
    const handleToggle = () => {
        setEdit(true);
    };
    const handleRemove = async () => {
        try {
            const authData = getContext();
            if (authData) {
                await axios.post(`/portfolio/remove`, {
                    username: authData.username,
                    symbol: instrument.symbol,
                }, {
                    auth: authData,
                    baseURL: config.baseURL,
                });
            }
            else {
                console.log('User undefined!');
            }
            setPortfolio((prevPortfolio) => prevPortfolio.filter(inst => inst._id !== instrument._id));
        }
        catch (e) {
            console.log(e);
        }
    };
    return (React.createElement("li", { className: "list-group-item" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-7" },
                React.createElement("b", null, instrument.shortName)),
            edit ?
                React.createElement("div", { className: "col-3" },
                    React.createElement(InstrumentForm, { handleSubmit: handleSubmit, value: instrument.value, handleInput: handleInput })) :
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "col-1" },
                        React.createElement("b", null, props.instrument.value)),
                    React.createElement("div", { className: "col-2" },
                        React.createElement("button", { type: "button", className: "btn btn-sm btn-light", onClick: handleToggle }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"))),
            React.createElement("div", { className: "col-2" },
                React.createElement("button", { type: "button", className: "btn btn-sm btn-light", onClick: handleRemove }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))));
};
export default Instrument;

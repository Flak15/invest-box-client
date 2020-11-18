import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useState, useEffect } from 'react';
const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    useEffect(() => {
        const getP = async () => {
            const authData = getContext();
            if (authData) {
                const res = await axios.get(`/quotes/${authData.username}`, {
                    auth: authData,
                    baseURL: config.baseURL
                });
                setQuotes(JSON.parse(res.data.quotes));
            }
            else {
                console.log('User undefined!');
            }
        };
        getP();
    }, []);
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "row justify-content-md-center" },
            React.createElement("div", { className: "col-6" },
                React.createElement("h1", null, "Quotes")))));
};
export default Quotes;

import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useState, useEffect } from 'react';
const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
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
    }, []); // как правильно определять зависимости?
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "row justify-content-md-center" },
            React.createElement("div", { className: "col-6" },
                React.createElement("h2", null, "\u041F\u043E\u0440\u0442\u0444\u0435\u043B\u044C"),
                React.createElement("table", { className: "table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { scope: "col" }, "Symbol"),
                            React.createElement("th", { scope: "col" }, "Name"),
                            React.createElement("th", { scope: "col" }, "Value"),
                            React.createElement("th", { scope: "col" }, "Price"),
                            React.createElement("th", { scope: "col" }, "Total value"))),
                    React.createElement("tbody", null, portfolio.map((instrument) => {
                        return (React.createElement("tr", { key: instrument._id },
                            React.createElement("td", null, instrument.symbol),
                            React.createElement("td", null, instrument.shortName),
                            React.createElement("td", null, instrument.value),
                            React.createElement("td", null, instrument.totalValue / instrument.value),
                            React.createElement("td", null, instrument.totalValue)));
                    }))),
                React.createElement("h3", null,
                    "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044F: ",
                    portfolio.reduce((total, inst) => total + inst.totalValue, 0).toFixed(2))))));
};
export default Portfolio;

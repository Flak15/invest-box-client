import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useState, useEffect } from 'react';
import { Iauth, IportfolioItem } from '../types/index';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const getP = async () => {
      const authData: Iauth | null = getContext();
      try {
        if (!authData) {
          throw new Error('User undefined!');
        }
        const res = await axios.get(`/portfolio/${authData.username}`, {
          auth: authData,
          baseURL: config.baseURL
        });
        setQuotes(JSON.parse(res.data.p));
      } catch (e) {
        alert(e.message);
        console.log('Error while loading portfolio: ', e);
      }
    }
    getP();
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
        <h1>Quotes</h1>
        </div>
      </div>
    </div>
  )
}

export default Quotes;
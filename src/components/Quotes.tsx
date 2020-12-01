import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useEffect } from 'react';
import { Iauth, Iinstrument, Istate } from '../types/index';
import setQuotes from 'src/store/actions/setQuotes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IquotesComponent {
  quotes: Iinstrument[],
  setQuotes: (quotes: Iinstrument[]) => void
}

const Quotes = ({ quotes, setQuotes }: IquotesComponent) => {

  useEffect(() => {
    const getQuotes = async () => {
      const authData: Iauth | null = getContext();
      try {
        if (!authData) {
          throw new Error('User undefined!');
        }
        const res = await axios.get(`/instrument/all`, {
          auth: authData,
          baseURL: config.baseURL
        });
        setQuotes(JSON.parse(res.data.allI));
      } catch (e) {
        alert(e.message);
        console.log('Error while loading insruments: ', e);
      }
    }
    getQuotes();
  }, [setQuotes]);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
        <h1>Quotes</h1>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">P/E</th>
              </tr>
            </thead>
            <tbody>
              {quotes.slice().sort((i1, i2) => i1.symbol <= i2.symbol ? -1 : 1).map((instrument) => {
                return (
                  <tr key={instrument._id}>
                    <td>{instrument.symbol}</td>
                    <td>{instrument.priceData.shortName}</td>
                    <td>{instrument.price.toFixed(2)}</td>
                    <td>{instrument.financialData.}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: Istate) => {
  return {
    quotes: state.quotes,
  }  
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuotes: bindActionCreators(setQuotes, dispatch),
  }  
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);

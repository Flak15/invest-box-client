import React from 'react';
import axios from 'axios';
import config from '../config';
import { getContext } from '../storage';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Iauth, Iinstrument, Istate } from '../types/index';
import setQuotesAction from 'src/store/actions/setQuotes';
import { useSelector, useDispatch } from 'react-redux';

// type IquotesComponent = {
//   quotes: Iinstrument[],
//   setQuotes: (quotes: Iinstrument[]) => void
// }
const getSorter = (sortParam: string, sortOrder: number) => {
  const sorters: any = {
    symbol: (a: Iinstrument, b: Iinstrument) => (a.symbol >= b.symbol ? 1 : -1) * sortOrder,
    name: (a: Iinstrument, b: Iinstrument) =>  (a.priceData.shortName >= b.priceData.shortName ? 1 : -1) * sortOrder,
    price: (a: Iinstrument, b: Iinstrument) =>  (a.price >= b.price ? 1 : -1) * sortOrder,
    pe: (a: Iinstrument, b: Iinstrument) => 1,
  };
  return sorters[sortParam];
}


const Quotes = () => {
  const [sortParam, setSortParam] = useState('symbol');
  const [sortOrder, setSortOrder] = useState(1);
  const quotes = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  const onClick = (e:any) => {
    if (e.target.name === sortParam) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortParam(e.target.name);
      setSortOrder(1);
    }
    
    
  }
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
        dispatch(setQuotesAction(JSON.parse(res.data.allI)));
      } catch (e) {
        alert(e.message);
        console.log('Error while loading insruments: ', e);
      }
    }
    getQuotes();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-9">
          <h1>Quotes</h1>
          <table className="table">
              <thead>
                <tr>
                  <td><Button variant="link" name="symbol" onClick={onClick}>{sortParam === 'symbol' ? <b>Symbol</b> : 'Symbol'}</Button></td>
                  <td><Button variant="link" name="name" onClick={onClick}>{sortParam === 'name' ? <b>Name</b> : 'Name'}</Button></td>
                  <td><Button variant="link" name="price" onClick={onClick}>{sortParam === 'price' ? <b>Price</b> : 'Price'}</Button></td>
                  <td><Button variant="link" name="pe" onClick={onClick}>{sortParam === 'pe' ? <b>P/E (TTM)</b> : 'P/E (TTM)'}</Button></td>
                </tr>
              </thead>
              <tbody>
                {quotes.slice().sort(getSorter(sortParam, sortOrder)).map((instrument) => {
                  return (
                    <tr key={instrument._id}>
                      <td>{instrument.symbol}</td>
                      <td>{instrument.priceData.shortName}</td>
                      <td>{instrument.price.toFixed(2)}</td>
                      <td>{instrument.summaryDetail.trailingPE ? instrument.summaryDetail.trailingPE.fmt : ''}</td>
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
// const mapStateToProps = (state: Istate) => { // -> hooks
//   return {
//     quotes: state.quotes,
//   }  
// };
// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     setQuotes: bindActionCreators(setQuotesAction, dispatch),
//   }  
// };

// export default connect(null, mapDispatchToProps)(Quotes);
export default Quotes;
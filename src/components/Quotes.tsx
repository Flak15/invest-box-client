import React, { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Iinstrument } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { requestQuotes } from 'src/store/quotes/actions/quotesActions';

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
  const quotes = useSelector((state) => state.quotes.list);
  const loading = useSelector((state) => state.quotes.loading);
  const dispatch = useDispatch();
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    
    if (e.currentTarget.name === sortParam) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortParam(e.currentTarget.name);
      setSortOrder(1);
    }
  }
  useEffect(() => {
    dispatch(requestQuotes());
  }, [dispatch]);
  if (loading) {
    return <Spinner animation="border" variant="secondary" />
  };
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

export default Quotes;
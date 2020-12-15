import { createReducer } from '@reduxjs/toolkit';
import { fetchQuotes, fetchQuotesSuccess, fetchQuotesFail } from '../actions/quotesActions';
import { Iinstrument } from '../../../types/index';

interface IquotesState {
  list: Iinstrument[],
  loading: boolean,
  errors: boolean
}

const quotesInitialState: IquotesState = { 
  list: [],
  loading: false,
  errors: false
};

const quotes = createReducer(quotesInitialState, (builder) => {
  builder
    .addCase(fetchQuotes, (state, _) => {
      return { list: state.list, loading: true, errors: false };
    })
    .addCase(fetchQuotesSuccess, (_, action) => {
      return { list: action.payload, loading: false, errors: false };
    })
    .addCase(fetchQuotesFail, (state, _) => {
      return { list: state.list, loading: false, errors: true };
    })
});

export default quotes;
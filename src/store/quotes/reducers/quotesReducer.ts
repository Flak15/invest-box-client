import { createReducer } from '@reduxjs/toolkit';
import { FETCH_QUOTES_REQUEST, FETCH_QUOTES_SUCCESS, FETCH_QUOTES_FAIL } from '../actions/quotesActions';
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
    .addCase(FETCH_QUOTES_REQUEST, (state, _) => {
      return { list: state.list, loading: true, errors: false }; //hmmm?? state?
    })
    .addCase(FETCH_QUOTES_SUCCESS, (_, action) => {
      return { list: action.payload, loading: false, errors: false };
    })
    .addCase(FETCH_QUOTES_FAIL, (state, _) => {
      return { list: state.list, loading: false, errors: true };
    })
});

export default quotes;
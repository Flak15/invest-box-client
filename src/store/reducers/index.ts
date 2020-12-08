import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import addPortfolioInstrument from '../actions/addPortfolioInstrument';
import setPortfolio from '../actions/setPortfolio';
import changeInstumentValue from '../actions/changeInstrumentValue';
// import setQuotes from '../actions/setQuotes';
import { Iinstrument, IportfolioItem } from '../../types/index';
import { FETCH_QUOTES_REQUEST, FETCH_QUOTES_SUCCESS, FETCH_QUOTES_FAIL } from '../actions/quotes';

const portfolioInitialState: IportfolioItem[] = []; //тип

const portfolio = createReducer(portfolioInitialState, (builder) => {
    builder
      .addCase(addPortfolioInstrument, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(setPortfolio, (_, action) => {
        return action.payload;
      })
      .addCase(changeInstumentValue, (state, action) => {
        const editableInstrument = state.find(item => item._id === action.payload.id);
        if (editableInstrument)
          editableInstrument.value = action.payload.value;
        console.log(state);
        return state;
      })
});

interface IquotesState {
  quotes: Iinstrument[],
  loading: boolean,
  errors: boolean
}

const quotesInitialState: IquotesState = { 
  quotes: [],
  loading: false,
  errors: false
};

const quotes = createReducer(quotesInitialState, (builder) => {
  builder
    .addCase(FETCH_QUOTES_REQUEST, (state, _) => {
      return { quotes: state.quotes, loading: true, errors: false }; //hmmm?? state?
    })
    .addCase(FETCH_QUOTES_SUCCESS, (_, action) => {
      return { quotes: action.payload, loading: false, errors: false };
    })
    .addCase(FETCH_QUOTES_FAIL, (state, _) => {
      return { quotes: state.quotes, loading: false, errors: true };
    })
});

const reducers = combineReducers({
    portfolio,
    quotes
});

export default reducers;
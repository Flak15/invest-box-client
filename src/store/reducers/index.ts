import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import InitialState from '../initialState';
import addPortfolioInstrument from '../actions/addPortfolioInstrument';
import setPortfolio from '../actions/setPortfolio';
import changeInstumentValue from '../actions/changeInstrumentValue';
import setQuotes from '../actions/setQuotes';

const portfolio = createReducer(InitialState.portfolio, (builder) => {
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

const quotes = createReducer(InitialState.quotes, (builder) => {
  builder
    .addCase(setQuotes, (_, action) => {
      return action.payload;
    })
});

const reducers = combineReducers({
    portfolio,
    quotes
});

export default reducers;
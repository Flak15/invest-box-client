import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import InitialState from '../initialState';
import addPortfolioInstrument from '../actions/addPortfolioInstrument';
import setPortfolio from '../actions/setPortfolio';


// const initialState: Istate = { portfolio: [] };

const portfolio = createReducer(InitialState.portfolio, (builder) => {
    builder
      .addCase(addPortfolioInstrument, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(setPortfolio, (_, action) => {
        return action.payload;
      })
  })

const reducers = combineReducers({
    portfolio,
});

export default reducers;
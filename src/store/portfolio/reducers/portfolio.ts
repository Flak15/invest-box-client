import { createReducer } from '@reduxjs/toolkit';
// import addPortfolioInstrument from '../actions/addPortfolioInstrument';
// import setPortfolio from '../actions/setPortfolio';
// import changeInstumentValue from '../actions/changeInstrumentValue';
import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAIL } from '../actions/requestPortfolio';
import { IportfolioItem } from '../../../types/index';

interface IportfolioState {
  list: IportfolioItem[],
  loading: boolean,
  errors: boolean
}

const portfolioInitialState: IportfolioState = {
  list: [],
  loading: false,
  errors: false
};

const portfolio = createReducer(portfolioInitialState, (builder) => {
    builder
      .addCase(FETCH_PORTFOLIO, (state, _) => {
        return { list: state.list, loading: true, errors: false };
      })
      .addCase(FETCH_PORTFOLIO_SUCCESS, (_, action) => {
        return { list: action.payload, loading: false, errors: false };
      })
      .addCase(FETCH_PORTFOLIO_FAIL, (state, _) => {
        return { list: state.list, loading: false, errors: true };
      })
      // .addCase(addPortfolioInstrument, (state, action) => {
      //   return [...state, action.payload];
      // })
      // .addCase(setPortfolio, (_, action) => {
      //   return action.payload;
      // })
      // .addCase(changeInstumentValue, (state, action) => {
      //   const editableInstrument = state.find(item => item._id === action.payload.id);
      //   if (editableInstrument)
      //     editableInstrument.value = action.payload.value;
      //   console.log(state);
      //   return state;
      // })
});

export default portfolio;
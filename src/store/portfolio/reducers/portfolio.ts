import { createReducer } from '@reduxjs/toolkit';
import { fetchPortfolio, fetchPortfolioSuccess, fetchPortfolioFail } from '../actions/requestPortfolio';
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
      .addCase(fetchPortfolio, (state, _) => {
        return { list: state.list, loading: true, errors: false };
      })
      .addCase(fetchPortfolioSuccess, (_, action) => {
        return { list: action.payload, loading: false, errors: false };
      })
      .addCase(fetchPortfolioFail, (state, action) => {
        console.log(action.payload.message);
        return { list: state.list, loading: false, errors: true };
      })
      // .addCase(changeInstumentValue, (state, action) => {
      //   const editableInstrument = state.find(item => item._id === action.payload.id);
      //   if (editableInstrument)
      //     editableInstrument.value = action.payload.value;
      //   console.log(state);
      //   return state;
      // })
});

export default portfolio;
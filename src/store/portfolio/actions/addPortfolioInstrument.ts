import { createAction } from '@reduxjs/toolkit';

export const addPortfolioInstrument = createAction<any>('ADD_PORTFOLIO_INSTRUMENT'); // TODO set valid interface
export const addPortfolioInstrumentSuccess = createAction('ADD_PORTFOLIO_INSTRUMENT_SUCCESS');
export const addPortfolioInstrumentFail = createAction<Error>('ADD_PORTFOLIO_INSTRUMENT_FAIL');

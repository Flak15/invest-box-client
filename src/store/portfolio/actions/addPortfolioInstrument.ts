import { createAction } from '@reduxjs/toolkit';

export const ADD_PORTFOLIO_INSTRUMENT = createAction<any>('ADD_PORTFOLIO_INSTRUMENT'); // TODO set valid interface
export const ADD_PORTFOLIO_INSTRUMENT_QUERY = createAction('ADD_PORTFOLIO_INSTRUMENT_QUERY');
export const ADD_PORTFOLIO_INSTRUMENT_SUCCESS = createAction('ADD_PORTFOLIO_INSTRUMENT_SUCCESS');
export const ADD_PORTFOLIO_INSTRUMENT_FAIL = createAction<Error>('ADD_PORTFOLIO_INSTRUMENT_FAIL');

import { createAction } from '@reduxjs/toolkit';
import { IportfolioItem } from 'src/types';

export const ADD_PORTFOLIO_INSTRUMENT = createAction<any>('ADD_PORTFOLIO_INSTRUMENT'); // TODO set valid interface
export const ADD_PORTFOLIO_INSTRUMENT_QUERY = createAction('ADD_PORTFOLIO_INSTRUMENT_QUERY');
export const ADD_PORTFOLIO_INSTRUMENT_SUCCESS = createAction<IportfolioItem>('ADD_PORTFOLIO_INSTRUMENT_SUCCESS');
export const ADD_PORTFOLIO_INSTRUMENT_FAIL = createAction('ADD_PORTFOLIO_INSTRUMENT_FAIL');

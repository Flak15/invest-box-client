import { createAction } from '@reduxjs/toolkit';
import { IportfolioItem } from 'src/types';

export const FETCH_PORTFOLIO = createAction('FETCH_PORTFOLIO');
export const FETCH_PORTFOLIO_SUCCESS = createAction<IportfolioItem[]>('FETCH_PORTFOLIO_SUCCESS');
export const FETCH_PORTFOLIO_FAIL = createAction('FETCH_PORTFOLIO_FAIL');
export const REQUEST_PORTFOLIO = createAction('REQUEST_PORTFOLIO');
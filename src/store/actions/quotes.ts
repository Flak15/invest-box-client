import { createAction } from '@reduxjs/toolkit';
import { Iinstrument } from 'src/types';

export const FETCH_QUOTES_REQUEST = createAction('FETCH_QUOTES_REQUEST');
export const FETCH_QUOTES_SUCCESS = createAction<Iinstrument[]>('FETCH_QUOTES_SUCCESS');
export const FETCH_QUOTES_FAIL = createAction('FETCH_QUOTES_FAIL');
export const FETCH_QUOTES = createAction('FETCH_QUOTES');
import { createAction } from '@reduxjs/toolkit';

export const UPDATE_INSTRUMENT_VALUE = createAction('UPDATE_INSTRUMENT_VALUE', (symbol: string, value: number) => {
  return {
    payload: { symbol, value }
  }
});
export const UPDATE_INSTRUMENT_VALUE_SUCCESS = createAction('UPDATE_INSTRUMENT_VALUE_SUCCESS');
export const UPDATE_INSTRUMENT_VALUE_FAIL = createAction<Error>('UPDATE_INSTRUMENT_VALUE_FAIL');

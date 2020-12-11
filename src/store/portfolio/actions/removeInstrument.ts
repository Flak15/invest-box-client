import { createAction } from '@reduxjs/toolkit';

export const REMOVE_INSTRUMENT = createAction<any>('UPDATE_INSTRUMENT_VALUE');
export const REMOVE_INSTRUMENT_SUCCESS = createAction('UPDATE_INSTRUMENT_VALUE_SUCCESS');
export const REMOVE_INSTRUMENT_FAIL = createAction<Error>('UPDATE_INSTRUMENT_VALUE_FAIL');
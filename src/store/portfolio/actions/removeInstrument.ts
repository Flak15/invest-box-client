import { createAction } from '@reduxjs/toolkit';

export const removeInstrument = createAction<any>('REMOVE_INSTRUMENT');
export const removeInstrumentSuccess = createAction('REMOVE_INSTRUMENT_SUCCESS');
export const removeInstrumentFail = createAction<Error>('REMOVE_INSTRUMENT_FAIL');
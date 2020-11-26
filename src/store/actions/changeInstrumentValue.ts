import { createAction } from '@reduxjs/toolkit';

const changeInstrumentValue = createAction('CHANGE_INSTRUMENT_VALUE', (id: string, value: number) => {
  return {
    payload: { id, value }
  }
});
export default changeInstrumentValue;

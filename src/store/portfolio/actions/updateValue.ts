import { createAction } from "@reduxjs/toolkit";

export const updateInstrumentValue = createAction(
  "UPDATE_INSTRUMENT_VALUE",
  (symbol: string, value: number) => {
    return {
      payload: { symbol, value },
    };
  }
);
export const updateInstrumentValueSuccess = createAction(
  "UPDATE_INSTRUMENT_VALUE_SUCCESS"
);
export const updateInstrumentValueFail = createAction<Error>(
  "UPDATE_INSTRUMENT_VALUE_FAIL"
);

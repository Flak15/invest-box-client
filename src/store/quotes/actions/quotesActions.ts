import { createAction } from "@reduxjs/toolkit";
import { Iinstrument } from "src/types";

export const fetchQuotes = createAction("FETCH_QUOTES");
export const fetchQuotesSuccess = createAction<Iinstrument[]>(
  "FETCH_QUOTES_SUCCESS"
);
export const fetchQuotesFail = createAction("FETCH_QUOTES_FAIL");
export const requestQuotes = createAction("REQUEST_QUOTES");

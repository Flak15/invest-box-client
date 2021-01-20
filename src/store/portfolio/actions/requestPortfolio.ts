import { createAction } from "@reduxjs/toolkit";
import { IportfolioItem } from "src/types";

export const fetchPortfolio = createAction("FETCH_PORTFOLIO");
export const fetchPortfolioSuccess = createAction<IportfolioItem[]>(
  "FETCH_PORTFOLIO_SUCCESS"
);
export const fetchPortfolioFail = createAction<Error>("FETCH_PORTFOLIO_FAIL");
export const requestPortfolio = createAction("REQUEST_PORTFOLIO");

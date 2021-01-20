import { createAction } from "@reduxjs/toolkit";
import { IportfolioItem } from "src/types";

const setPortfolio = createAction<IportfolioItem[]>("SET_PORTFOLIO");
export default setPortfolio;

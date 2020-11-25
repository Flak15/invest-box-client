import { createAction } from '@reduxjs/toolkit';
import { IportfolioItem } from 'src/types';

const addPortfolioInstrument = createAction<IportfolioItem>('ADD_PORTFOLIO_INSTRUMENT')
export default addPortfolioInstrument;
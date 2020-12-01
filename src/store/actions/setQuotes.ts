import { createAction } from '@reduxjs/toolkit';
import { Iinstrument } from 'src/types';

const setQuotes = createAction<Iinstrument[]>('SET_QUOTES')
export default setQuotes;
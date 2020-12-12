import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { ADD_PORTFOLIO_INSTRUMENT, ADD_PORTFOLIO_INSTRUMENT_SUCCESS, ADD_PORTFOLIO_INSTRUMENT_FAIL } from '../actions/addPortfolioInstrument';
// getInstrument = () => {}

interface IaddInstrument {
  symbol: string,
  value: number
}
const addInstrument = async ({ symbol, value }: IaddInstrument) => {

  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  await axios.post(`/portfolio/add`, { username: authData.username, symbol, value }, { 
    auth: authData,
    baseURL: config.baseURL,
  });
}

function* workerAddPortfolioInstrument ({ payload }: any) {
  try {
    // yield put(ADD_PORTFOLIO_INSTRUMENT_QUERY());
    yield call(addInstrument, payload);
    yield put(ADD_PORTFOLIO_INSTRUMENT_SUCCESS());
  } catch (error) {
    console.log(error);
    yield put(ADD_PORTFOLIO_INSTRUMENT_FAIL(error));
  };
}

export function* watchAddPortfolioInstrument () {
  yield takeLatest(ADD_PORTFOLIO_INSTRUMENT, workerAddPortfolioInstrument);
}
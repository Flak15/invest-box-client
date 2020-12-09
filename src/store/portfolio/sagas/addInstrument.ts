import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { ADD_PORTFOLIO_INSTRUMENT, ADD_PORTFOLIO_INSTRUMENT_QUERY, ADD_PORTFOLIO_INSTRUMENT_SUCCESS, ADD_PORTFOLIO_INSTRUMENT_FAIL } from '../actions/addPortfolioInstrument';
import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAIL } from '../actions/requestPortfolio';
// getInstrument = () => {}
const getPortfolio = () => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  return axios.get(`/portfolio/${authData.username}`, {
    auth: authData,
    baseURL: config.baseURL
  });
}
interface IaddInstrument {
  symbol: string,
  value: number
}
const addInstrument = ({ symbol, value }: IaddInstrument) => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  axios.post(`/portfolio/add`, { username: authData.username, symbol, value }, { 
    auth: authData,
    baseURL: config.baseURL,
  });
}

function* workerAddPortfolioInstrument ({ payload }: any) {
  console.log(payload);
  try {
    // yield put(ADD_PORTFOLIO_INSTRUMENT_QUERY());
    yield call(addInstrument, payload);
    const res = yield call(getPortfolio);
    yield put(FETCH_PORTFOLIO());
    yield put(FETCH_PORTFOLIO_SUCCESS(JSON.parse(res.data.p))); // возвращает без нового инструмента
  } catch (error) {
    
    yield put(FETCH_PORTFOLIO_FAIL());
  };
}

export function* watchAddPortfolioInstrument () {
  yield takeLatest(ADD_PORTFOLIO_INSTRUMENT, workerAddPortfolioInstrument);
}
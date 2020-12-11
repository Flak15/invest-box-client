import { put, call, takeLatest, take } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAIL, REQUEST_PORTFOLIO } from '../actions/requestPortfolio';
import { ADD_PORTFOLIO_INSTRUMENT_SUCCESS } from '../actions/addPortfolioInstrument';
import { UPDATE_INSTRUMENT_VALUE_SUCCESS } from '../actions/updateValue';
import { REMOVE_INSTRUMENT_SUCCESS } from '../actions/removeInstrument';
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
function* workerFetchPortfolio() {
  try {
    yield put(FETCH_PORTFOLIO());
    const res = yield call(getPortfolio);
    yield put(FETCH_PORTFOLIO_SUCCESS(JSON.parse(res.data.p)));
  } catch (error) {
    yield put(FETCH_PORTFOLIO_FAIL(error));
  };
}

export function* watchUpdatePortfolio() {
  while (true) {
    yield take([ADD_PORTFOLIO_INSTRUMENT_SUCCESS, UPDATE_INSTRUMENT_VALUE_SUCCESS, REMOVE_INSTRUMENT_SUCCESS]);
    /**
     * After that success action portfolio will updated
     */
    try {
      yield put(FETCH_PORTFOLIO());
      const res = yield call(getPortfolio);
      yield put(FETCH_PORTFOLIO_SUCCESS(JSON.parse(res.data.p)));
    } catch (error) {
      yield put(FETCH_PORTFOLIO_FAIL(error));
    }
  }
 }

export function* watchFetchPortfolio () {
  yield takeLatest(REQUEST_PORTFOLIO, workerFetchPortfolio);
}
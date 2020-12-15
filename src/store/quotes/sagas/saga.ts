import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { fetchQuotes, requestQuotes, fetchQuotesSuccess, fetchQuotesFail } from '../actions/quotesActions';

const getQuotes = () => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  return axios.get(`/instrument/all`, {
    auth: authData,
    baseURL: config.baseURL
  });
}

function* workerFetchQuotes () {
  try{
    yield put(fetchQuotes());
    const res = yield call(getQuotes);
    yield put(fetchQuotesSuccess(JSON.parse(res.data.allI)));
  } catch (error) {
    yield put(fetchQuotesFail());
  };
}

export function* watchFetchQuotes () {
  yield takeLatest(requestQuotes, workerFetchQuotes);
}
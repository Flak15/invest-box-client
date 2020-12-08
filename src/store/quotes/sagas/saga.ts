import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { FETCH_QUOTES_REQUEST, FETCH_QUOTES, FETCH_QUOTES_SUCCESS, FETCH_QUOTES_FAIL } from '../actions/quotesActions';

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
    yield put(FETCH_QUOTES_REQUEST());
    const res = yield call(getQuotes);
    yield put(FETCH_QUOTES_SUCCESS(JSON.parse(res.data.allI)));
  } catch (error) {
    yield put(FETCH_QUOTES_FAIL());
  };
}

export function* watchFetchQuotes () {
  yield takeLatest(FETCH_QUOTES, workerFetchQuotes);
}
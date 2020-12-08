import { takeEvery, put, call } from 'redux-saga/effects';
// import loadPortfolio from '../actions/loadPortfolio';
import axios from 'axios';
import config from '../../config';
import { getContext } from '../../storage';
// import setQuotesAction from '../actions/setQuotes';
import { Iauth } from '../../types/index';
import { FETCH_QUOTES_REQUEST, FETCH_QUOTES, FETCH_QUOTES_SUCCESS, FETCH_QUOTES_FAIL } from '../actions/quotes';

const getQuotes = () => {
  const authData: Iauth | null = getContext();
  // try {
    if (!authData) {
      throw new Error('User undefined!');
    }
    return axios.get(`/instrument/all`, {
      auth: authData,
      baseURL: config.baseURL
    });
  // } catch (e) {
  //   alert(e.message);
  //   console.log('Error while loading insruments: ', e);
  //   return ;
  // }
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
  yield takeEvery(FETCH_QUOTES, workerFetchQuotes);
}
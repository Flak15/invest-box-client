import { takeEvery, put, call } from 'redux-saga/effects';
import loadPortfolio from '../actions/loadPortfolio';
import axios from 'axios';
import config from '../../config';
import { getContext } from '../../storage';
import setQuotesAction from '../actions/setQuotes';
import { Iauth } from '../../types/index';

const getQuotes = () => {
  const authData: Iauth | null = getContext();
  try {
    if (!authData) {
      throw new Error('User undefined!');
    }
    return axios.get(`/instrument/all`, {
      auth: authData,
      baseURL: config.baseURL
    });
  } catch (e) {
    alert(e.message);
    console.log('Error while loading insruments: ', e);
    return ;
  }
}

function* workerLoadPortfolio () {
  const res = yield call(getQuotes);
  yield put(setQuotesAction(JSON.parse(res.data.allI)));
}

export function* watchLoadPortfolio () {
  yield takeEvery(loadPortfolio, workerLoadPortfolio);
}
import { takeEvery } from 'redux-saga/effects';
import loadPortfolio from '../actions/loadPortfolio';

function* workerLoadPortfolio () {
  console.log('worker');
  
}

export function* watchLoadPortfolio () {
  yield takeEvery(loadPortfolio, workerLoadPortfolio);
}
import { all, fork } from 'redux-saga/effects';
import { watchFetchQuotes } from './quotes/sagas/saga';
import { watchFetchPortfolio, watchUpdatePortfolio } from './portfolio/sagas/requestPortfolio';
import { watchAddPortfolioInstrument } from './portfolio/sagas/addInstrument';
import { watchUpdateInstrumentValue } from './portfolio/sagas/updateInstrumentValue';
import { watchRemoveInstrument } from './portfolio/sagas/removeInstrument';

function* rootSaga () {
  yield all([
    fork(watchFetchQuotes), 
    fork(watchFetchPortfolio), 
    fork(watchAddPortfolioInstrument), 
    fork(watchUpdateInstrumentValue),
    fork(watchRemoveInstrument),
    fork(watchUpdatePortfolio),
  ]); // fork
}

export default rootSaga;
import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
// import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import portfolio from './portfolio/reducers/portfolio';
import quotes from './quotes/reducers/quotesReducer';
import { watchFetchQuotes } from './quotes/sagas/saga';
import { watchFetchPortfolio, watchUpdatePortfolio } from './portfolio/sagas/requestPortfolio';
import { watchAddPortfolioInstrument } from './portfolio/sagas/addInstrument';
import { watchUpdateInstrumentValue } from './portfolio/sagas/updateInstrumentValue';
import { watchRemoveInstrument } from './portfolio/sagas/removeInstrument';
import { composeWithDevTools } from 'redux-devtools-extension';
export type State = ReturnType<typeof reducers>;

declare module "react-redux" {
  interface DefaultRootState extends State {}
}

const reducers = combineReducers({
  portfolio,
  quotes
});

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));
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
sagaMiddleware.run(rootSaga);
export default store;
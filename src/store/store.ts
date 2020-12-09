import { createStore, applyMiddleware, Store, combineReducers, compose } from 'redux';
// import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import portfolio from './portfolio/reducers/portfolio';
import quotes from './quotes/reducers/quotesReducer';
import { watchFetchQuotes } from './quotes/sagas/saga';
import { watchFetchPortfolio } from './portfolio/sagas/requestPortfolio';
import { watchAddPortfolioInstrument } from './portfolio/sagas/addInstrument';
export type State = ReturnType<typeof reducers>;

declare module "react-redux" {
  interface DefaultRootState extends State {}
}

const reducers = combineReducers({
  portfolio,
  quotes
});

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(reducers, compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
function* rootSaga () {
  yield all([watchFetchQuotes(), watchFetchPortfolio(), watchAddPortfolioInstrument()]);
}
sagaMiddleware.run(rootSaga);
export default store;
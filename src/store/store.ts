import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import portfolio from './portfolio/reducers/portfolio';
import quotes from './quotes/reducers/quotesReducer';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';

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


sagaMiddleware.run(rootSaga);
export default store;
import { createStore, applyMiddleware, Store } from 'redux';
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { watchLoadPortfolio } from './saga/saga';

export type State = ReturnType<typeof reducers>;

declare module "react-redux" {
  interface DefaultRootState extends State {}
}

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchLoadPortfolio);
export default store;
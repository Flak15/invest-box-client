import { createStore, Store } from 'redux';
import initalState from './initialState';
import reducers from './reducers/index';

const store: Store = createStore(reducers, initalState);

export default store;
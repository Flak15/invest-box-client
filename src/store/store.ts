import { createStore, Store } from 'redux';
// import initalState from './initialState';
import reducers from './reducers/index';

// const store: Store = createStore(reducers, initalState); // какой тип initialStore?
const store: Store = createStore(reducers);
export default store;
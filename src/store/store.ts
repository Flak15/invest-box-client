import { createStore, Store } from 'redux';
// import initalState from './initialState';
import reducers from './reducers/index';

// const store: Store = createStore(reducers, initalState); // какой тип initialStore?
export type State = ReturnType<typeof reducers>;

declare module "react-redux" {
  interface DefaultRootState extends State {}
}
const store: Store = createStore(reducers);
export default store;
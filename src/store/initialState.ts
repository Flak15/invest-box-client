import { IportfolioItem } from '../types/index';

interface Istore {
  portfolio: IportfolioItem,
}
const InitialState = { 
  portfolio: [],
};
export default InitialState;
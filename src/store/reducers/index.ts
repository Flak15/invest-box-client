import { Action, combineReducers, Store } from 'redux';
import { PortfolioAction, PortfolioState } from 'src/types';
import ADD_PORTFOLIO_INSTRUMENT from '../actions/addPortfolioInstrument';
import InitialState from '../initialState';

const portfolio = (state = [], action: PortfolioAction): PortfolioState => {
    switch(action.type) {
        case ADD_PORTFOLIO_INSTRUMENT: return [ ...state, action.value ];
        default: return state;
    }
};

const reducers = combineReducers({
    portfolio,
});

export default reducers;
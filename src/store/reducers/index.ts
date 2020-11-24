import { Action, combineReducers, Store } from 'redux';
import ADD_PORTFOLIO_INSTRUMENT from '../actions/addPortfolioInstrument';

const portfolio = (state: Store, action: Action) => {
    switch(action.type) {
        case ADD_PORTFOLIO_INSTRUMENT: return ;
        default: return state;
    }
};

const reducers = combineReducers({
    portfolio
});

export default reducers;
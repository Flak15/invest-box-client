import ADD_PORTFOLIO_INSTRUMENT from '../actions/addPortfolioInstrument';

export default (value) => {
    return {
        type: ADD_PORTFOLIO_INSTRUMENT,
        value,
    }
}
import ADD_PORTFOLIO_INSTRUMENT from '../actions/addPortfolioInstrument';
import { IportfolioItem} from '../../types/index';

export default (value: IportfolioItem) => {
    return {
        type: ADD_PORTFOLIO_INSTRUMENT,
        value,
    }
}
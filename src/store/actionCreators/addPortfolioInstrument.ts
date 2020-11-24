import ADD_PORTFOLIO_INSTRUMENT from '../actions/addPortfolioInstrument';
import { IportfolioItem, PortfolioAction } from '../../types/index';

const addPortfolioInstrument = (value: IportfolioItem): PortfolioAction => {
    return {
        type: ADD_PORTFOLIO_INSTRUMENT,
        value,
    }
}
export default addPortfolioInstrument;